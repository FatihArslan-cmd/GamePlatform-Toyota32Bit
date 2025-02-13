import React from 'react';
import { Animated, TouchableOpacity,StyleSheet} from 'react-native';

export const CustomSwitch = ({ value, onValueChange }) => {
  const switchAnimation = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(switchAnimation, {
      toValue: value ? 1 : 0,
      useNativeDriver: false,
      bounciness: 12,
    }).start();
  }, [value, switchAnimation]);

  const handlePress = () => {
    onValueChange(!value);
  };

  const backgroundColorInterpolation = switchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E0E0E0', '#6366F1']
  });

  const translateX = switchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22]
  });

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={handlePress}
    >
      <Animated.View style={[
        styles.switchContainer,
        { backgroundColor: backgroundColorInterpolation }
      ]}>
        <Animated.View style={[
          styles.thumb,
          { transform: [{ translateX }] }
        ]} />
      </Animated.View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    elevation: 4,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  titleStyle: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 16,
  },
  descriptionStyle: {
    fontFamily: 'Orbitron-VariableFont_wght',
    fontSize: 12,
    color: '#666',
  },
  switchContainer: {
    width: 48,
    height: 26,
    borderRadius: 13,
    padding: 2,
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'white',
    elevation: 2,
  },
});