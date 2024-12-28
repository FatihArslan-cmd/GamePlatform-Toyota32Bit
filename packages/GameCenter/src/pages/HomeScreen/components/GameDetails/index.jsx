import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Title, Text, Surface } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

export default function GameDetails({ navigation }) {

  const translateY = useSharedValue(height-275);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateY.value = withTiming(-height / 2 + 250, {
      duration: 1000,
      easing: Easing.out(Easing.ease),
    });
    scale.value = withTiming(2, {
      duration: 1000,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const createLobby = () => {
    // Lobi oluşturma mantığı buraya gelecek
    navigation.navigate('GameLobby');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6200ee', '#ffffff']}
        style={styles.gradient}
      >
        <Animated.Image
          source={require('../../../../locales/gameImages/unnamed.png')}
          style={[styles.image, animatedStyle]}
        />
        
        <Surface style={styles.infoContainer}>
          <Title style={styles.title}>Bingo Nasıl Oynanır?</Title>
          
          <Text style={styles.instructions}>
            1. Her oyuncuya rastgele sayılardan oluşan bir kart verilir{'\n'}
            2. Sayılar sırayla çekilir{'\n'}
            3. Kartınızdaki sayıları işaretleyin{'\n'}
            4. Dikey, yatay veya çapraz bir sıra tamamlandığında "BİNGO!" deyin{'\n'}
            5. İlk bingo yapan oyuncu kazanır!
          </Text>

          <Button
            mode="contained"
            onPress={createLobby}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Lobi Oluştur
          </Button>
        </Surface>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 30,
    width: width/2 - 30,
    height: height/6,
  },
  infoContainer: {
    width: width - 40,
    padding: 20,
    marginTop: 20,
    borderRadius: 15,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#6200ee',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#6200ee',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});