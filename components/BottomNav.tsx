// ============= components/BottomNav.tsx =============
'use client'

import React from 'react';
import { MessageSquare, Users, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BottomNavProps {
  activeTab: string;
  primaryColor: string;
}

export default function BottomNav({ activeTab, primaryColor }: BottomNavProps) {
  const router = useRouter();

  const handleNavigation = (tab: string) => {
    if (tab === 'chats') {
      router.push('/');
    } else if (tab === 'requests') {
      router.push('/request');
    } else if (tab === 'profile') {
      router.push('/profile');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '10px 0',
      background: '#0f0f0f',
      borderTop: '1px solid #1a1a1a',
    }}>
      <button
        onClick={() => handleNavigation('chats')}
        style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          cursor: 'pointer',
          padding: '8px 20px',
          transition: 'color 0.2s',
          color: activeTab === 'chats' ? primaryColor : '#666',
        }}
      >
        <MessageSquare size={24} />
        <span style={{
          fontSize: '11px',
          fontWeight: '500',
        }}>Chats</span>
      </button>
      <button
        onClick={() => handleNavigation('requests')}
        style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          cursor: 'pointer',
          padding: '8px 20px',
          transition: 'color 0.2s',
          color: activeTab === 'requests' ? primaryColor : '#666',
        }}
      >
        <Users size={24} />
        <span style={{
          fontSize: '11px',
          fontWeight: '500',
        }}>Requests</span>
      </button>
      <button
        onClick={() => handleNavigation('profile')}
        style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          cursor: 'pointer',
          padding: '8px 20px',
          transition: 'color 0.2s',
          color: activeTab === 'profile' ? primaryColor : '#666',
        }}
      >
        <User size={24} />
        <span style={{
          fontSize: '11px',
          fontWeight: '500',
        }}>Profile</span>
      </button>
    </div>
  );
}