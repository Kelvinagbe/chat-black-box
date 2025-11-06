import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { useUsers } from './useUsers';
import { useFriendRequests } from './useFriendRequests';
import { useFriends } from './useFriends';
import { useChatRooms } from './useChatRooms';

export const useChat = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const { allUsers } = useUsers();
  const { friends } = useFriends(currentUser?.uid || null);
  const { 
    friendRequests, 
    sentRequests, 
    sendFriendRequest, 
    acceptFriendRequest, 
    rejectFriendRequest 
  } = useFriendRequests(currentUser?.uid || null);

  // Get all chat room IDs from friends
  const chatRoomIds = useMemo(() => {
    return Object.values(friends).map(friend => friend.chatRoomId);
  }, [friends]);

  const { chatRooms } = useChatRooms(chatRoomIds);

  // Transform friends into chat list with user info and last message
  const chatList = useMemo(() => {
    return Object.entries(friends).map(([friendId, friendData]) => {
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
        verified: false, // You can add a verified field to your user schema
        unread: 0, // You would need to implement unread message tracking
      };
    }).sort((a, b) => b.lastMessageTime - a.lastMessageTime);
  }, [friends, allUsers, chatRooms]);

  // Get users that are not friends (for discover tab)
  const discoverUsers = useMemo(() => {
    return Object.entries(allUsers)
      .filter(([userId]) => {
        return userId !== currentUser?.uid && !friends[userId];
      })
      .map(([userId, user]) => ({
        id: userId,
        name: user.nickname || 'Anonymous',
        avatar: user.avatar,
        status: user.status || 'offline',
        role: user.role || 'User',
        verified: false,
        isPending: sentRequests[userId] || false,
      }));
  }, [allUsers, friends, currentUser?.uid, sentRequests]);

  // Transform friend requests with user info
  const requestsWithUserInfo = useMemo(() => {
    return friendRequests.map(request => ({
      ...request,
      fromUser: allUsers[request.from],
    }));
  }, [friendRequests, allUsers]);

  const handleSendFriendRequest = async (toUserId: string) => {
    if (!currentUser) return { success: false };

    const currentUserData = allUsers[currentUser.uid];
    return await sendFriendRequest(
      toUserId,
      currentUserData?.nickname || 'Anonymous',
      currentUserData?.avatar
    );
  };

  return {
    // Auth
    currentUser,
    authLoading,
    
    // Users
    allUsers,
    
    // Chat list
    chatList,
    
    // Discover
    discoverUsers,
    
    // Friend requests
    friendRequests: requestsWithUserInfo,
    
    // Actions
    sendFriendRequest: handleSendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
  };
};