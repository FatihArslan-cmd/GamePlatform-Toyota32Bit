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

  return (
    <View style={styles.container}>
      <View style={styles.levelBadge}>
        <View style={styles.modernBadge}>
          <Text style={styles.levelText}>LVL {level}</Text>
        </View>
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

        <View style={styles.xpContainer}>
          <Text style={styles.xpText}>
            {currentXP}/{nextLevelXP} XP
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(44, 7, 53, 0.1)',
    borderRadius: 12,
    padding: 8,
    margin: 10,
  },
  levelBadge: {
    marginRight: 12,
  },
  modernBadge: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#321B3B',
    borderWidth: 1,
    borderColor: 'rgba(142, 45, 226, 0.3)',
  },
  levelText: {
    color: '#FFFFFF',
    fontFamily: 'Orbitron-VariableFont_wght',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  progressSection: {
    flex: 1,
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
    fontFamily: 'Orbitron-VariableFont_wght',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
});

export default LevelProgressBar;
