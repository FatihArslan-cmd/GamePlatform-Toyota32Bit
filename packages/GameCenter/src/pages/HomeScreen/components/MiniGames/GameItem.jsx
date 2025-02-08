import React, { memo, useState, useEffect } from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native'; // Import View and Text
import { Card, Surface } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import Icon

import getDominantImageColor from '../../../../utils/getDominantImageColor';

const AnimatedSurface = Animated.createAnimatedComponent(Surface);

const GameItem = memo(({ item, onPress }) => {
  const scale = useSharedValue(1);
  const [dominantColor, setDominantColor] = useState('#dddddd'); // Default color

  useEffect(() => {
    const fetchDominantColor = async () => {
      console.log(item.image_background)
      if (item.image_background) {
        try {
          const colors = await getDominantImageColor(item.image_background);
          if (colors && colors.length > 0) {
            setDominantColor(colors);
          } else {
            console.warn("Dominant colors array is empty or null, using default color.");
            setDominantColor('red');
          }
        } catch (error) {
          console.error("Error fetching dominant color:", error);
          setDominantColor('red');
        }
      }
    };

    fetchDominantColor();
  }, [item.image_background]);


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 120,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 120,
    });
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <AnimatedSurface style={[styles.surface, { backgroundColor: dominantColor }, animatedStyle]} elevation={4}>
        <Card style={styles.card}>
          <FastImage
            source={{ uri: item.image_background,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
             }}
            style={styles.cardCover}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />
          <Card.Title
            title={item.name}
            titleStyle={styles.cardTitle}
            titleNumberOfLines={2}
          />
        </Card>
        <View style={styles.playButtonContainer}>
          <Pressable
            style={styles.playButton}
            onPress={onPress} // Assuming play button triggers the same action as card press
          >
             <Icon name="play-circle-outline" size={32} color="white" />
          </Pressable>
        </View>
      </AnimatedSurface>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  surface: {
    borderRadius: 20,
    padding: 12,
    paddingBottom: 52 // Increased paddingBottom to accommodate play button
  },
  card: {
    width: 150,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardCover: {
    height: '100%',
    borderRadius: 12,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardTitle: {
    position: 'absolute',
    bottom: 0,
    color: 'white',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingBottom: 30,
  },
  playButtonContainer: {
    position: 'absolute',
    bottom: 8, // Adjust as needed for vertical positioning
    left: 0,
    right: 0,
    alignItems: 'center', // Center horizontally
  },
  playButton: {
    backgroundColor: 'rgba(0,0,0,0.6)', // Semi-transparent background for button
    opacity: 0.75, // Opacity for button
    borderRadius: 25, // Circular shape
    padding: 3, // Padding around icon
  },
});

export default GameItem;