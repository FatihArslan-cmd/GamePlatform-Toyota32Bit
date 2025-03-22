import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import CustomModal from '../../../../../components/CustomModal';
import InputField from '../../../../LoginScreen/components/FormSection/components/InputField';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import lobbyService from '../services/lobbyService';
import { ToastService } from '../../../../../context/ToastService';
import { useBingoWebSocket } from '../../../../../context/BingoGameWebsocket';
import { useHeader } from '../context/HeaderContext';
import { useTranslation } from 'react-i18next'; 

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
            if (error?.response?.data?.message) { // Use optional chaining for safety
                ToastService.show('error', error.response.data.message); // Display backend error message directly - consider i18n for backend messages if needed
            }
            else {
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

    const handleClearCode = useCallback(() => {
        setLobbyCode('');
    }, []);

    const handleClearPassword = useCallback(() => {
        setLobbyPassword('');
    }, []);

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
                    />
                    {lobbyCode.length > 0 && (
                        <TouchableRipple style={styles.clearButton} onPress={handleClearCode}>
                            <Icon name="cancel" size={24} color="#fff" />
                        </TouchableRipple>
                    )}
                    <TouchableRipple style={styles.pasteButton} onPress={handlePaste}>
                        <Icon name="content-paste" size={24} color="#fff" />
                    </TouchableRipple>
                </View>

                <View style={styles.passwordInputWrapper}>
                    <InputField
                        label={t('homeScreen.joinLobbyModalLobbyPasswordLabel')}
                        value={lobbyPassword}
                        onChangeText={setLobbyPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                     {lobbyPassword.length > 0 && (
                        <TouchableRipple style={styles.clearButton} onPress={handleClearPassword}>
                            <Icon name="cancel" size={24} color="#fff" />
                        </TouchableRipple>
                    )}
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
    clearButton: {
        padding: 10,
        marginLeft: 8,
        borderRadius: 5,
    },
    pasteButton: {
        padding: 10,
        marginLeft: 8,
        backgroundColor: '#3498db',
        borderRadius: 5,
    },
});

export default JoinLobbyModal;