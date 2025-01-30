import React, { createContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
      setUser(userData)
  }
  const logoutUser = async () => {
    setUser(null);
    await storage.delete('user');
  }

    useEffect(() => {
        const loadUserFromStorage = async () => {
          try {
            const storedUser = await storage.getString('user');
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          } catch (error) {
            console.error('Error loading user data from storage:', error);
          }
        };
      loadUserFromStorage();
      }, [])

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};