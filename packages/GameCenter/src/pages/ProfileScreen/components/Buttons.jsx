import AchivementsPage from "./Achivements";
import FriendsPage from "./Friends/index";
import PagerView from "react-native-pager-view";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";
import { useButtons } from "./context/ButtonsContext";

const TABLET_DEVICE = isTablet();

const Buttons = () => {
    const {
        pagerRef,
        activeTabIndex,
        tabs,
        handleTabPress,
        handlePageChange,
    } = useButtons();
    const { colors } = useTheme();

    const [tabContainerWidth, setTabContainerWidth] = useState(0);
    const indicatorPosition = useRef(new Animated.Value(0)).current; 

    const handleLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        if (width > 0 && tabContainerWidth !== width) { 
           setTabContainerWidth(width);
        }
    };

    useEffect(() => {
        if (tabContainerWidth > 0 && tabs.length > 0) {
            const tabWidth = tabContainerWidth / tabs.length;
            const targetPosition = activeTabIndex * tabWidth;

            Animated.timing(indicatorPosition, {
                toValue: targetPosition,
                duration: 250, 
                useNativeDriver: true, 
            }).start();
        }
    }, [activeTabIndex, tabContainerWidth, tabs.length, indicatorPosition]);

    const indicatorStyle = {
        position: 'absolute',
        bottom: 0,
        height: 2,
        width: tabContainerWidth > 0 && tabs.length > 0 ? `${100 / tabs.length}%` : 0,
        backgroundColor: colors.primary,
        transform: [{ translateX: indicatorPosition }],
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View
                style={[styles.tabContainer, { backgroundColor: colors.background }]}
                onLayout={handleLayout} 
            >
                {tabs.map((tab, index) => (
                    <TouchableRipple
                        key={tab.id}
                        style={[styles.tab, { width: `${100 / tabs.length}%` }]}
                        onPress={() => handleTabPress(index)}
                        rippleColor={colors.primary + '30'} 
                        borderless={true} 
                    >
                        <View style={styles.tabContent}>
                            <Text style={[styles.tabNumber, { color: colors.subText }, activeTabIndex === index && { color: colors.primary }]}>
                                {tab.title}
                            </Text>
                            <Text style={[styles.tabText, { color: colors.subText }, activeTabIndex === index && { color: colors.primary }]}>
                                {tab.subtitle}
                            </Text>
                        </View>
                    </TouchableRipple>
                ))}
                {tabContainerWidth > 0 && tabs.length > 0 && (
                    <Animated.View style={indicatorStyle} />
                )}
            </View>

            <PagerView
                ref={pagerRef}
                style={[styles.pagerView, { backgroundColor: colors.background }]}
                initialPage={0}
                onPageSelected={handlePageChange}
                scrollEnabled={true}
            >
                <View key="0" style={[styles.page, { backgroundColor: colors.background }]}>
                    <AchivementsPage />
                </View>
                <View key="1" style={[styles.page, { backgroundColor: colors.background }]}>
                    <FriendsPage />
                </View>
            </PagerView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        position: 'relative', 
    },
    tab: {
        paddingVertical: 15, 
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    tabContent: {
        alignItems: 'center',
    },
    tabNumber: {
        fontSize: TABLET_DEVICE ? 20 : 14,
        fontFamily: 'Orbitron-ExtraBold',
    },
    tabText: {
        fontSize: TABLET_DEVICE ? 20 : 12,
        fontFamily: 'Orbitron-ExtraBold',
        marginTop: 4, 
    },
    pagerView: {
        flex: 1,
    },
    page: {
        flex: 1,
    },
});

export default Buttons;