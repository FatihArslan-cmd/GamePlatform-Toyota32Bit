import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';

const GradientText = ({
  text = 'Colorful Text',            // Default text
  colors = ['#FF6B6B', '#FFD93D'],   // Default gradient colors
  start = { x: 0, y: 0 },            // Default gradient start point
  end = { x: 1, y: 1 },              // Default gradient end point
  fontFamily = 'Orbitron-VariableFont_wght', // Default font family
  textStyle = {},                    // Customizable text styles
  gradientStyle = {},                // Customizable gradient styles
  backgroundColor = '#fff',          // Default background color (white)
  textAlignment = {                  // Customizable alignment
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientDirection = 'diagonal',   // Default gradient direction
}) => {
  // Define preset gradient directions
  const gradientDirections = {
    horizontal: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
    vertical: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
    diagonal: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  };

  // Select gradient direction based on the prop
  const selectedDirection = gradientDirections[gradientDirection] || { start, end };

  return (
    <View
      style={[styles.container, textAlignment, { backgroundColor }]}
      accessible
      accessibilityLabel={text} // Accessibility support
    >
      <MaskedView
        maskElement={
          <View style={styles.maskContainer}>
            <Text style={[styles.text, { fontFamily }, textStyle]}>{text}</Text>
          </View>
        }
      >
        <LinearGradient
          colors={colors}
          start={selectedDirection.start}
          end={selectedDirection.end}
          style={[styles.gradient, gradientStyle]}
        />
      </MaskedView>
    </View>
  );
};

// Default styles for the component
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
  },
  gradient: {
    height: 50,
    width: 250,
  },
});

export default memo(GradientText);
