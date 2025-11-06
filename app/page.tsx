'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ChatSidebar from '@/components/ChatSidebar';
import ChatHeader from '@/components/ChatHeader';
import MessageBubble from '@/components/MessageBubble';
import MessageInput from '@/components/MessageInput';
import SplashScreen from '@/components/SplashScreen';
import Login from '@/components/Login';
import Onboarding from '@/components/Onboarding';

export default function BlackBoxChat() {
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showChatView, setShowChatView] = useState(false);
  const [activeTab, setActiveTab] = useState('chats');
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const primaryColor = '#00ff7f';
  const accentColor = '#fff';

  // Convert chats to state so we can add new ones
  const [chats, setChats] = useState([
    { id: 1, name: 'Dev Team', lastMessage: 'Push to production?', time: '10:30', unread: 2, avatar: 'DT', verified: true },
    { id: 2, name: 'Sarah Chen', lastMessage: 'Code review done ✓', time: '09:15', unread: 0, avatar: 'SC', verified: true },
    { id: 3, name: 'Project Alpha', lastMessage: 'Meeting at 3pm', time: 'Yesterday', unread: 5, avatar: 'PA', verified: false },
    { id: 4, name: 'John Doe', lastMessage: 'Thanks for the help!', time: 'Yesterday', unread: 0, avatar: 'JD', verified: false },
    { id: 5, name: 'Bug Hunters', lastMessage: 'Found critical issue', time: 'Friday', unread: 1, avatar: 'BH', verified: true },
  ]);

  // Check if user has seen splash screen before
  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (hasSeenSplash === 'true') {
      setShowSplash(false);
    }
  }, []);

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        
        // Check if this is a new user
        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
        if (hasSeenOnboarding !== 'true') {
          setShowOnboarding(true);
        }
      } else {
        setIsAuthenticated(false);
        // Check if user should see onboarding first
        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
        if (hasSeenOnboarding !== 'true') {
          setShowOnboarding(true);
        }
      }
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, []);

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
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem('hasSeenSplash', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Handle onboarding completion
  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

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

  // Handler for adding new chat
  const handleAddNewChat = (user: any) => {
    console.log('Adding new chat with:', user);

    // Check if chat already exists
    const existingChatIndex = chats.findIndex(chat => chat.id === user.id);

    if (existingChatIndex !== -1) {
      // Chat already exists, just select it
      setSelectedChat(existingChatIndex);
      if (isMobile) {
        setShowChatView(true);
      }
      return;
    }

    // Create new chat
    const newChat = {
      id: user.id,
      name: user.name,
      lastMessage: 'Start chatting...',
      time: 'Now',
      unread: 0,
      avatar: user.avatar,
      verified: user.verified,
      about: user.about,
      phone: user.phone,
    };

    // Add to chats list
    setChats([newChat, ...chats]); // Add to beginning of list

    // Select the new chat (it's now at index 0)
    setSelectedChat(0);

    // On mobile, show the chat view
    if (isMobile) {
      setShowChatView(true);
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
            chat={chats[selectedChat]}
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
      {/* Splash Screen Overlay - Only shows once */}
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

      {/* Onboarding Screen - Shows for new users before login */}
      {!showSplash && showOnboarding && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9998,
        }}>
          <Onboarding onComplete={handleOnboardingComplete} />
        </div>
      )}

      {/* Login Screen - Shows if not authenticated and onboarding is done */}
      {!showSplash && !showOnboarding && !isAuthenticated && !authChecking && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9997,
        }}>
          <Login />
        </div>
      )}

      {/* Main Chat Application - Shows only when authenticated */}
      {!showSplash && isAuthenticated && (
        <div style={{
          display: 'flex',
          height: '100vh',
          background: '#000',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          overflow: 'hidden',
          position: 'relative',
        }}>
          <ChatSidebar
            chats={chats}
            selectedChat={selectedChat}
            onChatSelect={handleChatSelect}
            isMobile={isMobile}
            showChatView={showChatView}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            primaryColor={primaryColor}
            accentColor={accentColor}
            onAddNewChat={handleAddNewChat}
          />
          {renderMainContent()}
        </div>
      )}
    </>
  );
}