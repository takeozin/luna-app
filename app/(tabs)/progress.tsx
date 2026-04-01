import { View, Text, ScrollView, Platform } from "react-native";
import { Card } from "../../components/Card";
import { MotiView } from "moti";
import { Trophy, Target, Flame, TrendingUp, Sparkles, Check } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const moodData = [
  { day: "Seg", mood: 3 },
  { day: "Ter", mood: 3.5 },
  { day: "Qua", mood: 4 },
  { day: "Qui", mood: 3.5 },
  { day: "Sex", mood: 4.5 },
  { day: "Sáb", mood: 4 },
  { day: "Dom", mood: 4.5 },
];

const achievements = [
  {
    id: 1,
    title: "Detetive dos Pensamentos",
    description: "Completou 5 diários de pensamentos",
    icon: "🔍",
    unlocked: true,
  },
  {
    id: 2,
    title: "Mestre do Foco",
    description: "7 dias consecutivos de meditação",
    icon: "🧘",
    unlocked: true,
  },
  {
    id: 3,
    title: "Guerreiro do Sono",
    description: "Completou o módulo de Higiene do Sono",
    icon: "🌙",
    unlocked: false,
  },
  {
    id: 4,
    title: "Explorador Corajoso",
    description: "Iniciou 3 módulos diferentes",
    icon: "🏆",
    unlocked: true,
  },
];

const stats = [
  { label: "Dias seguidos", value: "7", icon: <Flame size={24} color="#f97316" />, color: "#ffedd5" },
  { label: "Exercícios", value: "24", icon: <Target size={24} color="#3b82f6" />, color: "#dbeafe" },
  { label: "Melhora", value: "30%", icon: <TrendingUp size={24} color="#059669" />, color: "#d1fae5" },
];

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();

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
          {/* Stats Cards */}
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

          {/* Mood Chart (Custom Native Visual) */}
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 300, type: "spring" }}
            className="mb-6"
          >
            <Card className="border-0 shadow-sm p-6 bg-white rounded-3xl">
              <Text className="text-lg font-bold mb-6 text-foreground">Evolução do Humor (7 dias)</Text>
              
              <View className="h-40 flex-row items-end justify-between px-2">
                {moodData.map((data, index) => {
                  // Max mood is 5. Height calculation:
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
                  Seu humor melhorou <Text className="text-[#059669] font-bold">30%</Text> esta semana! 🎉
                </Text>
              </View>
            </Card>
          </MotiView>

          {/* Monthly Insight */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 400, type: 'timing' }}
            className="mb-8"
          >
            <View className="rounded-3xl p-[2px] bg-gradient-to-br from-[#A9C9FF] to-[#D6CCFE]">
              <View className="bg-white/90 rounded-[22px] p-6">
                <View className="flex-row items-center gap-2 mb-3">
                  <Sparkles size={20} color="#8b5cf6" />
                  <Text className="text-lg font-bold text-foreground">Reflexão Mensal</Text>
                </View>
                <Text className="text-[15px] leading-6 text-foreground/80 font-medium">
                  Neste mês, você focou em autoconfiança e melhorou 30% sua sensação de capacidade. 
                  Continue assim! Seus esforços estão fazendo diferença. 🚀
                </Text>
              </View>
            </View>
          </MotiView>

          {/* Achievements */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 500 }}
          >
            <View className="flex-row items-center gap-2 mb-5 px-1">
              <Trophy size={24} color="#f59e0b" />
              <Text className="text-xl font-bold text-foreground">Conquistas</Text>
            </View>

            <View className="gap-3">
              {achievements.map((achievement, i) => (
                <MotiView
                  key={achievement.id}
                  from={{ opacity: 0, translateX: -20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ delay: 600 + i * 100 }}
                >
                  <Card
                    className={`border-0 shadow-sm p-4 flex-row items-center gap-4 bg-white rounded-2xl ${
                      !achievement.unlocked ? "opacity-60" : ""
                    }`}
                  >
                    <View
                      className={`w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0 ${
                        achievement.unlocked ? "bg-[#FFD9B0]/40" : "bg-gray-100"
                      }`}
                    >
                      <Text className={`text-2xl ${!achievement.unlocked ? 'opacity-40 grayscale' : ''}`}>
                        {achievement.icon}
                      </Text>
                    </View>
                    
                    <View className="flex-1">
                      <Text className="text-base font-bold text-foreground mb-1">
                        {achievement.title}
                      </Text>
                      <Text className="text-sm font-medium text-muted-foreground leading-5">
                        {achievement.description}
                      </Text>
                    </View>

                    {achievement.unlocked && (
                      <View className="w-8 h-8 rounded-full bg-[#10b981]/10 items-center justify-center">
                        <Check size={16} color="#10b981" strokeWidth={3} />
                      </View>
                    )}
                  </Card>
                </MotiView>
              ))}
            </View>
          </MotiView>
        </View>
      </ScrollView>
    </View>
  );
}
