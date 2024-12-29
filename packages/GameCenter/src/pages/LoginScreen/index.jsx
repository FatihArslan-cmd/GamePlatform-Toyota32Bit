import React, { useState } from 'react';
import { StyleSheet, Animated,Linking } from 'react-native';
import FormSection from './components/FormSection';
import LogoSection from './components/LogoSection';
import LinearGradient from 'react-native-linear-gradient';
import ToastMessage from '../../components/ToastMessage/Toast';
import useToast from '../../components/ToastMessage/hooks/useToast';
const LoginScreen = () => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const { currentToast, showToast, hideToast } = useToast();

  const handleSendCode = () => {
    showToast('success', 'Verification code sent!');
    
    setTimeout(() => {
      Linking.openURL('https://gmail.app.goo.gl');
    }, 2000);

  };

  return (
      <>
      <LinearGradient
        colors={['#1a1b2e', '#2d0a3e', '#1a1b2e']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <LogoSection />
        <FormSection
          onSendCode={handleSendCode}
          scaleAnim={scaleAnim}
        />
      </LinearGradient>

      {currentToast && (
        <ToastMessage
          type={currentToast.type}
          message={currentToast.message}
          onHide={hideToast}
        />
      )}
      </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b2e',
    padding: 20,
    justifyContent: 'center',
  },
});

export default LoginScreen;
