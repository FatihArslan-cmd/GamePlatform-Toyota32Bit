import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useCallback, useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { isTablet } from "../../../../../../utils/isTablet";
import { usePermissionsContext } from "../../../../context/PermissionContext";

const TABLET_DEVICE = isTablet();

const ICON_SIZE = TABLET_DEVICE ? 100 : 70;
const BORDER_RADIUS = ICON_SIZE / 2;
const SHINE_WIDTH = ICON_SIZE * 0.6;
const SHINE_TRANSLATE_RANGE = ICON_SIZE * 1.5;

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
    outputRange: [-SHINE_TRANSLATE_RANGE, SHINE_TRANSLATE_RANGE],
  });

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View style={styles.profileContainer}>
        <View style={[styles.iconContainerBase, { borderRadius: BORDER_RADIUS, width: ICON_SIZE, height: ICON_SIZE }]}>

          <Animated.View
            style={[
              styles.userIconWrapper,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
             <Icon name="account-circle" size={ICON_SIZE} color="#8a2be2" />
          </Animated.View>

          <Animated.View
            style={[
              styles.shineBase,
              {
                width: SHINE_WIDTH,
                transform: [
                  { translateX: shineTranslate },
                  { skewX: '-20deg' }
                ],
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
    marginVertical: 10,
  },
  iconContainerBase: {
    position: 'relative',
    overflow: 'hidden',
  },
  userIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  shineBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});

export default UserIcon;