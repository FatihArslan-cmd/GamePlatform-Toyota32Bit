import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { storage } from '../utils/storage';
import AdvancedPagerView from '../pages/IntroScreen/components/AdvancedPagerView.jsx';
import LoginScreen from '../pages/LoginScreen/index.jsx';
import TabNavigator from './TabBarNavigator.jsx';
import GameDetails from '../pages/GameDetails/GameDetails.jsx';
import SettingScreen from '../pages/SettingsScreen/index.jsx';
import BootSplash from 'react-native-bootsplash';
import { Animated } from 'react-native';
import GameScreen from '../pages/GameScreen/index.jsx';
import BarcodeScan from '../pages/BarcodeScanScreen/BarcodeScan.jsx';
import RoomsScreen from '../pages/CommunityScreen/pages/RoomsScreen/RoomsScreen.jsx';
import CreateRoomScreen from '../pages/CommunityScreen/pages/CreateRoomScreen/CreateRoomScreen.js';
import CreatePostScreen from '../pages/CommunityScreen/pages/CreatePostScreen/index.jsx';
import PersonalMessagePage from '../pages/PersonalMessagePage/index.jsx';
import ChatWithFriendsScreen from '../pages/ChatWithFriendsScreen/index.jsx';
import ChatScreen from '../pages/ChatWithFriendsScreen/pages/ChatScreen.jsx';
import RoomChatScreen from '../pages/RoomChatScreen/index.jsx';
import UpdateLobbyScreen from '../pages/UpdateLobbyScreen/UpdateLobbyScreen.jsx';
import CountDownSplashScreen from '../pages/GameScreen/CountDownSplashScreen.jsx';
import FriendInvite from '../pages/FriendInvitePage/index.jsx';
import navigationService from '../shared/states/navigationService.js';
import LoadingFullScreen from '../components/LoadingFullScreen.jsx';

const Stack = createNativeStackNavigator();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function Navigation() {
  const [isIntroSeen, setIsIntroSeen] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const scaleAnim = useState(new Animated.Value(10.0))[0];

  useEffect(() => {
    async function initializeApp() {
      setTimeout(() => {
        BootSplash.hide({ fade: true }).then(() => {
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }).start();
        });
      }, 175);
      
      const hasSeenIntro = storage.getBoolean('hasSeenIntro');
      const token = storage.getString('token');

      await delay(2000);

      setIsIntroSeen(hasSeenIntro ?? false);
      setIsLoggedIn(!!token);
    }

    initializeApp();
  }, []);

  if (isIntroSeen === null) {
    return <LoadingFullScreen />;
  }
  
  return (
    <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
      <NavigationContainer  ref={navigationService.navigationRef}>
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
            name="Settings"
            component={SettingScreen}
            options={{
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="GameDetails"
            component={GameDetails}
            options={{
              animation: 'fade',
            }}
          />
           <Stack.Screen
            name="Rooms"
            component={RoomsScreen}
            options={{
              animation: 'fade',
            }}
          />   
          <Stack.Screen
            name="CreateRoom"
            component={CreateRoomScreen}
            options={{
              animation: 'slide_from_bottom', 
            }}
          />
             <Stack.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={{
              animation: 'slide_from_bottom', 
            }}
          />
        <Stack.Screen name="GameScreen"
         component={GameScreen}
            options={{
              animation: 'fade',
            }}
         />
          <Stack.Screen name="FriendInvitePage"
         component={FriendInvite}  
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
         <Stack.Screen name="ChatWithFriendsScreen"
         component={ChatWithFriendsScreen}  
          options={{
              animation: 'fade',
            }}
         />
               <Stack.Screen name="ChatScreen"
         component={ChatScreen}  
          options={{
              animation: 'fade',
            }}
         />
          <Stack.Screen name="RoomChatScreen"
         component={RoomChatScreen}  
          options={{
              animation: 'fade',
            }}
         />
          <Stack.Screen name="UpdateLobbyScreen"
         component={UpdateLobbyScreen}  
          options={{
              animation: 'simple_push',
            }}
         />
           <Stack.Screen name="CountDownSplashScreen"
         component={CountDownSplashScreen}  
          options={{
              animation: 'simple_push',
            }}
         />
        </Stack.Navigator>
      </NavigationContainer>
    </Animated.View>
  );
}
