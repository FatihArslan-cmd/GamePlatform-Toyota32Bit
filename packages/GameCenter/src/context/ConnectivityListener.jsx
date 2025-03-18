import React, { useEffect, useRef, useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { Snackbar,Text } from 'react-native-paper';
import { View } from 'react-native';

const ConnectivityListener = ({ children }) => {
  const netInfo = useNetInfo();
  const isConnected = netInfo.isConnected;
  const previousIsConnected = useRef(isConnected);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarBackgroundColor, setSnackbarBackgroundColor] = useState('');

  useEffect(() => {
    if (previousIsConnected.current === true && isConnected === false) {
      setSnackbarMessage('Internet connection lost!');
      setSnackbarBackgroundColor('red');
      setSnackbarVisible(true);
    } else if (previousIsConnected.current === false && isConnected === true) {
      setSnackbarMessage('Internet connection restored!');
      setSnackbarBackgroundColor('green');
      setSnackbarVisible(true);
    }
    previousIsConnected.current = isConnected;
  }, [isConnected]);

  const onDismissSnackbar = () => setSnackbarVisible(false);

  return (
    <View style={{ flex: 1 }}>
      {children}
      <Snackbar
  visible={snackbarVisible}
  onDismiss={onDismissSnackbar}
  duration={Snackbar.DURATION_SHORT}
  style={{ backgroundColor: snackbarBackgroundColor }}
  wrapperStyle={{ justifyContent: 'center' }} 
>
  <Text 
    style={{ 
      textAlign: 'center', 
      fontFamily: 'Orbitron-ExtraBold', 
      flex: 1, 
      color: 'white', 
      fontSize: 16, 
    }}
  >
    {snackbarMessage}
  </Text>
   </Snackbar>
    </View>
  );
};

export default ConnectivityListener;