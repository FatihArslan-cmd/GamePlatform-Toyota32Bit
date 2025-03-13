import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import CustomModal from '../../../../../../components/CustomModal';
import { useTheme } from '../../../../../../context/ThemeContext';

const FriendAddModal = ({ visible, onDismiss, onAddFriend, setAddModalVisible }) => {
    const [friendCode, setFriendCode] = useState('');
    const { colors } = useTheme();

    const handleAdd = () => {
        onAddFriend(friendCode);
        setAddModalVisible(false);
        setFriendCode('');
    };

    return (
        <CustomModal
            visible={visible}
            onDismiss={onDismiss}
            title="Add Friend"
            showConfirmButton={true}
            confirmText="Add"
            onConfirm={handleAdd}
        >
            <View style={{ paddingVertical: 35 }}>
                <TextInput
                    label="Enter friend code"
                    value={friendCode}
                    onChangeText={setFriendCode}
                    mode="flat"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        marginHorizontal: 10,
                        color: colors.text,
                    }}
                    placeholder="Friend code"
                    placeholderTextColor={colors.text}
                    theme={{
                        colors: {
                            primary: colors.primary,
                            placeholder: colors.primary, //  Label color when unfocused
                            text: colors.text,         // Input text color
                        },
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
        </CustomModal>
    );
};

export default FriendAddModal;