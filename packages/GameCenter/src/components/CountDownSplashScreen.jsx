import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { hideNavigationBar } from '../utils/NavBarManager';
import { LinearGradient } from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const CountDownSplashScreen = ({ onComplete }) => {
  const [count, setCount] = useState(5);
  const [started, setStarted] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const circleScaleAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const lottieRef = useRef(null);

  useEffect(() => {
    hideNavigationBar();

    // Başlangıç animasyonu
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(circleScaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start(() => {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
      setStarted(true);
    });


  }, []);

  // Geri sayım efekti
  useEffect(() => {
    if (!started) return;

    // Geri sayım tamamlandığında
    if (count <= 1 && count > 0) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(circleScaleAnim, {
          toValue: 2,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onComplete) onComplete();
        // Delay navigation to see the animation
        setTimeout(() => {
          navigation.navigate('GameScreen');
        }, 500); // Wait for 1 second after animation completes
      });
      setCount(0);
      return;
    }

    if (count <= 0) return;

    // Her saniye için progress animasyonu
    Animated.timing(progressAnim, {
      toValue: (5 - count + 1) / 5,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Sayı değişimi animasyonu
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCount(count - 1);
    });
  }, [count, started, navigation, onComplete]);

  // Animasyon enterpolasyonları
  const countScale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1],
  });

  const countOpacity = animatedValue.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [1, 0.7, 0.7, 1],
  });

  const progressRotation = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressColor = progressAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#3498db', '#9b59b6', '#f39c12'],
  });

  const glowOpacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.7, 0.3],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#302b63', '#24243e']}
        style={styles.backgroundGradient}
      />

      <Animated.View style={[styles.particleContainer, { opacity: fadeAnim }]}>
        <LottieView
          ref={lottieRef}
          source={require('../locales/lottie/particles.json')}
          style={styles.lottieAnimation}
          autoPlay={false}
          loop
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {started && count > 0 && (
          <Animated.View
            style={[
              styles.circleContainer,
              {
                transform: [
                  { scale: circleScaleAnim },
                ]
              }
            ]}
          >
            <Animated.View
              style={[
                styles.outerRing,
                {
                  borderColor: progressColor,
                  transform: [{ rotateZ: progressRotation }]
                }
              ]}
            />

            <View style={styles.innerRing} />

            <Animated.View
              style={[
                styles.glowEffect,
                {
                  opacity: glowOpacity,
                  backgroundColor: progressColor
                }
              ]}
            />

            <Animated.Text
              style={[
                styles.countdownText,
                {
                  opacity: countOpacity,
                  transform: [{ scale: countScale }]
                }
              ]}
            >
              {count}
            </Animated.Text>
          </Animated.View>
        )}

        <Animated.Text
          style={[
            styles.readyText,
            { opacity: fadeAnim }
          ]}
        >
          Get Ready!
        </Animated.Text>

      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  particleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    width: width * 1.5,
    height: height * 1.5,
    position: 'absolute',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    width: width * 0.6,
    height: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  outerRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: width,
    borderWidth: 8,
    borderColor: '#9b59b6',
    borderStyle: 'dashed',
  },
  innerRing: {
    position: 'absolute',
    width: '85%',
    height: '85%',
    borderRadius: width,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  glowEffect: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: width,
    backgroundColor: '#9b59b6',
    opacity: 0.3,
  },
  countdownText: {
    fontSize: 120,
    color: 'white',
    fontFamily: 'Orbitron-ExtraBold',
    textShadowColor: 'rgba(149, 128, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  readyText: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Orbitron-Bold',
    letterSpacing: 6,
    textTransform: 'uppercase',
    marginTop: 20,
    textShadowColor: 'rgba(149, 128, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  startTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default CountDownSplashScreen;