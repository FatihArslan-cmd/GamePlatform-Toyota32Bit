import React from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Modal, Text, TextInput, Button } from 'react-native-paper';

const ForgotPasswordModal = ({ visible, onDismiss }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContent}
      >
        <Text style={styles.modalTitle}>Reset Password</Text>
        <TextInput
          mode="outlined"
          label="Email"
          style={styles.modalInput}
          theme={{ colors: { primary: '#8a2be2' } }}
        />
        <Button
          mode="contained"
          onPress={onDismiss}
          style={styles.modalButton}
          labelStyle={styles.modalButtonText}
        >
          Send Reset Link
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#1a1b2e',
    padding: 20,
    margin: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#8a2be2',
  },
  modalTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Anton-Regular',
    marginBottom: 20,
  },
  modalInput: {
    marginBottom: 20,
    backgroundColor: '#ffffff10',
    fontFamily: 'RussoOne-Regular',
  },
  modalButton: {
    backgroundColor: '#8a2be2',
  },
  modalButtonText: {
    color: '#fff',
    fontFamily: 'Anton-Regular',
  },
});

export default ForgotPasswordModal;