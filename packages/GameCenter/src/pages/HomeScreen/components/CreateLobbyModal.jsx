import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { TextInput, Button, Text, HelperText, Chip, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomSheet from '..../../../components/BottomSheet'

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

  const handleDateChange = useCallback((type, selectedDate) => {
    const currentDate = selectedDate || (type === 'start' ? startDate : endDate);
    if (type === 'start') {
      setShowStartPicker(Platform.OS === 'ios');
      setStartDate(currentDate);
    } else {
      setShowEndPicker(Platform.OS === 'ios');
      setEndDate(currentDate);
    }
  }, [startDate, endDate]);

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
  }, [lobbyType, startDate, endDate]);

  const renderDateTimePicker = (type) => {
    const show = type === 'start' ? showStartPicker : showEndPicker;
    const date = type === 'start' ? startDate : endDate;
    
    if (!show && Platform.OS === 'android') return null;
    
    return (
      <DateTimePicker
        value={date}
        mode="datetime"
        is24Hour={true}
        display="default"
        onChange={(event, selectedDate) => handleDateChange(type, selectedDate)}
        minimumDate={type === 'end' ? startDate : new Date()}
        style={styles.dateTimePicker}
      />
    );
  };

  return (
    <BottomSheet
      visible={visible}
      onDismiss={onDismiss}
      title="Create Lobby"
      height={height}
      backgroundColor="white"
    >
      <View style={styles.container}>
        <View style={styles.lobbyTypeContainer}>
          <Text style={styles.label}>Lobby Type</Text>
          <Button
            mode={lobbyType === 'normal' ? 'contained' : 'outlined'}
            onPress={toggleLobbyType}
            style={styles.typeButton}
          >
            {lobbyType === 'normal' ? '🎮 Normal' : '📅 Event'}
          </Button>
        </View>

        {lobbyType === 'event' && (
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeField}>
              <Text style={styles.dateTimeLabel}>Start Time</Text>
              <Button
                mode="outlined"
                onPress={() => setShowStartPicker(true)}
                icon="clock-outline"
                style={styles.dateTimeButton}
              >
                {startDate.toLocaleString()}
              </Button>
              {renderDateTimePicker('start')}
            </View>

            <View style={styles.dateTimeField}>
              <Text style={styles.dateTimeLabel}>End Time</Text>
              <Button
                mode="outlined"
                onPress={() => setShowEndPicker(true)}
                icon="clock-outline"
                style={styles.dateTimeButton}
              >
                {endDate.toLocaleString()}
              </Button>
              {renderDateTimePicker('end')}
            </View>
          </View>
        )}

        {/* Game Selection with Autocomplete-like field */}
        <TextInput
          label="Select Game"
          mode="outlined"
          value={game}
          onChangeText={setGame}
          placeholder="Search for a game..."
          left={<TextInput.Icon icon="gamepad-variant" />}
          style={styles.input}
        />

        {/* Password Field with Toggle */}
        <TextInput
          label="Lobby Password (Optional)"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          right={
            <TextInput.Icon
              icon={isPasswordVisible ? "eye-off" : "eye"}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          }
          style={styles.input}
        />

        {/* Error Message */}
        {error ? (
          <HelperText type="error" visible={!!error}>
            {error}
          </HelperText>
        ) : null}

        {/* Create Button */}
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.createButton}
          contentStyle={styles.createButtonContent}
          icon="plus-circle"
        >
          Create Lobby
        </Button>

        {/* Invitation Link with Copy Feature */}
        {invitationLink && (
          <View style={styles.linkContainer}>
            <Chip
              mode="outlined"
              icon="link"
              style={styles.chip}
              onPress={() => {/* Implement copy to clipboard */}}
            >
              {invitationLink}
            </Chip>
            <IconButton
              icon="content-copy"
              size={20}
              onPress={() => {/* Implement copy to clipboard */}}
            />
          </View>
        )}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  lobbyTypeContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  typeButton: {
    marginTop: 8,
  },
  dateTimeContainer: {
    marginBottom: 20,
  },
  dateTimeField: {
    marginBottom: 16,
  },
  dateTimeLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  dateTimeButton: {
    width: '100%',
    marginTop: 4,
  },
  dateTimePicker: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  createButton: {
    marginTop: 24,
    paddingVertical: 8,
  },
  createButtonContent: {
    height: 48,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  chip: {
    flex: 1,
    marginRight: 8,
  },
});

export default CreateLobbyModal;