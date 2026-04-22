import AsyncStorage from '@react-native-async-storage/async-storage';

export interface NotificationLogItem {
  id: string;
  type: 'reminder' | 'quote' | 'achievement' | 'progress';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

const LOG_KEY = 'luna_notification_log';

export async function getNotificationLog(): Promise<NotificationLogItem[]> {
  try {
    const data = await AsyncStorage.getItem(LOG_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading notification log:', error);
    return [];
  }
}

export async function addNotificationLog(item: Omit<NotificationLogItem, 'id' | 'timestamp' | 'read'>): Promise<void> {
  try {
    const logs = await getNotificationLog();
    const newItem: NotificationLogItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 15),
      timestamp: Date.now(),
      read: false,
    };
    
    // Mantém as últimas 50 notificações apenas
    const newLogs = [newItem, ...logs].slice(0, 50);
    await AsyncStorage.setItem(LOG_KEY, JSON.stringify(newLogs));
  } catch (error) {
    console.error('Error saving notification log:', error);
  }
}

export async function markAllNotificationsAsRead(): Promise<void> {
  try {
    const logs = await getNotificationLog();
    const updated = logs.map(log => ({ ...log, read: true }));
    await AsyncStorage.setItem(LOG_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error marking notifications as read:', error);
  }
}

export async function getUnreadCount(): Promise<number> {
  try {
    const logs = await getNotificationLog();
    return logs.filter(log => !log.read).length;
  } catch {
    return 0;
  }
}

export async function clearNotificationLog(): Promise<void> {
  try {
    await AsyncStorage.removeItem(LOG_KEY);
  } catch (error) {
    console.error('Error clearing notification log:', error);
  }
}
