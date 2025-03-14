import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View, Dimensions } from 'react-native';
import { useTheme } from '../../../../context/ThemeContext'; // Import useTheme

export const RoomLoading = ({ props }) => {
  const windowWidth = Dimensions.get('window').width;
  const CARD_SPACING = 10;
  const CARD_WIDTH_CALC = (windowWidth - CARD_SPACING * 3) / 2.1;
  const CARD_HEIGHT = 200;
  const itemSpacingHorizontal = CARD_SPACING;
  const borderRadius = 30;
  const startX = 0;
  const { colors } = useTheme(); // Use theme context

  const skeletonWidth = (CARD_WIDTH_CALC * 2) + itemSpacingHorizontal + (CARD_SPACING * 2);

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 20, backgroundColor: colors.background }}>
      <ContentLoader
        rtl
        speed={0.2}
        width={skeletonWidth}
        height={CARD_HEIGHT + 20}
        viewBox={`0 0 ${skeletonWidth} ${CARD_HEIGHT + 20}`}
        backgroundColor={colors.border} // Use theme border color for background
        foregroundColor={colors.card} // Use theme card color for foreground
        {...props}
      >
        <React.Fragment>
          <Rect
            x={startX + CARD_SPACING}
            y={0}
            rx={borderRadius}
            ry={borderRadius}
            width={CARD_WIDTH_CALC}
            height={CARD_HEIGHT}
          />
          <Rect
            x={startX + CARD_WIDTH_CALC + itemSpacingHorizontal + CARD_SPACING}
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