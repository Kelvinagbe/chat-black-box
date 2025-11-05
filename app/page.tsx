// ============= app/page.tsx (Main Component) =============
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatSidebar from '@/components/ChatSidebar';
import ChatHeader from '@/components/ChatHeader';
import MessageBubble from '@/components/MessageBubble';
import MessageInput from '@/components/MessageInput';
import SplashScreen from '@/components/SplashScreen';
import NewChatButton from '@/components/NewChatButton'; // Add this import

export default function BlackBoxChat() {
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showChatView, setShowChatView] = useState(false);
  const [activeTab, setActiveTab] = useState('chats');
  const [showSplash, setShowSplash] = useState(true);
  const [chatList, setChatList] = useState([ // Changed from const to state
    { id: 1, name: 'Dev Team', lastMessage: 'Push to production?', time: '10:30', unread: 2, avatar: 'DT', verified: true, about: 'Development team chat', phone: '+1 234 567 8900' },
    { id: 2, name: 'Sarah Chen', lastMessage: 'Code review done ✓', time: '09:15', unread: 0, avatar: 'SC', verified: true, about: 'Senior Developer', phone: '+1 234 567 8901' },
    { id: 3, name: 'Project Alpha', lastMessage: 'Meeting at 3pm', time: 'Yesterday', unread: 5, avatar: 'PA', verified: false, about: 'Project management', phone: '+1 234 567 8902' },
    { id: 4, name: 'John Doe', lastMessage: 'Thanks for the help!', time: 'Yesterday', unread: 0, avatar: 'JD', verified: false, about: 'Available', phone: '+1 234 567 8903' },
    { id: 5, name: 'Bug Hunters', lastMessage: 'Found critical issue', time: 'Friday', unread: 1, avatar: 'BH', verified: true, about: 'Bug tracking team', phone: '+1 234 567 8904' },
  ]);

  const primaryColor = '#00ff7f';
  const accentColor = '#fff';

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowChatView(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
      setShowChatView(true);
    }
  };

  const handleBackToList = () => {
    setShowChatView(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'requests') {
      router.push('/request');
    } else if (tab === 'profile') {
      router.push('/profile');
    } else {
      setShowChatView(false);
    }
  };

  // Add this function to handle new chat creation
  const handleAddNewChat = (user: any) => {
    // Check if user already exists in chat list
    const existingChat = chatList.find(chat => chat.id === user.id);
    
    if (existingChat) {
      // If user exists, just select that chat
      const chatIndex = chatList.findIndex(chat => chat.id === user.id);
      handleChatSelect(chatIndex);
    } else {
      // Add new user to chat list
      const newChat = {
        ...user,
        lastMessage: 'Start a conversation',
        time: 'Now',
        unread: 0,
      };
      
      setChatList([newChat, ...chatList]);
      
      // Select the newly added chat (index 0 since we added it at the beginning)
      setSelectedChat(0);
      if (isMobile) {
        setShowChatView(true);
      }
    }
  };

  const renderMainContent = () => {
    // Chat view - main chat interface
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#050505',
        minWidth: 0,
      }}>
        <div style={{
          display: isMobile && !showChatView ? 'none' : 'block',
        }}>
          <ChatHeader
            chat={chatList[selectedChat]}
            isMobile={isMobile}
            onBack={handleBackToList}
            accentColor={accentColor}
            primaryColor={primaryColor}
          />
        </div>

        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: isMobile && !showChatView ? 'none' : 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} primaryColor={primaryColor} />
          ))}
        </div>

        <div style={{
          display: isMobile && !showChatView ? 'none' : 'block',
        }}>
          <MessageInput
            message={message}
            onMessageChange={setMessage}
            onSend={handleSendMessage}
            accentColor={accentColor}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Splash Screen Overlay */}
      {showSplash && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
        }}>
          <SplashScreen />
        </div>
      )}

      {/* Main Chat Application */}
      <div style={{
        display: 'flex',
        height: '100vh',
        background: '#000',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        overflow: 'hidden',
        position: 'relative',
        opacity: showSplash ? 0 : 1,
        transition: 'opacity 0.5s ease-in',
      }}>
        <ChatSidebar
          chats={chatList} // Changed from chats to chatList
          selectedChat={selectedChat}
          onChatSelect={handleChatSelect}
          isMobile={isMobile}
          showChatView={showChatView}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          primaryColor={primaryColor}
          accentColor={accentColor}
        />
        {renderMainContent()}
        
        {/* Add NewChatButton - only show when on chats tab and not in chat view on mobile */}
        {activeTab === 'chats' && (!isMobile || !showChatView) && (
          <NewChatButton
            primaryColor={primaryColor}
            onSelectUser={handleAddNewChat}
          />
        )}
      </div>
    </>
  );
}