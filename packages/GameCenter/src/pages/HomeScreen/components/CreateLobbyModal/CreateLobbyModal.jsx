import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText } from 'react-native-paper';
import BottomSheet from '../../../../components/BottomSheet';
import LobbyTypeSelector from './LobbyTypeSelector';
import DateTimeSelector from './DateTimeSelector';
import GameSelector from './GameSelector';
import PasswordInput from './PasswordInput';
import InvitationLink from './InvitationLink';
import ToastMessage from '../../../../components/ToastMessage/Toast';
import useToast from '../../../../components/ToastMessage/hooks/useToast';

const CreateLobbyModal = ({ visible, onDismiss, height }) => {
  const [lobbyType, setLobbyType] = useState('normal');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [game, setGame] = useState('');
  const [password, setPassword] = useState('');
  const [invitationLink, setInvitationLink] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { currentToast, showToast, hideToast } = useToast();


  const onDateChange = (type, selectedDate) => {
    if (selectedDate) {
        if (type === 'start') {
            setStartDate(selectedDate);
            onShowStartPicker(false);
        } else if (type === 'end') {
            setEndDate(selectedDate);
            onShowEndPicker(false);
        }
    } else {
        if (type === 'start') onShowStartPicker(false);
        if (type === 'end') onShowEndPicker(false);
    }
};


  const toggleLobbyType = useCallback(() => {
    setLobbyType(current => current === 'normal' ? 'event' : 'normal');
  }, []);

  const handleSave = useCallback(() => {
    if (lobbyType === 'event') {
      if (endDate <= startDate) {
        setError('End time must be after start time');
        return;
      }
    }
    setError('');
    const code = Math.random().toString(36).substr(2, 10).toUpperCase();
    setInvitationLink(`https://gamecenter.com/invite/${code}`);
    showToast('success', 'Lobby created successfully!');
  }, [lobbyType, startDate, endDate]);

  const handleCopy = useCallback(() => {
    // Implement copy to clipboard functionality
  }, [invitationLink]);

  const resetLobby = useCallback(() => {
    setLobbyType('normal');
    setStartDate(new Date());
    setEndDate(new Date());
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
      height={height}
      backgroundColor="white"
    >
      <View style={styles.container}>
        {!invitationLink ? (
          <>
            <LobbyTypeSelector 
              lobbyType={lobbyType} 
              onToggle={toggleLobbyType} 
            />

            {lobbyType === 'event' && (
              <DateTimeSelector
                showStartPicker={showStartPicker}
                showEndPicker={showEndPicker}
                startDate={startDate}
                endDate={endDate}
                onShowStartPicker={setShowStartPicker}
                onShowEndPicker={setShowEndPicker}
                onDateChange={onDateChange}
              />
            )}

            <GameSelector 
              game={game} 
              onGameChange={setGame} 
            />

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
            invitationLink && styles.createButtonWithLink
          ]}
          contentStyle={styles.createButtonContent}
          icon="plus-circle"
        >
          Create Lobby
        </Button>
          </>
        ) : (
          // Show success view with invitation link
          <View style={styles.successContainer}>
            <InvitationLink 
              invitationLink={invitationLink} 
              onCopy={handleCopy} 
            />
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
    marginTop: 16, // Less margin when showing with link
  },
  createButtonContent: {
    height: 48,
  },
  resetButton: {
    marginTop: 'auto',
  },
});

export default CreateLobbyModal;