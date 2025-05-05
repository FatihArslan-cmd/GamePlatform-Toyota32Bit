import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { IconButton, TextInput, Tooltip } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";
import { isTablet } from "../../../../utils/isTablet";
import { useHeader } from "./context/HeaderContext";

const TABLET_DEVICE = isTablet(); 

const SearchBar = () => { 
  const searchBarWidth = useSharedValue(0);
  const searchBarOpacity = useSharedValue(0);
  const searchInputRef = useRef(null);
  const { colors } = useTheme();
  const { searchMode, setSearchMode, searchQuery, setSearchQuery } = useHeader(); 
  const { t } = useTranslation();

  const handleSearchPress = () => {
    setSearchMode(true);
    searchBarWidth.value = withTiming('70%');
    searchBarOpacity.value = withTiming(1);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  };

  const handleCloseSearch = () => {
    searchBarWidth.value = withTiming(0);
    searchBarOpacity.value = withTiming(0);
    setSearchQuery('');
    setTimeout(() => setSearchMode(false), 300);
  };

  const searchBarStyle = useAnimatedStyle(() => ({
    width: searchBarWidth.value,
    opacity: searchBarOpacity.value,
  }));

  return (
    <>
      {searchMode ? (
        <>
          <IconButton
            icon="arrow-left"
            iconColor={colors.text}
            size={TABLET_DEVICE ? 24 : 18}
            onPress={handleCloseSearch}
            style={styles.backButton}
          />
          <Animated.View style={[styles.animatedSearchBar, searchBarStyle]}>
            <TextInput
              ref={searchInputRef}
              style={[styles.searchInput, { backgroundColor: colors.card, color: colors.text }]}
              placeholder={t('homeScreen.searchPlaceholder')}
              value={searchQuery}
              onChangeText={setSearchQuery} 
              mode="outlined"
              dense
              autoFocus={true}
              placeholderTextColor={colors.subText}
              outlineStyle={{ borderRadius: 20, borderColor: colors.border }}
              contentStyle={{ backgroundColor: colors.card, height: 40 }}
              selectionColor={colors.primary}
            />
          </Animated.View>
        </>
      ) : (
        <Tooltip title='Search' >
          <IconButton
            icon="magnify"
            size={TABLET_DEVICE ? 24 : 18}
            onPress={handleSearchPress}
            iconColor={colors.text}
          />
        </Tooltip>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  animatedSearchBar: {
    height: 40,
    flex: 1,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    borderRadius: 20,
    height: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  backButton: {
    marginLeft: 0,
  },
});

export default SearchBar;