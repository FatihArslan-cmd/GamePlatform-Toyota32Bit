import React, { useState } from 'react';
import { StyleSheet,Animated } from 'react-native';
import ForgotPasswordModal from './components/ForgotPasswordModal'; // Dosya yolunuza göre düzenleyin
import FormSection from './components/FormSection'; // Dosya yolunuza göre düzenleyin
import LogoSection from './components/LogoSection'; // Dosya yolunuza göre düzenleyin
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleLoginPress = () => {
    // Giriş yapma işlemi
    console.log('Login pressed');
  };

  const handleSignupPress = () => {
    // Kayıt olma işlemi
    console.log('Signup pressed');
  };

  const handleForgotPasswordPress = () => {
    setModalVisible(true);
  };

  const handleModalDismiss = () => {
    setModalVisible(false);
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
        onLoginPress={handleLoginPress}
        onSignupPress={handleSignupPress}
        onForgotPasswordPress={handleForgotPasswordPress}
        scaleAnim={scaleAnim}
      />
      <ForgotPasswordModal visible={modalVisible} onDismiss={handleModalDismiss} />
      </LinearGradient>   
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
