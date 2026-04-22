import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { vars } from 'nativewind';

export type ThemeType = 'calm' | 'focus' | 'energy' | 'oled' | 'system';

export const rawColors = {
  calm: { card: '#FFFFFF', border: '#D6E4F5', icon: '#64748b', activeIcon: '#A9C9FF' },
  focus: { card: '#FFFFFF', border: '#D1E8DE', icon: '#64748b', activeIcon: '#4a8a76' },
  energy: { card: '#FFFFFF', border: '#F0DCC8', icon: '#64748b', activeIcon: '#d48c3d' },
  oled: { card: '#2B2D31', border: '#404249', icon: '#949BA4', activeIcon: '#F2F3F5' }
};

interface ThemeContextType {
  theme: ThemeType;
  activeTheme: 'calm' | 'focus' | 'energy' | 'oled'; // Resolved theme if 'system' is selected
  themeVars: any; // Dynamic vars object from NativeWind
  setTheme: (theme: ThemeType) => void;
  hapticsEnabled: boolean;
  setHapticsEnabled: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@luna_theme';
const HAPTICS_STORAGE_KEY = '@luna_haptics';

const themeVariables = {
  calm: vars({
    "--background": "#f8fbff",
    "--foreground": "#1E1E1E",
    "--muted": "#F4F4F5",
    "--muted-foreground": "#71717A",
    "--primary": "#5c8edb",
    "--primary-foreground": "#FFFFFF",
    "--secondary": "#A9C9FF",
    "--card": "#FFFFFF",
  }),
  focus: vars({
    "--background": "#f4faf8",
    "--foreground": "#1E1E1E",
    "--muted": "#F4F4F5",
    "--muted-foreground": "#71717A",
    "--primary": "#4a8a76",
    "--primary-foreground": "#FFFFFF",
    "--secondary": "#B8E0D2",
    "--card": "#FFFFFF",
  }),
  energy: vars({
    "--background": "#fff9f2",
    "--foreground": "#1E1E1E",
    "--muted": "#F4F4F5",
    "--muted-foreground": "#71717A",
    "--primary": "#d48c3d",
    "--primary-foreground": "#FFFFFF",
    "--secondary": "#FFD9B0",
    "--card": "#FFFFFF",
  }),
  oled: vars({
    "--background": "#313338",
    "--foreground": "#F2F3F5",
    "--muted": "#2B2D31",
    "--muted-foreground": "#949BA4",
    "--primary": "#5865F2",
    "--primary-foreground": "#FFFFFF",
    "--secondary": "#1E1F22",
    "--card": "#2B2D31",
  })
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeType>('calm');
  const [hapticsEnabled, setHapticsState] = useState<boolean>(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme) {
          setThemeState(storedTheme as ThemeType);
        }
        
        const storedHaptics = await AsyncStorage.getItem(HAPTICS_STORAGE_KEY);
        if (storedHaptics !== null) {
          setHapticsState(storedHaptics === 'true');
        }
      } catch (error) {
        console.error('Failed to load theme settings:', error);
      } finally {
        setIsReady(true);
      }
    }
    loadSettings();
  }, []);

  const setTheme = async (newTheme: ThemeType) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.error('Failed to save theme', e);
    }
  };

  const setHapticsEnabled = async (enabled: boolean) => {
    setHapticsState(enabled);
    try {
      await AsyncStorage.setItem(HAPTICS_STORAGE_KEY, String(enabled));
    } catch (e) {
      console.error('Failed to save haptics settings', e);
    }
  };

  // Resolve 'system' to an actual theme
  const activeTheme = theme === 'system' 
    ? (systemColorScheme === 'dark' ? 'oled' : 'calm') 
    : theme;

  if (!isReady) {
    return null; // Or a loading screen
  }

  const activeThemeVars = themeVariables[activeTheme];

  return (
    <ThemeContext.Provider value={{ theme, activeTheme, themeVars: activeThemeVars, setTheme, hapticsEnabled, setHapticsEnabled }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
