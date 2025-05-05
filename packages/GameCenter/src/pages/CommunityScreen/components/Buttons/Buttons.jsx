import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";
import { isTablet } from "../../../../utils/isTablet";

import Animated, {
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';

const TABLET_DEVICE = isTablet();
const { width } = Dimensions.get('window');
const BUTTON_WIDTH = (width - 50) / 2;
const INDICATOR_WIDTH = BUTTON_WIDTH * 0.6;

const Buttons = ({ goToHome, goToExplorer, currentPageIndex }) => {
  const { colors } = useTheme(); 
  const styles = createStyles(colors);
  const { t } = useTranslation();

  const buttonTextStyle = {
    fontFamily: 'Orbitron-ExtraBold',
    color: colors.text,
    fontSize: TABLET_DEVICE ? 16 : 11,
  };

  const getButtonStyle = (index) => {
    return [
      styles.button,
      currentPageIndex !== index && styles.inactiveButton,
    ];
  };

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            currentPageIndex === 0
              ? 16 + (BUTTON_WIDTH - INDICATOR_WIDTH) / 2
              : 28 + BUTTON_WIDTH + (BUTTON_WIDTH - INDICATOR_WIDTH) / 2,
            { duration: 300 }
          )
        }
      ],
      backgroundColor: colors.primary,
    };
  });

  return (
    <>
      <View style={styles.buttonContainer}>
        <Button onPress={goToHome} mode="text"
          rippleColor="rgba(0, 0, 0, 0.3)"
          style={getButtonStyle(0)}
          labelStyle={buttonTextStyle}
        >
          <Text style={buttonTextStyle}>
            {t('communityScreen.home')}
          </Text>
        </Button>
        <Button onPress={goToExplorer} mode="text"
          rippleColor="rgba(0, 0, 0, 0.3)"
          style={getButtonStyle(1)}
          labelStyle={buttonTextStyle} 
        >
          <Text style={buttonTextStyle}>
            {t('communityScreen.explorer')}
          </Text>
        </Button>
      </View>
      <View style={styles.indicatorContainer}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </View>
      <Divider style={[styles.divider, { backgroundColor: colors.border }]} /> 
    </>
  );
};

const createStyles = () => StyleSheet.create({ 
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: TABLET_DEVICE ? 16 : 5,
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  inactiveButton: {
    opacity: 0.5,
  },
  divider: {
    height: 2,
    width: '100%',
  },
  indicatorContainer: {
    width: '100%',
    paddingHorizontal: 16,
    height: 4,
    position: 'relative',
  },
  indicator: {
    width: INDICATOR_WIDTH,
    height: 2,
    borderRadius: 1,
    position: 'absolute',
  },
});

export default Buttons;