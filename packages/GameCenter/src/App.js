import "./context/i18n";
import Navigation from "./navigation/Navigation.js";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { PaperProvider } from "react-native-paper";
import { BingoWebSocketProvider } from "./context/BingoGameWebsocket.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToastProvider } from "./context/ToastService.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { theme } from "./utils/FontConfig.js";

import {
  createDefaultChannel,
  requestUserPermission,
  setupForegroundNotifications,
  setupBackgroundNotifications,
  checkInitialNotification,
} from "./utils/Firebase/notificationHandlers.js";

if (__DEV__) {
  LogBox.ignoreAllLogs();
}
const App = () => {

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
