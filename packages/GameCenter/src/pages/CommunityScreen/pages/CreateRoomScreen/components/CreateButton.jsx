import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { isTablet } from "../../../../../utils/isTablet";
import { useCreateRoom } from "../context/CreateRoomContext";

const TABLET_DEVICE = isTablet();

const CreateButton = () => {
  const { loading, isCreateSuccess, handleCreateRoom } = useCreateRoom(); 
  const { t } = useTranslation();

  return (
    <Button
      mode="contained"
      onPress={handleCreateRoom}
      loading={loading}
      disabled={loading || isCreateSuccess}
      style={styles.createButton}
      contentStyle={styles.createButtonContent}
      labelStyle={{ color: 'white' }}
    >
      <Text style={{ fontFamily: 'Orbitron-ExtraBold', color: 'white', fontSize: TABLET_DEVICE ? 16 : 11 }}>
        {t('communityScreen.Create Room')}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  createButton: {
    borderRadius: 10,
    backgroundColor: '#007bff',
  },
  createButtonContent: {
    height: TABLET_DEVICE ? 50 : 35,
  },
});

export default CreateButton;