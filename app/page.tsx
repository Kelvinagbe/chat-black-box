'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatSidebar from '@/components/ChatSidebar';
import ChatHeader from '@/components/ChatHeader';
import MessageBubble from '@/components/MessageBubble';
import MessageInput from '@/components/MessageInput';
import SplashScreen from '@/components/SplashScreen';
import Login from '@/components/Login';
import Onboarding from '@/components/Onboarding';
import { useChat } from '@/hooks/useChat';
import { useMessages } from '@/hooks/useMessages';

export default function BlackBoxChat() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(true);
  const [showChatView, setShowChatView] = useState(false);
  const [activeTab, setActiveTab] = useState('chats');
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(null);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState<string | null>(null);

  const primaryColor = '#00ff7f';
  const accentColor = '#fff';

  // Use the main chat hook
  const {
    currentUser,
    authLoading,
    chatList,
    discoverUsers,
    friendRequests,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
  } = useChat();

  // Use messages hook for selected chat
  const { 
    messages, 
    loading: messagesLoading, 
    sendMessage: sendMessageToDb 
  } = useMessages(selectedChatRoomId);

  // Check if user has seen splash screen before
  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (hasSeenSplash === 'true') {
      setShowSplash(false);
    }
  }, []);

  // Check authentication and onboarding status
  useEffect(() => {
    if (authLoading) return;

    if (currentUser) {
      // User is authenticated
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      if (hasSeenOnboarding !== 'true') {
        setShowOnboarding(true);
      }
    } else {
      // Not authenticated
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      if (hasSeenOnboarding !== 'true') {
        setShowOnboarding(true);
      }
    }
  }, [currentUser, authLoading]);

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

  // Transform Firebase messages to component format
  const transformedMessages = messages.map((msg, index) => ({
    id: index + 1,
    sender: msg.senderId === currentUser?.uid ? 'You' : chatList[selectedChatIndex || 0]?.name || 'User',
    content: msg.text,
    time: new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    isMine: msg.senderId === currentUser?.uid,
  }));

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChatRoomId || !currentUser) return;

    const result = await sendMessageToDb(selectedChatRoomId, currentUser.uid, message);
    
    if (result?.success) {
      setMessage('');
    }
  };

  const handleChatSelect = (index: number) => {
    setSelectedChatIndex(index);
    setSelectedChatRoomId(chatList[index].chatRoomId);
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

  // Handler for sending friend request from discover tab
  const handleSendFriendRequest = async (userId: string) => {
    const result = await sendFriendRequest(userId);
    if (result?.success) {
      // Show success toast or notification
      console.log('Friend request sent successfully');
    }
  };

  // Handler for accepting friend request
  const handleAcceptRequest = async (requestId: string, fromUserId: string) => {
    const result = await acceptFriendRequest(requestId, fromUserId);
    if (result?.success) {
      // Optionally switch to chats tab and open the new chat
      setActiveTab('chats');
      const newChatIndex = chatList.findIndex(chat => chat.id === fromUserId);
      if (newChatIndex !== -1) {
        handleChatSelect(newChatIndex);
      }
    }
  };

  // Handler for rejecting friend request
  const handleRejectRequest = async (requestId: string) => {
    await rejectFriendRequest(requestId);
  };

  // Handler for adding new chat (from modal)
  const handleAddNewChat = async (user: any) => {
    console.log('Adding new chat with:', user);

    // Check if already friends
    const existingChatIndex = chatList.findIndex(chat => chat.id === user.id);

    if (existingChatIndex !== -1) {
      // Already friends, just select the chat
      handleChatSelect(existingChatIndex);
      return;
    }

    // Send friend request
    await handleSendFriendRequest(user.id);
  };

  const renderMainContent = () => {
    if (selectedChatIndex === null || !chatList[selectedChatIndex]) {
      return (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050505',
          color: '#666',
        }}>
          <div style={{ textAlign: 'center' }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{ margin: '0 auto 20px' }}
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <h3 style={{ margin: '0 0 10px', color: '#999' }}>Select a chat to start messaging</h3>
            <p>Choose a conversation from the sidebar</p>
          </div>
        </div>
      );
    }

    const selectedChat = chatList[selectedChatIndex];

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
            chat={selectedChat}
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
          {messagesLoading ? (
            <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
              Loading messages...
            </div>
          ) : transformedMessages.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{ margin: '0 auto 20px' }}
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <h3 style={{ margin: '0 0 10px', color: '#999' }}>Start the conversation</h3>
              <p>Send a message to get things started</p>
            </div>
          ) : (
            transformedMessages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} primaryColor={primaryColor} />
            ))
          )}
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

      {/* Onboarding Screen */}
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

      {/* Login Screen */}
      {!showSplash && !showOnboarding && !currentUser && !authLoading && (
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

      {/* Main Chat Application */}
      {!showSplash && currentUser && (
        <div style={{
          display: 'flex',
          height: '100vh',
          background: '#000',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          overflow: 'hidden',
          position: 'relative',
        }}>
          <ChatSidebar
            chats={chatList}
            selectedChat={selectedChatIndex}
            onChatSelect={handleChatSelect}
            isMobile={isMobile}
            showChatView={showChatView}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            primaryColor={primaryColor}
            accentColor={accentColor}
            onAddNewChat={handleAddNewChat}
            discoverUsers={discoverUsers}
            friendRequests={friendRequests}
            onSendFriendRequest={handleSendFriendRequest}
            onAcceptRequest={handleAcceptRequest}
            onRejectRequest={handleRejectRequest}
          />
          {renderMainContent()}
        </div>
      )}
    </>
  );
}