'use client'

import { useAuth } from './useAuth';
import { useUsers } from './useUsers';
import { useFriendRequests } from './useFriendRequests';
import { useFriends } from './useFriends';
import { useChatRooms } from './useChatRooms';
import { Chat, DiscoverUser } from '@/types/chat';

export const useChat = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const { allUsers } = useUsers();
  const { friends } = useFriends(currentUser?.uid || null);
  const { friendRequests, sentRequests, sendFriendRequest, acceptFriendRequest, rejectFriendRequest } = useFriendRequests(currentUser?.uid || null);

  // Get all chat room IDs from friends
  const chatRoomIds = Object.values(friends).map(friend => friend.chatRoomId);
  const { chatRooms } = useChatRooms(chatRoomIds);

  // Transform friends into chat list with user info and last message
  const chatList: Chat[] = Object.entries(friends).map(([friendId, friendData]) => {
    const friend = allUsers[friendId];
    const chatRoom = chatRooms[friendData.chatRoomId];
    const lastMessage = chatRoom?.lastMessage;

    return {
      id: friendId,
      chatRoomId: friendData.chatRoomId,
      name: friend?.nickname || 'Anonymous',
      avatar: friend?.avatar,
      status: friend?.status || 'offline',
      role: friend?.role,
      lastMessage: lastMessage?.text || 'Start a conversation',
      lastMessageTime: lastMessage?.timestamp || friendData.addedAt,
      lastMessageSenderId: lastMessage?.senderId,
      verified: false,
      unread: 0,
    };
  }).sort((a, b) => b.lastMessageTime - a.lastMessageTime);

  // Get users that are not friends (for discover tab)
  const discoverUsers: DiscoverUser[] = Object.entries(allUsers)
    .filter(([userId]) => userId !== currentUser?.uid && !friends[userId])
    .map(([userId, user]) => ({
      id: userId,
      name: user.nickname || 'Anonymous',
      avatar: user.avatar,
      status: user.status || 'offline',
      role: user.role || 'User',
      verified: false,
      isPending: sentRequests[userId] || false,
    }));

  // Transform friend requests with user info
  const requestsWithUserInfo = friendRequests.map(request => ({
    ...request,
    fromUser: allUsers[request.from],
  }));

  const handleSendFriendRequest = async (toUserId: string) => {
    if (!currentUser) return { success: false };
    const currentUserData = allUsers[currentUser.uid];
    return await sendFriendRequest(toUserId, currentUserData?.nickname || 'Anonymous', currentUserData?.avatar);
  };

  return {
    currentUser,
    authLoading,
    allUsers,
    chatList,
    discoverUsers,
    friendRequests: requestsWithUserInfo,
    sendFriendRequest: handleSendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
  };
};