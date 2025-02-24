// src/components/DatePickerInput.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DatePickerInput = ({ label, date, setDate, showPicker, setShowPicker, onDateChange, minimumDate }) => {
  const formatDate = (date) => {
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowPicker(true)}
      >
        <Icon name="calendar" size={24} color="#8a2be2" />
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={minimumDate}
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
    color: '#333',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8a2be2',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default DatePickerInput;