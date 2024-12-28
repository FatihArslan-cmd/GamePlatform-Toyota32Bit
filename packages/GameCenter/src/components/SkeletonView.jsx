import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const GameCardSkeleton = () => {
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.image, { opacity }]} />
      <View style={styles.overlay}>
        <Animated.View style={[styles.titleBar, { opacity }]} />
        <View style={styles.statsRow}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.stat}>
              <Animated.View style={[styles.statValue, { opacity }]} />
              <Animated.View style={[styles.statLabel, { opacity }]} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 55,
    overflow: 'hidden',
    elevation: 5,
    margin: 16,
    height: 400,
  },
  image: {
    width: '100%',
    height: 400,
    backgroundColor: '#e1e1e1',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: 20,
    borderTopRightRadius: 55,
    width: '55%',
  },
  titleBar: {
    height: 24,
    backgroundColor: '#e1e1e1',
    marginBottom: 12,
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stat: {
    flex: 1,
  },
  statValue: {
    height: 16,
    backgroundColor: '#e1e1e1',
    borderRadius: 4,
    marginBottom: 4,
  },
  statLabel: {
    height: 12,
    backgroundColor: '#e1e1e1',
    borderRadius: 4,
    width: '80%',
  },
});

export default GameCardSkeleton;