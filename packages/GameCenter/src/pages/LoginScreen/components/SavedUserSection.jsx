import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getRefreshToken } from '../../../shared/states/api';

const SavedUserSection = () => {
  const refreshToken = getRefreshToken();
  
  // Animation values
  const scaleAnim = new Animated.Value(1);
  const shineAnim = new Animated.Value(0);

  // Pulsing animation
  const pulseAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(() => pulseAnimation());
  };

  const shineAnimation = () => {
    Animated.sequence([
      Animated.timing(shineAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(shineAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => shineAnimation());
  };

  useEffect(() => {
    pulseAnimation();
    shineAnimation();
  }, []);

  const shineTranslate = shineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 150],
  });

  return (
    <View style={styles.container}>
      {refreshToken ? (
        <View style={styles.iconContainer}>
          <Animated.View
            style={[
              styles.iconWrapper,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Icon name="account-circle" size={100} color="#8a2be2" />
          </Animated.View>
          <Animated.View
            style={[
              styles.shine,
              {
                transform: [{ translateX: shineTranslate }],
              },
            ]}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 50,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    transform: [{ skewX: '-20deg' }],
  },
});

export default SavedUserSection;