import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import { TouchableRipple } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { isTablet } from '../../../../components/isTablet';

const MakePost = ({ color = '#fff', size }) => {
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const subFabsOpacity = useSharedValue(0);
  const subFabsTranslateY = useSharedValue(0);
  
  const adjustedSize = size || (isTablet() ? 32 : 24);
  const circleSize = adjustedSize + 16;

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });
    scale.value = withSpring(1);
  }, []);

  const mainAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const getSubFabAnimatedStyle = (index) => useAnimatedStyle(() => ({
    opacity: subFabsOpacity.value,
    transform: [
      { translateY: subFabsTranslateY.value * (index + 1) },
      { scale: subFabsOpacity.value }
    ],
  }));

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    subFabsOpacity.value = withTiming(isMenuOpen ? 0 : 1, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
    subFabsTranslateY.value = withSpring(isMenuOpen ? 0 : -65);
  };

  

  const subFabs = [
    { icon: 'camera', onPress: () => navigation.navigate('CreatePost') },
    { icon: 'image', onPress: () => console.log('Image pressed') },
    { icon: 'text', onPress: () => console.log('Text pressed') },
  ];

  return (
    <View style={styles.container}>
      {/* Sub FABs */}
      {subFabs.map((fab, index) => (
        <Animated.View 
          key={fab.icon} 
          style={[styles.subFabContainer, getSubFabAnimatedStyle(index)]}
        >
          <TouchableRipple
            onPress={fab.onPress}
            style={styles.ripple}
          >
            <View style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]}>
              <Icon name={fab.icon} size={adjustedSize} color={color} />
            </View>
          </TouchableRipple>
        </Animated.View>
      ))}

      {/* Main FAB */}
      <Animated.View style={[styles.mainFabContainer, mainAnimatedStyle]}>
        <TouchableRipple
          onPress={toggleMenu}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.ripple}
        >
          <View style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]}>
            <Icon name="plus" size={adjustedSize} color={color} />
          </View>
        </TouchableRipple>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 72,
    right: 36,
    zIndex: 10,
    alignItems: 'center',
  },
  mainFabContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  subFabContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  ripple: {
    borderRadius: 50,
  },
  circle: {
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default MakePost;