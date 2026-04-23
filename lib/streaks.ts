import AsyncStorage from '@react-native-async-storage/async-storage';

const STREAK_KEYS = {
  COUNT: 'luna_streak_count',
  LAST_ACTIVE: 'luna_last_active_date',
};

/**
 * Retorna a data de hoje no formato 'YYYY-MM-DD' (timezone local).
 */
function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

/**
 * Calcula a diferença em dias entre duas datas no formato 'YYYY-MM-DD'.
 */
function daysBetween(dateA: string, dateB: string): number {
  const a = new Date(dateA + 'T00:00:00');
  const b = new Date(dateB + 'T00:00:00');
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export interface StreakData {
  count: number;
  lastActiveDate: string | null;
}

/**
 * Carrega os dados de streak do AsyncStorage.
 */
export async function loadStreak(): Promise<StreakData> {
  try {
    const [count, lastActive] = await Promise.all([
      AsyncStorage.getItem(STREAK_KEYS.COUNT),
      AsyncStorage.getItem(STREAK_KEYS.LAST_ACTIVE),
    ]);
    return {
      count: count ? parseInt(count, 10) : 0,
      lastActiveDate: lastActive,
    };
  } catch {
    return { count: 0, lastActiveDate: null };
  }
}

/**
 * Atualiza a streak com base no dia atual.
 * 
 * Regras:
 * - Se nunca fez atividade → inicia streak em 1.
 * - Se já fez atividade HOJE → não incrementa (idempotente).
 * - Se fez atividade ONTEM → incrementa a streak.
 * - Se fez atividade há 2+ dias → reseta para 1 (perdeu a ofensiva).
 */
export async function updateStreak(current: StreakData): Promise<StreakData> {
  const today = getTodayString();

  // Primeira vez ou nunca fez atividade
  if (!current.lastActiveDate) {
    const updated = { count: 1, lastActiveDate: today };
    await saveStreak(updated);
    return updated;
  }

  // Já registrou hoje → idempotente
  if (current.lastActiveDate === today) {
    return current;
  }

  const diff = daysBetween(current.lastActiveDate, today);

  let newCount: number;
  if (diff === 1) {
    // Dia consecutivo → incrementa
    newCount = current.count + 1;
  } else {
    // Perdeu a ofensiva → reseta
    newCount = 1;
  }

  const updated = { count: newCount, lastActiveDate: today };
  await saveStreak(updated);
  return updated;
}

/**
 * Verifica se a streak está ativa hoje (já registrou atividade).
 */
export function isStreakActiveToday(lastActiveDate: string | null): boolean {
  if (!lastActiveDate) return false;
  return lastActiveDate === getTodayString();
}

/**
 * Persiste os dados de streak no AsyncStorage.
 */
async function saveStreak(data: StreakData): Promise<void> {
  await Promise.all([
    AsyncStorage.setItem(STREAK_KEYS.COUNT, data.count.toString()),
    AsyncStorage.setItem(STREAK_KEYS.LAST_ACTIVE, data.lastActiveDate || ''),
  ]);
}

/**
 * Força o salvamento de uma nova Streak. Útil para sincronização com o banco de dados nuvem (merge).
 */
export async function forceSaveStreak(data: StreakData): Promise<void> {
  await saveStreak(data);
}
