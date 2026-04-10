import { useState, useCallback } from "react";
import { View, Text, ScrollView, Pressable, Modal } from "react-native";
import { Card } from "../../components/Card";
import { MotiView } from "moti";
import { Trophy, Target, Flame, TrendingUp, Sparkles, Check, Star, Lock, X, ChevronRight } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUnlock } from "../../lib/unlockContext";
import { useAchievements } from "../../lib/useAchievements";

// Calcula o nível do usuário com base no XP
function getLevel(xp: number) {
  const levels = [
    { threshold: 0,    title: 'Iniciante' },
    { threshold: 300,  title: 'Aprendiz' },
    { threshold: 800,  title: 'Praticante' },
    { threshold: 1500, title: 'Avançado' },
    { threshold: 2500, title: 'Especialista' },
    { threshold: 4000, title: 'Mestre' },
    { threshold: 6000, title: 'Lenda' },
  ];

  let currentLevel = 0;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].threshold) {
      currentLevel = i;
      break;
    }
  }

  const nextLevel = currentLevel < levels.length - 1 ? levels[currentLevel + 1] : null;
  const xpForNext = nextLevel ? nextLevel.threshold - levels[currentLevel].threshold : 0;
  const xpInLevel = xp - levels[currentLevel].threshold;

  return {
    level: currentLevel + 1,
    title: levels[currentLevel].title,
    xpForNext,
    xpInLevel,
  };
}

