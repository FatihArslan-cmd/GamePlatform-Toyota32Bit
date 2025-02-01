import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomModal from '../../../../components/CustomModal';
import { getRefreshToken, refreshAccessToken } from '../../../../shared/states/api';
import { handlePostLoginActions } from './handlePostLoginActions';
import { authenticateWithFingerprint } from '../Biometrics/FingerPrint';
import { HandleNFCRead } from '../Biometrics/NfcReadScreen';
import PermissionsIcon from './renderIcons';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../../../../utils/storage';

const PermissionsModal = ({ visible, onDismiss, permissions, setIsLoading }) => {
  const [activePermission, setActivePermission] = useState(null);
  const navigation = useNavigation();


  const handlePermissionAction = async (permissionType) => {
    try {
      switch (permissionType) {
        case 'biometric':
          await HandleFingerprintAuth();
          break;
        case 'nfc':
          await HandleNFC();
          break;
        case 'barcode':
          HandleBarcode();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error handling permission ${permissionType}:`, error);
    }
  };

  const HandleFingerprintAuth = async () => {
    try {
      setActivePermission('finger');
      const isAuthenticated = await authenticateWithFingerprint();
      setActivePermission(null);
      if (isAuthenticated) {
        await HandleLoading();
      }
    } catch (error) {
      console.error('Error during fingerprint authentication:', error);
    }
  };

 
  const HandleNFC = async () => {
    try {
      setActivePermission('nfc');
      const isNfcValid = await HandleNFCRead();
      setActivePermission(null);
      if (isNfcValid) {
        await HandleLoading();
      }
    } catch (error) {
      console.error('Error during NFC operation:', error);
    }
  };
  const HandleBarcode = async () => {
    try {
        setActivePermission('barcode');

        const hasQR = storage.contains('qrCode');
        onDismiss();
        if (hasQR) {
            navigation.navigate('BarcodeScan', {
                onBarcodeSuccess: async () => {
                    setActivePermission(null);
                    await HandleLoading();
                }
            });
        } else {
            navigation.navigate('QRCode',{
               onBarcodeSuccess: async () => {
                    setActivePermission(null);
                    await HandleLoading();
                }
            });
        }
    } catch (error) {
        console.error('Error during Barcode operation:', error);
        setActivePermission(null);
    }
};
  const HandleLoading = async () => {
    try {
      setIsLoading(true);
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        setIsLoading(false);
        return;
      }

      const accessToken = await refreshAccessToken(refreshToken);
      if (accessToken) {
        onDismiss();
        await handlePostLoginActions(setIsLoading, navigation);
      }
    } catch (error) {
      console.error('Error during token refresh:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <PermissionsIcon permissions={permissions} onPermissionSelect={handlePermissionAction} />
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