import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import { useUser } from '../../../context/UserContext';
import { BlurView } from '@react-native-community/blur';
import GrandientText from '../../../components/GrandientText';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const ProfileDetailsScreen = () => {
  const { user } = useUser();
  const navigation = useNavigation(); // Get navigation object

  const handleScreenPress = () => {
    navigation.goBack(); // Navigate back on press
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container}>
        <BlurView
          style={styles.blurView}
          blurType="light" // veya "dark", "xlight", "regular", "thin", "thick", "ultrathin" gibi diğer tipler
          blurAmount={2} // Blur miktarı, isteğe bağlı olarak ayarlanabilir
        />
        <Animated.Image
          source={{ uri: user?.profilePhoto }}
          style={[styles.largeAvatar, { borderRadius: 150 }]}
          sharedTransitionTag="profileTransition"
        />
                      <GrandientText
                        text={user?.username?.toUpperCase() || 'USERNAME'}
                        colors={['#4A00E0', '#FF8C00']}
                        textStyle={{ fontSize: 40 }}
                        gradientDirection="horizontal"
                        textAlignment={{
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          marginTop: 20,
                        }}
                        width={150}
                      />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeAvatar: {
    width: 300,
    height: 300,
    zIndex: 1, // Resmi öne çıkarmak için zIndex ekleyin
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default ProfileDetailsScreen;