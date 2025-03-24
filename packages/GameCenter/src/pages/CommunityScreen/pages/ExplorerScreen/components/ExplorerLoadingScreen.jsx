import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View, Dimensions } from 'react-native';
import { useTheme } from '../../../../../context/ThemeContext';

export const ExplorerLoadingSkeleton = ({ props }) => {
  const windowWidth = Dimensions.get('window').width;
  const skeletonWidth = windowWidth * 0.9;
  const originalItemHeight = 80;
  const itemHeight = originalItemHeight * 1.2;
  const itemSpacing = 16;
  const borderRadius = 8;
  const startX = 0;
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 20, backgroundColor: colors.background }}>
      <ContentLoader
        rtl
        speed={0.5}
        width={skeletonWidth}
        height={1000}
        viewBox={`0 0 ${skeletonWidth} 1000`}
        backgroundColor={colors.border}
        foregroundColor={colors.card}
        {...props}
      >
        {[...Array(10)].map((_, index) => (
          <Rect
            key={index}
            x={startX}
            y={index * (itemHeight + itemSpacing)}
            rx={borderRadius}
            ry={borderRadius}
            width={skeletonWidth}
            height={itemHeight}
          />
        ))}
      </ContentLoader>
    </View>
  );
};