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

  const dismissModalAndReset = () => {
    setVisible(false);
    setActivePermission(null);
  };

  const handlePostLoginActions = async () => {
    try {
        await fetchAndStoreGames();
        const minimumDelay = 2500;
        const startTime = Date.now();
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minimumDelay) {
            await new Promise((resolve) => setTimeout(resolve, minimumDelay - elapsedTime));
        }
        dismissModalAndReset();
        navigation.navigate('Tabs');
    } catch (error) {
        console.error('Error during post-login actions:', error);
        dismissModalAndReset();
    } finally {
        // setAppIsLoading is handled in handleLoading's finally
    }
  };

  const handleLoading = async () => {
    setAppIsLoading(true);

    try {
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
        console.log('Token refresh successful. Logging user in.');
        dismissModalAndReset();
        loginUser(data);
        await handlePostLoginActions();
      } else {
          console.warn('Token refresh did not return valid data.');
          dismissModalAndReset();
      }
    } catch (error) {
      console.error('Error during token refresh or handleLoading:', error);
      dismissModalAndReset();
    } finally {
        setAppIsLoading(false);
    }
  };

  const handleFingerprintAuth = async () => {
    try {
      console.log('Fingerprint authentication started');
      const isAuthenticated = await authenticateWithFingerprint();
      console.log('Fingerprint authentication finished, isAuthenticated:', isAuthenticated);
      if (isAuthenticated) {
        console.log('Biometric authentication successful. Proceeding to loading...');
        await handleLoading();
      } else {
         console.log('Biometric authentication failed, cancelled, or not available.');
         dismissModalAndReset();
      }
    } catch (error) {
      console.error('Error during fingerprint authentication:', error);
      dismissModalAndReset();
    }
  };

  const handleNfc = async () => {
    try {
      console.log('NFC operation started');
      const isNfcValid = await HandleNFCRead();
      console.log('NFC operation finished, isNfcValid:', isNfcValid);
      if (isNfcValid) {
        console.log('NFC successful (ID matched). Proceeding to loading...');
        await handleLoading();
      } else {
         console.log('NFC failed or invalid ID.');
         dismissModalAndReset();
      }
    } catch (error) {
      console.error('Error during NFC operation:', error);
      dismissModalAndReset();
    }
  };

  const handleBarcode = async () => {
    try {
        dismissModalAndReset();

        const hasQr = storage.contains('qrCode');
        const navigateTo = hasQr ? 'BarcodeScan' : 'QRCode';

        navigation.navigate(navigateTo, {
            onBarcodeSuccess: async () => {
                console.log('Barcode successful. Proceeding to loading...');
                await handleLoading();
            },
        });

    } catch (error) {
        console.error('Error during Barcode operation:', error);
        dismissModalAndReset();
    }
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
                dismissModalAndReset();
                break;
        }
    } catch (error) {
      console.error(`Error handling permission ${permissionType}:`, error);
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