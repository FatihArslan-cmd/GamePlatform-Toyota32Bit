import React, { useCallback, useEffect, useRef, memo } from 'react';
import { View, StyleSheet, Dimensions, Animated,Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
const { width } = Dimensions.get('window');
const CARD_SPACING = 10;
const CARD_WIDTH = (width - CARD_SPACING * 3) / 2.1;

const VideoPlayItems = memo(({ title, imageUri, index }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const overlayAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.sequence([
        Animated.delay(index * 100), // Stagger delay based on index
        Animated.parallel([
          Animated.spring(opacityAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
          }),
        ]),
      ]).start();
    }, []);
  
    // Memoized press handlers
    const handlePressIn = useCallback(() => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0.95,
          useNativeDriver: true,
          tension: 100,
          friction: 5,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);
  
    const handlePressOut = useCallback(() => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 5,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);
  
    return (
      <Pressable 
        onPressIn={handlePressIn} 
        onPressOut={handlePressOut}
        style={styles.pressable}
      >
        <Animated.View 
          style={[
            styles.cardContainer, 
            { 
              opacity: opacityAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: Animated.multiply(opacityAnim, new Animated.Value(-20)) }
              ] 
            }
          ]}
        >
          <FastImage
            style={styles.image}
            source={{ uri: imageUri }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Animated.View 
            style={[
              styles.overlay,
              { opacity: overlayAnim }
            ]} 
          />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
          </View>
        </Animated.View>
      </Pressable>
    );
  });


  const styles = StyleSheet.create({


    headerText: {
      fontSize: 24,
      marginBottom: 16,
      color: '#333',
      textAlign: 'center',
    },


    pressable: {
      marginBottom: CARD_SPACING,
    },
    cardContainer: {
      width: CARD_WIDTH,
      height: 200,
      borderRadius: 30,
      backgroundColor: '#fff',
      elevation: 5,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#000',
      opacity: 0,
    },
    titleContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: 8,
    },
    titleText: {
      color: '#fff',
      fontSize: 14,
      fontFamily: 'Orbitron-VariableFont_wght',
      textAlign: 'center',
    },
  });

export default VideoPlayItems