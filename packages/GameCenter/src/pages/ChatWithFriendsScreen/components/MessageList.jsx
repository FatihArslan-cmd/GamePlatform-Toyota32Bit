import React from 'react';
import { FlatList } from 'react-native';
import MessageBubble from './MessageBubble';

const MessageList = ({ messages, userId, messageListRef }) => {
    const renderItem = ({ item }) => {
        const isCurrentUserMessage = item.senderId === userId;
        return <MessageBubble message={item} isCurrentUserMessage={isCurrentUserMessage} />;
    };

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