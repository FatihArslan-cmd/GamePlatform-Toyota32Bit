import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import BackButton from '../../../components/BackIcon';

const ChatHeader = ({ roomName }) => {
    const name = roomName;

    return (
        <View style={styles.header}>
            <BackButton top={0} left={0} />
            <Text style={styles.headerText}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 22,
        fontFamily: 'Orbitron-ExtraBold',
    },
});

export default ChatHeader;