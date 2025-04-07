import React from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { isTablet } from "../../../../../utils/isTablet";
import { useFormContext } from "../../../context/FormContext";

const TABLET_DEVICE = isTablet();

const ActionButtons = () => {
  const { handleLoginPress, isLoading, handleSignUpPress } = useFormContext(); 
  const { t } = useTranslation();

  return (
    <View style={styles.buttonsContainer}>
      <Animated.View style={styles.animatedView}>
        <Button
          mode="contained"
          onPress={handleLoginPress}
          style={styles.loginButton}
          labelStyle={styles.buttonLabel}
          disabled={isLoading}
          contentStyle={styles.buttonContent} 
        >
          {isLoading ? (
            <ActivityIndicator animating={true} color="#fff" size={TABLET_DEVICE ? "medium" : "small"} />
          ) : (
            t('loginScreen.startGame')
          )}
        </Button>
      </Animated.View>

      <Button
        mode="outlined"
        onPress={handleSignUpPress} 
        style={styles.signupButton}
        labelStyle={styles.signupButtonLabel}
        contentStyle={styles.buttonContent} 
        disabled={isLoading} 
      >
        {t('loginScreen.createNewAccount')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
      marginTop: TABLET_DEVICE ? 20 : 8, 
      width: '100%', 
  },
  animatedView: {
      transform: [{ scale: 1 }], 
      width: '100%', 
  },
  loginButton: {
    marginVertical: TABLET_DEVICE ? 10 : 5,
    backgroundColor: '#8a2be2',
    borderRadius: 30,
  },
  signupButton: {
    borderColor: '#8a2be2',
    borderRadius: 30,
    borderWidth: TABLET_DEVICE ? 2 : 1.5,
    marginVertical: TABLET_DEVICE ? 5 : 3,
  },
  buttonContent: { 
      paddingVertical: TABLET_DEVICE ? 10 : 4,
  },
  buttonLabel: {
    fontSize: TABLET_DEVICE ? 16 : 12,
    color: '#fff',
    fontFamily: 'Orbitron-ExtraBold',
    letterSpacing: TABLET_DEVICE ? 1.5 : 1,
  },
  signupButtonLabel: {
    color: '#8a2be2',
    fontSize: TABLET_DEVICE ? 16 : 12,
    fontFamily: 'Orbitron-ExtraBold',
    letterSpacing: TABLET_DEVICE ? 1.5 : 1,
  },
});

export default ActionButtons;