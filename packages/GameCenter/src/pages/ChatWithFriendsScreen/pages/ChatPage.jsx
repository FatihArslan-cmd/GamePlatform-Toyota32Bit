import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ToastService } from '../../../context/ToastService';
import ChatHeader from '../components/ChatHeader'; // Adjust path as needed
import MessageList from '../components/MessageList'; // Adjust path as needed
import InputArea from '../components/InputArea'; // Adjust path as needed
import { useWebSocket } from '../context/WebSocketContext';

const ChatScreen = () => {
    const route = useRoute();
    const { friend: initialFriend } = route.params;
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
    }, [isConnected, friend.id]);

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

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ChatHeader friend={friend} onMoreActions={() => {}} />
                <MessageList messages={messages} userId={userId} messageListRef={messageListRef} />
                <InputArea
                    newMessageText={newMessageText}
                    setNewMessageText={setNewMessageText}
                    sendMessage={handleSendMessage}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
});

export default ChatScreen;