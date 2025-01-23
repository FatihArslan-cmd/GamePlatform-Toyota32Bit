import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import BottomSheet from '../../../../components/BottomSheet';
import LobbyTypeSelector from './LobbyTypeSelector';
import CustomDateTimeSelector from './DateTimeSelector';
import GameSelector from './GameSelector';
import PasswordInput from './PasswordInput';
import InvitationLink from './InvitationLink';
import ToastMessage from '../../../../components/ToastMessage/Toast';
import useToast from '../../../../components/ToastMessage/hooks/useToast';
import { getToken } from '../../../../shared/states/api';
import CustomModal from '../../../../components/CustomModal';

const CreateLobbyModal = ({ visible, onDismiss, gameName: initialGameName }) => {
  const [lobbyType, setLobbyType] = useState('Normal');
  const [lobbyName, setLobbyName] = useState('');
  const [gameName, setGameName] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const { currentToast, showToast, hideToast } = useToast();

  useEffect(() => {
    if (initialGameName) {
      setGameName(initialGameName);
    }
  }, [initialGameName]);

  const toggleLobbyType = useCallback(() => {
    setLobbyType((current) => (current === 'Normal' ? 'Event' : 'Normal'));
  }, []);

    const handleDateTimeChange = useCallback((type, value) => {
      if(type === 'startDate'){
        setStartDate(value);
      } else {
        setEndDate(value)
      }
    }, []);


  const handleModalDismiss = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleSave = useCallback(async () => {
 
    const token = getToken();
 

    const requestBody = {
      lobbyName,
      lobbyType,
      gameName,
      code,
      maxCapacity: parseInt(maxCapacity, 10),
      password: password || null,
       startDate: lobbyType === 'Event' ? startDate.toISOString() : null,
        endDate: lobbyType === 'Event' ? endDate.toISOString() : null,
    };

    try {
      const response = await fetch('http://10.0.2.2:3000/api/lobby/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create lobby');
      }
      console.log(data);
      setCode(`${data.lobby.code}`);
      showToast('success', 'Lobby created successfully!');
    } catch (error) {
      setModalText(error.message);
      setModalVisible(true);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobbyName, lobbyType, gameName, password, maxCapacity, showToast, startDate, endDate]);

  const resetLobby = useCallback(() => {
    setLobbyType('Normal');
    setPassword('');
    setMaxCapacity('');
    setCode('');
    setError('');
    setGameName(initialGameName || ''); // Reset to initial if it exists, otherwise reset to empty string
    setLobbyName('');
      setStartDate(new Date());
    setEndDate(new Date());
  }, [initialGameName]);

  const bottomSheetHeight = lobbyType === 'Normal' ? '50%' : '70%';

  return (
    <BottomSheet
      visible={visible}
      onDismiss={onDismiss}
      title="Create Lobby"
      height={bottomSheetHeight}
      backgroundColor="white"
    >
      <View style={styles.container}>
        {!code ? (
          <>
            <LobbyTypeSelector lobbyType={lobbyType} onToggle={toggleLobbyType} />
            {lobbyType === 'Event' && (
              <CustomDateTimeSelector
               onDateTimeChange={handleDateTimeChange}
                initialStartDate={startDate}
                initialEndDate={endDate}
               />
            )}
            <GameSelector
              gameName={gameName}
              lobbyName={lobbyName}
              maxCapacity={maxCapacity}
              onGameNameChange={setGameName}
              onLobbyNameChange={setLobbyName}
              onMaxCapacityChange={setMaxCapacity}
              editableGameName={!initialGameName} // Pass the editability based on initialGameName
            />
            <PasswordInput
              password={password}
              isPasswordVisible={isPasswordVisible}
              onPasswordChange={setPassword}
              onToggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
            />
            <Button
              mode="contained"
              onPress={handleSave}
              style={[
                styles.createButton,
                code && styles.createButtonWithLink,
              ]}
              contentStyle={styles.createButtonContent}
              icon="plus-circle"
            >
              Create Lobby
            </Button>
          </>
        ) : (
          <View style={styles.successContainer}>
            <InvitationLink code={code} />
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
      <CustomModal
        visible={modalVisible}
        onDismiss={handleModalDismiss}
        text={modalText}
        title="Error"
      />
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