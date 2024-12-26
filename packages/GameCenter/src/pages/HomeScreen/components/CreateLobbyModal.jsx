import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text, Switch, SegmentedButtons, List, Modal, Portal, IconButton } from 'react-native-paper';
import CustomModal from '../../../components/CustomModal';

const GAME_LIST = [
  { id: '1', title: 'Game 1' },
  { id: '2', title: 'Game 2' },
  { id: '3', title: 'Game 3' },
];

const TimeInput = ({ label, value, onChange }) => (
  <View style={styles.timeContainer}>
    <Text style={styles.timeLabel}>{label}</Text>
    <View style={styles.timeInputContainer}>
      <IconButton icon="minus" size={20} onPress={() => onChange(Math.max(0, value - 1))} />
      <Text style={styles.timeValue}>{value.toString().padStart(2, '0')}</Text>
      <IconButton icon="plus" size={20} onPress={() => onChange(Math.min(23, value + 1))} />
    </View>
  </View>
);

const CreateLobbyModal = ({ visible, onDismiss }) => {
  const [eventType, setEventType] = useState('normal');
  const [startHour, setStartHour] = useState(12);
  const [endHour, setEndHour] = useState(13);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [password, setPassword] = useState('');
  const [hasPassword, setHasPassword] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showGameList, setShowGameList] = useState(false);

  const generateInviteCode = () => Math.random().toString(36).substring(2, 12).toUpperCase();

  const handleSave = useCallback(() => {
    const inviteCode = generateInviteCode();
    console.log({ eventType, startDate, endDate, startHour, endHour, password, selectedGame, inviteCode });
    onDismiss();
  }, [eventType, startDate, endDate, startHour, endHour, password, selectedGame]);

  return (
    <CustomModal visible={visible} onDismiss={onDismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Create New Lobby</Text>
        
        <SegmentedButtons
          value={eventType}
          onValueChange={setEventType}
          buttons={[
            { value: 'normal', label: 'Normal' },
            { value: 'event', label: 'Event' },
          ]}
          style={styles.segmentedButton}
        />

        {eventType === 'event' && (
          <>
            <View style={styles.dateInputContainer}>
              <TextInput
                mode="outlined"
                label="Start Date (DD/MM/YYYY)"
                value={startDate}
                onChangeText={setStartDate}
                style={styles.dateInput}
                placeholder="DD/MM/YYYY"
              />
              <TextInput
                mode="outlined"
                label="End Date (DD/MM/YYYY)"
                value={endDate}
                onChangeText={setEndDate}
                style={styles.dateInput}
                placeholder="DD/MM/YYYY"
              />
            </View>
            <View style={styles.timeInputContainer}>
              <TimeInput label="Start Time (hour)" value={startHour} onChange={setStartHour} />
              <TimeInput label="End Time (hour)" value={endHour} onChange={setEndHour} />
            </View>
          </>
        )}

        <List.Item
          title="Password Protection"
          right={() => (
            <Switch
              value={hasPassword}
              onValueChange={setHasPassword}
              color="#8a2be2"
            />
          )}
        />

        {hasPassword && (
          <TextInput
            mode="outlined"
            label="Lobby Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
        )}

        <Button
          mode="outlined"
          onPress={() => setShowGameList(true)}
          style={styles.gameButton}
        >
          {selectedGame ? `Selected: ${selectedGame.title}` : 'Select Game'}
        </Button>

        <Portal>
          <Modal
            visible={showGameList}
            onDismiss={() => setShowGameList(false)}
            contentContainerStyle={styles.gameListContainer}
          >
            {GAME_LIST.map((game) => (
              <List.Item
                key={game.id}
                title={game.title}
                onPress={() => {
                  setSelectedGame(game);
                  setShowGameList(false);
                }}
                right={(props) =>
                  selectedGame?.id === game.id && (
                    <List.Icon {...props} icon="check" />
                  )
                }
              />
            ))}
          </Modal>
        </Portal>

        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          labelStyle={styles.saveButtonLabel}
        >
          Create Lobby
        </Button>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Orbitron-VariableFont_wght',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  segmentedButton: {
    marginBottom: 16,
  },
  dateInputContainer: {
    gap: 8,
  },
  dateInput: {
    backgroundColor: 'transparent',
  },
  timeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 8,
  },
  timeContainer: {
    flex: 1,
    alignItems: 'center',
  },
  timeLabel: {
    color: '#fff',
    marginBottom: 4,
  },
  timeValue: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  input: {
    backgroundColor: 'transparent',
  },
  gameButton: {
    borderColor: '#8a2be2',
    marginVertical: 8,
  },
  gameListContainer: {
    backgroundColor: '#121212',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#8a2be2',
    marginTop: 16,
    borderRadius: 30,
  },
  saveButtonLabel: {
    fontSize: 16,
    fontFamily: 'Orbitron-VariableFont_wght',
    letterSpacing: 1,
  },
});

export default CreateLobbyModal;