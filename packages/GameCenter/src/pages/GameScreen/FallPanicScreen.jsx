import FallPanic from "fall-panic";
import React, { useEffect, useRef, useState } from "react";
import splashImage from "../../locales/gameImages/FallPanicThumbnail.png";
import { Animated, Image, StyleSheet, View } from "react-native";

const FallPanicScreen = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsSplashVisible(false);
      });
    }, 2000);

    return () => clearTimeout(initialTimer);
  }, [fadeAnim]);

  return (
    <View style={{ flex: 1 }}>
      <FallPanic />

      {isSplashVisible && (
        <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
          <Image
            source={typeof splashImage === 'number' ? splashImage : { uri: splashImage }}
            style={styles.splashImage}
            resizeMode="cover"
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    backgroundColor: '#000',
  },
  splashImage: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default FallPanicScreen;