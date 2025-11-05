import React from 'react';
import { X, MessageCircle, Phone, Video, Info } from 'lucide-react';

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
        background: '#000',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#111',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          background: '#1f1f1f',
        }}>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8696a0',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              marginRight: '20px',
            }}
          >
            <X size={24} />
          </button>
          <h3 style={{
            color: '#e9edef',
            margin: 0,
            fontSize: '19px',
            fontWeight: '400',
          }}>Contact info</h3>
        </div>

        {/* Scrollable Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          background: '#111',
        }}>
          {/* Profile Image Section */}
          <div 
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              background: '#000',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Profile Image */}
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '140px',
              fontWeight: '400',
              color: '#fff',
            }}>
              {chat.avatar}
            </div>
          </div>

          {/* Name and Phone Section */}
          <div style={{
            background: '#111',
            padding: '24px 30px',
            borderBottom: '1px solid #222',
          }}>
            <h2 style={{
              color: '#e9edef',
              margin: '0 0 4px 0',
              fontSize: '24px',
              fontWeight: '400',
            }}>{chat.name}</h2>
            {chat.phone && (
              <p style={{
                color: '#8696a0',
                margin: 0,
                fontSize: '17px',
              }}>{chat.phone}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            padding: '8px 0',
            background: '#111',
            borderBottom: '1px solid #222',
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMessageClick?.();
                onClose();
              }}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: primaryColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <MessageCircle size={24} color="#111" fill="#111" />
              </div>
              <span style={{
                color: '#8696a0',
                fontSize: '13px',
              }}>Message</span>
            </button>

            <button
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: primaryColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Phone size={24} color="#111" />
              </div>
              <span style={{
                color: '#8696a0',
                fontSize: '13px',
              }}>Audio</span>
            </button>

            <button
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: primaryColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Video size={24} color="#111" />
              </div>
              <span style={{
                color: '#8696a0',
                fontSize: '13px',
              }}>Video</span>
            </button>
          </div>

          {/* About Section */}
          {chat.about && (
            <div style={{
              background: '#111',
              padding: '20px 30px',
              borderBottom: '1px solid #222',
            }}>
              <p style={{
                color: '#00a884',
                fontSize: '14px',
                margin: '0 0 8px 0',
              }}>About</p>
              <p style={{
                color: '#e9edef',
                margin: 0,
                fontSize: '17px',
                lineHeight: '22px',
              }}>{chat.about}</p>
            </div>
          )}

          {/* Media, links and docs */}
          <div style={{
            background: '#111',
            padding: '20px 30px',
            borderBottom: '1px solid #222',
            cursor: 'pointer',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <p style={{
                  color: '#e9edef',
                  fontSize: '17px',
                  margin: '0 0 2px 0',
                }}>Media, links and docs</p>
                <p style={{
                  color: '#8696a0',
                  fontSize: '15px',
                  margin: 0,
                }}>None</p>
              </div>
              <div style={{
                color: '#8696a0',
                fontSize: '20px',
              }}>›</div>
            </div>
          </div>

          {/* Encryption Notice */}
          <div style={{
            background: '#111',
            padding: '20px 30px',
            textAlign: 'center',
          }}>
            <p style={{
              color: '#8696a0',
              fontSize: '14px',
              margin: 0,
              lineHeight: '20px',
            }}>
              🔒 Your personal messages are end-to-end encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}