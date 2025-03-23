import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useCreateRoom } from '../context/CreateRoomContext';
import { useTheme } from '../../../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const RoomNameInput = () => {
  const { roomName, setRoomName } = useCreateRoom();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation();

  return (
    <TextInput
      label={t('communityScreen.roomName')}
      value={roomName}
      onChangeText={setRoomName}
      style={[styles.input, {backgroundColor: colors.card}]}
      mode="outlined"
      left={<TextInput.Icon icon="account-group" color={colors.primary} />}
      outlineColor={colors.border}
      activeOutlineColor={colors.primary}
      textColor={colors.text}
      theme={{
        roundness: 10,
        colors: {
          primary: colors.primary,
          background: colors.card,
          text: colors.text,
          placeholder: colors.subText,
          onSurface: colors.text,
          onSurfaceDisabled: colors.subText
        },
      }}
    />
  );
};

const createStyles = (colors) => StyleSheet.create({
  input: {
    backgroundColor: colors.card,
  },
});

export default RoomNameInput;