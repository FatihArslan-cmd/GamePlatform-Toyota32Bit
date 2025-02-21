import React, { useEffect } from 'react';
import Navigation from './navigation/Navigation.js';
import { PaperProvider } from 'react-native-paper';
import { theme } from './utils/FontConfig.js';
import { UserProvider } from './context/UserContext.jsx';
import { ToastProvider } from './context/ToastService.jsx';
import { createDefaultChannel, requestUserPermission, setupForegroundNotifications, setupBackgroundNotifications, checkInitialNotification } from './utils/Firebase/notificationHandlers.js';

const App = () => {
  
  useEffect(() => {
    createDefaultChannel(); // Kanalı oluştur
    requestUserPermission(); // İzinleri iste
    setupForegroundNotifications(); // Foreground bildirimlerini dinle
    setupBackgroundNotifications(); // Arkaplan bildirimlerini dinle
    checkInitialNotification(); // Uygulama açılış bildirimini kontrol et
  }, []);

  return (
    <ToastProvider>
              <UserProvider>

    <PaperProvider theme={theme}>
,          <Navigation />
    </PaperProvider>
    </UserProvider>

    </ToastProvider>

  );
};

export default App;