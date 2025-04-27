import "./context/i18n";
import ConnectivityListener from "./context/ConnectivityListener.jsx";
import Navigation from "./navigation/Navigation.js";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { PaperProvider } from "react-native-paper";
import { BingoWebSocketProvider } from "./context/BingoGameWebsocket.js";
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


const App = () => {
  // Tekrar eden hata loglarını kapat
  LogBox.ignoreLogs(['Text strings must be rendered within a <Text> component']);

  useEffect(() => {
    // Android notification kanalı, izin isteği, listener’lar vs.
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
              <ConnectivityListener>
                <Navigation />
              </ConnectivityListener>
            </PaperProvider>
          </ThemeProvider>
        </UserProvider>
      </ToastProvider>
    </BingoWebSocketProvider>
  );
};

export default App;
