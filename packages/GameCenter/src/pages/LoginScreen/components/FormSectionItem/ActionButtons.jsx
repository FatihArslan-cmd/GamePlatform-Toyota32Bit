import React, { useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';

const ActionButtons = ({ scaleAnim, onLoginPress }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartGamePress = async () => {
    setIsLoading(true); // Start the loading state
    try {
      // Call the onLoginPress function if provided
      if (onLoginPress) {
        await onLoginPress();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // End the loading state
    }
  };

  return (
    <>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Button
          mode="contained"
          onPress={handleStartGamePress}
          style={styles.loginButton}
          labelStyle={styles.buttonLabel}
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading ? (
            <ActivityIndicator animating={true} color="#fff" size="small" />
          ) : (
            'START GAME'
          )}
        </Button>
      </Animated.View>

      <Button
        mode="outlined"
        style={styles.signupButton}
        labelStyle={styles.signupButtonLabel}
      >
        CREATE NEW ACCOUNT
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
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  signupButton: {
    borderColor: '#8a2be2',
    borderRadius: 30,
    borderWidth: 2,
  },
  signupButtonLabel: {
    color: '#8a2be2',
    fontSize: 16,
    fontFamily: 'Orbitron-VariableFont_wght',
    letterSpacing: 1,
  },
});

export default ActionButtons;
