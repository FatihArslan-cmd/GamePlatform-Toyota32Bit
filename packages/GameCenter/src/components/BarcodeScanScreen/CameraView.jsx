import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScannerOverlay from "./ScannerOverlay";
import ActionButtons from './ActionButtons';
import { storage } from '../../utils/storage';

const CameraView = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [flashMode, setFlashMode] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [storedQrCode, setStoredQrCode] = useState(null);
  const device = useCameraDevice(cameraPosition);
  const navigation = useNavigation();
  const route = useRoute();

  const { onBarcodeSuccess, onBarcodeScanned } = route.params; // Yeni fonksiyonu da al

  useEffect(() => {
    const fetchQrCode = async () => {
        if(storage.contains('qrCode')) {
      const qrCode = await storage.get('qrCode');
      setStoredQrCode(qrCode);
    }
    };

    fetchQrCode();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['code-128', 'qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        setIsScanning(false);
        const { value } = codes[0];
          
          if (storedQrCode && value === storedQrCode) {
            onBarcodeSuccess(); // Eşleşirse sadece bu fonksiyon çalışır
          }  else {
            if (onBarcodeScanned && typeof onBarcodeScanned === 'function') {
               onBarcodeScanned(value); 
            }
           
          }
      }
    },
  });


  const toggleFlash = () => {
    setFlashMode((prev) => !prev);
  };

  const toggleCamera = () =>
    setCameraPosition((prev) => (prev === 'back' ? 'front' : 'back'));

  const goBack = () => {
    navigation.goBack();
  };

  const zoomIn = () => {
    if (zoomLevel < 3) {
      setZoomLevel((prevZoom) => prevZoom + 0.1);
    }
  };

  const zoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel((prevZoom) => prevZoom - 0.1);
    }
  };


  if (!device) {
    return <View style={styles.noDeviceContainer}>
    </View>
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessorFps={2}
        torch={flashMode ? 'on' : 'off'}
        zoom={zoomLevel}
        codeScanner={isScanning ? codeScanner : undefined}
      />
      <ScannerOverlay />

      <ActionButtons
        toggleFlash={toggleFlash}
        flashMode={flashMode}
        toggleCamera={toggleCamera}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        goBack={goBack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    noDeviceContainer: {
        flex: 1,
        backgroundColor: 'black',
    }
});

export default CameraView;