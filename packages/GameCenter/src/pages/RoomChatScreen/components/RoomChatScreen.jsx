import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import InputArea from '../../ChatWithFriendsScreen/components/InputArea';
import { useWebSocket } from '../context/WebSocketContext';

const Page = () => {
    const route = useRoute();
    const { roomName,roomTopic } = route.params || {};
    const [newMessageText, setNewMessageText] = useState('');
    const messageListRef = useRef(null);
    const { messages, sendMessage, userId } = useWebSocket(); // Context'ten değerler alındı

    const handleSendMessage = useCallback(() => {
        sendMessage(newMessageText); // Context'teki sendMessage fonksiyonu kullanılıyor
        setNewMessageText(''); // Input alanını temizle
        if (messageListRef.current) {
            messageListRef.current.scrollToEnd({ animated: true });
        }
    }, [newMessageText, sendMessage]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ChatHeader roomTopic={roomTopic} roomName={roomName || 'Oda Sohbeti'} onMoreActions={() => { }} />
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

export default Page;