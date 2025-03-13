import React, { useRef, useCallback, useEffect } from 'react';
import { View, StyleSheet, Animated,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { usePermissionsContext } from '../../../../context/PermissionContext'; 

const UserIcon = () => { 
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shineAnim = useRef(new Animated.Value(0)).current;
  const { setVisible: setModalVisible } = usePermissionsContext();

  const pulseAnimation = useCallback(() => {
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
  }, [scaleAnim]);

  const shineAnimation = useCallback(() => {
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
  }, [shineAnim]);

  useEffect(() => {
    pulseAnimation();
    shineAnimation();

    return () => {
      scaleAnim.stopAnimation();
      shineAnim.stopAnimation();
    };
  }, [pulseAnimation, shineAnimation]);

  const shineTranslate = shineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 150],
  });

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View style={styles.profileContainer}>
        <View style={styles.iconContainer}>

          <Animated.View
            style={[
              styles.userIconWrapper,
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 50,
  },
  userIconWrapper: {
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

export default UserIcon;