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
const SYNC_KEY = 'luna_notification_last_sync';

export async function syncNotificationHistory(): Promise<void> {
  try {
    const lastSyncStr = await AsyncStorage.getItem(SYNC_KEY);
    const now = Date.now();
    
    // Se nunca sincronizou, define como agora e sai
    if (!lastSyncStr) {
      await AsyncStorage.setItem(SYNC_KEY, now.toString());
      return;
    }

    const lastSync = parseInt(lastSyncStr);
    const diffMs = now - lastSync;
    
    // Se faz menos de 1 hora, não precisa checar (evita reprocessamento excessivo)
    if (diffMs < 1000 * 60 * 60) return;

    // Horários das frases (8h, 14h, 20h)
    const times = [8, 14, 20];
    const offsets = [0, 1, 2];
    const newEntries: Omit<NotificationLogItem, 'id' | 'read'>[] = [];

    // Import dinâmico para evitar dependência circular
    const { getQuoteForPeriod } = await import('./notifications');

    // Percorre cada hora desde o último sync até agora
    // (Aumentamos de 1 em 1 hora para verificar se algum 'gatilho' foi passado)
    let checkTime = lastSync + (1000 * 60 * 60); // Começa 1h após o último sync
    
    while (checkTime < now) {
      const d = new Date(checkTime);
      const hour = d.getHours();
      
      const timeIndex = times.indexOf(hour);
      if (timeIndex !== -1 && d.getMinutes() === 0) {
        // Encontrou um horário de entrega!
        newEntries.push({
          title: "Inspiração do Dia 🌱",
          message: getQuoteForPeriod(offsets[timeIndex], d),
          type: 'quote',
          timestamp: checkTime,
        });
      }
      
      // Pula para a próxima hora
      checkTime += 1000 * 60 * 60;
    }

    if (newEntries.length > 0) {
      const logs = await getNotificationLog();
      const itemsToAdd: NotificationLogItem[] = newEntries.map(e => ({
        ...e,
        id: Math.random().toString(36).substring(2, 15),
        read: false,
      }));
      
      const newLogs = [...itemsToAdd, ...logs].slice(0, 50);
      await AsyncStorage.setItem(LOG_KEY, JSON.stringify(newLogs));
    }

    await AsyncStorage.setItem(SYNC_KEY, now.toString());
  } catch (error) {
    console.error('Error syncing notification history:', error);
  }
}

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
