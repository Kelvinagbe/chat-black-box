'use client'

import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase'; // Use realtimeDb instead of db
import { ChatRoom } from '@/types/chat';

export const useChatRooms = (chatRoomIds: string[]) => {
  const [chatRooms, setChatRooms] = useState<Record<string, ChatRoom>>({});

  useEffect(() => {
    if (chatRoomIds.length === 0) {
      setChatRooms({});
      return;
    }

    const unsubscribes: (() => void)[] = [];

    chatRoomIds.forEach((chatRoomId) => {
      const chatRoomRef = ref(realtimeDb, `chatRooms/${chatRoomId}`);

      const unsubscribe = onValue(chatRoomRef, (snapshot) => {
        if (snapshot.exists()) {
          setChatRooms(prev => ({ ...prev, [chatRoomId]: snapshot.val() }));
        }
      });

      unsubscribes.push(unsubscribe);
    });

    return () => unsubscribes.forEach(unsub => unsub());
  }, [chatRoomIds.join(',')]);

  return { chatRooms };
};