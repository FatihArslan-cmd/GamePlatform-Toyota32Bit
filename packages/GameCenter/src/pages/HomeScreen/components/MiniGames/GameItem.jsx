import React, { memo } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { Card, Surface } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedSurface = Animated.createAnimatedComponent(Surface);

const GameItem = memo(({ item, onPress }) => {
  const scale = useSharedValue(1);

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
      <AnimatedSurface style={[styles.surface, animatedStyle]} elevation={4}>
        <View style={styles.backgroundContainer}>
          <FastImage
            source={{ 
              uri: item.image_background,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={styles.backgroundImage}
          />
          <BlurView
            style={styles.absoluteFill}
            blurType="light"
            blurAmount={8}
            reducedTransparencyFallbackColor="white"
          />
        </View>

        <Card style={styles.card}>
          <FastImage
            source={{ 
              uri: item.image_background,
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
            onPress={onPress}
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
    paddingBottom: 52,
    overflow: 'hidden', // This is important for the blur effect
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  card: {
    width: 150,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    elevation: 4,
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
    bottom: 8,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    opacity: 0.75,
    borderRadius: 25,
    padding: 3,
  },
});

export default GameItem;