import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';

const MessageBubble = ({ message, isCurrentUserMessage }) => {

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const bubbleStyle = isCurrentUserMessage ? styles.currentUserBubble : styles.friendBubble;
    const textStyle = isCurrentUserMessage ? styles.currentUserMessageText : styles.friendMessageText;

    return (
        <Surface style={[styles.messageBubble, bubbleStyle]}>
            <Text style={textStyle}>{message.content}</Text>
            {message.timestamp && <Text style={styles.timestampText}>{formatDate(message.timestamp)}</Text>}
        </Surface>
    );
};

const styles = StyleSheet.create({
    messageBubble: {
        maxWidth: '75%',
        paddingVertical: 8, 
        paddingHorizontal: 12,
        marginVertical: 4, 
        borderRadius: 20,
        elevation: 1, 
    },
    currentUserBubble: {
        backgroundColor: '#DCF8C6', 
        alignSelf: 'flex-end',
        borderTopRightRadius: 2,
    },
    friendBubble: {
        backgroundColor: '#fff', 
        alignSelf: 'flex-start',
        borderTopLeftRadius: 2,
    },
    currentUserMessageText: {
        color: '#333', 
        fontSize: 16,
    },
    friendMessageText: {
        color: '#333',
        fontSize: 16,
    },
    timestampText: {
        fontSize: 12,
        color: '#777', 
        alignSelf: 'flex-end',
        marginTop: 2,
    },
});

export default MessageBubble;