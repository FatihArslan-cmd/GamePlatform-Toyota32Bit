import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, IconButton,Tooltip } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const SearchBar = ({ searchMode, setSearchMode, searchQuery, setSearchQuery }) => {
  const searchBarWidth = useSharedValue(0);
  const searchBarOpacity = useSharedValue(0);
  const searchInputRef = useRef(null);

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
            color="gray"
            size={24}
            onPress={handleCloseSearch}
            style={styles.backButton}
          />
          <Animated.View style={[styles.animatedSearchBar, searchBarStyle]}>
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Search games..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              mode="outlined"
              dense
              autoFocus={false}
              placeholderTextColor="gray"
              outlineStyle={{ borderRadius: 20, borderColor: '#ddd' }}
              contentStyle={{ backgroundColor: '#fff', height: 40 }}
              selectionColor="#007BFF"
            />
          </Animated.View>
        </>
      ) : (
        <Tooltip title='Search' >
        <IconButton
          icon="magnify"
          onPress={handleSearchPress}
          color="gray"
          
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
    backgroundColor: 'white',
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
