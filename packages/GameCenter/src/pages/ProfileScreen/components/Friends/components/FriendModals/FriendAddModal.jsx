import CustomModal from "../../../../../../components/CustomModal";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from "../../../../../../context/ThemeContext";

const FriendAddModal = ({ visible, onDismiss, onAddFriend, setAddModalVisible }) => {
    const [friendCode, setFriendCode] = useState('');
    const { colors } = useTheme();
    const { t } = useTranslation(); 

    const handleAdd = () => {
        onAddFriend(friendCode);
        setAddModalVisible(false);
        setFriendCode('');
    };

    return (
        <CustomModal
            visible={visible}
            onDismiss={onDismiss}
            title={t('friendAddModal.title')}
            showConfirmButton={true}
            confirmText={t('friendAddModal.confirmButton')} 
            onConfirm={handleAdd}
        >
            <View style={{ paddingVertical: 35 }}>
                <TextInput
    label={t('friendAddModal.friendCodeLabel')}
    value={friendCode}
    onChangeText={setFriendCode}
    mode="flat"
    style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginHorizontal: 10,
        color: colors.text,
        fontFamily: 'Orbitron-ExtraBold', 
    }}
    placeholder={t('friendAddModal.friendCodePlaceholder')}
    placeholderTextColor={colors.text}
    theme={{
        colors: {
            primary: colors.primary,
            placeholder: colors.primary,
            text: colors.text,
        },
        fonts: {
            regular: { fontFamily: 'Orbitron-ExtraBold' },
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