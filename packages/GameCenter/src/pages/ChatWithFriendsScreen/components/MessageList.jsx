import React from 'react';
import { FlatList } from 'react-native';
import MessageBubble from './MessageBubble';
import { useChat } from '../context/ChatContext'; 

const MessageList = ({ messageListRef }) => {
    const { messages, userId } = useChat(); 

    const renderItem = ({ item }) => (
        <MessageBubble 
            message={item} 
            isCurrentUserMessage={item.senderId === userId} 
        />
    );

    return (
        <FlatList
            ref={messageListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={{ flex: 1, paddingHorizontal: 10 }}
            contentContainerStyle={{ paddingTop: 15, paddingBottom: 15 }}
            onContentSizeChange={() => messageListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => messageListRef.current?.scrollToEnd({ animated: true })}
        />
    );
};

export default MessageList;