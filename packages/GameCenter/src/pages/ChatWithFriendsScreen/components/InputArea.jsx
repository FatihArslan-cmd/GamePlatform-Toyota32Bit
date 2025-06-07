import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { useChat } from "../context/ChatContext";

const InputArea = () => {
    const { colors } = useTheme();
    const { 
        newMessageText, 
        setNewMessageText, 
        handleSendMessage 
    } = useChat(); 

    return (
        <View style={[styles.inputArea, { 
            borderTopColor: colors.border, 
            backgroundColor: colors.card 
        }]}>
            <TextInput
                style={[styles.input, {
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    color: colors.text,
                    fontFamily: 'Orbitron-ExtraBold', 
                }]}
                placeholder="Type a message..."
                placeholderTextColor={colors.subText}
                value={newMessageText}
                onChangeText={setNewMessageText}
                onSubmitEditing={handleSendMessage}
                returnKeyType="send"
            />
            <TouchableOpacity
                style={[styles.sendButton, { backgroundColor: colors.primary }]}
                onPress={handleSendMessage}
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