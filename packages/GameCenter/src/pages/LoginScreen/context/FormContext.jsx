import React, { createContext, useContext, useState, useRef } from 'react';
import { Animated, Linking } from 'react-native';

const FormSectionContext = createContext();

export const FormSectionProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

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

  const handleSendCode = (showToast) => {
    showToast('success', 'Verification code sent!');
    setTimeout(() => {
      Linking.openURL('https://gmail.app.goo.gl');
    }, 2000);
  };

  return (
    <FormSectionContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        rememberMe,
        setRememberMe,
        isForgotPassword,
        setIsForgotPassword,
        countdown,
        setCountdown,
        isModalVisible,
        setModalVisible,
        slideAnim,
        opacityAnim,
        handleForgotPasswordToggle,
        handleSendCode,
      }}
    >
      {children}
    </FormSectionContext.Provider>
  );
};

export const useFormSection = () => useContext(FormSectionContext);
