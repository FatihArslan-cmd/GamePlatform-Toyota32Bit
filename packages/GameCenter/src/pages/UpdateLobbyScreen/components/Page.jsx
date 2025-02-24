import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Surface, Text } from 'react-native-paper';
import { useLobbyUpdate } from '../context/LobbyUpdateContext';
import EmptyState from '../../../components/EmptyState';
import ErrorComponents from '../../../components/ErrorComponents';
import LobbyTypeSegmentedButtons from './LobbyTypeSegmentedButtons';
import DatePickerInput from './DatePickerInput';
import LobbyUpdateButton from './LobbyUpdateButton';
import TextInputWithIcon from './TextInputWithIcon';


const Page = () => {
  const {
    lobby,
    loading,
    error,
    lobbyName,
    setLobbyName,
    maxCapacity,
    setMaxCapacity,
    handleUpdateLobby: contextHandleUpdateLobby,
  } = useLobbyUpdate();

  const [lobbyType, setLobbyType] = useState(lobby?.lobbyType || 'Normal');
  const [startDate, setStartDate] = useState(lobby?.startDate ? new Date(lobby.startDate) : new Date());
  const [endDate, setEndDate] = useState(lobby?.endDate ? new Date(lobby.endDate) : new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleUpdateLobby = useCallback(async () => {
    const updates = {
      lobbyName: lobbyName,
      maxCapacity: parseInt(maxCapacity, 10),
      lobbyType: lobbyType,
      startDate: lobbyType === 'Event' ? startDate.toISOString() : null,
      endDate: lobbyType === 'Event' ? endDate.toISOString() : null,
    };
    await contextHandleUpdateLobby(updates);
  }, [lobbyName, maxCapacity, lobbyType, startDate, endDate, contextHandleUpdateLobby]);

  const onStartDateChange = useCallback((selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  }, [startDate, setStartDate, setShowStartDatePicker]);

  const onEndDateChange = useCallback((selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  }, [endDate, setEndDate, setShowEndDatePicker]);


  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorComponents message={error} />
      </SafeAreaView>
    );
  }

  if (!lobby) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <EmptyState />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Surface style={styles.card} elevation={4}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Update Lobby</Text>
          </View>

          <TextInputWithIcon
            label="Lobby Name"
            value={lobbyName}
            onChangeText={setLobbyName}
            placeholder="Enter lobby name"
            iconName="tag"
          />

          <TextInputWithIcon
            label="Max Capacity"
            value={maxCapacity}
            onChangeText={setMaxCapacity}
            placeholder="Enter max capacity"
            keyboardType="number-pad"
            iconName="account-group"
          />

          <LobbyTypeSegmentedButtons
            value={lobbyType}
            onValueChange={setLobbyType}
          />

          {lobbyType === 'Event' && (
            <>
              <DatePickerInput
                label="Start Date"
                date={startDate}
                setDate={setStartDate}
                showPicker={showStartDatePicker}
                setShowPicker={setShowStartDatePicker}
                onDateChange={onStartDateChange}
                minimumDate={new Date()}
              />

              <DatePickerInput
                label="End Date"
                date={endDate}
                setDate={setEndDate}
                showPicker={showEndDatePicker}
                setShowPicker={setShowEndDatePicker}
                onDateChange={onEndDateChange}
                minimumDate={startDate}
              />
            </>
          )}

          <LobbyUpdateButton
            loading={loading}
            handleUpdateLobby={handleUpdateLobby}
          />
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Orbitron-ExtraBold',
    marginLeft: 10,
    color: '#333',
  },
});

export default Page;