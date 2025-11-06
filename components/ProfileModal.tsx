'use client'

import React from 'react';
import { X, MessageCircle, Phone, Video, Mail } from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';
import { Chat } from '@/types/chat';

interface ProfileModalProps {
  chat: Chat;
  isOpen: boolean;
  onClose: () => void;
  primaryColor: string;
  onMessageClick: () => void;
}

const ActionButton = ({ icon: Icon, label, isPrimary, primaryColor, onClick }: any) => (
  <button onClick={onClick} style={{ background: isPrimary ? primaryColor : '#1a1a1a', border: 'none', borderRadius: '12px', padding: '15px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', transition: isPrimary ? 'opacity 0.2s' : 'background 0.2s' }} onMouseEnter={(e) => isPrimary ? e.currentTarget.style.opacity = '0.8' : e.currentTarget.style.background = '#2a2a2a'} onMouseLeave={(e) => isPrimary ? e.currentTarget.style.opacity = '1' : e.currentTarget.style.background = '#1a1a1a'}>
    <Icon size={20} color={isPrimary ? '#000' : primaryColor} />
    <span style={{ fontSize: '11px', color: isPrimary ? '#000' : primaryColor, fontWeight: '600' }}>{label}</span>
  </button>
);

export default function ProfileModal({ chat, isOpen, onClose, primaryColor, onMessageClick }: ProfileModalProps) {
  if (!isOpen) return null;

  const handleMessageClick = () => { onMessageClick(); onClose(); };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#0f0f0f', borderRadius: '16px', width: '100%', maxWidth: '400px', border: '1px solid #1a1a1a', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#fff' }}>Profile</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center', color: '#999', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>
            <X size={24} />
          </button>
        </div>

        {/* Profile Content */}
        <div style={{ padding: '30px 20px' }}>
          {/* Avatar Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: chat.avatar ? 'transparent' : 'linear-gradient(135deg, #fff, #cccccc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 'bold', color: '#000', marginBottom: '15px', overflow: 'hidden', position: 'relative' }}>
              {chat.avatar ? <img src={chat.avatar} alt={chat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : chat.name.substring(0, 2).toUpperCase()}
              {chat.status === 'online' && <div style={{ position: 'absolute', bottom: '5px', right: '5px', width: '20px', height: '20px', background: primaryColor, border: '3px solid #0f0f0f', borderRadius: '50%' }} />}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>{chat.name}</h2>
              {chat.verified && <VerifiedBadge size={20} />}
            </div>
            <div style={{ fontSize: '14px', color: chat.status === 'online' ? primaryColor : '#666', fontWeight: '500' }}>
              {chat.status === 'online' ? 'Online' : 'Offline'}
            </div>
          </div>

          {/* Role Section */}
          {chat.role && (
            <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '15px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Role</div>
              <div style={{ fontSize: '15px', color: '#fff' }}>{chat.role}</div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
            <ActionButton icon={MessageCircle} label="Message" isPrimary={true} primaryColor={primaryColor} onClick={handleMessageClick} />
            <ActionButton icon={Phone} label="Call" isPrimary={false} primaryColor={primaryColor} />
            <ActionButton icon={Video} label="Video" isPrimary={false} primaryColor={primaryColor} />
            <ActionButton icon={Mail} label="Mail" isPrimary={false} primaryColor={primaryColor} />
          </div>

          {/* About Section */}
          <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '20px' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>About</div>
            <div style={{ fontSize: '14px', color: '#999', lineHeight: '1.6' }}>{chat.role ? `${chat.role} • ` : ''}Member of BlackBox Chat</div>
          </div>
        </div>
      </div>
    </div>
  );
}