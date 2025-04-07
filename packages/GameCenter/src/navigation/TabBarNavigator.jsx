import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated";
import CommunityScreen from "../pages/CommunityScreen/index";
import HomeScreen from "../pages/HomeScreen/index";
import Lottie from "lottie-react-native";
import ProfileScreen from "../pages/ProfileScreen/index";
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import Svg, { Path } from "react-native-svg";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useBingoWebSocket } from "../context/BingoGameWebsocket";
import { useTheme } from "../context/ThemeContext";
import { ToastService } from "../context/ToastService";
import { isTablet } from "../utils/isTablet";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const Tab = createMaterialTopTabNavigator();
const TABLET_DEVICE = isTablet();

const lottieSources = {
  'homeIcon-light': require('../locales/lottie/homeIcon-light.json'),
  'homeIcon-dark': require('../locales/lottie/homeIcon-dark.json'),
  'ChatIcon-light': require('../locales/lottie/ChatIcon-light.json'),
  'ChatIcon-dark': require('../locales/lottie/ChatIcon-dark.json'),
  'Profileicon-light': require('../locales/lottie/Profileicon-light.json'),
  'Profileicon-dark': require('../locales/lottie/Profileicon-dark.json'),
};


const TabNavigator = () => {
  const { messages,clearMessages } = useBingoWebSocket();
  const navigation = useNavigation();
  const { colors, theme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const gameStartMessage = messages.find(msg => msg.type === 'game-started');
    if (gameStartMessage) {
      navigation.navigate('CountDownSplashScreen');
      clearMessages()

    }
  }, [messages, navigation ]);
  useEffect(() => {
    const gameEndMessage = messages.find(msg => msg.type === 'game-ended');
    if (gameEndMessage) {
      clearMessages();
      navigation.navigate('Tabs');
      ToastService.show("info", t('bingoGame.gameEnded'));
    }
  }, [messages, navigation]);

  const getLottieSource = (iconName) => {
    const themeSuffix = theme === 'dark' ? 'dark' : 'light';
    const sourceName = `${iconName}-${themeSuffix}`;
    return lottieSources[sourceName] || lottieSources['homeIcon-light']; 
  };


  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Tab.Navigator
        tabBar={(props) => <AnimatedTabBar {...props} />}
        swipeEnabled={true}
        tabBarPosition="bottom"
        screenOptions={{
          tabBarShowIcon: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.card,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.navigationBarIconBg,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ ref }) => (
              <Lottie
                ref={ref}
                loop={false}
                source={getLottieSource('homeIcon')} // Use getLottieSource with icon name
                style={[styles.icon, { tintColor: colors.text }]}
              />
            ),
            
          }}
        />
        <Tab.Screen
          name="CommunityScreen"
          component={CommunityScreen}
          options={{
            tabBarIcon: ({ ref }) => (
              <Lottie
                ref={ref}
                loop={false}
                source={getLottieSource('ChatIcon')} // Use getLottieSource with icon name
                style={[styles.icon, { tintColor: colors.text }]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ ref }) => (
              <Lottie
                ref={ref}
                loop={false}
                source={getLottieSource('Profileicon')} // Use getLottieSource with icon name
                style={[styles.icon, { tintColor: colors.text }]}
              />
            ),
          }}
        />

      </Tab.Navigator>
    </View>
  );
};

const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors }) => {
  const reducer = (state, action) => {
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);
  const {colors} = useTheme()

  const handleLayout = useCallback((event, index) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  }, []);

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return layout.find(({ index }) => index === activeIndex)?.x - 25;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
  }));

  const tabBarComponents = useMemo(
    () =>
      routes.map((route, index) => {
        const active = index === activeIndex;
        const { options } = descriptors[route.key];

        return (
          <TabBarComponent
            key={route.key}
            active={active}
            options={options}
            onLayout={(e) => handleLayout(e, index)}
            onPress={() => navigation.navigate(route.name)}
          />
        );
      }),
    [routes, activeIndex, descriptors, navigation, handleLayout]
  );

  return (
    <View style={[styles.tabBar, { backgroundColor: colors.background }]}>
      <AnimatedSvg
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill={colors.navigationFill}
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>
      <View style={styles.tabBarContainer}>{tabBarComponents}</View>
    </View>
  );
};

const TabBarComponent = React.memo(({ active, options, onLayout, onPress }) => {
  const ref = useRef(null);
  const {colors, theme} = useTheme()

  useEffect(() => {
    if (active && ref?.current) {
      ref.current.play();
    }
  }, [active]);

  const animatedComponentCircleStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(active ? 1 : 0, { duration: 500 }) }],
    backgroundColor: active ? colors.navigationBarIconBg : colors.card,
  }));

  const animatedIconContainerStyles = useAnimatedStyle(() => ({
    opacity: withTiming(active ? 1 : 0.5, { duration: 500 }),
  }));

  const getLottieSourceForComponent = (iconName) => {
    const themeSuffix = theme === 'dark' ? 'dark' : 'light';
    return lottieSources[`${iconName}-${themeSuffix}`] || lottieSources['homeIcon-light']; // Default to light home icon if not found
  };


  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>
        {options.tabBarIcon ? options.tabBarIcon({ ref, source: getLottieSourceForComponent(options.name) }) : <Text>?</Text>}
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: TABLET_DEVICE ? 60 : 50,
    width: TABLET_DEVICE ? 60 : 50,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: TABLET_DEVICE ? 36 : 24,
    width:  TABLET_DEVICE ? 36 : 24,
  },
});

export default TabNavigator;