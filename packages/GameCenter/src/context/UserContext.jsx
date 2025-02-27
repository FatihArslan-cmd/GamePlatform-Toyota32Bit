import React, { createContext, useState, useEffect, useContext } from 'react';
import { storage } from '../utils/storage';
import { useBingoWebSocket } from './BingoWebSocket';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Token durumunu da yönetiyoruz
  const { closeWebSocket } = useBingoWebSocket(); // Get closeWebSocket function from context

  const loginUser = async (userData, newToken) => {
      setUser(userData);
      setToken(newToken); // Token'ı da state'e kaydet
      await storage.set('user', JSON.stringify(userData));
      await storage.set('token', newToken); // Token'ı da storage'e kaydet
  };

  const logoutUser = async () => {
    setUser(null);
    setToken(null); // Token'ı da sıfırla
    await storage.delete('user');
    await storage.delete('token'); // Token'ı da storage'den sil
    closeWebSocket(); // Close the WebSocket connection
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