import React, { memo, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import GameItem from './components/GameItem';
import ScrollArrow from './components/ScrollArrow';
import MyLoader from '../../../../components/SkeletonPlaceHolder/MiniGamesPlaceHolder';
import GrandientText from '../../../../components/GrandientText';
import ScrollIndicator from './components/ScrollIndicator';
import { useTheme } from '../../../../context/ThemeContext';

const MiniGamesBlock = memo(({ games }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const flashListRef = useRef(null);
    const scrollProgress = useRef(new Animated.Value(0)).current;
    const { colors } = useTheme();
    const themedStyles = useStyles(colors);

    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timeout);
    }, []);

    const handleScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const progress = contentOffset.x / (contentSize.width - layoutMeasurement.width);
        scrollProgress.setValue(progress);

        setCanScrollLeft(contentOffset.x > 0);
        setCanScrollRight(contentOffset.x + layoutMeasurement.width < contentSize.width);
    };

    const scroll = (direction) => {
        if (flashListRef.current) {
            if (direction === 'left') {
                flashListRef.current.scrollToOffset({ offset: 0, animated: true });
            } else {
                flashListRef.current.scrollToEnd({ animated: true });
            }
        }
    };

    const tags = games.flatMap((game) => game.tags?.slice(0, 14) || []);
    const displayedTags = tags.slice(0, 14);

    const topRow = displayedTags.filter((_, i) => i % 2 === 0);
    const bottomRow = displayedTags.filter((_, i) => i % 2 === 1);
    const columns = topRow.map((topItem, index) => ({
        top: topItem,
        bottom: bottomRow[index],
    }));

    return (
        <View style={themedStyles.wrapper}>
            <GrandientText
                text="Mini Games"
                colors={colors.languageTextGradient}
                textStyle={{ fontSize: 32, textAlign: 'center', color: colors.text }}
                gradientDirection="horizontal"
            />
            <ScrollIndicator scrollProgress={scrollProgress} />
            {isLoading ? (
                <MyLoader />
            ) : (
                <>
                    <View style={themedStyles.scrollWrapper}>
                        {canScrollLeft && <ScrollArrow direction="left" onPress={() => scroll('left')} />}
                        <FlashList
                            ref={flashListRef}
                            data={columns}
                            horizontal
                            renderItem={({ item }) => (
                                <View style={themedStyles.column}>
                                    <GameItem item={item.top} />
                                    <GameItem item={item.bottom} />
                                </View>
                            )}
                            estimatedItemSize={20}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                            initialNumToRender={2}
                            maxToRenderPerBatch={3}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={themedStyles.flashListContent}
                            keyExtractor={(_, index) => index.toString()}
                        />
                        {canScrollRight && <ScrollArrow direction="right" onPress={() => scroll('right')} />}
                    </View>
                    <ScrollIndicator scrollProgress={scrollProgress} />
                </>
            )}
        </View>
    );
});

const useStyles = (colors) => StyleSheet.create({
    wrapper: {
        backgroundColor: colors.background,
        paddingVertical: 20,
    },
    scrollWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flashListContent: {
        paddingHorizontal: 20,
        gap: 24,
    },
    column: {
        gap: 20,
        marginHorizontal: 12, 
    },
});

export default MiniGamesBlock;