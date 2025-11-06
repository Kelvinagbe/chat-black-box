// ============= components/MessageBubble.tsx =============
'use client'

import React from 'react';

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isMine: boolean;
}

interface MessageBubbleProps {
  message: Message;
  primaryColor: string;
}

export default function MessageBubble({ message, primaryColor }: MessageBubbleProps) {
  return (
    <div style={{
      display: 'flex',
      width: '100%',
      justifyContent: message.isMine ? 'flex-end' : 'flex-start',
    }}>
      <div style={{
        maxWidth: '70%',
        minWidth: '120px',
        padding: '10px 15px',
        fontSize: '14px',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        background: message.isMine ? '#fff' : '#1a1a1a',
        color: message.isMine ? '#000' : '#fff',
        borderRadius: message.isMine ? '12px 12px 0 12px' : '12px 12px 12px 0',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      }}>
        {!message.isMine && (
          <div style={{
            fontSize: '12px',
            fontWeight: '600',
            marginBottom: '5px',
            color: primaryColor,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>{message.sender}</div>
        )}
        <div style={{
          marginBottom: '4px',
        }}>{message.content}</div>
        <div style={{
          fontSize: '10px',
          marginTop: '5px',
          textAlign: 'right',
          color: message.isMine ? '#666' : '#888',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}>{message.time}</div>
      </div>
    </div>
  );
}