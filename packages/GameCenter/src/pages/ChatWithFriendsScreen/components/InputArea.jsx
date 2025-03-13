import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../context/ThemeContext'; 
const InputArea = ({ newMessageText, setNewMessageText, sendMessage }) => {
    const { colors } = useTheme(); 

    return (
        <View style={[styles.inputArea, { borderTopColor: colors.border, backgroundColor: colors.card }]}>
            <TextInput
                style={[styles.input, {
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    color: colors.text
                }]}
                placeholder="Type a message..."
                placeholderTextColor={colors.subText} 
                value={newMessageText}
                onChangeText={setNewMessageText}
                onSubmitEditing={sendMessage}
                returnKeyType="send"
                color={colors.text} 
            />
            <TouchableOpacity
                style={[styles.sendButton, { backgroundColor: colors.primary }]}
                onPress={sendMessage}
            >
                <Icon name="send" size={24} color={colors.card} /> 
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputArea: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopWidth: 1,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 25,
        fontSize: 16,
        paddingVertical: 12
    },
    sendButton: {
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