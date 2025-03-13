import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLobbyUpdate } from '../context/LobbyUpdateContext';
import { useTheme } from '../../../context/ThemeContext'; 

const DatePickerInput = ({ label, dateType }) => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showStartDatePicker,
    setShowStartDatePicker,
    showEndDatePicker,
    setShowEndDatePicker,
    onStartDateChange,
    onEndDateChange,
    formatDate
  } = useLobbyUpdate();
  const { colors } = useTheme(); 

  const currentDate = dateType === 'startDate' ? startDate : endDate;
  const setCurrentDate = dateType === 'startDate' ? setStartDate : setEndDate;
  const showPicker = dateType === 'startDate' ? showStartDatePicker : showEndDatePicker;
  const setShowPickerFunc = dateType === 'startDate' ? setShowStartDatePicker : setShowEndDatePicker;
  const onDateChangeHandler = dateType === 'startDate' ? onStartDateChange : onEndDateChange;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TouchableOpacity
        style={[styles.datePickerButton, { borderColor: colors.primary, backgroundColor: colors.card }]} 
        onPress={() => setShowPickerFunc(true)}
      >
        <Icon name="calendar" size={24} color={colors.primary} />  
        <Text style={[styles.dateText, { color: colors.text }]}>{formatDate(currentDate)}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display="default"
          onChange={onDateChangeHandler}
          minimumDate={dateType === 'endDate' ? startDate : new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',
    marginBottom: 8,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dateText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default DatePickerInput;