import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';
import InputField from './FormSectionItem/InputField';
import OptionsSection from './FormSectionItem/OptionsSection';
import ActionButtons from './FormSectionItem/ActionButtons';
import ForgotPasswordSection from './FormSectionItem/ForgotPasswordSection';

const FormSection = ({ onLoginPress, scaleAnim, onSignupPress, onSendCode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

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

  // Start the countdown when "Send Code" is pressed
  const handleSendCodeWithCountdown = () => {
    if (countdown === 0) {
      setCountdown(30); // Set countdown to 30 seconds
      onSendCode();
    }
  };

  // Countdown effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer); // Clear timeout on unmount
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
            <ActionButtons
              scaleAnim={scaleAnim}
              onLoginPress={onLoginPress}
              onSignupPress={onSignupPress}
            />
          </>
        ) : (
          <ForgotPasswordSection
            onSendCode={handleSendCodeWithCountdown}
            onBackToLogin={() => handleForgotPasswordToggle(false)}
            countdown={countdown}
          />
        )}
      </Animated.View>
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
