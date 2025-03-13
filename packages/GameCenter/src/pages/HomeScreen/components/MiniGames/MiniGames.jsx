import React, { memo, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
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
    const scrollViewRef = useRef(null);
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
        if (scrollViewRef.current) {
            if (direction === 'left') {
                scrollViewRef.current.scrollTo({ x: 0, animated: true });
            } else {
                scrollViewRef.current.scrollToEnd({ animated: true });
            }
        }
    };

    const tags = games.flatMap((game) => game.tags?.slice(0, 14) || []);
    const displayedTags = tags.slice(0, 14);

    const topRow = displayedTags.filter((_, i) => i % 2 === 0);
    const bottomRow = displayedTags.filter((_, i) => i % 2 === 1);


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
                        <ScrollView
                            ref={scrollViewRef}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={themedStyles.scrollContainer}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                            fadingEdgeLength={50}
                        >
                            <View style={themedStyles.rowsContainer}>
                                <View style={themedStyles.row}>
                                    {topRow.map((item, index) => (
                                        <GameItem key={index} item={item} />
                                    ))}
                                </View>
                                <View style={themedStyles.row}>
                                    {bottomRow.map((item, index) => (
                                        <GameItem key={index + topRow.length} item={item} />
                                    ))}
                                </View>
                            </View>
                        </ScrollView>
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
    divider: {
        height: 3,
        borderRadius: 1,
        width: '100%',
        marginVertical: 10,
        backgroundColor: colors.border, 
    },
    scrollWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollContainer: {
        paddingHorizontal: 20,
    },
    rowsContainer: {
        gap: 16,
    },
    row: {
        flexDirection: 'row',
        gap: 24,
    },
});

export default MiniGamesBlock;