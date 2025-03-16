import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomModal from '../../../../../../components/CustomModal';
import { usePermissionsContext } from '../../../../context/PermissionContext';
import PermissionsIcon from './PermissionsIcon';

const PermissionsModal = () => {
  const [activePermission, setActivePermission] = useState(null);

  const {
    visible,
    onDismiss,
    handlePermissionAction,
  } = usePermissionsContext();


  return (
    <CustomModal
      visible={visible}
      onDismiss={onDismiss}
      title={activePermission === 'nfc' ? 'NFC Operation' : 'Permissions'}
      text={
        activePermission === 'nfc'
          ? 'Please bring your device close to the NFC tag.'
          : 'Here are your permissions:'
      }
      showConfirmButton={false}
    >
      <View style={styles.permissionsContainer}>
        <PermissionsIcon handlePermissionAction={handlePermissionAction}/>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  permissionsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

export default PermissionsModal;