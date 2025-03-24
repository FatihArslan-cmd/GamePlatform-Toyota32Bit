import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Surface, Text } from 'react-native-paper';
import EmptyState from '../../../components/EmptyState';
import ErrorComponents from '../../../components/ErrorComponents';
import LobbyTypeSegmentedButtons from './LobbyTypeSegmentedButtons';
import DatePickerInput from './DatePickerInput';
import LobbyUpdateButton from './LobbyUpdateButton';
import TextInputWithIcon from './TextInputWithIcon';
import { UserContext } from '../../../context/UserContext';
import { useTheme } from '../../../context/ThemeContext';
import{ useLobbyUpdate }from '../context/LobbyUpdateContext';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Page = () => {
  const {
    lobby,
    loading,
    error,
    lobbyName,
    setLobbyName,
    maxCapacity,
    setMaxCapacity,
    lobbyType,
  } = useLobbyUpdate();

  const { user } = useContext(UserContext);
  const { colors } = useTheme();
  const { t } = useTranslation(); 


  if (error) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <ErrorComponents message={error} />
      </SafeAreaView>
    );
  }

  if (!lobby) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <EmptyState />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Surface style={[styles.card, { backgroundColor: colors.card }]} elevation={4}>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: colors.text }]}>{t('updateLobbyScreen.headerTitle')}</Text> 
          </View>

          <TextInputWithIcon
            label={t('updateLobbyScreen.lobbyNameLabel')}
            value={lobbyName}
            onChangeText={setLobbyName}
            placeholder={t('updateLobbyScreen.lobbyNamePlaceholder')} 
            iconName="tag"
          />

          <TextInputWithIcon
            label={t('updateLobbyScreen.maxCapacityLabel')} 
            value={maxCapacity}
            onChangeText={setMaxCapacity}
            placeholder={t('updateLobbyScreen.maxCapacityPlaceholder')} 
            keyboardType="number-pad"
            iconName="account-group"
          />

          <LobbyTypeSegmentedButtons />

          {lobbyType === 'Event' && (
            <>
              <DatePickerInput
                label={t('updateLobbyScreen.startDateLabel')} 
                dateType="startDate"
              />

              <DatePickerInput
                label={t('updateLobbyScreen.endDateLabel')} 
                dateType="endDate"
              />
            </>
          )}

          <LobbyUpdateButton />
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 20,
    padding: 24,
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
  },
  unauthorizedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  unauthorizedText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default Page;