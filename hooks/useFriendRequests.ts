'use client'

import { useState, useEffect } from 'react';
import { ref, onValue, set, push, remove } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase';
import { FriendRequest } from '@/types/chat';

export const useFriendRequests = (currentUserId: string | null) => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!currentUserId) return;
    const requestsRef = ref(realtimeDb, `friendRequests/${currentUserId}`);
    const unsubscribe = onValue(requestsRef, (snapshot) => {
      const requests: FriendRequest[] = [];
      if (snapshot.exists()) {
        const requestsData = snapshot.val();
        Object.keys(requestsData).forEach((requestId) => {
          if (requestsData[requestId].status === 'pending') {
            requests.push({ id: requestId, ...requestsData[requestId] });
          }
        });
      }
      setFriendRequests(requests);
    });
    return () => unsubscribe();
  }, [currentUserId]);

  useEffect(() => {
    if (!currentUserId) return;
    const allRequestsRef = ref(realtimeDb, 'friendRequests');
    const unsubscribe = onValue(allRequestsRef, (snapshot) => {
      const sent: Record<string, boolean> = {};
      if (snapshot.exists()) {
        const allRequests = snapshot.val();
        Object.keys(allRequests).forEach(userId => {
          Object.keys(allRequests[userId]).forEach(requestId => {
            const request = allRequests[userId][requestId];
            if (request.from === currentUserId && request.status === 'pending') {
              sent[userId] = true;
            }
          });
        });
      }
      setSentRequests(sent);
    });
    return () => unsubscribe();
  }, [currentUserId]);

  const sendFriendRequest = async (toUserId: string, fromName: string, fromAvatar?: string) => {
    if (!currentUserId) return;
    try {
      const requestId = push(ref(realtimeDb, `friendRequests/${toUserId}`)).key;
      await set(ref(realtimeDb, `friendRequests/${toUserId}/${requestId}`), { from: currentUserId, fromName, fromAvatar: fromAvatar || null, status: 'pending', timestamp: Date.now() });
      return { success: true };
    } catch (error) {
      console.error('Error sending friend request:', error);
      return { success: false, error };
    }
  };

  const acceptFriendRequest = async (requestId: string, fromUserId: string) => {
    if (!currentUserId) return;
    try {
      const chatRoomId = [currentUserId, fromUserId].sort().join('_');
      await set(ref(realtimeDb, `friends/${currentUserId}/${fromUserId}`), { chatRoomId, addedAt: Date.now() });
      await set(ref(realtimeDb, `friends/${fromUserId}/${currentUserId}`), { chatRoomId, addedAt: Date.now() });
      await set(ref(realtimeDb, `chatRooms/${chatRoomId}`), { participants: { [currentUserId]: true, [fromUserId]: true }, createdAt: Date.now(), lastMessage: null });
      await remove(ref(realtimeDb, `friendRequests/${currentUserId}/${requestId}`));
      return { success: true, chatRoomId };
    } catch (error) {
      console.error('Error accepting friend request:', error);
      return { success: false, error };
    }
  };

  const rejectFriendRequest = async (requestId: string) => {
    if (!currentUserId) return;
    try {
      await remove(ref(realtimeDb, `friendRequests/${currentUserId}/${requestId}`));
      return { success: true };
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      return { success: false, error };
    }
  };

  return { friendRequests, sentRequests, sendFriendRequest, acceptFriendRequest, rejectFriendRequest };
};