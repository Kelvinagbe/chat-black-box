'use client' 

import React, { useState, useEffect } from 'react';
import { Send, Search, MoreVertical, Paperclip, Smile, Menu, X } from 'lucide-react';

export default function BlackBoxChat() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const chats = [
    { id: 1, name: 'Dev Team', lastMessage: 'Push to production?', time: '10:30', unread: 2, avatar: 'DT' },
    { id: 2, name: 'Sarah Chen', lastMessage: 'Code review done ✓', time: '09:15', unread: 0, avatar: 'SC' },
    { id: 3, name: 'Project Alpha', lastMessage: 'Meeting at 3pm', time: 'Yesterday', unread: 5, avatar: 'PA' },
    { id: 4, name: 'John Doe', lastMessage: 'Thanks for the help!', time: 'Yesterday', unread: 0, avatar: 'JD' },
    { id: 5, name: 'Bug Hunters', lastMessage: 'Found critical issue', time: 'Friday', unread: 1, avatar: 'BH' },
  ];

  const messages = [
    { id: 1, sender: 'Sarah Chen', content: 'Hey team! How are things going?', time: '09:00', isMine: false },
    { id: 2, sender: 'You', content: 'Working on the new feature', time: '09:05', isMine: true },
    { id: 3, sender: 'Sarah Chen', content: 'Awesome! Need any help?', time: '09:06', isMine: false },
    { id: 4, sender: 'You', content: 'All good, thanks! Should be done by EOD', time: '09:10', isMine: true },
    { id: 5, sender: 'Sarah Chen', content: 'Perfect! Let me know if you need anything', time: '09:15', isMine: false },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  const handleChatSelect = (index: number) => {
    setSelectedChat(index);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          style={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div style={{
        ...styles.sidebar,
        ...(isMobile ? styles.sidebarMobile : {}),
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}>
        {/* Sidebar Header */}
        <div style={styles.sidebarHeader}>
          <h2 style={styles.logo}>
            <span style={styles.logoBlack}>Black</span>
            <span style={styles.logoBox}>Box</span>
          </h2>
          <div style={styles.headerIcons}>
            <Search size={20} color="#00ff7f" style={styles.icon} />
            <MoreVertical size={20} color="#00ff7f" style={styles.icon} />
          </div>
        </div>

        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <Search size={16} color="#666" style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search chats..."
            style={styles.searchInput}
          />
        </div>

        {/* Chat List */}
        <div style={styles.chatList}>
          {chats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(index)}
              style={{
                ...styles.chatItem,
                background: selectedChat === index ? 'rgba(0, 255, 127, 0.1)' : 'transparent',
                borderLeft: selectedChat === index ? '3px solid #00ff7f' : '3px solid transparent',
              }}
            >
              <div style={styles.avatar}>{chat.avatar}</div>
              <div style={styles.chatInfo}>
                <div style={styles.chatHeader}>
                  <span style={styles.chatName}>{chat.name}</span>
                  <span style={styles.chatTime}>{chat.time}</span>
                </div>
                <div style={styles.chatFooter}>
                  <span style={styles.lastMessage}>{chat.lastMessage}</span>
                  {chat.unread > 0 && (
                    <span style={styles.unreadBadge}>{chat.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={styles.mainArea}>
        {/* Chat Header */}
        <div style={styles.chatHeaderArea}>
          <div style={styles.chatHeaderLeft}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={styles.menuButton}
            >
              {sidebarOpen && !isMobile ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div style={styles.avatar}>{chats[selectedChat].avatar}</div>
            <div>
              <div style={styles.activeChatName}>{chats[selectedChat].name}</div>
              <div style={styles.onlineStatus}>online</div>
            </div>
          </div>
          <div style={styles.headerIcons}>
            <Search size={20} color="#00ff7f" style={styles.icon} />
            <MoreVertical size={20} color="#00ff7f" style={styles.icon} />
          </div>
        </div>

        {/* Messages Area */}
        <div style={styles.messagesArea}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                ...styles.messageWrapper,
                justifyContent: msg.isMine ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  ...styles.messageBubble,
                  background: msg.isMine ? '#00ff7f' : '#1a1a1a',
                  color: msg.isMine ? '#000' : '#fff',
                  borderRadius: msg.isMine ? '12px 12px 0 12px' : '12px 12px 12px 0',
                }}
              >
                {!msg.isMine && (
                  <div style={styles.senderName}>{msg.sender}</div>
                )}
                <div>{msg.content}</div>
                <div style={{
                  ...styles.messageTime,
                  color: msg.isMine ? '#000' : '#666',
                }}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div style={styles.inputArea}>
          <button style={styles.attachButton}>
            <Paperclip size={20} color="#00ff7f" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            style={styles.messageInput}
          />
          <button style={styles.emojiButton}>
            <Smile size={20} color="#00ff7f" />
          </button>
          <button
            onClick={handleSendMessage}
            style={styles.sendButton}
          >
            <Send size={20} color="#000" />
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    background: '#000',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflow: 'hidden',
    position: 'relative' as 'relative',
  },
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 9,
  },
  sidebar: {
    width: '350px',
    maxWidth: '100vw',
    background: '#0a0a0a',
    borderRight: '1px solid #1a1a1a',
    display: 'flex',
    flexDirection: 'column' as 'column',
    transition: 'transform 0.3s ease',
    zIndex: 10,
  },
  sidebarMobile: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '85vw',
    maxWidth: '350px',
  },
  sidebarHeader: {
    padding: '15px 20px',
    background: '#0f0f0f',
    borderBottom: '1px solid #1a1a1a',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
  },
  logoBlack: {
    color: '#b1b2be',
  },
  logoBox: {
    color: '#00ff7f',
  },
  headerIcons: {
    display: 'flex',
    gap: '15px',
  },
  icon: {
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  searchContainer: {
    padding: '15px',
    background: '#0f0f0f',
    borderBottom: '1px solid #1a1a1a',
    position: 'relative' as 'relative',
  },
  searchIcon: {
    position: 'absolute' as 'absolute',
    left: '30px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  searchInput: {
    width: '100%',
    padding: '10px 10px 10px 40px',
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
  },
  chatList: {
    flex: 1,
    overflowY: 'auto' as 'auto',
  },
  chatItem: {
    display: 'flex',
    padding: '15px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    gap: '12px',
  },
  avatar: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00ff7f, #00cc66)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '16px',
    flexShrink: 0,
  },
  chatInfo: {
    flex: 1,
    minWidth: 0,
  },
  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
  },
  chatName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: '15px',
  },
  chatTime: {
    color: '#666',
    fontSize: '12px',
  },
  chatFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    color: '#999',
    fontSize: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as 'nowrap',
  },
  unreadBadge: {
    background: '#00ff7f',
    color: '#000',
    borderRadius: '12px',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: 'bold',
    minWidth: '20px',
    textAlign: 'center' as 'center',
  },
  mainArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as 'column',
    background: '#050505',
    minWidth: 0,
  },
  chatHeaderArea: {
    padding: '15px 20px',
    background: '#0f0f0f',
    borderBottom: '1px solid #1a1a1a',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    minWidth: 0,
    flex: 1,
  },
  menuButton: {
    background: 'transparent',
    border: 'none',
    color: '#00ff7f',
    cursor: 'pointer',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  activeChatName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as 'nowrap',
  },
  onlineStatus: {
    color: '#00ff7f',
    fontSize: '12px',
  },
  messagesArea: {
    flex: 1,
    overflowY: 'auto' as 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '10px',
  },
  messageWrapper: {
    display: 'flex',
    width: '100%',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: '10px 15px',
    fontSize: '14px',
    wordWrap: 'break-word' as 'break-word',
  },
  senderName: {
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '5px',
    color: '#00ff7f',
  },
  messageTime: {
    fontSize: '10px',
    marginTop: '5px',
    textAlign: 'right' as 'right',
  },
  inputArea: {
    padding: '15px 20px',
    background: '#0f0f0f',
    borderTop: '1px solid #1a1a1a',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  attachButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  messageInput: {
    flex: 1,
    padding: '12px 15px',
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '25px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    minWidth: 0,
  },
  emojiButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  sendButton: {
    background: '#00ff7f',
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
  },
};