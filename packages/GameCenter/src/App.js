import React, { useEffect } from 'react';
import Navigation from './navigation/Navigation.js';
import { theme } from './utils/FontConfig.js';
import { UserProvider } from './context/UserContext.jsx';
import { ToastProvider } from './context/ToastService.jsx';
import { createDefaultChannel, requestUserPermission, setupForegroundNotifications, setupBackgroundNotifications, checkInitialNotification } from './utils/Firebase/notificationHandlers.js';
import { LogBox } from 'react-native';
import { BingoWebSocketProvider } from './context/BingoGameWebsocket.js';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { PaperProvider } from 'react-native-paper'

const App = () => {
  LogBox.ignoreLogs(['Text strings must be rendered within a <Text> component']);
  
  useEffect(() => {
    createDefaultChannel();
    requestUserPermission();
    setupForegroundNotifications();
    setupBackgroundNotifications();
    checkInitialNotification();
  }, []);

  return (
    <BingoWebSocketProvider> 
     <ToastProvider>
      <UserProvider>
        <ThemeProvider>
        <PaperProvider theme={theme}>
          <Navigation />
        </PaperProvider>
        </ThemeProvider>
       </UserProvider>
     </ToastProvider>
   </BingoWebSocketProvider>

  );
};

export default App;