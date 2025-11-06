import { useState, useEffect } from 'react';
import { ref, onValue, push, update } from 'firebase/database';
import { db } from '@/lib/firebase';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export const useMessages = (chatRoomId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatRoomId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const messagesRef = ref(db, `messages/${chatRoomId}`);
    
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const loadedMessages: Message[] = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          loadedMessages.push({
            id: child.key!,
            ...child.val()
          });
        });
        
        // Sort by timestamp
        loadedMessages.sort((a, b) => a.timestamp - b.timestamp);
      }
      
      setMessages(loadedMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatRoomId]);

  const sendMessage = async (
    chatRoomId: string,
    senderId: string,
    text: string
  ) => {
    if (!text.trim()) return;

    try {
      const messageData = {
        senderId,
        text: text.trim(),
        timestamp: Date.now()
      };
      
      // Add message
      await push(ref(db, `messages/${chatRoomId}`), messageData);
      
      // Update last message in chat room
      await update(ref(db, `chatRooms/${chatRoomId}`), {
        lastMessage: messageData
      });

      return { success: true };
    } catch (error) {
      console.error('Error sending message:', error);
      return { success: false, error };
    }
  };

  return {
    messages,
    loading,
    sendMessage
  };
};