import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { storage } from '../utils/storage.js';
import { lightColors, darkColors } from '../utils/colors.js'; 

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const systemTheme = Appearance.getColorScheme() || 'light';

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = storage.getString('theme');
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setTheme(savedTheme);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    storage.set('theme', theme);
  }, [theme]);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === 'system') {
        setTheme('system');
      }
    });
    return () => subscription.remove();
  }, [theme]);

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  const colors = resolvedTheme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);