import Clipboard from "@react-native-clipboard/clipboard";
import CustomModal from "../../../../../components/CustomModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import InputField from "../../../../LoginScreen/components/FormSection/components/InputField";
import React, { useCallback, useState } from "react";
import lobbyService from "../services/lobbyService";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useBingoWebSocket } from "../../../../../context/BingoGameWebsocket";
import { ToastService } from "../../../../../context/ToastService";
import { isTablet } from "../../../../../utils/isTablet";
import { useHeader } from "../context/HeaderContext";

const TABLET_DEVICE = isTablet();

const JoinLobbyModal = () => {
    const [lobbyCode, setLobbyCode] = useState('');
    const [lobbyPassword, setLobbyPassword] = useState('');
    const { connectWebSocket } = useBingoWebSocket();
    const { joinLobbyModalVisible, closeJoinLobbyModal } = useHeader();
    const { t } = useTranslation();

    const handleJoinLobby = useCallback(async () => {
        try {
            await lobbyService.joinLobby(lobbyCode, lobbyPassword);

            connectWebSocket(lobbyCode);
            ToastService.show('success', t('homeScreen.joinLobbySuccessToast'));
            closeJoinLobbyModal();

        } catch (error) {
            console.error('Error joining lobby:', error);
            if (error?.response?.data?.message) {
                ToastService.show('error', error.response.data.message);
            } else {
                ToastService.show('error', t('homeScreen.joinLobbyFailToast'));
            }
        }
    }, [lobbyCode, lobbyPassword, closeJoinLobbyModal, connectWebSocket, t]);


    const handlePaste = useCallback(async () => {
        try {
            const text = await Clipboard.getString();
            setLobbyCode(text);
        } catch (error) {
            console.error('Error pasting from clipboard:', error);
            ToastService.show('error', t('homeScreen.joinLobbyClipboardFailToast'));
        }
    }, [t]);

    return (
        <CustomModal
            visible={joinLobbyModalVisible}
            onDismiss={closeJoinLobbyModal}
            title={t('homeScreen.joinLobbyModalTitle')}
            text={t('homeScreen.joinLobbyModalDescription')}
            showConfirmButton={true}
            confirmText={t('homeScreen.joinLobbyModalJoinButton')}
            onConfirm={handleJoinLobby}
        >
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <InputField
                        label={t('homeScreen.joinLobbyModalLobbyCodeLabel')}
                        value={lobbyCode}
                        onChangeText={setLobbyCode}
                        style={styles.input}
                        leftIcon="key"
                    />
                    <TouchableRipple style={styles.pasteButton} onPress={handlePaste}>
                        <Icon name="content-paste" size={TABLET_DEVICE ? 24 : 16} color="#fff" />
                    </TouchableRipple>
                </View>

                <View style={styles.passwordInputWrapper}>
                    <InputField
                        label={t('homeScreen.joinLobbyModalLobbyPasswordLabel')}
                        value={lobbyPassword}
                        onChangeText={setLobbyPassword}
                        secureTextEntry
                        style={styles.input}
                        leftIcon="lock"
                    />
                </View>
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    passwordInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    input: {
        backgroundColor: 'transparent',
        color: '#fff',
        flex: 1, 
    },
    pasteButton: {
        padding: 10,
        marginLeft: 8,
        backgroundColor: '#3498db',
        borderRadius: 5,
    },
});

export default JoinLobbyModal;