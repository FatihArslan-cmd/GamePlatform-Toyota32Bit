import DatePickerInput from "./DatePickerInput";
import EmptyState from "../../../components/EmptyState";
import ErrorComponents from "../../../components/ErrorComponents";
import LobbyTypeSegmentedButtons from "./LobbyTypeSegmentedButtons";
import LobbyUpdateButton from "./LobbyUpdateButton";
import React, { useContext } from "react";
import TextInputWithIcon from "./TextInputWithIcon";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";

import{ useLobbyUpdate }from '../context/LobbyUpdateContext';

const TABLET_DEVICE = isTablet();

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

  const { colors } = useTheme();
  const { t } = useTranslation();


  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator animating={true} color={colors.primary} size="large" />
      </SafeAreaView>
    );
  }

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
    fontSize: TABLET_DEVICE ? 26 : 22,
    fontFamily: 'Orbitron-ExtraBold',
    marginLeft: 10,
  },
});

export default Page;