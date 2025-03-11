import React, { createContext, useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { getRefreshToken, refreshAccessToken } from '../../../shared/states/api';
import { authenticateWithFingerprint } from '../components/RememberMeModal/ProfileSection/Biometrics/FingerPrint';
import { HandleNFCRead } from '../components/RememberMeModal/ProfileSection/Biometrics/NfcReadScreen';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../../../utils/storage';
import { fetchAndStoreGames } from '../../../utils/api.js'; // Import fetchAndStoreGames here
import { UserContext } from '../../../context/UserContext';

const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
  const [activePermission, setActivePermission] = useState(null);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [permissions, setPermissions] = useState({ barcode: false, biometric: false, nfc: false });
  const [appIsLoading, setAppIsLoading] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(false);
  const { loginUser } = useContext(UserContext);


  const handlePostLoginActions = async () => {
    try {
        setAppIsLoading(true);
        await fetchAndStoreGames();
        const minimumDelay = 2500;
        const elapsedTime = Date.now() - Date.now();
        if (elapsedTime < minimumDelay) {
            await new Promise((resolve) => setTimeout(resolve, minimumDelay - elapsedTime));
        }
        navigation.navigate('Tabs');
    } catch (error) {
        console.error('Error during post-login actions:', error);
        setAppIsLoading(false);
    }
};

  const handlePermissionAction = async (permissionType) => {
    try {
      switch (permissionType) {
        case 'biometric':
          await handleFingerprintAuth();
          break;
        case 'nfc':
          await handleNfc();
          break;
        case 'barcode':
          handleBarcode();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error handling permission ${permissionType}:`, error);
    }
  };

  const handleFingerprintAuth = async () => {
    try {
      setActivePermission('finger');
      console.log('Fingerprint authentication started');
      const isAuthenticated = await authenticateWithFingerprint();
      console.log('Fingerprint authentication finished');
      console.log('isAuthenticated:', isAuthenticated);
      setActivePermission(null);
      if (isAuthenticated) {
        await handleLoading();
      }
    } catch (error) {
      console.error('Error during fingerprint authentication:', error);
    }
  };


  const handleNfc = async () => {
    try {
      setActivePermission('nfc');
      console.log('NFC operation started');
      const isNfcValid = await HandleNFCRead();
        console.log('NFC operation finished');
      setActivePermission(null);
      if (isNfcValid) {
        await handleLoading();
      }
    } catch (error) {
      console.error('Error during NFC operation:', error);
    }
  };
  const handleBarcode = async () => {
    try {
        setActivePermission('barcode');

        const hasQr = storage.contains('qrCode');
        setVisible(false); 
        if (hasQr) {
            navigation.navigate('BarcodeScan', {
                onBarcodeSuccess: async () => {
                    setActivePermission(null);
                    await handleLoading();
                }
            });
        } else {
            navigation.navigate('QRCode',{
               onBarcodeSuccess: async () => {
                    setActivePermission(null);
                    await handleLoading();
                }
            });
        }
    } catch (error) {
        console.error('Error during Barcode operation:', error);
        setActivePermission(null);
    }
  };
  const handleLoading = async () => {
    try {
      setAppIsLoading(true);
      const refreshToken = getRefreshToken();
      console.log('Refresh token:', refreshToken);
      if (!refreshToken) {
        setAppIsLoading(false);
        return;
      }
      console.log('test');

      const data = await refreshAccessToken(refreshToken); 
      if (data) {
        loginUser(data); 
        setVisible(false);
        await handlePostLoginActions();
      }
      console.log('Access token:', data?.accessToken); // Log accessToken from data (optional)
    } catch (error) {
      console.error('Error during token refresh:', error);
    } finally {
      setAppIsLoading(false);
    }
  };

  const value = {
    activePermission,
    setActivePermission,
    hasPermissions,
    setHasPermissions,
    visible,
    setVisible,
    onDismiss: () => setVisible(false),
    permissions,
    setPermissions,
    setAppIsLoading,
    appIsLoading,
    handlePermissionAction,
    handleFingerprintAuth,
    handleNfc,
    handleBarcode,
    handleLoading,
  };

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissionsContext = () => {
  return useContext(PermissionsContext);
};