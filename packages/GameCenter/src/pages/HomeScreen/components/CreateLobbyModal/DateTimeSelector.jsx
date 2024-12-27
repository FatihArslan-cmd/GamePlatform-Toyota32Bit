import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Button, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimeSelector = ({ 
  showStartPicker,
  showEndPicker,
  startDate,
  endDate,
  onShowStartPicker,
  onShowEndPicker,
  onDateChange 
}) => {
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
        onChange={(event, selectedDate) => onDateChange(type, selectedDate)}
        minimumDate={type === 'end' ? startDate : new Date()}
        style={styles.dateTimePicker}
      />
    );
  };

  return (
    <View style={styles.dateTimeContainer}>
      <View style={styles.dateTimeField}>
        <Text style={styles.dateTimeLabel}>Start Time</Text>
        <Button
          mode="outlined"
          onPress={() => onShowStartPicker(true)}
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
          onPress={() => onShowEndPicker(true)}
          icon="clock-outline"
          style={styles.dateTimeButton}
        >
          {endDate.toLocaleString()}
        </Button>
        {renderDateTimePicker('end')}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateTimeContainer: {
    marginBottom: 20,
  },
  dateTimeField: {
    marginBottom: 16,
  },
  dateTimeLabel: {
    color: '#8a2be2',
    fontSize: 16,
    fontFamily: 'Orbitron-VariableFont_wght',
    letterSpacing: 1,
  },
  dateTimeButton: {
    width: '100%',
    marginTop: 4,
  },
  dateTimePicker: {
    width: '100%',
  },
});

export default DateTimeSelector;