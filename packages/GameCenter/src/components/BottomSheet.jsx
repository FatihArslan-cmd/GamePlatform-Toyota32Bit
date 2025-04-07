import React, { useCallback, useEffect, useMemo } from 'react';
import { Modal, Portal, Text } from 'react-native-paper';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { PanResponder } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext'; // Import useTheme

const BottomSheet = React.memo(({
  visible,
  onDismiss,
  title,
  children,
  height = '50%',
  backgroundColorProp, 
}) => {
  const { height: screenHeight } = Dimensions.get('window');
  const { colors, resolvedTheme } = useTheme(); // Use the useTheme hook
  const backgroundColor = backgroundColorProp || colors.background; // Default to theme card color if backgroundColorProp is not provided

  const defaultHeight = useMemo(() => (
    typeof height === 'string'
      ? screenHeight * (parseInt(height) / 100)
      : height
  ), [height, screenHeight]);

  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const gestureY = useSharedValue(0);

  const MAX_UPWARD_TRANSLATE = -defaultHeight * 0.3;
  const DISMISS_THRESHOLD = screenHeight * 0.2;

  const close = useCallback(() => {
    translateY.value = withTiming(screenHeight, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(onDismiss)();
    });
  }, [translateY, opacity, screenHeight, onDismiss]);

  const panResponder = useMemo(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        const newPosition = gestureState.dy;
        if (newPosition < 0) {
          const resistance = -Math.sqrt(Math.abs(newPosition)) * 5;
          gestureY.value = Math.max(resistance, MAX_UPWARD_TRANSLATE);
        } else {
          gestureY.value = newPosition;
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > DISMISS_THRESHOLD || gestureState.vy > 0.5) {
          close();
        } else {
          gestureY.value = withSpring(0, {
            damping: 20,
            stiffness: 90,
          });
        }
      },
    }),
  [close, gestureY, MAX_UPWARD_TRANSLATE, DISMISS_THRESHOLD]);

  useEffect(() => {
    if (visible) {
      translateY.value = screenHeight;
      opacity.value = 0;
      gestureY.value = 0;

      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 90,
      });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withTiming(screenHeight, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [visible, translateY, opacity, screenHeight]);

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    const backdropOpacity = interpolate(
      gestureY.value,
      [MAX_UPWARD_TRANSLATE, 0, DISMISS_THRESHOLD],
      [1.2, 1, 0],
    );

    return {
      opacity: opacity.value * backdropOpacity,
    };
  });

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateY: gestureY.value },
    ],
  }));

  const handleDismiss = useCallback(() => onDismiss(), [onDismiss]);

  const blurType = resolvedTheme === 'dark' ? 'dark' : 'light'; // Determine blurType based on theme
  const handleColor = resolvedTheme === 'dark' ? colors.border : '#ccc'; // Theme handle color

  return (
    <Portal>
      <Modal visible={visible} onDismiss={handleDismiss} contentContainerStyle={styles.container}>
        <TouchableWithoutFeedback onPress={handleDismiss}>
          <Animated.View style={[StyleSheet.absoluteFill, backdropAnimatedStyle]}>
            <BlurView
              style={[StyleSheet.absoluteFill, styles.blurView]}
              blurType={blurType} // Themed blurType
              blurAmount={5}
              reducedTransparencyFallbackColor={colors.background} // Themed fallback color
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.modalContent,
            modalAnimatedStyle,
            { height: defaultHeight, backgroundColor }, // Themed background color
          ]}
        >
          <View style={[styles.handle, { backgroundColor: handleColor }]} /> {/* Themed handle color */}

          <View style={[styles.header, { borderBottomColor: colors.border }]}> {/* Themed border color for header */}
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text> {/* Themed text color for title */}
          </View>

          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </Modal>
    </Portal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    zIndex:5
  },
  blurView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalContent: {
    marginHorizontal: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Orbitron-ExtraBold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default BottomSheet;