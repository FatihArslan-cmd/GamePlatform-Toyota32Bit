import React, { useEffect, useContext } from 'react';
import { View, Dimensions } from 'react-native';
import { Surface, Title } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay, Easing } from 'react-native-reanimated';
import BackButton from '../../../../../components/BackIcon';
import TabNavigation from './TabNavigation';
import TabContent from './TabContent';
import { styles } from '../styles';
import GradientDivider from '../../../../../components/GradientDivider';
import CreateLobbyModal from '../../CreateLobbyModal/CreateLobbyModal';
import { useGameDetails } from '../context/GameDetailsContext'; // useGameDetails Hook kullanımı

const { height } = Dimensions.get('window');

export default function GameDetailsLayout({ gameName, about, imageSource }) {
  const translateY = useSharedValue(height - 275);
  const scale = useSharedValue(1);
  const contentTranslateY = useSharedValue(100);
  const contentOpacity = useSharedValue(0);

  const { lobbyModalVisible, setLobbyModalVisible } = useGameDetails();

  useEffect(() => {
    // Animasyonlar
    translateY.value = withTiming(-height / 2 + 250, {
      duration: 1200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    scale.value = withSequence(
      withTiming(2.2, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      withTiming(2, { duration: 300, easing: Easing.bounce })
    );

    contentTranslateY.value = withDelay(
      800,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.quad) })
    );

    contentOpacity.value = withDelay(
      800,
      withTiming(1, { duration: 600, easing: Easing.bezier(0.4, 0, 0.2, 1) })
    );
  }, []);

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const animatedContentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentTranslateY.value }],
    opacity: contentOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4a148c', '#7c43bd', '#9b6bf5']}
        style={styles.gradient}
      >
        <BackButton style={styles.backButton} color="white" size={32} />

        <Animated.Image
          source={imageSource}
          style={[styles.image, animatedImageStyle]}
        />

        <Animated.View style={[styles.contentWrapper, animatedContentStyle]}>
          <Surface style={styles.infoContainer}>
            <Title style={styles.title}>{gameName}</Title>
            <GradientDivider colorProps={['#4A00E0', '#4A00E0']} />
            <TabNavigation />
            <TabContent about={about} />
          </Surface>
        </Animated.View>
      </LinearGradient>
      <CreateLobbyModal
  visible={lobbyModalVisible}
  onDismiss={() => setLobbyModalVisible(false)}
  height="50%"
  routeGameName={gameName}
/>

    </View>
  );
}
