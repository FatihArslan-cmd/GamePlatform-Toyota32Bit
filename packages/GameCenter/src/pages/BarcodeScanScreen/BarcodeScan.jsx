import React, {  useCallback } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';
import { useFocusEffect } from '@react-navigation/native';
import CameraView from './CameraView';
import PermissionHandler from "./PermissionHandler";

const BarcodeScan = () => {
  const { hasPermission, requestPermission } = useCameraPermission();

  useFocusEffect(
    useCallback(() => {
      if (!hasPermission) {
        requestPermission();
      }
    }, [hasPermission, requestPermission])
  );

  return (
    <SafeAreaView style={styles.container}>
      {hasPermission ? <CameraView /> : <PermissionHandler />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BarcodeScan;