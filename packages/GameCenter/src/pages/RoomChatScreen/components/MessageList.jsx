import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const MessageList = ({ messages, userId, messageListRef }) => {
    const renderItem = ({ item }) => {
        const isCurrentUserMessage = item.senderId === userId || item.senderUsername === 'Sen';
        const messageStyle = isCurrentUserMessage ? styles.currentUserMessage : styles.otherUserMessage;
        const messageBoxStyle = isCurrentUserMessage ? styles.currentUserMessageBox : styles.otherUserMessageBox;
        const senderDisplayName = isCurrentUserMessage ? 'Sen' : item.senderUsername || 'Bilinmeyen';

        return (
            <View style={[styles.messageRow, isCurrentUserMessage ? styles.currentUserRow : styles.otherUserRow]}>
                {!isCurrentUserMessage && item.senderProfilePhoto && (
                    <Image
                        source={{ uri: item.senderProfilePhoto }}
                        style={styles.profilePhoto}
                    />
                )}
                <View style={messageBoxStyle}>
                    <Text style={[styles.messageText, messageStyle]}>{item.content}</Text>
                    <Text style={styles.senderText}>{senderDisplayName}</Text>
                </View>
                {isCurrentUserMessage && item.senderProfilePhoto && (
                    <Image
                        source={{ uri: item.senderProfilePhoto }}
                        style={styles.profilePhoto}
                    />
                )}
            </View>
        );
    };

    return (
        <FlatList
            ref={messageListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
        />
    );
};


const styles = StyleSheet.create({
    list: {
        flex: 1,
        padding: 10,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    messageRow: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    currentUserRow: {
        justifyContent: 'flex-end',
    },
    otherUserRow: {
        justifyContent: 'flex-start',
    },
    currentUserMessageBox: {
        backgroundColor: '#DCF8C6',
        borderRadius: 10,
        padding: 10,
        maxWidth: '70%', // Düzenlendi
        alignSelf: 'flex-end',
        marginRight: 5, // Düzenlendi
    },
    otherUserMessageBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        maxWidth: '70%', // Düzenlendi
        alignSelf: 'flex-start',
        marginLeft: 5, // Düzenlendi
    },
    messageText: {
        fontSize: 16,
        paddingBottom: 2,
    },
    currentUserMessage: {
        color: '#000',
    },
    otherUserMessage: {
        color: '#000',
    },
    senderText: {
        fontSize: 12,
        color: 'gray',
        alignSelf: 'flex-end',
    },
    profilePhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 5,
    },
});


export default MessageList;