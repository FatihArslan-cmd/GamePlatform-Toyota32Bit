import React ,{useState} from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomModal from '../../../../components/CustomModal';
import { getRefreshToken, refreshAccessToken } from '../../../../shared/states/api';
import { handlePostLoginActions } from './handlePostLoginActions';
import LoadingFullScreen from '../../../../components/LoadingFullScreen';

const PermissionsModal = ({ visible, onDismiss, permissions, navigation, setIsLoading }) => {
    const handleBarcodePress = async () => {
      try {
        setIsLoading(true); // Trigger loading state
        console.log('Barcode permission tapped!');
        const refreshToken = getRefreshToken();
        console.log('refreshToken', refreshToken);
        if (!refreshToken) {
          Alert.alert('Error', 'Refresh token not found.');
          setIsLoading(false);
          return;
        }
  
        const accessToken = await refreshAccessToken(refreshToken);
        console.log('accessToken', accessToken);
        if (accessToken) {
          onDismiss();
          await handlePostLoginActions(setIsLoading, navigation);
        }
      } catch (error) {
        Alert.alert('Error', error.message || 'An error occurred while processing permissions.');
      } finally {
        setIsLoading(false); // Reset loading state
      }
    };
  
    const renderIcons = () => {
      const iconMap = {
        barcode: {
          name: 'qr-code-scanner',
          onPress: handleBarcodePress,
        },
        biometric: {
          name: 'fingerprint',
          onPress: () => Alert.alert('Biometric', 'Biometric permission tapped!'),
        },
        nfc: {
          name: 'nfc',
          onPress: () => Alert.alert('NFC', 'NFC permission tapped!'),
        },
      };
  
      return Object.keys(permissions)
        .filter((key) => permissions[key])
        .map((key) => (
          <TouchableRipple
            key={key}
            style={styles.iconWrapper}
            onPress={iconMap[key]?.onPress}
          >
            <Icon name={iconMap[key].name} size={80} color="#8a2be2" />
          </TouchableRipple>
        ));
    };
  
    return (
      <CustomModal
        visible={visible}
        onDismiss={onDismiss}
        title="Permissions"
        text="Here are your permissions:"
        showConfirmButton={false}
      >
        <View style={styles.permissionsContainer}>{renderIcons()}</View>
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
  iconWrapper: {
    marginHorizontal: 25,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PermissionsModal;
