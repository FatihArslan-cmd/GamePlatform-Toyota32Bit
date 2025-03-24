import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useCreateRoom } from '../context/CreateRoomContext';
import {useTranslation} from 'react-i18next';

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
      <Text style={{ fontFamily: 'Orbitron-ExtraBold', color: 'white' }}>
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
    height: 50,
  },
});

export default CreateButton;