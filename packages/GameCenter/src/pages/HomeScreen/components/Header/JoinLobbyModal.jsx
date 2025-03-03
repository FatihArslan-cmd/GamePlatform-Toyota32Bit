import React, { useState, useCallback ,useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import CustomModal from '../../../../components/CustomModal';
import InputField from '../../../LoginScreen/components/FormSectionItem/InputField';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import lobbyService from './services/lobbyService';
import { ToastService } from '../../../../context/ToastService';
import { useBingoWebSocket } from '../../../../context/BingoWebSocket/BingoWebSocket';


const JoinLobbyModal = ({ visible, onDismiss }) => {
    const [lobbyCode, setLobbyCode] = useState('');
    const [lobbyPassword, setLobbyPassword] = useState('');
    const { connectWebSocket } = useBingoWebSocket(); // messages eklendi


    const handleJoinLobby = useCallback(async () => {
        try {
            await lobbyService.joinLobby(lobbyCode, lobbyPassword);

            connectWebSocket(lobbyCode);
            ToastService.show('success', 'Successfully joined lobby!');
            onDismiss();

        } catch (error) {
            console.error('Error joining lobby:', error);
            if (error.response && error.response.data && error.response.data.message) {
                ToastService.show('error', error.response.data.message);
            }
            else {
                ToastService.show('error', 'Failed to join lobby. Please try again.');
            }
        }
    }, [lobbyCode, lobbyPassword, onDismiss, connectWebSocket]);


    const handlePaste = useCallback(async () => {
        try {
            const text = await Clipboard.getString();
            setLobbyCode(text);
        } catch (error) {
            console.error('Error pasting from clipboard:', error);
            ToastService.show('error', 'Failed to paste from clipboard.');
        }
    }, []);

    const handleClearCode = useCallback(() => {
        setLobbyCode('');
    }, []);

    const handleClearPassword = useCallback(() => {
        setLobbyPassword('');
    }, []);

    return (
        <CustomModal
            visible={visible}
            onDismiss={onDismiss}
            title="Join Lobby"
            text="Enter the lobby code and password (if required):"
            showConfirmButton={true}
            confirmText="Join"
            onConfirm={handleJoinLobby}
        >
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <InputField
                        label="Lobby Code"
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
                        label="Lobby Password (Optional)"
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
