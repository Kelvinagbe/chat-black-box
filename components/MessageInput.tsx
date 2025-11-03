

// ============= components/MessageInput.tsx =============
'use client'

import React from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

interface MessageInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSend: () => void;
  accentColor: string;
}

export default function MessageInput({ message, onMessageChange, onSend, accentColor }: MessageInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div style={{
      padding: '15px 20px',
      background: '#0f0f0f',
      borderTop: '1px solid #1a1a1a',
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
    }}>
      <button style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <Paperclip size={20} color={accentColor} />
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        style={{
          flex: 1,
          padding: '12px 15px',
          background: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: '25px',
          color: '#fff',
          fontSize: '14px',
          outline: 'none',
          minWidth: 0,
        }}
      />
      <button style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <Smile size={20} color={accentColor} />
      </button>
      <button
        onClick={onSend}
        style={{
          background: accentColor,
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          flexShrink: 0,
        }}
      >
        <Send size={20} color="#000" />
      </button>
    </div>
  );
}