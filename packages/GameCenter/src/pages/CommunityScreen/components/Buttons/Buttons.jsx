import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import Animated, { 
  useAnimatedStyle, 
  withTiming 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = (width - 50) / 2;
const INDICATOR_WIDTH = BUTTON_WIDTH * 0.6; // 60% of button width

const Buttons = ({ goToHome, goToExplorer, currentPageIndex }) => {
  const buttonTextStyle = {
    fontFamily: 'Orbitron-ExtraBold'
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
              : 16 + BUTTON_WIDTH + (BUTTON_WIDTH - INDICATOR_WIDTH) / 2, 
            { duration: 300 }
          ) 
        }
      ]
    };
  });

  return (
    <>
      <View style={styles.buttonContainer}>
        <Button onPress={goToHome} mode="text"
          rippleColor="rgba(0, 0, 0, 0.3)"

        style={getButtonStyle(0)}>
          <Text style={buttonTextStyle}>Home</Text>
        </Button>
        <Button onPress={goToExplorer} mode="text"
                  rippleColor="rgba(0, 0, 0, 0.3)"

        style={getButtonStyle(1)}>
          <Text style={buttonTextStyle}>Explorer</Text>
        </Button>
      </View>
      <View style={styles.indicatorContainer}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </View>
      <Divider style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 90,
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
    marginTop: 7,
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
    backgroundColor: 'black',
    borderRadius: 1,
    position: 'absolute',
  },
});

export default Buttons;