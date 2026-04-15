import { View, Text, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { MotiView } from "moti";
import { CheckCircle, AlertTriangle, Phone, Lock, Brain } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useMemo } from "react";
import { 
  useUnlock, 
  calculateRiskLevel, 
  calculateUnlockedCategories, 
  CATEGORY_NAMES,
  type RiskLevel 
} from "../lib/unlockContext";


// Categorias completas com seus ícones e cores
const ALL_CATEGORIES = [
  { id: 1, name: "Ansiedade", emoji: "🧠", color: "#D6CCFE" },
  { id: 2, name: "Autoconfiança", emoji: "❤️", color: "#FED9E8" },
  { id: 3, name: "Foco e Concentração", emoji: "🎯", color: "#A9C9FF" },
  { id: 4, name: "Falar em Público", emoji: "👥", color: "#FFD9B0" },
  { id: 5, name: "Burnout e Estresse", emoji: "⚡", color: "#B8E0D2" },
  { id: 6, name: "Sono e Descanso", emoji: "🌙", color: "#D6CCFE" },
  { id: 7, name: "Relacionamentos", emoji: "💬", color: "#FED9E8" },
  { id: 8, name: "Comportamentos", emoji: "☕", color: "#FFD9B0" },
];

export default function AnamneseResult() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ score: string; q17: string; answers: string }>();
  const { setRiskAndUnlock } = useUnlock();

  const score = parseInt(params.score || "0", 10);
  const answers: Record<number, number> = params.answers ? JSON.parse(params.answers) : {};
  const isQ17Positive = params.q17 === "true" || answers[17] === 1 || answers["17" as any] === 1;

  const riskLevel = calculateRiskLevel(score, isQ17Positive);
  const unlockedCategoryIds = useMemo(() => {
    return riskLevel === 'none' ? [] : calculateUnlockedCategories(answers);
  }, [riskLevel, answers]);

  // Salvar estado local ao montar (Supabase já foi salvo no INSERT da anamnese.tsx)
  useEffect(() => {
    const saveLocalState = async () => {
      try {
        await setRiskAndUnlock(score, answers, isQ17Positive);
        console.log(`[Luna Result] Estado local salvo: risk=${riskLevel}`);
      } catch (e) {
        console.log("[Luna Result] Erro ao salvar estado local:", e);
      }
    };
    saveLocalState();
  }, []);

  // === TELA: Score 0-3 - "Sem Tratamento" ===
  if (riskLevel === 'none') {
    return (
      <View className="flex-1 bg-background">
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: insets.top + 48,
            paddingBottom: insets.bottom + 32,
            alignItems: 'center',
          }}
        >
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 200 }}
            className="items-center max-w-md w-full"
          >
            {/* Ícone principal */}
            <View className="w-28 h-28 rounded-full items-center justify-center mb-8" 
              style={{ backgroundColor: 'rgba(22, 163, 74, 0.1)' }}>
              <MotiView
                from={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 150, delay: 400 }}
              >
                <CheckCircle size={56} color="#16a34a" />
              </MotiView>
            </View>

            {/* Título */}
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 600 }}
            >
              <Text className="text-3xl font-bold text-center text-foreground mb-4">
                Você está bem! 💚
              </Text>
            </MotiView>

            {/* Subtítulo */}
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 800 }}
            >
              <Text className="text-base text-center text-muted-foreground mb-10 leading-7 px-4">
                Sua avaliação indica que você está em equilíbrio emocional. Não há necessidade de 
                tratamento agora — apenas continue cuidando de você como tem feito!
              </Text>
            </MotiView>

            {/* Card informativo */}
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 1000 }}
              className="w-full mb-10"
            >
              <Card className="border-0 shadow-sm bg-card" style={{ backgroundColor: 'rgba(22, 163, 74, 0.06)' }}>
                <View className="items-center py-2">
                  <Text className="text-5xl mb-4">🌿</Text>
                  <Text className="text-base font-semibold text-foreground text-center mb-2">
                    Continue assim!
                  </Text>
                  <Text className="text-sm text-muted-foreground text-center leading-5 px-2">
                    Manter hábitos saudáveis e o autoconhecimento é a melhor prevenção. 
                    Faremos uma nova avaliação em 15 dias para acompanhar você.
                  </Text>
                </View>
              </Card>
            </MotiView>

            {/* Botão */}
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1200 }}
              className="w-full"
            >
              <Button
                variant="primary"
                size="lg"
                onPress={() => router.replace("/(tabs)" as any)}
                className="w-full"
                style={{ backgroundColor: '#16a34a' }}
              >
                <Text className="text-white font-bold text-base">Menu Principal</Text>
              </Button>
            </MotiView>
          </MotiView>
        </ScrollView>
      </View>
    );
  }

  // === TELA: Score 4+ - "Com Tratamento" ===
  const isCritical = riskLevel === 'critical';
  
  const headerConfig = {
    normal: {
      icon: <Brain size={48} color="#eab308" />,
      iconBg: 'rgba(234, 179, 8, 0.1)',
      title: "Hora de focar no seu fortalecimento",
      subtitle: "Notamos alguns sinais que merecem atenção. Preparei atividades especiais para te ajudar a recuperar o equilíbrio.",
      buttonText: "Começar Agora",
      gradient: ["#FFFBEA", "#FFFFFF"] as [string, string],
    },
    high: {
      icon: <Brain size={48} color="#f97316" />,
      iconBg: 'rgba(249, 115, 22, 0.1)',
      title: "Precisamos dar atenção a você",
      subtitle: "Identificamos sinais importantes de sobrecarga. Preparei atividades focadas para te ajudar a se fortalecer.",
      buttonText: "Explorar Atividades",
      gradient: ["#FFF7ED", "#FFFFFF"] as [string, string],
    },
    critical: {
      icon: <AlertTriangle size={48} color="#dc2626" />,
      iconBg: 'rgba(220, 38, 38, 0.1)',
      title: "Precisamos dar atenção especial a você",
      subtitle: "Vi que você está passando por um momento muito pesado. Quero te ouvir e buscar as melhores alternativas de apoio agora.",
      buttonText: "Falar com Luna agora",
      gradient: ["#FEF2F2", "#FFFFFF"] as [string, string],
    },
  };

  const config = headerConfig[riskLevel as keyof typeof headerConfig];

  // Separa categorias desbloqueadas e bloqueadas
  const unlockedList = ALL_CATEGORIES.filter(c => unlockedCategoryIds.includes(c.id));
  const lockedList = ALL_CATEGORIES.filter(c => !unlockedCategoryIds.includes(c.id));

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: insets.top + 32,
          paddingBottom: insets.bottom + 32,
        }}
      >
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 500 }}
          className="max-w-md mx-auto w-full"
        >
          {/* Ícone do resultado */}
          <View className="items-center mb-6">
            <MotiView
              from={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 200 }}
              className="w-20 h-20 rounded-full items-center justify-center"
              style={{ backgroundColor: config.iconBg }}
            >
              {config.icon}
            </MotiView>
          </View>

          <Text className="text-3xl text-center mb-4 text-foreground font-bold">
            {config.title}
          </Text>

          <Text className="text-center text-muted-foreground mb-6 text-base leading-6">
            {config.subtitle}
          </Text>

          {/* CVV - Apenas para Critical */}
          {isCritical && (
            <MotiView
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 300 }}
            >
              <View className="bg-red-50 border border-red-200 p-4 rounded-2xl mb-6 flex-row items-center gap-4">
                <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center">
                  <Phone size={24} color="#dc2626" />
                </View>
                <View className="flex-1">
                  <Text className="text-red-900 font-bold text-lg">CVV 188</Text>
                  <Text className="text-red-700 text-sm">Disponível 24h para apoio emocional gratuito.</Text>
                </View>
              </View>
            </MotiView>
          )}

          {/* Categorias Desbloqueadas */}
          {unlockedList.length > 0 && (
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 500 }}
            >
              <Text className="text-lg font-bold text-foreground mb-3">
                ✅ Atividades Liberadas para Você
              </Text>
              <View className="gap-3 mb-6">
                {unlockedList.map((cat, index) => (
                  <MotiView
                    key={cat.id}
                    from={{ opacity: 0, translateX: -30 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ delay: 600 + index * 100 }}
                  >
                    <Card className="border-0 shadow-sm bg-card">
                      <View className="flex-row items-center gap-4 py-1">
                        <View
                          className="w-14 h-14 rounded-2xl items-center justify-center"
                          style={{ backgroundColor: `${cat.color}30` }}
                        >
                          <Text className="text-2xl">{cat.emoji}</Text>
                        </View>
                        <View className="flex-1">
                          <Text className="text-base font-semibold text-foreground">{cat.name}</Text>
                          <Text className="text-xs text-green-600 font-medium mt-1">Desbloqueada</Text>
                        </View>
                        <View className="w-8 h-8 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(22, 163, 74, 0.1)' }}>
                          <CheckCircle size={18} color="#16a34a" />
                        </View>
                      </View>
                    </Card>
                  </MotiView>
                ))}
              </View>
            </MotiView>
          )}

          {/* Categorias Bloqueadas */}
          {lockedList.length > 0 && (
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 800 }}
            >
              <Text className="text-lg font-bold text-muted-foreground mb-3">
                🔒 Disponíveis em Breve
              </Text>
              <View className="gap-3 mb-8">
                {lockedList.map((cat, index) => (
                  <MotiView
                    key={cat.id}
                    from={{ opacity: 0, translateX: -30 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ delay: 900 + index * 80 }}
                  >
                    <Card className="border-0 shadow-sm bg-card" style={{ opacity: 0.5 }}>
                      <View className="flex-row items-center gap-4 py-1">
                        <View
                          className="w-14 h-14 rounded-2xl items-center justify-center bg-muted"
                        >
                          <Text className="text-2xl" style={{ opacity: 0.4 }}>{cat.emoji}</Text>
                        </View>
                        <View className="flex-1">
                          <Text className="text-base font-semibold text-muted-foreground">{cat.name}</Text>
                          <Text className="text-xs text-muted-foreground font-medium mt-1">Bloqueada</Text>
                        </View>
                        <View className="w-8 h-8 rounded-full bg-muted items-center justify-center">
                          <Lock size={14} color="#94a3b8" />
                        </View>
                      </View>
                    </Card>
                  </MotiView>
                ))}
              </View>
            </MotiView>
          )}

          {/* Botão de ação */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", delay: 1200 }}
          >
            <Button
              variant="primary"
              size="lg"
              onPress={() => {
                if (isCritical) {
                  router.replace({ pathname: "/(tabs)/chat", params: { mode: 'crisis' } } as any);
                } else {
                  router.replace("/(tabs)/plan" as any);
                }
              }}
              className="w-full"
            >
              <Text className="text-white font-bold">{config.buttonText}</Text>
            </Button>
          </MotiView>
        </MotiView>
      </ScrollView>
    </View>
  );
}
