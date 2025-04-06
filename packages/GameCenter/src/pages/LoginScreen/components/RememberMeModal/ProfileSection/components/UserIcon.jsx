import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useCallback, useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { isTablet } from "../../../../../../utils/isTablet";
import { usePermissionsContext } from "../../../../context/PermissionContext";

const TABLET_DEVICE = isTablet();

// --- Define sizes based on device type ---
const ICON_SIZE = TABLET_DEVICE ? 100 : 70; // Use 100 for tablet, 70 for phone
const BORDER_RADIUS = ICON_SIZE / 2;        // Calculate radius based on size
const SHINE_WIDTH = ICON_SIZE * 0.6;        // Make shine width proportional (60 for tablet, 42 for phone)
const SHINE_TRANSLATE_RANGE = ICON_SIZE * 1.5; // Adjust shine travel distance (150 for tablet, 105 for phone)
// --- End of size definitions ---

const UserIcon = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shineAnim = useRef(new Animated.Value(0)).current;
  // Ensure usePermissionsContext is correctly imported and provides setVisible
  const { setVisible: setModalVisible } = usePermissionsContext();

  const pulseAnimation = useCallback(() => {
    // Check if component is still mounted before restarting animation
    if (scaleAnim) {
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
    }
  }, [scaleAnim]);

  const shineAnimation = useCallback(() => {
     // Check if component is still mounted before restarting animation
    if (shineAnim) {
      Animated.sequence([
        Animated.timing(shineAnim, {
          toValue: 1,
          duration: 2000, // Keep duration reasonable
          useNativeDriver: true,
        }),
        Animated.timing(shineAnim, {
          toValue: 0,
          duration: 2000, // Keep duration reasonable
          useNativeDriver: true,
        }),
      ]).start(() => shineAnimation());
    }
  }, [shineAnim]);

  useEffect(() => {
    // Start animations
    const pulseControl = pulseAnimation();
    const shineControl = shineAnimation();

    // Cleanup function to stop animations when component unmounts
    return () => {
      scaleAnim.stopAnimation();
      shineAnim.stopAnimation();
      // Optional: Reset values if needed on unmount
      // scaleAnim.setValue(1);
      // shineAnim.setValue(0);
    };
  }, [pulseAnimation, shineAnimation, scaleAnim, shineAnim]); // Added scaleAnim/shineAnim dependencies to useEffect

  // Interpolate using the calculated range
  const shineTranslate = shineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SHINE_TRANSLATE_RANGE, SHINE_TRANSLATE_RANGE],
  });

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View style={styles.profileContainer}>
        {/* Apply dynamic border radius */}
        <View style={[styles.iconContainerBase, { borderRadius: BORDER_RADIUS }]}>

          <Animated.View
            style={[
              styles.userIconWrapper,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
             {/* Use dynamic icon size */}
             <Icon name="account-circle" size={ICON_SIZE} color="#8a2be2" />
          </Animated.View>

          {/* Apply dynamic width and transform */}
          <Animated.View
            style={[
              styles.shineBase, // Base styles from StyleSheet
              {
                width: SHINE_WIDTH, // Dynamic width
                // Combine transforms: existing skew + animated translate
                transform: [
                  { translateX: shineTranslate },
                  { skewX: '-20deg' } // Keep static skew
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
    // Added margin for better spacing, adjust as needed
    marginVertical: 10,
  },
  // Base styles for icon container (static parts)
  iconContainerBase: {
    position: 'relative',
    overflow: 'hidden',
    // borderRadius is now applied dynamically inline
    // Add background for visual debugging if needed: backgroundColor: 'rgba(0,0,255,0.1)',
  },
  userIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Base styles for shine effect (static parts)
  shineBase: {
    position: 'absolute',
    top: 0,
    left: 0, // Start left for translation
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    // width is now applied dynamically inline
    // transform with skewX is combined dynamically inline
  },
});

export default UserIcon;