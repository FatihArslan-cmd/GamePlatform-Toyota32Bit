import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import { Card, Surface } from "react-native-paper";
import { isTablet } from "../../../../../utils/isTablet";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedSurface = Animated.createAnimatedComponent(Surface);
const TABLET_DEVICE = isTablet();

const GameItem = memo(({ item }) => {
  const scale = useSharedValue(1);
  const navigation = useNavigation();
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
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}   onPress={() => {
      navigation.navigate('GameDetails', {
        gameName:item.name,
        about:"Bingo is a fun and simple game! Mark the numbers on your card as they are called out. Be the first to complete a row, column, or diagonal and shout 'Bingo!' to win!",
        imageSource : {uri: item.image_background},
        backgroundColors: ["#007BFF", "#66A7FF", "#B3D4FF"]
      });
    }}>
      <AnimatedSurface style={[styles.surface, animatedStyle]} elevation={4} >
        <View style={styles.backgroundContainer}>
          <FastImage
            source={{
              uri: item.image_background,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={styles.backgroundImage}
          />
          <View style={styles.whiteOverlay} />
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
          <View
            style={styles.playButton}
          >
            <Icon name="play-circle-outline" size={TABLET_DEVICE ? 32 : 20} color="white" />
          </View>
        </View>
      </AnimatedSurface>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  surface: {
    borderRadius: 20,
    padding: TABLET_DEVICE ? 12 : 8,
    paddingBottom: TABLET_DEVICE ? 52 : 39,
    overflow: 'hidden',
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
  whiteOverlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'white',
    opacity: 0.5, 
  },
  card: {
    width: TABLET_DEVICE ? 150 : 125,
    height: TABLET_DEVICE ? 180 : 180,
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
    fontSize: TABLET_DEVICE ? 14 : 11,
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