import GameCard from "./components/GameCard";
import GradientDivider from "../../../../components/GradientDivider";
import GrandientText from "../../../../components/GrandientText";
import PagerView from "react-native-pager-view";
import PaginationDots from "./components/PaginationDots";
import React, { useState } from "react";
import gameData from "../../../GameDetails/utils/gameData.json";
import imageAssets from "../../../GameDetails/utils/imageAssets";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../../context/ThemeContext";
import { isTablet } from "../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const FromTheCreator = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { colors } = useTheme();
  const themedStyles = useStyles(colors);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const getImageSource = (imageName) => {
    return imageAssets[imageName] || null;
  };

  const buttonColorSets = [
    ['#FF6F61', '#FFD700'],
    ['#d73901', '#d73901'],
    ['#3CB371', '#90EE90'],
    ['#DA70D6', '#FFB6C1'],
    ['#FFA07A', '#FA8072'],
  ];

  const textGradientColorSets = buttonColorSets;

  const handlePageScroll = (event) => {
    setActiveIndex(event.nativeEvent.position);
  };

  const currentTextGradientColors = textGradientColorSets[activeIndex % textGradientColorSets.length];

  return (
    <View style={themedStyles.container}>
      <GrandientText
        text={t('homeScreen.fromTheCreator')}
        colors={currentTextGradientColors}
        textStyle={{ fontSize: TABLET_DEVICE ? 32 : 20 }}
        gradientDirection="horizontal"
        width={400}
      />
      <GradientDivider
        colorProps={currentTextGradientColors}
        height={3}
      />

      <View style={themedStyles.pagerContainer}>
        <PagerView
          style={themedStyles.pagerView}
          initialPage={0}
          orientation="horizontal"
          onPageSelected={handlePageScroll}
        >
          {gameData.map((game, index) => (
            <View key={index} style={themedStyles.page}>
              <GameCard
                gameName={game.gameName?.[currentLanguage] || game.gameName?.en }
                instructions={game.instructions?.[currentLanguage] || game.instructions?.en }
                explanation={game.explanation?.[currentLanguage] || game.explanation?.en }
                imageSource={getImageSource(game.imageSource)}
                buttonText={t('homeScreen.exploreNow')}
                buttonColors={buttonColorSets[index % buttonColorSets.length]}
                backgroundColors={game.backgroundColors}
                textColor={game.textColor}
                about={game.about}
              />
            </View>
          ))}
        </PagerView>

        <PaginationDots activeIndex={activeIndex} count={gameData.length} />
      </View>
    </View>
  );
};

const useStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: TABLET_DEVICE ? 16 : 10,
    backgroundColor: colors.background,
  },
  pagerContainer: {
    flex: 1,
  },
  pagerView: {
    height: 350,
    width: '100%',
  },
  page: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FromTheCreator;