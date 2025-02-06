import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View, Dimensions } from 'react-native';

export const RoomLoading = ({ props }) => {
  const windowWidth = Dimensions.get('window').width;
  const CARD_SPACING = 10;
  const CARD_WIDTH_CALC = (windowWidth - CARD_SPACING * 3) / 2.1; // Calculation from VideoPlayItems
  const CARD_HEIGHT = 200; // Height from VideoPlayItems
  const itemSpacingHorizontal = CARD_SPACING; // Use CARD_SPACING for horizontal spacing
  const borderRadius = 30; // borderRadius from VideoPlayItems
  const startX = 0;

  // Calculate skeletonWidth to fit two cards with spacing
  const skeletonWidth = (CARD_WIDTH_CALC * 2) + itemSpacingHorizontal + (CARD_SPACING * 2); // Added padding on both sides

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
      <ContentLoader
        rtl
        speed={0.2}
        width={skeletonWidth}
        height={CARD_HEIGHT + 20} // Adjust height for a single row + paddingTop
        viewBox={`0 0 ${skeletonWidth} ${CARD_HEIGHT + 20}`} // Adjust viewBox height accordingly
        backgroundColor="#D3D3D3"
        foregroundColor="#E0E0E0"
        {...props}
      >
        {/* Only one row with two rectangles */}
        <React.Fragment>
          <Rect
            x={startX + CARD_SPACING} // Add CARD_SPACING for left padding
            y={0}
            rx={borderRadius}
            ry={borderRadius}
            width={CARD_WIDTH_CALC}
            height={CARD_HEIGHT}
          />
          <Rect
            x={startX + CARD_WIDTH_CALC + itemSpacingHorizontal + CARD_SPACING} // Add CARD_SPACING for left padding
            y={0}
            rx={borderRadius}
            ry={borderRadius}
            width={CARD_WIDTH_CALC}
            height={CARD_HEIGHT}
          />
        </React.Fragment>
      </ContentLoader>
    </View>
  );
};