import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import formatDate from '../../../utils/FormatDate';
import { useTheme } from '../../../context/ThemeContext';

const MessageList = ({ messages, userId, messageListRef }) => {
    const { colors } = useTheme();

    const renderItem = ({ item }) => {
        const isCurrentUserMessage = item.senderId === userId || item.senderUsername === 'Sen';
        const messageStyle = isCurrentUserMessage ? styles.currentUserMessage : styles.otherUserMessage;
        const messageBoxStyle = isCurrentUserMessage ? styles.currentUserMessageBox : styles.otherUserMessageBox;
        const senderDisplayName = isCurrentUserMessage ? 'Sen' : item.senderUsername || 'Bilinmeyen';
        const fullFormattedDateTime = formatDate(item.timestamp, true);
        const timePart = fullFormattedDateTime.split(' ')[1];
        const formattedTime = timePart;

        return (
            <View style={[styles.messageRow, isCurrentUserMessage ? styles.currentUserRow : styles.otherUserRow]}>
                {!isCurrentUserMessage && item.senderProfilePhoto && (
                    <FastImage
                        source={{ uri: item.senderProfilePhoto }}
                        style={styles.profilePhoto}
                    />
                )}
                <View style={[messageBoxStyle, { backgroundColor: isCurrentUserMessage ? colors.messageBoxLight : colors.background }]}>
                    <Text style={[styles.senderText, { color: colors.subText }]}>{senderDisplayName}</Text>
                    <Text style={[styles.messageText, messageStyle, { color: colors.text }]}>{item.content}</Text>
                    <Text style={[styles.timestampText, { color: colors.subText }]}>{formattedTime}</Text>
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
            style={[styles.list, { backgroundColor: colors.background }]}
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
        borderRadius: 10,
        padding: 10,
        maxWidth: '70%',
        alignSelf: 'flex-end',
        marginRight: 5,
    },
    otherUserMessageBox: {
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
    },
    otherUserMessage: {
    },
    senderText: {
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
    profilePhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    timestampText: {
        fontSize: 11,
        alignSelf: 'flex-end',
    },
});


export default MessageList;