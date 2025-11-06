'use client'

import React, { useState } from 'react';
import VerifiedBadge from './VerifiedBadge';
import ProfileModal from './ProfileModal';
import { Chat } from '@/types/chat';

interface ChatListItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: () => void;
  primaryColor: string;
}

export default function ChatListItem({ chat, isSelected, onSelect, primaryColor }: ChatListItemProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleAvatarClick = (e: React.MouseEvent) => { 
    e.stopPropagation(); 
    setIsProfileOpen(true); 
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const diff = Date.now() - date.getTime();
    if (diff < 60000) return 'Now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <>
      <div 
        onClick={onSelect} 
        style={{ 
          display: 'flex', 
          padding: '15px 20px', 
          cursor: 'pointer', 
          transition: 'all 0.2s', 
          gap: '12px', 
          background: isSelected ? 'rgba(0, 255, 127, 0.1)' : 'transparent', 
          borderLeft: isSelected ? `3px solid ${primaryColor}` : '3px solid transparent',
          minWidth: 0,
          width: '100%',
        }}
      >
        <div 
          onClick={handleAvatarClick} 
          style={{ 
            width: '50px', 
            height: '50px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#000', 
            fontWeight: 'bold', 
            fontSize: '16px', 
            flexShrink: 0, 
            background: chat.avatar ? 'transparent' : 'linear-gradient(135deg, #fff, #cccccc)', 
            cursor: 'pointer', 
            transition: 'transform 0.2s, box-shadow 0.2s', 
            overflow: 'hidden', 
            position: 'relative' 
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
          {chat.avatar ? (
            <img 
              src={chat.avatar} 
              alt={chat.name} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }} 
            />
          ) : (
            chat.name.substring(0, 2).toUpperCase()
          )}
          {chat.status === 'online' && (
            <div style={{ 
              position: 'absolute', 
              bottom: '2px', 
              right: '2px', 
              width: '12px', 
              height: '12px', 
              background: primaryColor, 
              border: '2px solid #0a0a0a', 
              borderRadius: '50%' 
            }} />
          )}
        </div>

        <div style={{ 
          flex: 1, 
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '4px',
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: '8px',
            minWidth: 0,
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px', 
              minWidth: 0,
              flex: 1,
            }}>
              <span style={{ 
                color: '#fff', 
                fontWeight: '600', 
                fontSize: '15px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {chat.name}
              </span>
              {chat.verified && (
                <div style={{ flexShrink: 0 }}>
                  <VerifiedBadge size={16} />
                </div>
              )}
            </div>
            <span style={{ 
              color: '#666', 
              fontSize: '12px',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}>
              {formatTime(chat.lastMessageTime)}
            </span>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: '8px',
            minWidth: 0,
          }}>
            <span style={{ 
              color: '#999', 
              fontSize: '14px', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap',
              flex: 1,
              minWidth: 0,
            }}>
              {chat.lastMessageSenderId ? (
                chat.lastMessageSenderId === chat.id 
                  ? chat.lastMessage 
                  : `You: ${chat.lastMessage}`
              ) : (
                chat.lastMessage
              )}
            </span>
            {chat.unread > 0 && (
              <span style={{ 
                background: primaryColor, 
                color: '#000', 
                borderRadius: '12px', 
                padding: '3px 8px', 
                fontSize: '11px', 
                fontWeight: 'bold', 
                minWidth: '20px', 
                textAlign: 'center',
                flexShrink: 0,
              }}>
                {chat.unread > 99 ? '99+' : chat.unread}
              </span>
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
    </>
  );
}