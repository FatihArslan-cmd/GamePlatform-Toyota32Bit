import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableRipple, useTheme } from 'react-native-paper';
import FriendsPage from './FriendsPage'; // FriendsPage bileşenini import ediyoruz.

const Buttons = () => {
    const insets = useSafeAreaInsets();
    const pagerRef = useRef(null);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const { colors } = useTheme();
    const slideAnimation = useRef(new Animated.Value(0)).current;
    
    const screenWidth = Dimensions.get('window').width;

    const tabs = [
        { id: 0, title: '91', subtitle: 'Achievements' },
        { id: 1, title: '0', subtitle: 'Friends' }
    ];

    const animateSlider = (index) => {
        Animated.spring(slideAnimation, {
            toValue: index * 48.1, 
            useNativeDriver: true,
            tension: 68,
            friction: 10
        }).start();
    };

    const handleTabPress = (index) => {
        setActiveTabIndex(index);
        pagerRef.current.setPage(index);
        animateSlider(index);
    };

    const handlePageChange = (event) => {
        const newIndex = event.nativeEvent.position;
        setActiveTabIndex(newIndex);
        animateSlider(newIndex);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.tabContainer}>
                {tabs.map((tab, index) => (
                    <TouchableRipple
                        key={tab.id}
                        style={[styles.tab, { width: `${50}%` }]}
                        onPress={() => handleTabPress(index)}
                        rippleColor={colors.primary}
                    >
                        <View style={styles.tabContent}>
                            <Text style={[styles.tabNumber, activeTabIndex === index && styles.activeTabText]}>
                                {tab.title}
                            </Text>
                             <Text style={[styles.tabText, activeTabIndex === index && styles.activeTabText]}>
                                {tab.subtitle}
                            </Text>
                        </View>
                    </TouchableRipple>
                ))}
                <Animated.View
                    style={[
                        styles.indicator,
                        {
                            width: '50%',
                            transform: [{ translateX: slideAnimation.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: [0, screenWidth]
                                    })
                                }]
                        }
                    ]}
                />
            </View>
            <PagerView
                ref={pagerRef}
                style={styles.pagerView}
                initialPage={0}
                onPageSelected={handlePageChange}
                scrollEnabled={true}
            >
                <View key="0" style={styles.page}>
                    <Text style={styles.pageText}>Achievements Content</Text>
                </View>
                <View key="1" style={styles.page}>
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
        color: 'gray',
        fontFamily: 'Orbitron-VariableFont_wght',
        paddingVertical:10
    },
    tabText: {
        fontSize: 16,
        color: 'gray',
        fontFamily: 'Orbitron-VariableFont_wght',
    },
    activeTabText: {
        color: 'white',
    },
    indicator: {
        height: 5,
        backgroundColor: '#6200ee',
        position: 'absolute',
        bottom: 0,
        borderRadius: 5,
        zIndex:2,

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