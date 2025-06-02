import ActionButtons from "./ActionButtons";
import React, { useEffect, useState } from "react";
import ScannerOverlay from "./ScannerOverlay";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Camera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";

const CameraView = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [flashMode, setFlashMode] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [zoomLevel, setZoomLevel] = useState(1);

  const device = useCameraDevice(cameraPosition);
  const navigation = useNavigation();
  const route = useRoute();

  const { onBarcodeSuccess, onBarcodeScanned } = route.params;

  const codeScanner = useCodeScanner({
    codeTypes: ['code-128', 'qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && isScanning) {
        setIsScanning(false);

        const { value } = codes[0];

        if (onBarcodeScanned && typeof onBarcodeScanned === 'function') {
           onBarcodeScanned(value);
        }
                navigation.goBack();
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
    if (device?.maxZoom && zoomLevel < device.maxZoom) {
      setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, device.maxZoom));
    } else if (zoomLevel < 3) {
       setZoomLevel((prevZoom) => prevZoom + 0.1);
    }
  };

  const zoomOut = () => {
    if (device?.minZoom && zoomLevel > device.minZoom) {
       setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, device.minZoom));
    } else if (zoomLevel > 1) {
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
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CameraView;