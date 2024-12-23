import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import InputSection from './FormSectionItem/InputSection';
import OptionsSection from './FormSectionItem/OptionsSection';
import ActionButtonsSection from './FormSectionItem/ActionButtonsSection';
import ForgotPasswordSection from './FormSectionItem/ForgotPasswordSection';
import CustomModal from '../../../components/CustomModal';
import BioModalContent from './ModalItem/BioModalContent';
import useFormState from './hooks/useFormState';

const FormSection = ({ onSignupPress, onSendCode }) => {
  const {
    email, password, showPassword, rememberMe, isForgotPassword,
    countdown, isModalVisible, slideAnim, opacityAnim,
    setEmail, setPassword, setShowPassword, setRememberMe, setModalVisible, handleForgotPasswordToggle,
    handleSendCodeWithCountdown, handleLoginPress,
  } = useFormState(onSendCode);

  return (
    <View style={styles.formContainer}>
      <InputSection 
        email={email} 
        password={password} 
        setEmail={setEmail} 
        setPassword={setPassword} 
        showPassword={showPassword}
        setShowPassword={setShowPassword} 
      />
      
      <Animated.View style={[styles.animatedContainer, {
        transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -30] }) }],
        opacity: opacityAnim,
      }]}>
        {!isForgotPassword ? (
          <>
            <OptionsSection
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              setIsForgotPassword={() => handleForgotPasswordToggle(true)}
            />
            <ActionButtonsSection
              onLoginPress={handleLoginPress}
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

      <CustomModal visible={isModalVisible} onDismiss={() => setModalVisible(false)}>
        <BioModalContent />
      </CustomModal>
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
  animatedContainer: {
    width: '100%',
  },
});

export default FormSection;
