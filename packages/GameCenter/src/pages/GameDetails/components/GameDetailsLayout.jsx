import Animated from "react-native-reanimated";
import BackButton from "../../../components/BackIcon";
import CreateLobbyModal from "../../HomeScreen/components/CreateLobbyModal/CreateLobbyModal";
import GradientDivider from "../../../components/GradientDivider";
import LinearGradient from "react-native-linear-gradient";
import React from "react";
import TabContent from "./TabContent";
import TabNavigation from "./TabNavigation";
import { View } from "react-native";
import { Surface, Title } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { useGameDetails } from "../context/GameDetailsContext";
import { styles } from "../styles";
import { GameDetailsImageEnterAnimation } from "./Animation/GameDetailsImageEnterAnimation";

export default function GameDetailsLayout({ gameName, explanation, imageSource, backgroundColors,textColor,about }) {
  const { lobbyModalVisible, setLobbyModalVisible } = useGameDetails();
  const { animatedImageStyle, animatedContentStyle } = GameDetailsImageEnterAnimation(); 
  const { colors } = useTheme(); 
  const defaultBackgroundColors = ['#4a148c', '#7c43bd', '#9b6bf5'];
  const gradientColors = backgroundColors || defaultBackgroundColors; 
  const defaultTextColor = colors.text;
  const textColorValue = textColor || defaultTextColor;
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
            <Title style={[styles.title, {color: textColor}]}>{gameName}</Title>
            <GradientDivider colorProps={[textColor, textColor]} />
            <TabNavigation explanation={explanation} textColor={textColor} />
            <TabContent explanation={explanation} textColor={textColorValue} about={about} />
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