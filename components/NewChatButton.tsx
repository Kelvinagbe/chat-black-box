import React, { useState } from 'react';
import { X, Search, MessageCircle, Plus, ArrowLeft } from 'lucide-react';

interface NewChatButtonProps {
  primaryColor: string;
  onSelectUser: (user: any) => void;
}

export default function NewChatButton({ primaryColor, onSelectUser }: NewChatButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample users to chat with
  const availableUsers = [
    { id: 101, name: 'Alice Johnson', avatar: '👩', phone: '+1 234 567 8901', about: 'Hey there! I am using WhatsApp.', verified: false, lastMessage: '', time: '', unread: 0 },
    { id: 102, name: 'Bob Smith', avatar: '👨', phone: '+1 234 567 8902', about: 'Available', verified: true, lastMessage: '', time: '', unread: 0 },
    { id: 103, name: 'Carol White', avatar: '👱‍♀️', phone: '+1 234 567 8903', about: 'Busy', verified: false, lastMessage: '', time: '', unread: 0 },
    { id: 104, name: 'David Brown', avatar: '🧔', phone: '+1 234 567 8904', about: 'At work', verified: false, lastMessage: '', time: '', unread: 0 },
    { id: 105, name: 'Emma Davis', avatar: '👩‍🦰', phone: '+1 234 567 8905', about: 'Sleeping...', verified: true, lastMessage: '', time: '', unread: 0 },
    { id: 106, name: 'Frank Miller', avatar: '👴', phone: '+1 234 567 8906', about: 'Hey there!', verified: false, lastMessage: '', time: '', unread: 0 },
    { id: 107, name: 'Grace Lee', avatar: '👩‍💼', phone: '+1 234 567 8907', about: 'In a meeting', verified: true, lastMessage: '', time: '', unread: 0 },
    { id: 108, name: 'Henry Wilson', avatar: '👨‍🎓', phone: '+1 234 567 8908', about: 'Studying', verified: false, lastMessage: '', time: '', unread: 0 },
  ];

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );

  const handleUserSelect = (user: any) => {
    onSelectUser(user);
    setIsModalOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: primaryColor,
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          zIndex: 50,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
        }}
      >
        <Plus size={24} color="#000" strokeWidth={2.5} />
      </button>

      {/* Full Page Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#111',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            background: '#1f1f1f',
            gap: '20px',
          }}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#8696a0',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ArrowLeft size={24} />
            </button>
            <h3 style={{
              color: '#e9edef',
              margin: 0,
              fontSize: '19px',
              fontWeight: '400',
              flex: 1,
            }}>Select contact</h3>
            <button
              style={{
                background: 'transparent',
                border: 'none',
                color: '#8696a0',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Search size={22} />
            </button>
          </div>

          {/* Search Bar */}
          <div style={{
            padding: '12px 16px',
            background: '#111',
            borderBottom: '1px solid #222',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#1f1f1f',
              borderRadius: '8px',
              padding: '10px 12px',
              gap: '10px',
            }}>
              <Search size={20} color="#8696a0" />
              <input
                type="text"
                placeholder="Search name or number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#e9edef',
                  fontSize: '15px',
                }}
              />
            </div>
          </div>

          {/* New Contact Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '16px 20px',
              borderBottom: '1px solid #222',
              cursor: 'pointer',
              transition: 'background 0.2s',
              background: '#111',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1f1f1f'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#111'}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#1f1f1f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Plus size={24} color={primaryColor} strokeWidth={2.5} />
            </div>
            <span style={{
              color: '#e9edef',
              fontSize: '17px',
            }}>New contact</span>
          </div>

          {/* Contacts on WhatsApp Label */}
          <div style={{
            padding: '12px 20px',
            background: '#111',
          }}>
            <span style={{
              color: '#8696a0',
              fontSize: '14px',
            }}>Contacts on WhatsApp</span>
          </div>

          {/* Contact List */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            background: '#111',
          }}>
            {filteredUsers.length === 0 ? (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: '#8696a0',
              }}>
                No contacts found
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '12px 20px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    borderBottom: '1px solid #1a1a1a',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1f1f1f'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    flexShrink: 0,
                  }}>
                    {user.avatar}
                  </div>
                  <div style={{
                    flex: 1,
                    minWidth: 0,
                  }}>
                    <div style={{
                      color: '#e9edef',
                      fontSize: '17px',
                      fontWeight: '400',
                      marginBottom: '2px',
                    }}>
                      {user.name}
                    </div>
                    <div style={{
                      color: '#8696a0',
                      fontSize: '15px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {user.about}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}