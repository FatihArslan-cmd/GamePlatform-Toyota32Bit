import React, { createContext, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../context/UserContext";
import { getRefreshToken, refreshAccessToken } from "../../../shared/states/api";
import { fetchAndStoreGames } from "../../../utils/api.js";
import { storage } from "../../../utils/storage";
import { authenticateWithFingerprint } from "../components/RememberMeModal/ProfileSection/Biometrics/FingerPrint";
import { HandleNFCRead } from "../components/RememberMeModal/ProfileSection/Biometrics/NfcReadScreen";

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
        const startTime = Date.now();
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minimumDelay) {
            await new Promise((resolve) => setTimeout(resolve, minimumDelay - elapsedTime));
        }
        navigation.navigate('Tabs');
    } catch (error) {
        console.error('Error during post-login actions:', error);
    } finally {
        setAppIsLoading(false);
    }
  };

  const dismissModalAndReset = () => {
    setVisible(false);
    setActivePermission(null);
  };


  const handlePermissionAction = async (permissionType) => {
    try {
        setActivePermission(permissionType);

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
                setActivePermission(null);
                break;
        }
    } catch (error) {
      console.error(`Error handling permission ${permissionType}:`, error);
      setActivePermission(null);
    }
  };

  const handleFingerprintAuth = async () => {
    try {
      console.log('Fingerprint authentication started');
      const isAuthenticated = await authenticateWithFingerprint();
      console.log('Fingerprint authentication finished, isAuthenticated:', isAuthenticated);
      if (isAuthenticated) {
        await handleLoading();
      } else {
         setActivePermission(null);
      }
    } catch (error) {
      console.error('Error during fingerprint authentication:', error);
      setActivePermission(null);
    }
  };


  const handleNfc = async () => {
    try {
      console.log('NFC operation started');
      const isNfcValid = await HandleNFCRead();
      console.log('NFC operation finished, isNfcValid:', isNfcValid);
      if (isNfcValid) {
        await handleLoading();
      } else {
         setActivePermission(null);
      }
    } catch (error) {
      console.error('Error during NFC operation:', error);
      setActivePermission(null);
    }
  };

  const handleBarcode = async () => {
    try {
        const hasQr = storage.contains('qrCode');
        setVisible(false);

        const navigateTo = hasQr ? 'BarcodeScan' : 'QRCode';

        navigation.navigate(navigateTo, {
            onBarcodeSuccess: async () => {
                setActivePermission(null);
                await handleLoading();
            },
        });

    } catch (error) {
        console.error('Error during Barcode operation:', error);
        setActivePermission(null);
    }
  };

  const handleLoading = async () => {
    try {
      setAppIsLoading(true);
      const refreshToken = getRefreshToken();
      console.log('Refresh token:', refreshToken ? 'Found' : 'Not Found');

      if (!refreshToken) {
        console.warn('No refresh token found. Cannot auto-login.');
        dismissModalAndReset();
        return;
      }

      console.log('Attempting token refresh...');
      const data = await refreshAccessToken(refreshToken);

      if (data && data.accessToken) {
        console.log('Token refresh successful.');
        loginUser(data);
        dismissModalAndReset();
        await handlePostLoginActions();
      } else {
          console.warn('Token refresh did not return valid data.');
           dismissModalAndReset();
      }
    } catch (error) {
      console.error('Error during token refresh or handleLoading:', error);
      dismissModalAndReset();
    }
  };

  const value = {
    activePermission,
    setActivePermission,
    hasPermissions,
    setHasPermissions,
    visible,
    setVisible,
    onDismiss: dismissModalAndReset,
    permissions,
    setPermissions,
    setAppIsLoading,
    appIsLoading,
    handlePermissionAction,
  };

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissionsContext = () => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissionsContext must be used within a PermissionsProvider');
  }
  return context;
};