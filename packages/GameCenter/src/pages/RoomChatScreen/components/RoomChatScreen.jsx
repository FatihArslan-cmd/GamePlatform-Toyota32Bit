import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import InputArea from './InputArea';
import { useWebSocket } from '../context/WebSocketContext';
import { useTheme } from '../../../context/ThemeContext';

const Page = () => {
    const route = useRoute();
    const { roomName,roomTopic } = route.params || {};
    const [newMessageText, setNewMessageText] = useState('');
    const messageListRef = useRef(null);
    const { messages, sendMessage, userId } = useWebSocket();
    const { colors } = useTheme();

    const handleSendMessage = useCallback(() => {
        sendMessage(newMessageText);
        setNewMessageText('');
        if (messageListRef.current) {
            messageListRef.current.scrollToEnd({ animated: true });
        }
    }, [newMessageText, sendMessage]);

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
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
    },
    container: {
        flex: 1,
    },
});

export default Page;