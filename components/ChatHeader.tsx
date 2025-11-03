// ============= components/ChatHeader.tsx =============
'use client'

import React from 'react';
import { Search, MoreVertical, X } from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  verified: boolean;
}

interface ChatHeaderProps {
  chat: Chat;
  isMobile: boolean;
  onBack: () => void;
  accentColor: string;
  primaryColor: string;
}

export default function ChatHeader({ chat, isMobile, onBack, accentColor, primaryColor }: ChatHeaderProps) {
  return (
    <div style={{
      padding: '15px 20px',
      background: '#0f0f0f',
      borderBottom: '1px solid #1a1a1a',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        minWidth: 0,
        flex: 1,
      }}>
        {isMobile && (
          <button
            onClick={onBack}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              color: accentColor,
            }}
          >
            <X size={24} />
          </button>
        )}
        <div style={{
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
        }}>
          {chat.avatar}
        </div>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            minWidth: 0,
          }}>
            <div style={{
              color: '#fff',
              fontWeight: '600',
              fontSize: '16px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>{chat.name}</div>
            {chat.verified && <VerifiedBadge size={18} />}
          </div>
          <div style={{
            fontSize: '12px',
            color: primaryColor,
          }}>online</div>
        </div>
      </div>
      <div style={{
        display: 'flex',
        gap: '15px',
      }}>
        <Search size={20} color={accentColor} style={{ cursor: 'pointer' }} />
        <MoreVertical size={20} color={accentColor} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
}