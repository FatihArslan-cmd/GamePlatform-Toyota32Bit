import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View, Dimensions } from 'react-native';

export const ExplorerLoadingSkeleton = ({ props }) => {
  const windowWidth = Dimensions.get('window').width;
  const skeletonWidth = windowWidth * 0.9;

  // Calculate dimensions for skeleton items
  const originalItemHeight = 80;
  const itemHeight = originalItemHeight * 1.2; // Height increased by 20%
  const itemSpacing = 16;
  const borderRadius = 8;
  const startX = 0;

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
      <ContentLoader
        rtl
        speed={0.5}
        width={skeletonWidth}
        height={1000}
        viewBox={`0 0 ${skeletonWidth} 1000`}
        backgroundColor="#D3D3D3" // Daha açık gri renk (Light Gray)
        foregroundColor="#E0E0E0" // Daha açık gri foreground
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