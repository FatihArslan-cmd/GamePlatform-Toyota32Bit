import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { darkColors, lightColors } from "../utils/colors.js";
import { storage } from "../utils/storage.js";

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
    const subscription = Appearance.addChangeListener(() => {
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