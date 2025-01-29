
import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'react-native-linear-gradient';

const LevelProgressBar = ({ level, currentXP, nextLevelXP }) => {
  const progressAnim = new Animated.Value(0);
  const progressPercentage = (currentXP / nextLevelXP) * 100;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progressPercentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [currentXP, nextLevelXP]);

  const width = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.levelBadge}>
        <LinearGradient
          colors={['#FF6B6B', '#FF8E53']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.badgeGradient}
        >
          <Text style={styles.levelText}>LVL {level}</Text>
        </LinearGradient>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressContainer}>
          <LinearGradient
            colors={['#4776E6', '#8E54E9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.backgroundGradient}
          />
          <Animated.View style={[styles.progressBarContainer, { width }]}>
            <LinearGradient
              colors={['#00F260', '#0575E6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.progressGradient}
            >
              <View style={styles.shimmerEffect} />
            </LinearGradient>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 8,
    margin: 10,
  },
  levelBadge: {
    marginRight: 12,
  },
  badgeGradient: {
    padding: 8,
    borderRadius: 8,
    elevation: 3,
  },
  levelText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
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
  shimmerEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  xpContainer: {
    marginTop: 4,
  },
  xpText: {
    fontFamily:'Orbitron-VariableFont_wght',
    textAlign:'center',
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
});

export default LevelProgressBar;