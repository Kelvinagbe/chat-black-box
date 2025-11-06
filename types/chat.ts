// User types
export interface User {
  uid: string;
  nickname: string;
  avatar?: string;
  status?: 'online' | 'offline';
  role?: string;
  email?: string;
}

// Chat types
export interface Chat {
  id: string; // Changed from number to string for Firebase
  chatRoomId: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline';
  role?: string;
  lastMessage: string;
  lastMessageTime: number;
  lastMessageSenderId?: string;
  verified: boolean;
  unread: number;
}

// Message types
export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface TransformedMessage {
  id: number;
  sender: string;
  content: string;
  time: string;
  isMine: boolean;
}

// Friend request types
export interface FriendRequest {
  id: string;
  from: string;
  fromName: string;
  fromAvatar?: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: number;
  fromUser?: User;
}

// Discover user types
export interface DiscoverUser {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline';
  role?: string;
  verified: boolean;
  isPending: boolean;
}

// Friend types
export interface Friend {
  chatRoomId: string;
  addedAt: number;
}

// Chat room types
export interface LastMessage {
  senderId: string;
  text: string;
  timestamp: number;
}

export interface ChatRoom {
  participants: Record<string, boolean>;
  createdAt: number;
  lastMessage: LastMessage | null;
}