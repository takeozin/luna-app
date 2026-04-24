import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getNotificationPrefs } from './notificationPrefs';
import { addNotificationLog } from './notificationLog';

// Banco de frases baseado em TCC / DBT
export const DAILY_QUOTES = [
  "Seus pensamentos não são fatos. São apenas hipóteses que sua mente criou.",
  "Você não precisa controlar o que sente, apenas decidir como agir sobre isso.",
  "Um passo de cada vez já é um passo adiante.",
  "Emoções vêm e vão como ondas. Você é o oceano.",
  "Não julgue sua ansiedade; apenas observe-a sem se prender a ela.",
  "Focar no momento presente é a chave para aliviar preocupações futuras.",
  "Você já sobreviveu a 100% dos seus piores dias.",
  "Permita-se sentir sem a necessidade de consertar nada imediatamente.",
  "A aceitação não é desistir, é reconhecer a realidade como ela é.",
  "Respire fundo. Você não precisa ter todas as respostas agora.",
  "Tudo bem fazer uma pausa e recarregar suas energias.",
  "O que você diria a um amigo passando por isso? Diga o mesmo a si mesmo.",
  "Você não é a sua mente. Você é quem observa a sua mente.",
  "Pequenas vitórias ainda são vitórias.",
  "Lembre-se: pensamentos catastróficos raramente se tornam realidade.",
  "Sua coragem é maior do que o seu medo, mesmo quando não parece.",
  "Em vez de perguntar 'E se der errado?', pergunte 'E se der certo?'.",
  "O perdão começa com você. Seja gentil consigo mesmo hoje.",
  "Sua vulnerabilidade não é fraqueza, é o que te torna humano e real.",
  "O progresso não é linear. Haverá dias difíceis, e isso é normal.",
  "Escolha o conforto a longo prazo em vez do alívio a curto prazo.",
  "Aja de forma oposta ao que a emoção disfuncional pede.",
  "Não é o que acontece com você, mas como você reage que importa.",
  "Você tem o direito de impor limites para proteger sua paz.",
  "A mente mente. Aprenda a questionar as histórias que ela te conta.",
  "Apenas por hoje, deixe de lado o perfeccionismo e abrace o 'bom o suficiente'.",
  "Você é capaz de lidar com o desconforto.",
  "Mudar a perspectiva pode mudar a emoção.",
  "Sua energia é preciosa. Escolha onde investir.",
  "Cultive a mente sábia: o equilíbrio entre a razão e a emoção."
];

export function getQuoteForPeriod(periodOffset: number = 0, targetDate: Date = new Date()): string {
  // Cada período do dia (manhã=0, tarde=1, noite=2) recebe uma frase diferente
  const start = new Date(targetDate.getFullYear(), 0, 0);
  const diff = targetDate.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Multiplica pelo dia e soma o offset do período para nunca repetir no mesmo dia
  const index = (dayOfYear * 3 + periodOffset) % DAILY_QUOTES.length;
  return DAILY_QUOTES[index];
}

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  return finalStatus === 'granted';
}

const TIME_MAP: Record<string, { hour: number; minute: number }> = {
  morning: { hour: 8, minute: 0 },
  afternoon: { hour: 14, minute: 0 },
  evening: { hour: 20, minute: 0 },
};

export async function rescheduleAllNotifications() {
  if (Platform.OS === 'web') return;

  // Cancela tudo existente para reagendar
  await Notifications.cancelAllScheduledNotificationsAsync();
  
  // Zera badge do celular
  await Notifications.setBadgeCountAsync(0);

  const prefs = await getNotificationPrefs();
  if (!prefs.enabled) return;

  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  // Agenda Lembretes Diários
  const PERIOD_OFFSET: Record<string, number> = { morning: 0, afternoon: 1, evening: 2 };
  
  for (const timeKey of prefs.times) {
    const timeInfo = TIME_MAP[timeKey];
    if (timeInfo) {
      const offset = PERIOD_OFFSET[timeKey] ?? 0;
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Inspiração do Dia 🌱",
          body: getQuoteForPeriod(offset),
          data: { type: 'quote' },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: timeInfo.hour,
          minute: timeInfo.minute,
        },
      });
    }
  }
}

export async function scheduleStreakReminder() {
  if (Platform.OS === 'web') return;
  
  const prefs = await getNotificationPrefs();
  if (!prefs.enabled) return;
  
  // Cancela lembretes antigos específicos de streak
  // (Como não temos como filtrar por ID localmente fácil, assumimos que 
  // o usuário faz check-in e reagenda para o DIA SEGUINTE se ele fez).
  
  // Agenda para as 21:00 de HOJE, se já passou das 21:00, vai para amanhã
  // Essa chamada será feita quando ele abre o app e vê se a streak de hoje já foi feita.
  // Se ele NÃO fez atividade hoje (streaks.ts), a gente agenda:
  
  try {
    await Notifications.scheduleNotificationAsync({
      identifier: 'streak_reminder',
      content: {
        title: "Não perca seu ritmo! 🔥",
        body: "Você tem uma ofensiva em andamento. Faça uma atividade curta hoje para mantê-la viva!",
        data: { type: 'reminder' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 21,
        minute: 0,
      },
    });
  } catch (error) {
    console.warn('[Notifications] Erro ao agendar streak reminder:', error);
  }
}

export async function cancelStreakReminder() {
  if (Platform.OS === 'web') return;
  // Cancela se o usuário já completou algo no dia
  try {
    await Notifications.cancelScheduledNotificationAsync('streak_reminder');
  } catch (error) {
    // Ignora se não existir
  }
}

// Loga a notificação no nosso BD quando o app está aberto ou background
export async function logIncomingNotification(response: Notifications.Notification) {
  const content = response.request.content;
  const type = (content.data?.type as any) || 'reminder';
  
  await addNotificationLog({
    title: content.title || 'Notificação',
    message: content.body || '',
    type: type,
  });
  
  // Atualiza Badge
  updateBadgeCount();
}

export async function updateBadgeCount() {
  if (Platform.OS === 'web') return;
  
  // Pega contagem real de não lidas do log interno
  const { getUnreadCount } = await import('./notificationLog');
  const count = await getUnreadCount();
  
  await Notifications.setBadgeCountAsync(count);
}
