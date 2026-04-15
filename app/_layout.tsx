import '../global.css';
import { useEffect } from 'react';
import { View } from 'react-native';
import { DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { UnlockProvider } from '../lib/unlockContext';
import { supabase } from '../lib/supabase';
import { ThemeProvider, useTheme } from '../lib/themeContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootContent() {
  const { activeTheme, themeVars } = useTheme();

  return (
    <View style={themeVars} className={`flex-1 theme-${activeTheme} bg-background`}>
      <NavigationThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style={activeTheme === 'oled' ? 'light' : 'dark'} />
      </NavigationThemeProvider>
    </View>
  );
}

export default function RootLayout() {
  useEffect(() => {
    // Inicializa a sessão anônima do Supabase para habilitar RLS
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) console.error('[Supabase] Erro no login anônmo:', error.message);
      }
    };
    initSession();
  }, []);

  return (
    <ThemeProvider>
      <UnlockProvider>
        <RootContent />
      </UnlockProvider>
    </ThemeProvider>
  );
}
