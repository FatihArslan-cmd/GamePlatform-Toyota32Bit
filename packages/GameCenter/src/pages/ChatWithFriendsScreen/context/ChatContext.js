import React, { createContext, useContext, useState, useCallback,useEffect } from 'react';
import { ToastService } from '../../../context/ToastService';
import { useWebSocket } from '../context/WebSocketContext';

const ChatContext = createContext();

export const ChatProvider = ({ children, initialFriend }) => {
  const [friend, setFriend] = useState(initialFriend);
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const { userId, sendMessage, subscribeToMessages, isConnected } = useWebSocket();

  const handleSendMessage = useCallback(() => {
    if (newMessageText && userId && isConnected) {
      const messagePayload = {
        type: 'message',
        payload: {
          to: friend.id,
          content: newMessageText,
        },
      };
      sendMessage(messagePayload);
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId: userId, content: newMessageText, timestamp: new Date().toISOString() },
      ]);
      setNewMessageText('');
    } else if (!isConnected) {
      ToastService.show('error', 'Not connected to the chat server.');
    }
  }, [newMessageText, friend.id, userId, isConnected, sendMessage]);

  useEffect(() => {
    if (!isConnected) return;
  
    const messageHandler = (message) => {
      if (message.type === 'message') {
        const newMessage = {
          senderId: message.payload.from,
          content: message.payload.content,
          timestamp: message.payload.timestamp,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else if (message.type === 'status') {
        const { userId: statusUserId, status } = message.payload;
        if (statusUserId === friend.id) {
          setFriend((prevFriend) => ({ ...prevFriend, isOnline: status === 'online' }));
        }
      }
    };
  
    const unsubscribe = subscribeToMessages(messageHandler);
  
    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [isConnected, friend.id, subscribeToMessages]);

  const value = {
    friend,
    messages,
    newMessageText,
    setNewMessageText,
    handleSendMessage,
    userId,
    isConnected
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};