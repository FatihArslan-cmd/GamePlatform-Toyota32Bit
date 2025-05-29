import React from "react";
import { useTranslation } from "react-i18next";
import { TextInput } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";
import { useCreateRoom } from "../context/CreateRoomContext";

const TABLET_DEVICE = isTablet();

const RoomNameInput = () => {
  const { roomName, setRoomName } = useCreateRoom();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const renderClearIcon = () => {
    if (roomName && roomName.length > 0) {
      return (
        <TextInput.Icon
          icon="close"
          size={TABLET_DEVICE ? 24 : 16}
          color={colors.subText}
          onPress={() => setRoomName('')}
          accessibilityLabel={t('communityScreen.clearInput')}
        />
      );
    }
    return null;
  };

  return (
    <TextInput
      label={t('communityScreen.roomName')}
      value={roomName}
      onChangeText={setRoomName}
      style={{ backgroundColor: colors.card }}
      mode="outlined"
      left={<TextInput.Icon icon="account-group" size={TABLET_DEVICE ? 24 : 16} color={colors.primary} />}
      right={renderClearIcon()}
      outlineColor={colors.border}
      activeOutlineColor={colors.primary}
      textColor={colors.text}
      theme={{
        roundness: 15,
        colors: {
          primary: colors.primary,
          background: colors.card,
          text: colors.text,
          placeholder: colors.subText, 
          onSurface: colors.text,
          onSurfaceDisabled: colors.subText
        },
        fonts: {
          regular: {
            fontFamily: 'Orbitron-ExtraBold',
          },
          medium: {
             fontFamily: 'Orbitron-ExtraBold',
             fontWeight: 'normal', 
          }
        },
      }}
    />
  );
};

export default RoomNameInput;