// Dados de humor zerados por padrão — será preenchido com dados reais do Supabase na Fase 3
const defaultMoodData = [
  { day: "Seg", mood: 0 },
  { day: "Ter", mood: 0 },
  { day: "Qua", mood: 0 },
  { day: "Qui", mood: 0 },
  { day: "Sex", mood: 0 },
  { day: "Sáb", mood: 0 },
  { day: "Dom", mood: 0 },
];

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const { currentXP } = useUnlock();
  const { achievements, unlockedCount, totalCount, completedModules, isLoading } = useAchievements();
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  const levelInfo = getLevel(currentXP);
  const levelProgress = levelInfo.xpForNext > 0 ? (levelInfo.xpInLevel / levelInfo.xpForNext) * 100 : 100;

  // Tudo começa zerado — sem dados fake de teste
  const stats = [
    { label: "Dias consecutivos", value: "0", icon: <Flame size={24} color="#f97316" />, color: "#ffedd5" },
    { label: "Exercícios completos", value: `${completedModules.length}`, icon: <Target size={24} color="#A9C9FF" />, color: "#dbeafe" },
    { label: "Melhora no humor", value: "—", icon: <TrendingUp size={24} color="#B8E0D2" />, color: "#d1fae5" },
  ];

  return (
    <View className="flex-1 bg-background">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <LinearGradient 
          colors={['rgba(184, 224, 210, 0.3)', 'transparent']}
          style={{ paddingTop: insets.top + 24, paddingBottom: 24, paddingHorizontal: 24 }}
        >
          <Text className="text-3xl font-bold mb-2">Meu Progresso</Text>
          <Text className="text-muted-foreground text-base">
            Acompanhe sua jornada de autoconhecimento
          </Text>
        </LinearGradient>

        <View className="px-5 space-y-6">

          {/* ===== CARD DE NÍVEL (Novo, dinâmico) ===== */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "spring" }}
            className="mb-6"
          >
            <Card className="border-0 shadow-sm p-5 bg-white rounded-3xl">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-3">
                  <View className="w-14 h-14 rounded-2xl items-center justify-center" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
                    <Star size={28} color="#8B5CF6" fill="#8B5CF6" />
                  </View>
                  <View>
                    <Text className="text-xs font-bold text-purple-500 uppercase tracking-widest">Nível {levelInfo.level}</Text>
                    <Text className="text-xl font-bold text-foreground">{levelInfo.title}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-2xl font-bold text-purple-600">{currentXP}</Text>
                  <Text className="text-xs font-medium text-muted-foreground">XP Total</Text>
                </View>
              </View>

              {levelInfo.xpForNext > 0 && (
                <View>
                  <View className="h-2.5 bg-purple-100 rounded-full overflow-hidden">
                    <MotiView
                      from={{ width: '0%' }}
                      animate={{ width: `${Math.min(levelProgress, 100)}%` }}
                      transition={{ type: "timing", duration: 800 }}
                      style={{ height: '100%', backgroundColor: '#8B5CF6', borderRadius: 999 }}
                    />
                  </View>
                  <Text className="text-[11px] text-muted-foreground mt-1.5 text-right">
                    {levelInfo.xpInLevel}/{levelInfo.xpForNext} XP para o próximo nível
                  </Text>
                </View>
              )}
            </Card>
          </MotiView>

          {/* ===== STATS CARDS (Design original) ===== */}
          <View className="flex-row justify-between gap-3 mb-6">
            {stats.map((stat, index) => (
              <MotiView
                key={index}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 100, type: "spring" }}
                className="flex-1"
              >
                <Card className="border-0 shadow-sm items-center py-5 px-2 bg-white rounded-3xl">
                  <View 
                    className="w-12 h-12 rounded-full items-center justify-center mb-3"
                    style={{ backgroundColor: stat.color }}
                  >
                    {stat.icon}
                  </View>
                  <Text className="text-2xl font-bold mb-1 text-foreground">{stat.value}</Text>
                  <Text className="text-[11px] text-muted-foreground font-medium text-center">{stat.label}</Text>
                </Card>
              </MotiView>
            ))}
          </View>

          {/* ===== MOOD CHART (Design original — barras nativas) ===== */}
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 300, type: "spring" }}
            className="mb-6"
          >
            <Card className="border-0 shadow-sm p-6 bg-white rounded-3xl">
              <Text className="text-lg font-bold mb-6 text-foreground">Evolução do Humor (7 dias)</Text>
              
              <View className="h-40 flex-row items-end justify-between px-2">
                {defaultMoodData.map((data, index) => {
                  const heightPercentage = (data.mood / 5) * 100;
                  return (
                    <View key={index} className="items-center gap-2">
                      <View className="w-8 h-full justify-end bg-gray-50 rounded-full overflow-hidden">
                        <MotiView
                          from={{ height: 0 }}
                          animate={{ height: `${heightPercentage}%` }}
                          transition={{ delay: 500 + index * 100, type: 'spring', damping: 15 }}
                          className="w-full bg-[#A9C9FF] rounded-full"
                          style={{
                            opacity: 0.5 + (data.mood / 10)
                          }}
                        />
                      </View>
                      <Text className="text-xs font-semibold text-muted-foreground">{data.day}</Text>
                    </View>
                  );
                })}
              </View>

              <View className="mt-6 pt-4 border-t border-gray-100 items-center">
                <Text className="text-sm font-medium text-muted-foreground text-center">
                  Registre seu humor diariamente para acompanhar sua evolução 📊
                </Text>
              </View>
            </Card>
          </MotiView>

          {/* ===== CONQUISTAS (Preview: até 3 desbloqueadas) ===== */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 400 }}
          >
            <View className="flex-row items-center justify-between mb-5 px-1">
              <View className="flex-row items-center gap-2">
                <Trophy size={24} color="#FFD9B0" />
                <Text className="text-xl font-bold text-foreground">Conquistas</Text>
              </View>
              <View className="bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                <Text className="text-xs font-bold text-amber-600">{unlockedCount}/{totalCount}</Text>
              </View>
            </View>

            <View className="gap-3">
              {/* Mostra até 3 conquistas desbloqueadas */}
              {achievements
                .filter(a => a.unlocked)
                .slice(0, 3)
                .map((achievement, i) => (
                <MotiView
                  key={achievement.id}
                  from={{ opacity: 0, translateX: -20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ delay: 500 + i * 80 }}
                >
                  <Card className="border-0 shadow-sm p-4 flex-row items-center gap-4 bg-white rounded-2xl">
                    <View className="w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0 bg-[#FFD9B0]/40">
                      <Text className="text-2xl">{achievement.icon}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-bold text-foreground mb-1">
                        {achievement.title}
                      </Text>
                      <Text className="text-sm font-medium text-muted-foreground leading-5">
                        {achievement.description}
                      </Text>
                    </View>
                    <View className="w-8 h-8 rounded-full bg-[#10b981]/10 items-center justify-center">
                      <Check size={16} color="#10b981" strokeWidth={3} />
                    </View>
                  </Card>
                </MotiView>
              ))}

              {/* Mensagem se não tem nenhuma conquista ainda */}
              {unlockedCount === 0 && (
                <Card className="border-0 shadow-sm p-5 bg-white rounded-2xl items-center">
                  <View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-3">
                    <Lock size={24} color="#94a3b8" />
                  </View>
                  <Text className="text-sm font-bold text-foreground text-center mb-1">Nenhuma conquista ainda</Text>
                  <Text className="text-xs text-muted-foreground text-center">Complete atividades para desbloquear!</Text>
                </Card>
              )}

              {/* Botão "Ver todas as conquistas" */}
              <Pressable 
                onPress={() => setShowAllAchievements(true)}
                className="mt-1"
              >
                <View className="flex-row items-center justify-center gap-2 py-3.5 bg-purple-50 rounded-2xl border border-purple-100">
                  <Trophy size={18} color="#8B5CF6" />
                  <Text className="text-sm font-bold text-purple-600">Ver todas as conquistas</Text>
                  <ChevronRight size={16} color="#8B5CF6" />
                </View>
              </Pressable>
            </View>
          </MotiView>

          {/* ===== MODAL: TODAS AS CONQUISTAS ===== */}
          <Modal
            visible={showAllAchievements}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowAllAchievements(false)}
          >
            <View className="flex-1 bg-black/50 justify-end">
              <View className="bg-white rounded-t-3xl max-h-[85%]" style={{ paddingBottom: insets.bottom + 20 }}>
                
                {/* Handle bar */}
                <View className="items-center pt-3 pb-1">
                  <View className="w-10 h-1 rounded-full bg-gray-300" />
                </View>

                {/* Header do modal */}
                <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
                  <View className="flex-row items-center gap-3">
                    <Trophy size={24} color="#f59e0b" />
                    <View>
                      <Text className="text-xl font-bold text-foreground">Conquistas</Text>
                      <Text className="text-xs text-muted-foreground font-medium">{unlockedCount} de {totalCount} desbloqueadas</Text>
                    </View>
                  </View>
                  <Pressable 
                    onPress={() => setShowAllAchievements(false)}
                    className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
                  >
                    <X size={20} color="#64748b" />
                  </Pressable>
                </View>

                {/* Lista de conquistas */}
                <ScrollView 
                  className="px-5 pt-4"
                  showsVerticalScrollIndicator={false}
                >
                  {/* Desbloqueadas */}
                  {unlockedCount > 0 && (
                    <View className="mb-6">
                      <Text className="text-sm font-bold text-green-600 uppercase tracking-widest mb-3 px-1">
                        🎉 Desbloqueadas ({unlockedCount})
                      </Text>
                      <View className="gap-2.5">
                        {achievements.filter(a => a.unlocked).map((achievement) => (
                          <View
                            key={achievement.id}
                            className="flex-row items-center gap-3 p-3.5 bg-green-50 rounded-2xl border border-green-100"
                          >
                            <View className="w-12 h-12 rounded-xl items-center justify-center bg-[#FFD9B0]/40">
                              <Text className="text-xl">{achievement.icon}</Text>
                            </View>
                            <View className="flex-1">
                              <Text className="text-sm font-bold text-foreground">{achievement.title}</Text>
                              <Text className="text-xs text-muted-foreground mt-0.5">{achievement.description}</Text>
                            </View>
                            <Check size={16} color="#10b981" strokeWidth={3} />
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  {/* Bloqueadas */}
                  <View className="mb-6">
                    <Text className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
                      🔒 Para conquistar ({totalCount - unlockedCount})
                    </Text>
                    <View className="gap-2.5">
                      {achievements.filter(a => !a.unlocked).map((achievement) => (
                        <View
                          key={achievement.id}
                          className="flex-row items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100 opacity-70"
                        >
                          <View className="w-12 h-12 rounded-xl items-center justify-center bg-gray-100">
                            <Lock size={18} color="#94a3b8" />
                          </View>
                          <View className="flex-1">
                            <Text className="text-sm font-bold text-gray-400">{achievement.title}</Text>
                            <Text className="text-xs text-gray-300 mt-0.5">{achievement.description}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>

          {/* ===== REFLEXÃO MENSAL (Design original) ===== */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 500, type: 'timing' }}
            className="mt-6"
          >
            <View className="rounded-3xl p-[2px] bg-gradient-to-br from-[#A9C9FF] to-[#D6CCFE]">
              <View className="bg-white/90 rounded-[22px] p-6">
                <View className="flex-row items-center gap-2 mb-3">
                  <Sparkles size={20} color="#8b5cf6" />
                  <Text className="text-lg font-bold text-foreground">Reflexão Mensal</Text>
                </View>
                <Text className="text-[15px] leading-6 text-foreground/80 font-medium">
                  {completedModules.length === 0 
                    ? "Comece sua jornada completando a primeira atividade. Cada passo conta! ✨"
                    : `Neste mês, você completou ${completedModules.length} exercícios e está construindo hábitos poderosos. Continue assim! Seus esforços estão fazendo diferença. ✨`
                  }
                </Text>
              </View>
            </View>
          </MotiView>
        </View>
      </ScrollView>
    </View>
  );
}
