'use client'

import React from 'react';
import { MoreVertical, MessageSquare, Users, User } from 'lucide-react';
import ChatListItem from './ChatListItem';
import NewChatButton from './NewChatButton';
import { Chat } from '@/types/chat';

interface ChatSidebarProps {
  chats: Chat[];
  selectedChat: number | null;
  onChatSelect: (index: number) => void;
  isMobile: boolean;
  showChatView: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  primaryColor: string;
  accentColor: string;
  onAddNewChat?: (user: any) => void;
  discoverUsers?: any[];
  friendRequests?: any[];
  onSendFriendRequest?: (userId: string) => Promise<void>;
  onAcceptRequest?: (requestId: string, fromUserId: string) => Promise<void>;
  onRejectRequest?: (requestId: string) => Promise<void>;
}

const TabButton = ({ active, icon: Icon, label, onClick, primaryColor }: any) => (
  <button onClick={onClick} style={{ background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer', padding: '8px 20px', transition: 'color 0.2s', color: active ? primaryColor : '#666' }}>
    <Icon size={24} />
    <span style={{ fontSize: '11px', fontWeight: '500' }}>{label}</span>
  </button>
);

export default function ChatSidebar({ chats, selectedChat, onChatSelect, isMobile, showChatView, activeTab, onTabChange, primaryColor, accentColor, onAddNewChat }: ChatSidebarProps) {
  return (
    <div style={{ width: isMobile ? '100vw' : '350px', maxWidth: '100vw', background: '#0a0a0a', borderRight: '1px solid #1a1a1a', display: isMobile && showChatView ? 'none' : 'flex', flexDirection: 'column', zIndex: 10, position: isMobile ? 'relative' : 'static' }}>
      {/* Header */}
      <div style={{ padding: '15px 20px', background: '#0f0f0f', borderBottom: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
          <span style={{ color: '#b1b2be' }}>Black</span>
          <span style={{ color: primaryColor }}>Box</span>
        </h2>
        <MoreVertical size={20} color={accentColor} style={{ cursor: 'pointer' }} />
      </div>

      {/* Chat List */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
        {chats.map((chat, index) => (
          <ChatListItem key={chat.id} chat={chat} isSelected={selectedChat === index} onSelect={() => onChatSelect(index)} primaryColor={primaryColor} />
        ))}
      </div>

      {/* New Chat Button */}
      {onAddNewChat && <NewChatButton primaryColor={primaryColor} onSelectUser={onAddNewChat} />}

      {/* Mobile Navigation */}
      {isMobile && (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 0', background: '#0f0f0f', borderTop: '1px solid #1a1a1a' }}>
          <TabButton active={activeTab === 'chats'} icon={MessageSquare} label="Chats" onClick={() => onTabChange('chats')} primaryColor={primaryColor} />
          <TabButton active={activeTab === 'requests'} icon={Users} label="Requests" onClick={() => onTabChange('requests')} primaryColor={primaryColor} />
          <TabButton active={activeTab === 'profile'} icon={User} label="Profile" onClick={() => onTabChange('profile')} primaryColor={primaryColor} />
        </div>
      )}
    </div>
  );
}