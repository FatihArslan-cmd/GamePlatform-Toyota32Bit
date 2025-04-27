import CustomModal from "../../../../../../components/CustomModal";
import LottieView from "lottie-react-native";
import PermissionsIcon from "./PermissionsIcon";
import React from "react";
import { StyleSheet, View } from "react-native";
import { isTablet } from "../../../../../../utils/isTablet";
import { usePermissionsContext } from "../../../../context/PermissionContext";

const nfcScanAnimation = require('../../../../../../locales/lottie/NFC-animation.json');
const TABLET_DEVICE = isTablet();

const PermissionsModal = () => {
  const {
    visible,
    onDismiss,
    handlePermissionAction,
    activePermission,
  } = usePermissionsContext();

  const modalTitle = activePermission === 'nfc' ? 'NFC Operation' : 'Permissions';
  const modalText = activePermission === 'nfc'
    ? 'Please bring your device close to the NFC tag.'
    : 'Here are your permissions:';

  return (
    <CustomModal
      visible={visible}
      onDismiss={onDismiss}
      title={modalTitle}
      text={modalText}
      showConfirmButton={false} 
    >
      {activePermission === null && (
        <View style={styles.permissionsContainer}>
          <PermissionsIcon handlePermissionAction={handlePermissionAction}/>
        </View>
      )}

      {activePermission === 'nfc' && (
        <View style={styles.lottieContainer}>
          <LottieView
            source={nfcScanAnimation} 
            autoPlay={true} 
            loop={true} 
            style={styles.lottieAnimation} 
          />
        </View>
      )}
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
  lottieContainer: {
    marginTop: 20,
    alignItems: 'center', 
  },
  lottieAnimation: {
    width: TABLET_DEVICE ? 250 : 150,
    height: TABLET_DEVICE ? 250 : 150, 
  },
});

export default PermissionsModal;