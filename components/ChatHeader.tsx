'use client'

import React from 'react';
import { Chat } from '@/types/chat';
import VerifiedBadge from './VerifiedBadge';

interface ChatHeaderProps {
  chat: Chat;
  isMobile: boolean;
  onBack: () => void;
  accentColor: string;
  primaryColor: string;
}

export default function ChatHeader({ 
  chat, 
  isMobile, 
  onBack, 
  accentColor, 
  primaryColor 
}: ChatHeaderProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '15px 20px',
      borderBottom: '1px solid #1a1a1a',
      background: '#0a0a0a',
      gap: '12px',
    }}>
      {isMobile && (
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: accentColor,
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      )}

      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        fontWeight: 'bold',
        fontSize: '16px',
        flexShrink: 0,
        background: chat.avatar ? 'transparent' : 'linear-gradient(135deg, #fff, #cccccc)',
        overflow: 'hidden',
        position: 'relative',
      }}>
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
            bottom: '0px',
            right: '0px',
            width: '12px',
            height: '12px',
            background: primaryColor,
            border: '2px solid #0a0a0a',
            borderRadius: '50%',
          }} />
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          marginBottom: '2px',
        }}>
          <span style={{
            color: accentColor,
            fontWeight: '600',
            fontSize: '16px',
          }}>
            {chat.name}
          </span>
          {chat.verified && <VerifiedBadge size={16} />}
        </div>
        <div style={{
          color: chat.status === 'online' ? primaryColor : '#666',
          fontSize: '13px',
        }}>
          {chat.status === 'online' ? 'Active now' : 'Offline'}
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: accentColor,
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </button>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: accentColor,
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="5" r="1"/>
            <circle cx="12" cy="19" r="1"/>
          </svg>
        </button>
      </div>
    </div>
  );
}