import Animated, { FadeIn, useAnimatedStyle } from "react-native-reanimated";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const BlurOverlay = ({ isBlurred, buttonOpacityValue, handleBecomeMemberPress }) => {
  const { t } = useTranslation();

  const animatedOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacityValue.value,
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacityValue.value,
    };
  });

  return (
    <>
      <Animated.View
        style={[
          styles.overlayContainer,
          animatedOverlayStyle,
          StyleSheet.absoluteFillObject,
          { pointerEvents: isBlurred ? 'auto' : 'none' }
        ]}
      >
        <View
          style={styles.overlay}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.buttonContainer,
          animatedButtonStyle,
          StyleSheet.absoluteFillObject,
          { justifyContent: 'center', alignItems: 'center', pointerEvents: isBlurred ? 'auto' : 'none' }
        ]}
      >
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
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    overflow: 'hidden',
  },
  becomeMemberButton: {
    backgroundColor: 'green',
    paddingHorizontal: TABLET_DEVICE ? 20 : 15,
    paddingVertical:  TABLET_DEVICE ? 10 : 10,
    borderRadius: 8,
    elevation: 5,
  },
  becomeMemberButtonText: {
    color: '#ffffff',
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: TABLET_DEVICE ? 16 : 14,
  },
});

export default BlurOverlay;