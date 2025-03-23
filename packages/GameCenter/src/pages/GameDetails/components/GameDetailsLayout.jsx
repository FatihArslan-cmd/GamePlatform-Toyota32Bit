import React from 'react';
import { View } from 'react-native';
import { Surface, Title } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import BackButton from '../../../components/BackIcon';
import TabNavigation from './TabNavigation';
import TabContent from './TabContent';
import { styles } from '../styles';
import GradientDivider from '../../../components/GradientDivider';
import CreateLobbyModal from '../../HomeScreen/components/CreateLobbyModal/CreateLobbyModal';
import { useGameDetails } from '../context/GameDetailsContext';
import { GameDetailsImageEnterAnimation } from './Animation/GameDetailsImageEnterAnimation';
import { useTheme } from '../../../context/ThemeContext';

export default function GameDetailsLayout({ gameName, about, imageSource, backgroundColors }) {
  const { lobbyModalVisible, setLobbyModalVisible } = useGameDetails();
  const { animatedImageStyle, animatedContentStyle } = GameDetailsImageEnterAnimation(); 
  const { colors } = useTheme(); 
  const defaultBackgroundColors = ['#4a148c', '#7c43bd', '#9b6bf5'];
  const gradientColors = backgroundColors || defaultBackgroundColors;


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
      >
        <BackButton style={styles.backButton} color="white" size={32} />

        <Animated.Image
          source={imageSource}
          style={[styles.image, animatedImageStyle]}
        />

        <Animated.View style={[styles.contentWrapper, animatedContentStyle]}>
          <Surface style={[styles.infoContainer,{ backgroundColor: colors.background }]}>
            <Title style={[styles.title,{color:colors.bingoText}]}>{gameName}</Title>
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