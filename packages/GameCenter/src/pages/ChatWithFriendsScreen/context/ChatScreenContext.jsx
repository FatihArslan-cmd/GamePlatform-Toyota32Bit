import React, { createContext, useState, useRef, useCallback, useContext, useEffect } from 'react';
import { ToastService } from '../../../context/ToastService';
import { useWebSocket } from '../context/WebSocketContext';

export const ChatScreenContext = createContext();

export const ChatScreenProvider = ({ initialFriend, children }) => {
    const [friend, setFriend] = useState(initialFriend);
    const [messages, setMessages] = useState([]);
    const [newMessageText, setNewMessageText] = useState('');
    const messageListRef = useRef(null);
    const { userId, sendMessage, subscribeToMessages, isConnected } = useWebSocket();

    useEffect(() => {
        if (!isConnected) return;

        subscribeToMessages((message) => {
            if (message.type === 'message') {
                const newMessage = {
                    senderId: message.payload.from,
                    content: message.payload.content,
                    timestamp: message.payload.timestamp,
                };
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                if (messageListRef.current) {
                    messageListRef.current.scrollToEnd({ animated: true });
                }
            } else if (message.type === 'status') {
                const { userId: statusUserId, status } = message.payload;
                if (statusUserId === friend.id) {
                    setFriend((prevFriend) => ({ ...prevFriend, isOnline: status === 'online' }));
                }
            }
        });
    }, [isConnected, friend.id, subscribeToMessages]);

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
            if (messageListRef.current) {
                messageListRef.current.scrollToEnd({ animated: true });
            }
        } else if (!isConnected) {
            ToastService.show('error', 'Not connected to the chat server.');
        }
    }, [newMessageText, friend.id, userId, isConnected, sendMessage]);

    const contextValue = {
        friend, setFriend,
        messages, setMessages,
        newMessageText, setNewMessageText,
        messageListRef,
        handleSendMessage,
    };

    return (
        <ChatScreenContext.Provider value={contextValue}>
            {children}
        </ChatScreenContext.Provider>
    );
};