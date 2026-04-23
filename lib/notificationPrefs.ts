import AsyncStorage from '@react-native-async-storage/async-storage';
import { safeJSONParse } from './utils';

export interface NotificationPrefs {
  enabled: boolean;
  times: string[]; // "morning", "afternoon", "evening"
}

const PREFS_KEY = 'luna_notification_prefs';

const DEFAULT_PREFS: NotificationPrefs = {
  enabled: true,
  times: ['morning', 'evening'], // Defaults to Manhã e Noite
};

export async function getNotificationPrefs(): Promise<NotificationPrefs> {
  try {
    const data = await AsyncStorage.getItem(PREFS_KEY);
    return safeJSONParse(data, DEFAULT_PREFS);
  } catch (error) {
    console.error('Error reading notification prefs:', error);
    return DEFAULT_PREFS;
  }
}

export async function saveNotificationPrefs(prefs: NotificationPrefs): Promise<void> {
  try {
    await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch (error) {
    console.error('Error saving notification prefs:', error);
  }
}
