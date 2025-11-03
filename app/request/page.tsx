'use client'

import React, { useState, useEffect } from 'react';
import { UserPlus, Clock } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function RequestsPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const requests = [
    { id: 1, name: 'Alex Johnson', avatar: 'AJ', time: '2 hours ago', mutualFriends: 5 },
    { id: 2, name: 'Maria Garcia', avatar: 'MG', time: '5 hours ago', mutualFriends: 12 },
    { id: 3, name: 'David Kim', avatar: 'DK', time: '1 day ago', mutualFriends: 3 },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#000',
    }}>
      <div style={{
        flex: 1,
        background: '#050505',
        color: '#fff',
        padding: '20px',
        overflowY: 'auto',
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#00ff7f',
        }}>Friend Requests</h1>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}>
          {requests.map((request) => (
            <div key={request.id} style={{
              background: '#0f0f0f',
              border: '1px solid #1a1a1a',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fff, #cccccc)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontWeight: 'bold',
                fontSize: '20px',
                flexShrink: 0,
              }}>
                {request.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '5px',
                }}>{request.name}</div>
                <div style={{
                  fontSize: '13px',
                  color: '#999',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}>
                  <Clock size={14} />
                  {request.time} • {request.mutualFriends} mutual friends
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: '10px',
                flexDirection: isMobile ? 'column' : 'row',
              }}>
                <button style={{
                  background: '#00ff7f',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}>Accept</button>
                <button style={{
                  background: '#1a1a1a',
                  color: '#fff',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}>Decline</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isMobile && <BottomNav activeTab="requests" primaryColor="#00ff7f" />}
    </div>
  );
}