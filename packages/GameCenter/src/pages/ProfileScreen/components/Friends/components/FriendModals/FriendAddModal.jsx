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
        if (friendCode.trim()) {
            onAddFriend(friendCode.trim());
            setAddModalVisible(false);
            setFriendCode('');
        } else {
            console.warn("Friend code cannot be empty");
        }
    };

    return (
        <CustomModal
            visible={visible}
            onDismiss={() => {
                onDismiss();
                setFriendCode('');
            }}
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
                    }}
                    placeholder={t('friendAddModal.friendCodePlaceholder')}
                    theme={{
                        colors: {
                            primary: colors.primary,
                            placeholder: colors.text,
                            text: colors.text,
                        },
                         fonts: { regular: { fontFamily: 'Orbitron-ExtraBold' } },
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    left={
                        <TextInput.Icon
                            icon="magnify"
                            color={colors.primary}
                        />
                    }
                    right={
                        friendCode && friendCode.length > 0 ? (
                            <TextInput.Icon
                                icon="close"
                                color={colors.text}
                                onPress={() => setFriendCode('')}
                            />
                        ) : null
                    }
                    renderToHardwareTextureAndroid={true}
                />
            </View>
        </CustomModal>
    );
};

export default FriendAddModal;