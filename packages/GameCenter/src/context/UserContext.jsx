import React, { createContext, useState, useEffect, useContext } from 'react';
import { storage } from '../utils/storage';
import { useBingoWebSocket } from './BingoGameWebsocket.js';
import { ToastService } from './ToastService';
import { useTranslation } from 'react-i18next';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const { closeWebSocket } = useBingoWebSocket();
  const { t } = useTranslation();

  const loginUser = async (userData, newToken) => {
      setUser(userData);
      setToken(newToken); 
      await storage.set('user', JSON.stringify(userData));
      await storage.set('token', newToken); 
      ToastService.show('success', t('loginScreen.loginSuccess'));
  };

  const logoutUser = async () => {
    setUser(null);
    setToken(null); 
    await storage.delete('user');
    await storage.delete('token');
    closeWebSocket(); 
    ToastService.show('success', t('loginScreen.logoutSuccess'));
  };

  useEffect(() => {
      const loadUserFromStorage = async () => {
        try {
          const storedUser = await storage.getString('user');
          const storedToken = await storage.getString('token');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
           if(storedToken) {
            setToken(storedToken);
           }

        } catch (error) {
          console.error('Error loading user data from storage:', error);
        }
      };
    loadUserFromStorage();
    }, []);

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, token }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => { 
  return useContext(UserContext);
};