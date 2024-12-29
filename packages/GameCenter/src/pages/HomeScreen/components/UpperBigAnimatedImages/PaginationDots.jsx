import React from 'react';
import { View, StyleSheet } from 'react-native';

const PaginationDots = ({ games, currentPage }) => (
  <View style={styles.paginationContainer}>
    {games.map((_, index) => (
      <View
        key={index}
        style={[
          styles.paginationDot,
          index === currentPage && styles.paginationDotActive,
        ]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 24,
  },
});

export default PaginationDots;
