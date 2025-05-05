import Icon from "react-native-vector-icons/Ionicons";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";
import { isTablet } from "../utils/isTablet.js";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const BackButton = ({ size, top = 36, left = 16, padding = 8 }) => {
  const navigation = useNavigation();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);
  const { colors } = useTheme(); 
  const adjustedSize = size || (isTablet() ? 32 : 24);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });
    translateY.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, { top, left, padding }]}>
      <TouchableRipple
        onPress={handleGoBack}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon name="chevron-back" size={adjustedSize} color={colors.text} /> 
      </TouchableRipple>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
  },
});

export default BackButton;