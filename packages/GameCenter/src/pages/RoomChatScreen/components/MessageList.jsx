import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import formatDate from '../../../utils/FormatDate';

const MessageList = ({ messages, userId, messageListRef }) => {
    const renderItem = ({ item }) => {
        const isCurrentUserMessage = item.senderId === userId || item.senderUsername === 'Sen';
        const messageStyle = isCurrentUserMessage ? styles.currentUserMessage : styles.otherUserMessage;
        const messageBoxStyle = isCurrentUserMessage ? styles.currentUserMessageBox : styles.otherUserMessageBox;
        const senderDisplayName = isCurrentUserMessage ? 'Sen' : item.senderUsername || 'Bilinmeyen';
        const fullFormattedDateTime = formatDate(item.timestamp, true); // Tarih ve saati al
        const timePart = fullFormattedDateTime.split(' ')[1]; // Sadece saat kısmını al
        const formattedTime = timePart; // Sadece saati kullan

        return (
            <View style={[styles.messageRow, isCurrentUserMessage ? styles.currentUserRow : styles.otherUserRow]}>
                {!isCurrentUserMessage && item.senderProfilePhoto && (
                    <FastImage
                        source={{ uri: item.senderProfilePhoto }}
                        style={styles.profilePhoto}
                    />
                )}
                <View style={messageBoxStyle}>
                    <Text style={styles.senderText}>{senderDisplayName}</Text>
                    <Text style={[styles.messageText, messageStyle]}>{item.content}</Text>
                    <Text style={styles.timestampText}>{formattedTime}</Text>
                </View>
                {isCurrentUserMessage && item.senderProfilePhoto && (
                    <FastImage
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
        maxWidth: '70%',
        alignSelf: 'flex-end',
        marginRight: 5,
    },
    otherUserMessageBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        maxWidth: '70%',
        alignSelf: 'flex-start',
        marginLeft: 5,
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
        fontWeight: 'bold', 
        alignSelf: 'flex-end',
    },
    profilePhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    timestampText: { // Yeni timestamp style
        fontSize: 11,
        color: 'gray',
        alignSelf: 'flex-end', // Sağ alt köşeye hizala
    },
});


export default MessageList;