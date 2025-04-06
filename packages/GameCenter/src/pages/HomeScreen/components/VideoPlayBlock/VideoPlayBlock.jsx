import FastImage from "react-native-fast-image";
import GradientDivider from "../../../../components/GradientDivider";
import GrandientText from "../../../../components/GrandientText";
import React, { memo, useEffect } from "react";
import VideoPlayItems from "./components/VideoPlayItems";
import games from "./components/games";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../../context/ThemeContext";
import { isTablet } from "../../../../utils/isTablet";

const TABLET_DEVICE = isTablet(); 

const VideoPlayBlock = memo(() => {
  const isFocused = useIsFocused();
  const { colors } = useTheme(); 
  const themedStyles = styles(colors);
  const { t } = useTranslation();

  useEffect(() => {
    if (isFocused) {
      FastImage.preload(games.map((game) => ({ uri: game.imageUri })));
    }
  }, [isFocused]);

  return (
    <View style={themedStyles.container}>
      <GrandientText
        text= {t('homeScreen.Upcominggames')}
        colors={colors.languageTextGradient} 
        textStyle={{ fontSize: TABLET_DEVICE ? 32 : 20 }}
        gradientDirection="horizontal"
        width={400}
      />
      <GradientDivider />
      <View style={{ marginVertical: 10 }} />
      <View style={themedStyles.gridContainer}>
        {games.map((game, index) => (
          <VideoPlayItems
            key={game.title}
            title={game.title}
            imageUri={isFocused ? game.imageUri : null}
            index={index}
          />
        ))}
      </View>
    </View>
  );
});

const styles = (colors) => StyleSheet.create({
  container: {
    padding: TABLET_DEVICE ? 16 : 12,
    backgroundColor: colors.background, 
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Orbitron-VariableFont_wght',
    textAlign: 'center',
    marginBottom: 16,
    color: colors.text, 
  },
});

export default VideoPlayBlock;