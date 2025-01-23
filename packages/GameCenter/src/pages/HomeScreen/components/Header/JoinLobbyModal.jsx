import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Clipboard } from 'react-native';
import CustomModal from '../../../../components/CustomModal';
import InputField from '../../../LoginScreen/components/FormSectionItem/InputField';
import { getToken } from '../../../../shared/states/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ToastMessage from '../../../../components/ToastMessage/Toast';

const JoinLobbyModal = ({ visible, onDismiss }) => {
  const [lobbyCode, setLobbyCode] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState('info');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };


  const handleJoinLobby = useCallback(async () => {
    try {
      const token = await getToken();
      const response = await fetch('http://10.0.2.2:3000/api/lobby/join', { // Backend URL'nizi buraya girin
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ code: lobbyCode }),
      });

      const data = await response.json();

      if (!response.ok) {
         showToast('error', data.message || 'Failed to join lobby.');
        return;
      }
      onDismiss();
      showToast('success', 'Successfully joined lobby!');
    } catch (error) {
      console.error('Error joining lobby:', error);
      showToast('error', 'Failed to join lobby. Please try again.');
    }
  }, [lobbyCode, onDismiss]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await Clipboard.getString();
      setLobbyCode(text);
    } catch (error) {
      console.error('Error pasting from clipboard:', error);
      showToast('error', 'Failed to paste from clipboard.');
    }
  }, []);

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
             {lobbyCode.length > 0 && (  // Eğer lobi kodu doluysa çarpı işaretini göster
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Icon name="cancel" size={24} color="#fff" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.pasteButton} onPress={handlePaste}>
            <Icon name="content-paste" size={24} color="#fff" />
          </TouchableOpacity>

        </View>
      </View>
       {toastVisible && (
        <ToastMessage
          type={toastType}
          message={toastMessage}
          onHide={hideToast}
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