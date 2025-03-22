import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import { useFormContext } from '../../../context/FormContext';
import { useTranslation } from 'react-i18next'; 

const ActionButtons = () => {
  const { handleLoginPress, isLoading } = useFormContext();
  const { t } = useTranslation(); 
  return (
    <>
      <Animated.View style={{ transform: [{ scale: 1 }] }}>
        <Button
          mode="contained"
          onPress={handleLoginPress}
          style={styles.loginButton}
          labelStyle={styles.buttonLabel}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator animating={true} color="#fff" size="small" />
          ) : (
            t('loginScreen.startGame')
          )}
        </Button>
      </Animated.View>

      <Button
        mode="outlined"
        style={styles.signupButton}
        labelStyle={styles.signupButtonLabel}
      >
        {t('loginScreen.createNewAccount')}
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    marginVertical: 10,
    backgroundColor: '#8a2be2',
    paddingVertical: 8,
    borderRadius: 30,
  },
  buttonLabel: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Orbitron-ExtraBold',
  },
  signupButton: {
    borderColor: '#8a2be2',
    borderRadius: 30,
    borderWidth: 2,
  },
  signupButtonLabel: {
    color: '#8a2be2',
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',
    letterSpacing: 1,
  },
});

export default ActionButtons;