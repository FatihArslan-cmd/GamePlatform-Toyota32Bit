import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";

const CustomDateTimeSelector = ({ onDateTimeChange, initialStartDate, initialEndDate }) => {
  const [startDate, setStartDate] = useState(initialStartDate || new Date());
  const [endDate, setEndDate] = useState(initialEndDate || new Date());
  const [pickerConfig, setPickerConfig] = useState({
    mode: 'date',
    type: null, 
    show: false,
  });
  const { colors } = useTheme(); 

  useEffect(() => {
    if (initialStartDate) {
      setStartDate(initialStartDate);
    }
    if (initialEndDate) {
      setEndDate(initialEndDate);
    }
  }, [initialStartDate, initialEndDate]);

  const openPicker = useCallback((type, mode) => {
    setPickerConfig({ mode, type, show: true });
  }, []);

  const closePicker = () => {
    setPickerConfig({ ...pickerConfig, show: false });
  };

  const onChange = useCallback((event, selectedDate) => {
    if (Platform.OS !== 'ios') closePicker();
    if (selectedDate) {
      let updatedDate;
      if (pickerConfig.mode === 'date') {
        updatedDate = new Date(selectedDate);
        updatedDate.setHours(pickerConfig.type === 'start' ? startDate.getHours() : endDate.getHours());
        updatedDate.setMinutes(pickerConfig.type === 'start' ? startDate.getMinutes() : endDate.getMinutes());
      } else { // mode === 'time'
        updatedDate = new Date(pickerConfig.type === 'start' ? startDate : endDate);
        updatedDate.setHours(selectedDate.getHours());
        updatedDate.setMinutes(selectedDate.getMinutes());
      }


      const newDate = new Date(updatedDate);
      if(pickerConfig.type === 'start'){
        setStartDate(newDate);
        onDateTimeChange('startDate', newDate);
      } else {
         setEndDate(newDate);
        onDateTimeChange('endDate', newDate);
      }
    }
  }, [pickerConfig, startDate, endDate, onDateTimeChange]);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Start Date and Time</Text>
      <View style={styles.selectors}>
        <View style={styles.dateSelector}>
          <Text style={styles.selectedText}>{formatDate(startDate)}</Text>
          <IconButton icon="calendar" onPress={() => openPicker('start', 'date')} iconColor={colors.text} /> 
        </View>
        <View style={styles.timeSelector}>
          <Text style={styles.selectedText}>{formatTime(startDate)}</Text>
          <IconButton icon="clock-outline" onPress={() => openPicker('start', 'time')} iconColor={colors.text} />
        </View>
      </View>

      <Text style={styles.label}>End Date and Time</Text>
      <View style={styles.selectors}>
        <View style={styles.dateSelector}>
          <Text style={styles.selectedText}>{formatDate(endDate)}</Text>
          <IconButton icon="calendar" onPress={() => openPicker('end', 'date')} iconColor={colors.text} /> 
        </View>
        <View style={styles.timeSelector}>
          <Text style={styles.selectedText}>{formatTime(endDate)}</Text>
          <IconButton icon="clock-outline" onPress={() => openPicker('end', 'time')} iconColor={colors.text} /> 
        </View>
      </View>

      {pickerConfig.show && (
        <DateTimePicker
          testID={`${pickerConfig.type}Picker`}
          value={pickerConfig.type === 'start' ? startDate : endDate}
          mode={pickerConfig.mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#8a2be2',
    fontFamily: 'Orbitron-ExtraBold',
    marginVertical: 12,
  },
  selectors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateSelector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  timeSelector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 8,
  },
  selectedText: {
    fontSize: 16,
    color: '#8a2be2',
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default CustomDateTimeSelector;