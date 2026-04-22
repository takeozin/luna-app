import { useState, useMemo, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { MotiView, MotiText } from "moti";
import { Bell, Settings, Quote, Clock, Heart, Sparkles, Flame, Star } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUnlock } from "../../lib/unlockContext";
import { getLevel } from "../../lib/levels";
import { getUnreadCount } from "../../lib/notificationLog";
import { scheduleStreakReminder, cancelStreakReminder } from "../../lib/notifications";
import { isStreakActiveToday } from "../../lib/streaks";
import AsyncStorage from '@react-native-async-storage/async-storage';

const dailyQuotes = [
  "Seus pensamentos não são fatos. Eles são apenas hipóteses.",
  "Qual a evidência para esse pensamento?",
  "Hoje, seja seu próprio melhor amigo.",
  "Pausas não são fraqueza, são estratégia.",
  "Você não é sua ansiedade. Você é quem observa a ansiedade.",
];

const moods = [
  { emoji: "😫", label: "Péssimo", value: 1 },
  { emoji: "😟", label: "Mal", value: 2 },
  { emoji: "😐", label: "Ok", value: 3 },
  { emoji: "🙂", label: "Bem", value: 4 },
  { emoji: "😊", label: "Ótimo", value: 5 },
];

import { supabase } from "../../lib/supabase";

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const { riskLevel, unlockedCategories, lunaUnlocked, currentXP, streakCount } = useUnlock();
  const levelInfo = getLevel(currentXP);

  useEffect(() => {
    // Busca número de notificações não lidas
    getUnreadCount().then(setUnreadCount);

    // Verifica streak para agendar lembrete
    const checkStreak = async () => {
      const lastActive = await AsyncStorage.getItem('luna_last_active_date');
      const activeToday = isStreakActiveToday(lastActive);
      if (!activeToday) {
        await scheduleStreakReminder();
      } else {
        await cancelStreakReminder();
      }
    };
    checkStreak();
  }, []);

  const handleMoodSelect = async (moodValue: number, emoji: string) => {
    setSelectedMood(moodValue);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('mood_entries')
        .insert({
          user_id: user.id,
          mood_value: moodValue,
          emoji: emoji,
          created_at: new Date().toISOString()
        });

      if (error) console.error('[Home] Erro ao salvar humor:', error.message);
    } catch (err) {
      console.error('[Home] Erro inesperado ao salvar humor:', err);
    }
  };

  const userName = "Ana";

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite";
  const dailyQuote = useMemo(() => dailyQuotes[new Date().getDate() % dailyQuotes.length], []);

  const isNone = riskLevel === 'none';
  const totalUnlocked = [...new Set([...unlockedCategories, ...lunaUnlocked])].length;

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 20, paddingBottom: 16, paddingHorizontal: 24 }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full overflow-hidden bg-primary items-center justify-center">
              <Text className="text-primary-foreground text-lg font-semibold">{userName.charAt(0)}</Text>
            </View>
            <View>
              <Text className="text-sm text-muted-foreground">{greeting}</Text>
              <Text className="text-xl text-foreground font-semibold">{userName}!</Text>
            </View>
          </View>
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => router.push("/notifications")}
              className="w-10 h-10 rounded-full bg-card items-center justify-center shadow-sm active:opacity-70 active:scale-95 transition-all"
              style={{ 
                elevation: 3,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
              }}
            >
              <Bell size={20} color="#71717A" />
              {unreadCount > 0 && (
                <View className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-card" />
              )}
            </Pressable>
            <Pressable
              onPress={() => router.push("/settings")}
              className="w-10 h-10 rounded-full bg-card items-center justify-center shadow-sm active:opacity-70 active:scale-95 transition-all"
              style={{ 
                elevation: 3,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
              }}
            >
              <Settings size={20} color="#71717A" />
            </Pressable>
          </View>
        </View>

        {/* Widget de Status: Nível + Streak */}
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 300 }}
        >
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1.5 bg-card px-3 py-1.5 rounded-full" style={{ elevation: 1 }}>
              <Star size={14} color="#8B5CF6" fill="#8B5CF6" />
              <Text className="text-xs font-bold text-foreground">Nv. {levelInfo.level}</Text>
              <Text className="text-xs text-muted-foreground">{levelInfo.title}</Text>
            </View>
            {streakCount > 0 && (
              <View className="flex-row items-center gap-1.5 bg-card px-3 py-1.5 rounded-full" style={{ elevation: 1 }}>
                <Flame size={14} color="#f97316" />
                <Text className="text-xs font-bold text-foreground">{streakCount} dia{streakCount !== 1 ? 's' : ''}</Text>
              </View>
            )}
            <View className="flex-row items-center gap-1.5 bg-card px-3 py-1.5 rounded-full" style={{ elevation: 1 }}>
              <Text className="text-xs font-bold text-purple-500">{currentXP} XP</Text>
            </View>
          </View>
        </MotiView>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, gap: 24 }}>
        {/* Check-in Rápido - funciona sempre */}
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "timing", duration: 400, delay: 100 }}>
          <Card className="border-0 shadow-sm">
            <Text className="text-foreground font-semibold mb-4 text-base">Como você está se sentindo agora?</Text>
            <View className="flex-row justify-between w-full">
              {moods.map((mood) => (
                <Pressable
                  key={mood.value}
                  onPress={() => handleMoodSelect(mood.value, mood.emoji)}
                  className={`items-center gap-2 p-2 rounded-2xl ${
                    selectedMood === mood.value ? "bg-[#A9C9FF]/30" : "active:bg-[#F0F0F0]"
                  }`}
                >
                  <MotiText
                    animate={{ scale: selectedMood === mood.value ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-3xl"
                  >
                    {mood.emoji}
                  </MotiText>
                  <Text className="text-xs text-muted-foreground">{mood.label}</Text>
                </Pressable>
              ))}
            </View>
          </Card>
        </MotiView>

        {/* Inspiração do Dia - funciona sempre */}
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "timing", duration: 400, delay: 200 }}>
          <Card className="border border-secondary/30 bg-card shadow-sm">
            <View className="flex-row items-start gap-3">
              <View className="mt-1">
                <Quote size={24} color="#A9C9FF" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Inspiração do Dia</Text>
                <Text className="text-base text-foreground leading-relaxed font-medium">{dailyQuote}</Text>
              </View>
            </View>
          </Card>
        </MotiView>

        {/* Conteúdo condicional baseado no riskLevel */}
        {isNone ? (
          /* Mensagem para usuários sem tratamento */
          <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "timing", duration: 400, delay: 300 }}>
            <Card className="border-0 shadow-sm" style={{ backgroundColor: 'rgba(22, 163, 74, 0.05)' }}>
              <View className="items-center py-4">
                <View className="w-16 h-16 rounded-full items-center justify-center mb-4" style={{ backgroundColor: 'rgba(22, 163, 74, 0.1)' }}>
                  <Sparkles size={28} color="#16a34a" />
                </View>
                <Text className="text-base font-semibold text-slate-800 text-center mb-2">
                  Você está indo bem! 💚
                </Text>
                <Text className="text-sm text-slate-500 text-center leading-5">
                  Nenhum módulo necessário no momento. Continue mantendo seus hábitos saudáveis!
                </Text>
              </View>
            </Card>
          </MotiView>
        ) : (
          <>
            {/* Próxima Tarefa */}
            <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "timing", duration: 400, delay: 300 }}>
              <Card className="border-0 shadow-sm">
                <View className="flex-row items-center gap-3 mb-3">
                  <Clock size={20} color="#B8E0D2" />
                  <Text className="text-sm text-muted-foreground">Seu próximo exercício</Text>
                </View>
                <Text className="text-lg font-semibold text-foreground mb-1">
                  {totalUnlocked > 0 ? "Explore suas atividades" : "Complete a anamnese"}
                </Text>
                <Text className="text-sm text-muted-foreground mb-5">
                  {totalUnlocked > 0 
                    ? `${totalUnlocked} categorias desbloqueadas para você`
                    : "Inicie sua jornada de autoconhecimento"
                  }
                </Text>
                <Button
                  variant="primary"
                  size="sm"
                  onPress={() => router.push("/plan")}
                  className="w-full"
                >
                  Começar agora
                </Button>
              </Card>
            </MotiView>

            {/* Módulos em Andamento */}
            <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "timing", duration: 400, delay: 400 }}>
              <View className="flex-row items-center justify-between mb-4 mt-2">
                <Text className="text-lg font-semibold text-foreground">Suas Atividades</Text>
                <Pressable onPress={() => router.push("/plan")}>
                  <Text className="text-sm font-semibold text-[#A9C9FF]">Ver todos</Text>
                </Pressable>
              </View>
              <View className="gap-3">
                {totalUnlocked > 0 ? (
                  <Card className="border-0 shadow-sm">
                    <View className="flex-row items-center gap-4 py-1">
                      <View className="w-12 h-12 rounded-xl bg-[#A9C9FF]/30 items-center justify-center">
                        <Text className="text-xl">🎯</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-foreground mb-1">
                          {totalUnlocked} Categorias Ativas
                        </Text>
                        <Text className="text-xs text-muted-foreground">
                          Acesse o Meu Plano para ver seus módulos
                        </Text>
                      </View>
                    </View>
                  </Card>
                ) : (
                  <Card className="border-0 shadow-sm">
                    <View className="items-center py-4">
                      <Text className="text-sm text-muted-foreground text-center">
                        Complete a anamnese para desbloquear suas atividades personalizadas.
                      </Text>
                    </View>
                  </Card>
                )}
              </View>
            </MotiView>
          </>
        )}

        {/* Ajuda Profissional - sempre visível */}
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "timing", duration: 400, delay: 500 }} className="mt-2">
          <Card className="border border-[#FFE5E5] bg-[#FFE5E5]/20 shadow-sm">
            <View className="flex-row items-start gap-4">
              <View className="mt-1">
                <Heart size={24} color="#d4183d" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground mb-1">Precisa de apoio profissional?</Text>
                <Text className="text-xs text-muted-foreground mb-4">
                  Fale com um psicólogo credenciado agora
                </Text>
                <Button
                  variant="emergency"
                  size="sm"
                  onPress={() => router.push("/")}
                >
                  Falar com profissional
                </Button>
              </View>
            </View>
          </Card>
        </MotiView>
      </ScrollView>
    </View>
  );
}
