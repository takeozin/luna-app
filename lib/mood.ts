import { supabase } from './supabase';

export interface MoodEntry {
  day: string;      // 'Seg', 'Ter', etc.
  mood: number;     // 0-5
  date: string;     // 'YYYY-MM-DD'
}

const DAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

/**
 * Busca os registros de humor dos últimos 7 dias do Supabase.
 * Retorna um array de 7 itens (um por dia da semana), preenchendo
 * dias sem registro com mood=0.
 */
export async function fetchWeeklyMood(): Promise<MoodEntry[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return getEmptyWeek();

    // Data de 7 dias atrás
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from('mood_entries')
      .select('mood_value, created_at')
      .eq('user_id', user.id)
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: true });

    if (error || !data) return getEmptyWeek();

    // Agrupa por dia (usa o último registro do dia como valor final)
    const moodByDate: Record<string, number> = {};
    for (const entry of data) {
      const date = new Date(entry.created_at);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      moodByDate[key] = entry.mood_value;
    }

    // Monta os 7 dias
    const result: MoodEntry[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      result.push({
        day: DAY_LABELS[d.getDay()],
        mood: moodByDate[key] || 0,
        date: key,
      });
    }

    return result;
  } catch {
    return getEmptyWeek();
  }
}

/**
 * Calcula a tendência de humor comparando a média dos últimos 3 dias
 * com os 3 dias anteriores. Retorna uma string legível.
 */
export function calculateMoodTrend(entries: MoodEntry[]): string {
  const withMood = entries.filter(e => e.mood > 0);
  if (withMood.length < 3) return '—';

  const recent = withMood.slice(-3);
  const earlier = withMood.slice(0, Math.min(3, withMood.length - 3));

  if (earlier.length === 0) return '—';

  const avgRecent = recent.reduce((s, e) => s + e.mood, 0) / recent.length;
  const avgEarlier = earlier.reduce((s, e) => s + e.mood, 0) / earlier.length;
  const diff = avgRecent - avgEarlier;

  if (diff > 0.5) return `+${Math.round(diff * 20)}%`;
  if (diff < -0.5) return `${Math.round(diff * 20)}%`;
  return 'estável';
}

/**
 * Retorna uma semana vazia (todos com mood=0).
 */
function getEmptyWeek(): MoodEntry[] {
  const result: MoodEntry[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    result.push({
      day: DAY_LABELS[d.getDay()],
      mood: 0,
      date: key,
    });
  }
  return result;
}
