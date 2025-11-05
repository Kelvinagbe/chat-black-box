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

        {/* Full-Width Profile Image Section */}
        <div 
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            background: '#000',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          {/* Profile Image */}
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: '120px',
            fontWeight: 'bold',
            color: '#fff',
          }}>
            {chat.avatar}
          </div>
          
          {/* Bottom Overlay with Name */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
            padding: '60px 20px 20px',
          }}>
            <h2 style={{
              color: '#fff',
              margin: 0,
              fontSize: '24px',
              fontWeight: '500',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}>{chat.name}</h2>
            {chat.phone && (
              <p style={{
                color: '#e5e5e5',
                margin: '4px 0 0 0',
                fontSize: '14px',
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              }}>{chat.phone}</p>
            )}
          </div>

          {/* Action Icons Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            gap: '12px',
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMessageClick?.();
                onClose();
              }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: primaryColor,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <MessageCircle size={22} color="#000" />
            </button>
            
            <button
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Info size={22} color="#fff" />
            </button>
          </div>
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
        </div>
      </div>
    </div>
  );
}