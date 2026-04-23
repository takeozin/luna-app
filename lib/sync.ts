import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';

export async function pushSettingsToCloud(userId: string) {
  try {
    const notifications = await AsyncStorage.getItem('luna_notifications');
    const reminderTime = await AsyncStorage.getItem('luna_reminder_time');
    const theme = await AsyncStorage.getItem('luna_theme');

    const { error } = await supabase
      .from('user_settings')
      .upsert({
        id: userId,
        notifications_enabled: notifications === 'true',
        daily_reminder_time: reminderTime || '09:00',
        theme: theme || 'system',
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) console.error('[Sync] Erro ao enviar configurações:', error.message);
  } catch (err) {
    console.error('[Sync] Erro local ao puxar configurações:', err);
  }
}

export async function pullSettingsFromCloud(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      if (error?.code !== 'PGRST116') { // PGRST116 é "not found", o que é ok se não tiver config
        console.error('[Sync] Erro ao baixar configurações:', error?.message);
      }
      return;
    }

    // Salva localmente
    await AsyncStorage.setItem('luna_notifications', data.notifications_enabled ? 'true' : 'false');
    if (data.daily_reminder_time) {
      await AsyncStorage.setItem('luna_reminder_time', data.daily_reminder_time);
    }
    if (data.theme) {
      await AsyncStorage.setItem('luna_theme', data.theme);
    }
    
    console.log('[Sync] Configurações baixadas e aplicadas!');
  } catch (err) {
    console.error('[Sync] Erro local ao salvar configurações:', err);
  }
}
