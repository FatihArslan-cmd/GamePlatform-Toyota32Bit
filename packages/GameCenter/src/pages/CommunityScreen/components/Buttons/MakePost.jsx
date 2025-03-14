import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import { TouchableRipple, Tooltip } from 'react-native-paper';
import { isTablet } from '../../../../components/isTablet';
import { useTheme } from '../../../../context/ThemeContext'; 

const MakePost = ({  size }) => {
  const navigation = useNavigation();
  const adjustedSize = size || (isTablet() ? 32 : 24);
  const circleSize = adjustedSize + 16;
  const { colors } = useTheme(); 
  const styles = createStyles(colors); 

  const handlePress = () => {
    navigation.navigate('CreatePost');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainFabContainer}>
        <TouchableRipple
          onPress={handlePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.ripple}
        >
          <Tooltip title='Make a post' >
            <View style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]}>
              <Icon name="plus" size={adjustedSize} color={colors.text} />
            </View>
          </Tooltip>
        </TouchableRipple>
      </View>
    </View>
  );
};

const createStyles = (colors) => StyleSheet.create({ 
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
  ripple: {
    borderRadius: 50,
  },
  circle: {
    backgroundColor: colors.primary, 
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