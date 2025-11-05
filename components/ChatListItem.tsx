// ============= components/ChatListItem.tsx =============
'use client'

import React, { useState } from 'react';
import VerifiedBadge from './VerifiedBadge';
import ProfileModal from './ProfileModal';
import NewChatButton from './NewChatButton';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  verified: boolean;
  about?: string;
  phone?: string;
}

interface ChatListItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: () => void;
  primaryColor: string;
  showNewChatButton?: boolean;
  onAddNewChat?: (user: any) => void;
}

export default function ChatListItem({ 
  chat, 
  isSelected, 
  onSelect, 
  primaryColor,
  showNewChatButton = false,
  onAddNewChat
}: ChatListItemProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileOpen(true);
  };

  return (
    <>
      <div
        onClick={onSelect}
        style={{
          display: 'flex',
          padding: '15px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          gap: '12px',
          background: isSelected ? 'rgba(0, 255, 127, 0.1)' : 'transparent',
          borderLeft: isSelected ? `3px solid ${primaryColor}` : '3px solid transparent',
        }}
      >
        <div 
          onClick={handleAvatarClick}
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000',
            fontWeight: 'bold',
            fontSize: '16px',
            flexShrink: 0,
            background: 'linear-gradient(135deg, #fff, #cccccc)',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 255, 127, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {chat.avatar}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
            alignItems: 'center',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              minWidth: 0,
            }}>
              <span style={{
                color: '#fff',
                fontWeight: '600',
                fontSize: '15px',
              }}>{chat.name}</span>
              {chat.verified && <VerifiedBadge size={16} />}
            </div>
            <span style={{
              color: '#666',
              fontSize: '12px',
            }}>{chat.time}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              color: '#999',
              fontSize: '14px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>{chat.lastMessage}</span>
            {chat.unread > 0 && (
              <span style={{
                background: primaryColor,
                color: '#000',
                borderRadius: '12px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: 'bold',
                minWidth: '20px',
                textAlign: 'center',
              }}>{chat.unread}</span>
            )}
          </div>
        </div>
      </div>

      <ProfileModal
        chat={chat}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        primaryColor={primaryColor}
        onMessageClick={onSelect}
      />

      {/* Show NewChatButton only on the last item */}
      {showNewChatButton && onAddNewChat && (
        <NewChatButton
          primaryColor={primaryColor}
          onSelectUser={onAddNewChat}
        />
      )}
    </>
  );
}