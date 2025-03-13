import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import { TouchableRipple } from 'react-native-paper';
import FriendsPage from './Friends/index';
import AchivementsPage from './Achivements';
import { useButtons } from './context/ButtonsContext';
import { useTheme } from '../../../context/ThemeContext';

const Buttons = () => {
    const {
        pagerRef,
        activeTabIndex,
        tabs,
        handleTabPress,
        handlePageChange,
    } = useButtons();
    const { colors } = useTheme();

    if (!colors) {
        // Theme context might not be immediately available.
        // You can return a loading state or fallback UI if needed.
        return <View><Text>Loading Theme...</Text></View>;
    }


    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.tabContainer, { backgroundColor: colors.background }]}>
                {tabs.map((tab, index) => (
                    <TouchableRipple
                        key={tab.id}
                        style={[styles.tab, { width: `${100 / tabs.length}%` }]} // Adjust width based on number of tabs
                        onPress={() => handleTabPress(index)}
                        rippleColor={colors.ripple} // Use theme color for ripple or configurable
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
        paddingVertical: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    tabContent: {
        alignItems: 'center',
    },
    tabNumber: {
        fontSize: 22,
        fontFamily: 'Orbitron-ExtraBold',
        paddingVertical: 10
    },
    tabText: {
        fontSize: 16,
        fontFamily: 'Orbitron-ExtraBold',
    },
    pagerView: {
        flex: 1,
    },
    page: {
        flex: 1,
    },
    pageText: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Orbitron-VariableFont_wght'
    },
});

export default Buttons;