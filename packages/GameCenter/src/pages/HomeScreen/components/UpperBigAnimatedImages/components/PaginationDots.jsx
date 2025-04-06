import React from "react";
import { StyleSheet, View } from "react-native";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const PaginationDots = ({ games, currentPage }) => (
  <View style={styles.paginationContainer}>
    {games.map((_, index) => (
      <View
        key={index}
        style={[
          styles.paginationDot,
          index === currentPage && styles.paginationDotActive,
        ]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    gap: 8,
  },
  paginationDot: {
    width: TABLET_DEVICE ? 8 : 5,
    height:  TABLET_DEVICE ? 8 : 5,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: TABLET_DEVICE ? 24 : 14
  },
});

export default PaginationDots;
