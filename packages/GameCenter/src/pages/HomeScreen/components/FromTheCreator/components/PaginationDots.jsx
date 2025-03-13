import React, { memo } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../../../../context/ThemeContext'; // Import useTheme

const useStyles = (colors) => StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    height: 24,
  },
  dot: {
    borderRadius: 4,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});

const PaginationDots = memo(({ activeIndex, count, dotSize = 8 }) => {
  const { colors } = useTheme(); // Use the useTheme hook
  const themedStyles = useStyles(colors); // Get themed styles

  return (
    <View style={themedStyles.paginationContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <Animated.View
          key={index}
          style={[
            themedStyles.dot,
            {
              width: dotSize,
              height: dotSize,
              backgroundColor: activeIndex === index ? colors.primary : colors.border, // Theme colors for dots
              transform: [
                {
                  scale: activeIndex === index ? 1.3 : 1,
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
});

export default PaginationDots;