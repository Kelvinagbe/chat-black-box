// ============= components/ProfileModal.tsx =============
'use client'

import React from 'react';
import { X, MessageCircle, Info } from 'lucide-react';

interface ProfileModalProps {
  chat: {
    id: number;
    name: string;
    avatar: string;
    verified: boolean;
    about?: string;
    phone?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  primaryColor: string;
  onMessageClick?: () => void;
}

export default function ProfileModal({ 
  chat, 
  isOpen, 
  onClose, 
  primaryColor,
  onMessageClick 
}: ProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.2s ease-in-out',
      }}
      onClick={onClose}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { 
              transform: translateY(20px);
              opacity: 0;
            }
            to { 
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
      
      <div
        style={{
          background: '#1a1a1a',
          width: '90%',
          maxWidth: '400px',
          borderRadius: '12px',
          overflow: 'hidden',
          animation: 'slideUp 0.3s ease-out',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 20px',
          borderBottom: '1px solid #333',
        }}>
          <h3 style={{
            color: '#fff',
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
          }}>Contact Info</h3>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#999',
              cursor: 'pointer',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
          >
            <X size={24} />
          </button>
        </div>

        {/* Profile Picture Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 20px',
          background: '#0f0f0f',
        }}>
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #fff, #cccccc)',
            fontSize: '80px',
            fontWeight: 'bold',
            color: '#000',
            marginBottom: '20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}>
            {chat.avatar}
          </div>
          <h2 style={{
            color: '#fff',
            margin: 0,
            fontSize: '24px',
            fontWeight: '600',
          }}>{chat.name}</h2>
          {chat.phone && (
            <p style={{
              color: '#999',
              margin: '5px 0 0 0',
              fontSize: '14px',
            }}>{chat.phone}</p>
          )}
        </div>

        {/* Info Sections */}
        <div style={{ padding: '20px' }}>
          {/* About Section */}
          {chat.about && (
            <div style={{
              background: '#0f0f0f',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '15px',
            }}>
              <p style={{
                color: primaryColor,
                fontSize: '12px',
                margin: '0 0 8px 0',
                textTransform: 'uppercase',
                fontWeight: '600',
              }}>About</p>
              <p style={{
                color: '#fff',
                margin: 0,
                fontSize: '14px',
                lineHeight: '1.5',
              }}>{chat.about}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginTop: '20px',
          }}>
            <button
              onClick={() => {
                onMessageClick?.();
                onClose();
              }}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '15px',
                background: '#0f0f0f',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0f0f0f';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: primaryColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <MessageCircle size={20} color="#000" />
              </div>
              <span style={{
                color: '#fff',
                fontSize: '13px',
                fontWeight: '500',
              }}>Message</span>
            </button>

            <button
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '15px',
                background: '#0f0f0f',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0f0f0f';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Info size={20} color="#fff" />
              </div>
              <span style={{
                color: '#fff',
                fontSize: '13px',
                fontWeight: '500',
              }}>Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}