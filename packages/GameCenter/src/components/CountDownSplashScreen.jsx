import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
const { width, height } = Dimensions.get('window');

const CountDownSplashScreen = ({ onComplete }) => {
  const [count, setCount] = useState(5);
  const [started, setStarted] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation(); // Use navigation hook

  // Fade in the splash screen when component mounts and start countdown immediately
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setStarted(true); // Start countdown after fade-in
    });
  }, []);

  // Start countdown effect
  useEffect(() => {
    if (!started) return;

    if (count <= 1 && count > 0) { // Countdown finished at 1, trigger completion
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onComplete) onComplete();
        navigation.navigate('GameScreen'); // Navigate to GameScreen on completion
      });
      setCount(0); // Set count to 0 to prevent further countdowns
      return;
    }

    if (count <= 0) return; // Stop if count is 0 or less

    // Countdown animation
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCount(count - 1);
    });
  }, [count, started, navigation, onComplete]); // Added navigation and onComplete to dependency array


  // Animation interpolations
  const countScale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.5, 1],
  });


  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      <ImageBackground
        source={require('../locales/bgImages/purpleImage.jpg')} // Replace with your image path
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          {started && count > 0 && (
            <>
              <Animated.Text
                style={[
                  styles.countdownText,
                  { transform: [{ scale: countScale }] }
                ]}
              >
                {count}
              </Animated.Text>
              <Text style={styles.readyText}>Get ready for the game</Text>
            </>
          )}

          {started && count <= 1 && count === 0 && ( // Display "Başla!" when countdown finishes
            <Animated.Text
              style={[
                styles.startedText,
                { opacity: animatedValue }
              ]}
            >
              Başla!
            </Animated.Text>
          )}
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Optional: Add a semi-transparent overlay for better text visibility
    width: '100%',
    height: '100%',
  },
  countdownText: {
    fontSize: 120, // Increased size
    color: 'white',
    textShadowColor: 'rgba(32, 32, 32, 0.5)',
    textShadowOffset: { width: 3, height: 3 }, // Increased shadow offset
    textShadowRadius: 8, // Increased shadow radius
    fontFamily: 'Orbitron-ExtraBold',
  },
  readyText: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    fontFamily: 'Orbitron-ExtraBold',
    textShadowColor: 'rgba(6, 5, 5, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  startedText: {
    marginTop: 20, // Increased margin
    fontSize: 70, // Increased size
    fontWeight: 'bold',
    color: '#FFDF00',
    textShadowColor: 'rgba(0, 0, 0, 0.7)', // Increased shadow intensity
    textShadowOffset: { width: 3, height: 3 }, // Increased shadow offset
    textShadowRadius: 10, // Increased shadow radius
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default CountDownSplashScreen;