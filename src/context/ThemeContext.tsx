'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'default' | 'blue' | 'green' | 'amber' | 'rose' | 'purple' | 'orange' | 'teal' | 'mono' | 'scaled' | 'light-mint' | 'persian-green' | 'celtic-blue' | 'imperial-red' | 'raisin-black';

interface ThemeContextProps {
  colorTheme: Theme;
  setColorTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  colorTheme: 'default',
  setColorTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorTheme, setColorThemeState] = useState<Theme>('default');

  useEffect(() => {
    const storedTheme = localStorage.getItem('color-theme') as Theme;
    if (storedTheme) {
      setColorThemeState(storedTheme);
      document.documentElement.setAttribute('data-color-theme', storedTheme);
    } else {
      document.documentElement.setAttribute('data-color-theme', 'default');
    }
  }, []);

  const setColorTheme = (newTheme: Theme) => {
    setColorThemeState(newTheme);
    localStorage.setItem('color-theme', newTheme);
    document.documentElement.setAttribute('data-color-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useColorTheme = () => useContext(ThemeContext);