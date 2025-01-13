import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  interpolate,
} from 'react-native-reanimated';

const AnimatedTextCharacter = ({ char, index, total, duration = 1000 }) => {
  const animation = useSharedValue(0);

  useEffect(() => {
    const delay = Math.sin((index / total) * Math.PI / 2) * duration;
    
    animation.value = withDelay(
      delay,
      withTiming(1, {
        duration: duration,
      })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animation.value, [0, 1], [0, 1]),
      transform: [
        {
          translateY: interpolate(animation.value, [0, 1], [20, 0]),
        },
      ],
    };
  });

  return (
    <Animated.Text style={[styles.character, animatedStyle]}>
      {char}
    </Animated.Text>
  );
};

const AnimatedText = ({ text, duration = 1000 }) => {
  const characters = text.split('');
  
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {characters.map((char, index) => (
          <AnimatedTextCharacter
            key={index}
            char={char}
            index={index}
            total={characters.length}
            duration={duration}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  character: {
    fontSize: 24,
    color: '#fff',
    fontFamily:'Orbitron-VariableFont_wght'
  },
});

export default AnimatedText;