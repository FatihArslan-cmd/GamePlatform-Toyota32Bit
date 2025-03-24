import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Animated, { useAnimatedStyle, withTiming, FadeIn, Easing } from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';

const BlurOverlay = ({ isBlurred, blurRadiusValue, buttonOpacityValue, handleBecomeMemberPress }) => {
  const { t } = useTranslation();
  const animatedBlurStyle = useAnimatedStyle(() => {
    return {
      blurRadius: blurRadiusValue.value,
      opacity: blurRadiusValue.value > 0 ? 1 : 0,
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacityValue.value,
    };
  });

  return (
    <>
      <Animated.View style={[styles.blurContainer, animatedBlurStyle, StyleSheet.absoluteFillObject]} pointerEvents="none">
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={4}
          reducedTransparencyFallbackColor="white"
        />
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, animatedButtonStyle, StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center', pointerEvents: isBlurred ? 'auto' : 'none' }]}>
        <TouchableOpacity
          style={styles.becomeMemberButton}
          onPress={handleBecomeMemberPress}
          entering={FadeIn.duration(300)}
        >
          <Text style={styles.becomeMemberButtonText}>
            {t('communityScreen.becomeamember')}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    overflow: 'hidden',
  },
  becomeMemberButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 5,
  },
  becomeMemberButtonText: {
    color: '#ffffff',
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 16,
  },
});

export default BlurOverlay;