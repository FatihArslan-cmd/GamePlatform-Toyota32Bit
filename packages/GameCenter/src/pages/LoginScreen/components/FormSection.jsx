import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import InputField from './FormSectionItem/InputField';
import OptionsSection from './FormSectionItem/OptionsSection';
import ActionButtons from './FormSectionItem/ActionButtons';
import ForgotPasswordSection from './FormSectionItem/ForgotPasswordSection';
import CustomModal from '../../../components/CustomModal';
import BioModalContent from './ModalItem/BioModalContent';
import { useNavigation } from '@react-navigation/native';
import { fetchAndStoreGames } from '../../../utils/api';
import { clearGamesFromStorage } from '../../../utils/api';
import { login } from '../../../shared/states/api';

const FormSection = ({ onSendCode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handleLoginPress = async () => {
    try {
      if (rememberMe) {
        setModalVisible(true);
      } else {
        await login(email, password);
        navigation.navigate('Tabs', { toastshow: true });
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during login');
      setErrorModalVisible(true);
    }
  };

  const handleForgotPasswordToggle = (showForgot) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: showForgot ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setIsForgotPassword(showForgot);
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      }),
    ]).start();
  };

  const handleSendCodeWithCountdown = () => {
    if (!email.trim()) {
      setErrorMessage('Email field cannot be empty');
      setErrorModalVisible(true);
      return;
    }
  
    if (countdown === 0) {
      setCountdown(30);
      onSendCode();
    }
  };
  

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <View style={styles.formContainer}>
      <InputField
        label="Email / Username"
        value={email}
        onChangeText={setEmail}
        leftIcon="account-circle"
        style={styles.input}
      />

      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -30],
                }),
              },
            ],
            opacity: opacityAnim,
          },
        ]}
      >
        {!isForgotPassword ? (
          <>
            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              leftIcon="shield-key"
              rightIcon={showPassword ? 'eye-off' : 'eye'}
              onRightIconPress={() => setShowPassword(!showPassword)}
              style={styles.input}
            />
            <OptionsSection
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              setIsForgotPassword={() => handleForgotPasswordToggle(true)}
            />
            <ActionButtons scaleAnim={1} onLoginPress={handleLoginPress} />
          </>
        ) : (
          <ForgotPasswordSection
            onSendCode={handleSendCodeWithCountdown}
            onBackToLogin={() => handleForgotPasswordToggle(false)}
            countdown={countdown}
          />
        )}
      </Animated.View>

      <CustomModal
        visible={isModalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <BioModalContent />
      </CustomModal>

      <CustomModal
        visible={errorModalVisible}
        onDismiss={() => setErrorModalVisible(false)}
        title="Login Error"
        text={errorMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#ffffff08',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#8a2be230',
    overflow: 'hidden',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff10',
    fontFamily: 'RussoOne-Regular',
  },
  animatedContainer: {
    width: '100%',
  },
});

export default FormSection;
