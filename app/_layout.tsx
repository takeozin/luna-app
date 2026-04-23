import '../global.css';
import { useEffect } from 'react';
import { View } from 'react-native';
import { DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { UnlockProvider } from '../lib/unlockContext';
import { AuthProvider } from '../lib/authContext';
import { ThemeProvider, useTheme } from '../lib/themeContext';
import * as Notifications from 'expo-notifications';
import { logIncomingNotification } from '../lib/notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

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
          <Stack.Screen name="login" options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="register" options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style={activeTheme === 'oled' ? 'light' : 'dark'} />
      </NavigationThemeProvider>
    </View>
  );
}

export default function RootLayout() {
  useEffect(() => {
    // Listener para notificações recebidas (quando o app está no foreground)
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      logIncomingNotification(notification);
    });

    return () => subscription.remove();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <UnlockProvider>
          <RootContent />
        </UnlockProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
