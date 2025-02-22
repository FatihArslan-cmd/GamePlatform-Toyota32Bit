import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getToken } from '../../../shared/states/api';
import { ToastService } from '../../../context/ToastService';
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import InputArea from '../components/InputArea';

const ChatScreen = () => {
    const route = useRoute();
    const { friend: initialFriend } = route.params;
    const [friend, setFriend] = useState(initialFriend); // Use state to manage friend status
    const [messages, setMessages] = useState([]);
    const [newMessageText, setNewMessageText] = useState('');
    const socket = useRef(null);
    const messageListRef = useRef(null);
    const userId = 1;

    useEffect(() => {
        const ws = new WebSocket('ws://10.0.2.2:3000');
        socket.current = ws;
        const accessToken = getToken();

        ws.onopen = () => {
            console.log('WebSocket connected');
            ws.send(JSON.stringify({
                type: 'auth',
                token: accessToken,
            }));
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
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
                } else if (message.type === 'error') {
                    console.error('WebSocket Error:', message.message);
                    ToastService.show('error', message.message);
                } else if (message.type === 'connected') {
                    console.log('WebSocket authenticated');
                } else if (message.type === 'status') {
                    // Handle status updates
                    const { userId: statusUserId, status } = message.payload;
                    if (statusUserId === friend.id) {
                        setFriend(prevFriend => ({ ...prevFriend, isOnline: status === 'online' }));
                    }
                }
            } catch (error) {
                console.error('Failed to parse message:', error);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            ToastService.show('error', 'Failed to connect to chat server.');
        };


        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [friend.id]); // friend.id as dependency to re-establish connection if friend changes (though unlikely in this screen)

    const sendMessage = useCallback(() => {
        if (newMessageText && socket.current && socket.current.readyState === WebSocket.OPEN) {
            const messagePayload = {
                type: 'message',
                payload: {
                    to: friend.id,
                    content: newMessageText,
                },
            };
            socket.current.send(JSON.stringify(messagePayload));
            setMessages(prevMessages => [...prevMessages, { senderId: userId, content: newMessageText, timestamp: new Date().toISOString() }]);
            setNewMessageText('');
            if (messageListRef.current) {
                messageListRef.current.scrollToEnd({ animated: true });
            }
        }
    }, [newMessageText, friend.id, userId]);


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ChatHeader friend={friend} onMoreActions={() => { /* Handle more actions */ }} />
                <MessageList messages={messages} userId={userId} messageListRef={messageListRef} />
                <InputArea
                    newMessageText={newMessageText}
                    setNewMessageText={setNewMessageText}
                    sendMessage={sendMessage}
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