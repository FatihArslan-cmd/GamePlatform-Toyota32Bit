import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { storage } from '../utils/storage';
import AdvancedPagerView from '../pages/IntroScreen/components/AdvancedPagerView.jsx';
import LoginScreen from '../pages/LoginScreen/index.jsx';
import TabNavigator from './TabBarNavigator.jsx';
import GameDetails from '../pages/HomeScreen/components/GameDetails/GameDetails.jsx';
import SettingScreen from '../pages/SettingsScreen/index.jsx';
import BootSplash from 'react-native-bootsplash';
import { Animated } from 'react-native';
import GameScreen from '../pages/GameScreen/index.jsx';
import BarcodeScan from '../components/BarcodeScanScreen/BarcodeScan.jsx';
import CreateQRcodeScreen from '../pages/LoginScreen/components/Biometrics/CreateQRcodeScreen.jsx';
import RoomsScreen from '../pages/CommunityScreen/pages/RoomsScreen/RoomsScreen.jsx';
import CreateRoomScreen from '../pages/CommunityScreen/pages/CreateRoomScreen/CreateRoomScreen.js';
import CreatePostScreen from '../pages/CommunityScreen/pages/CreatePostScreen/index.jsx';
import ProfileDetailsScreen from '../pages/SettingsScreen/pages/ProfileDetailsScreen.jsx';
import FriendInvitePage from '../pages/FriendInvitePage/FriendInvitePage.jsx';
import PersonalMessagePage from '../pages/PersonalMessagePage/index.jsx';
const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [isIntroSeen, setIsIntroSeen] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const scaleAnim = useState(new Animated.Value(10.0))[0];

  useEffect(() => {
    async function initializeApp() {
      const hasSeenIntro = storage.getBoolean('hasSeenIntro');
      setIsIntroSeen(hasSeenIntro ?? false);

      const token = storage.getString('token');
      setIsLoggedIn(!!token);

      setTimeout(() => {
        BootSplash.hide({ fade: true }).then(() => {
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }).start();
        });
      }, 175);
    }

    initializeApp();
  }, []);

  if (isIntroSeen === null) {
    return null; // Return a loading state or placeholder if necessary
  }

  return (
    <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isIntroSeen ? (isLoggedIn ? 'Tabs' : 'Login') : 'Intro'}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Intro"
            component={AdvancedPagerView}
            options={{
              headerShown: false,
            }}
            listeners={{
              focus: () => {
                storage.set('hasSeenIntro', true);
              },
            }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{
              animation: 'fade',
            }}
          />
      
             <Stack.Screen
            name="BarcodeScan"
            component={BarcodeScan}
            options={{
              animation: 'fade',
            }}
          />
              <Stack.Screen
            name="QRCode"
            component={CreateQRcodeScreen}
            options={{
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingScreen}
        
          />
          <Stack.Screen
            name="GameDetails"
            component={GameDetails}
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
            }}
          />
           <Stack.Screen
            name="Rooms"
            component={RoomsScreen}ProfileDetailsScreen
            options={{
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="ProfileDetailsScreen"
            component={ProfileDetailsScreen}
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="CreateRoom"
            component={CreateRoomScreen}
            options={{
              animation: 'slide_from_bottom', // Use slide_from_bottom for bottom-up animation
            }}
          />
             <Stack.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={{
              animation: 'slide_from_bottom', // Use slide_from_bottom for bottom-up animation
            }}
          />
        <Stack.Screen name="GameScreen"
         component={GameScreen}
            options={{
              animation: 'fade',
            }}
         />
          <Stack.Screen name="FriendInvitePage"
         component={FriendInvitePage}  
          options={{
              animation: 'fade',
            }}
         />
               <Stack.Screen name="PersonalMessagePage"
         component={PersonalMessagePage}  
          options={{
              animation: 'fade',
            }}
         />
        </Stack.Navigator>
      </NavigationContainer>
    </Animated.View>
  );
}
