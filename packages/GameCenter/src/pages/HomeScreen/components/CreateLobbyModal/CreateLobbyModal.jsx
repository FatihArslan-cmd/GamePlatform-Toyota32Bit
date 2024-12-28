import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText } from 'react-native-paper';
import BottomSheet from '../../../../components/BottomSheet';
import LobbyTypeSelector from './LobbyTypeSelector';
import CustomDateTimeSelector from './DateTimeSelector';
import GameSelector from './GameSelector';
import PasswordInput from './PasswordInput';
import InvitationLink from './InvitationLink';
import ToastMessage from '../../../../components/ToastMessage/Toast';
import useToast from '../../../../components/ToastMessage/hooks/useToast';

const CreateLobbyModal = ({ visible, onDismiss, height }) => {
  const [lobbyType, setLobbyType] = useState('normal');
  const [game, setGame] = useState('');
  const [password, setPassword] = useState('');
  const [invitationLink, setInvitationLink] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { currentToast, showToast, hideToast } = useToast();

  const toggleLobbyType = useCallback(() => {
    setLobbyType(current => (current === 'normal' ? 'event' : 'normal'));
  }, []);

  const handleSave = useCallback(() => {
    if (lobbyType === 'event') {
      // Additional logic for 'event' type if needed
    }
    setError('');
    const code = Math.random().toString(36).substr(2, 10).toUpperCase();
    setInvitationLink(`https://gamecenter.com/invite/${code}`);
    showToast('success', 'Lobby created successfully!');
  }, [lobbyType]);



  const resetLobby = useCallback(() => {
    setLobbyType('normal');
    setGame('');
    setPassword('');
    setInvitationLink('');
    setError('');
  }, []);

  return (
    <BottomSheet
      visible={visible}
      onDismiss={onDismiss}
      title="Create Lobby"
      height="60%"
      backgroundColor="white"
    >
      <View style={styles.container}>
        {!invitationLink ? (
          <>
            <LobbyTypeSelector lobbyType={lobbyType} onToggle={toggleLobbyType} />

            {lobbyType === 'event' && <CustomDateTimeSelector />}

            <GameSelector game={game} onGameChange={setGame} />

            <PasswordInput
              password={password}
              isPasswordVisible={isPasswordVisible}
              onPasswordChange={setPassword}
              onToggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
            />

            {error ? (
              <HelperText type="error" visible={!!error}>
                {error}
              </HelperText>
            ) : null}

            <Button
              mode="contained"
              onPress={handleSave}
              style={[
                styles.createButton,
                invitationLink && styles.createButtonWithLink,
              ]}
              contentStyle={styles.createButtonContent}
              icon="plus-circle"
            >
              Create Lobby
            </Button>
          </>
        ) : (
          <View style={styles.successContainer}>
            <InvitationLink invitationLink={invitationLink}/>
            <Button
              mode="outlined"
              onPress={resetLobby}
              style={styles.resetButton}
              icon="refresh"
            >
              Create New Lobby
            </Button>
          </View>
        )}
      </View>
      {currentToast && (
        <ToastMessage
          type={currentToast.type}
          message={currentToast.message}
          onHide={hideToast}
        />
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  createButton: {
    marginTop: 'auto',
    paddingVertical: 8,
  },
  createButtonWithLink: {
    marginTop: 16,
  },
  createButtonContent: {
    height: 48,
  },
  resetButton: {
    marginTop: 'auto',
  },
});

export default CreateLobbyModal;
