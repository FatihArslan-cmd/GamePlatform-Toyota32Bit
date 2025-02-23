import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'react-native-linear-gradient'; 
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const LevelProgressBar = ({ level, currentXP, nextLevelXP }) => {
  const progressAnim = useSharedValue(0);

  useEffect(() => {
    const progressPercentage = (currentXP / nextLevelXP) * 100;
    progressAnim.value = withTiming(progressPercentage, { duration: 1000 });
  }, [currentXP, nextLevelXP]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressAnim.value}%`,
  }));
    const currentLevelNumber = level;
    const nextLevelNumber = level + 1;

    const remainingXP = nextLevelXP - currentXP;
  return (
    <View style={styles.container}>
        <View style={styles.progressContent}>
        <View style={styles.levelContainer}>
            <Text style={styles.currentLevelText}>{currentLevelNumber}</Text>
          </View>
      <View style={styles.progressSection}>
        <View style={styles.progressContainer}>
          <LinearGradient
            colors={['#2C0735', '#4A1259']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.backgroundGradient}
          />
          <Animated.View style={[styles.progressBarContainer, animatedStyle]}>
            <LinearGradient
              colors={['#8E2DE2', '#4A00E0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.progressGradient}
            />
          </Animated.View>
        </View>
      </View>
            <View style={styles.nextLevelContainer}>
            <Text style={styles.nextLevelText}>{nextLevelNumber}</Text>
        </View>
    </View>
      <View style={styles.xpContainer}>
        <Text style={styles.xpText}>
          {remainingXP.toLocaleString()} XP TO LEVEL {nextLevelNumber}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(44, 7, 53, 0.1)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 10,
  },
      progressContent: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
      },
    levelContainer:{
        paddingHorizontal: 12,
        paddingVertical: 3,
      borderRadius: 5,
      backgroundColor: '#321B3B',
    },
    nextLevelContainer:{
       paddingHorizontal: 12,
        paddingVertical: 3,
      borderRadius: 5,
      backgroundColor: '#321B3B',
    },
    currentLevelText: {
          color: '#FFFFFF',
          fontFamily: 'Orbitron-ExtraBold',
          fontSize: 16,
    },
    nextLevelText: {
      color: '#FFFFFF',
      fontFamily: 'Orbitron-ExtraBold',
      fontSize: 16,
    },
  progressSection: {
      flex:1,
      marginHorizontal: 10,
  },
  progressContainer: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  progressBarContainer: {
    height: '100%',
    borderRadius: 6,
  },
  progressGradient: {
    flex: 1,
    borderRadius: 6,
  },
  xpContainer: {
    marginTop: 4,
  },
  xpText: {
    fontFamily: 'Orbitron-ExtraBold',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 12,
  },
});

export default LevelProgressBar;