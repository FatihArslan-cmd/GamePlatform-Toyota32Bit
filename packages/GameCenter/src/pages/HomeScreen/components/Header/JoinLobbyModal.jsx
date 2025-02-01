import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import CustomModal from '../../../../components/CustomModal';
import InputField from '../../../LoginScreen/components/FormSectionItem/InputField';
import { getToken } from '../../../../shared/states/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useToast from '../../../../components/ToastMessage/hooks/useToast';
import axios from 'axios';

const JoinLobbyModal = ({ visible, onDismiss }) => {
  const [lobbyCode, setLobbyCode] = useState('');
  const { currentToast, showToast, hideToast } = useToast(); // Use the hook

  const handleJoinLobby = useCallback(async () => {
    try {
      const token = await getToken();
      const response = await axios.post(
        'http://10.0.2.2:3000/api/lobby/join', // Use your backend URL
        { code: lobbyCode },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
          showToast('error', response.data?.message || 'Failed to join lobby.');
        return;
      }

      onDismiss();
      showToast('success', 'Successfully joined lobby!');
    } catch (error) {
      console.error('Error joining lobby:', error);
      showToast('error', 'Failed to join lobby. Please try again.');
    }
  }, [lobbyCode, onDismiss, showToast]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await Clipboard.getString();
      setLobbyCode(text);
    } catch (error) {
      console.error('Error pasting from clipboard:', error);
      showToast('error', 'Failed to paste from clipboard.');
    }
  }, [showToast]);

  const handleClear = useCallback(() => {
    setLobbyCode('');
  }, []);

  return (
    <CustomModal
      visible={visible}
      onDismiss={onDismiss}
      title="Join Lobby"
      text="Enter the lobby code:"
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
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Icon name="cancel" size={24} color="#fff" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.pasteButton} onPress={handlePaste}>
            <Icon name="content-paste" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {currentToast && ( // Use currentToast from the hook
        <ToastMessage
          type={currentToast.type}
          message={currentToast.message}
          onHide={hideToast} // Use hook's hideToast
        />
      )}
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