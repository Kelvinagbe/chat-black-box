
// ============= profile/page.tsx =============
'use client'

import React from 'react';
import { Settings, Bell, Lock, HelpCircle, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const menuItems = [
    { icon: Settings, label: 'Settings', description: 'Manage your account settings' },
    { icon: Bell, label: 'Notifications', description: 'Configure notification preferences' },
    { icon: Lock, label: 'Privacy', description: 'Control your privacy settings' },
    { icon: HelpCircle, label: 'Help & Support', description: 'Get help with BlackBox' },
    { icon: LogOut, label: 'Logout', description: 'Sign out of your account', danger: true },
  ];

  return (
    <div style={{
      flex: 1,
      background: '#050505',
      color: '#fff',
      overflowY: 'auto',
    }}>
      <div style={{
        background: '#0f0f0f',
        borderBottom: '1px solid #1a1a1a',
        padding: '40px 20px',
        textAlign: 'center',
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00ff7f, #00cc66)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000',
          fontWeight: 'bold',
          fontSize: '36px',
          margin: '0 auto 15px',
        }}>
          YO
        </div>
        <h2 style={{
          fontSize: '22px',
          fontWeight: 'bold',
          marginBottom: '5px',
        }}>Your Name</h2>
        <p style={{
          color: '#999',
          fontSize: '14px',
        }}>@yourhandle</p>
      </div>

      <div style={{
        padding: '20px',
      }}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            style={{
              background: '#0f0f0f',
              border: '1px solid #1a1a1a',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1a1a1a'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#0f0f0f'}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: item.danger ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 127, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <item.icon size={20} color={item.danger ? '#ff4444' : '#00ff7f'} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '3px',
                color: item.danger ? '#ff4444' : '#fff',
              }}>{item.label}</div>
              <div style={{
                fontSize: '13px',
                color: '#999',
              }}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}