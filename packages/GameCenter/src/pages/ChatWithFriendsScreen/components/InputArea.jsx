import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const InputArea = ({ newMessageText, setNewMessageText, sendMessage }) => {
    return (
        <View style={styles.inputArea}>
            <TextInput
                style={styles.input}
                placeholder="Type a message..."
                value={newMessageText}
                onChangeText={setNewMessageText}
                onSubmitEditing={sendMessage}
                returnKeyType="send"
            />
            <TouchableOpacity
                style={styles.sendButton}
                onPress={sendMessage}
            >
                <Icon name="send" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputArea: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginRight: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: '#F2F2F2',
        fontSize: 16,
        color: '#333',
    },
    sendButton: {
        backgroundColor: '#007bff',
        borderRadius: 25,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
});

export default InputArea;