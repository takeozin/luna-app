import { View, Text, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ProgressBar } from "../components/ProgressBar";
import { MotiView, MotiText } from "moti";
import { Moon, Brain, Target, CheckCircle, AlertTriangle, Phone } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const modules = [
  {
    id: 1,
    title: "Higiene do Sono e Energia",
    icon: <Moon size={32} color="#B8E0D2" />,
    progress: 0,
    total: 7,
    color: "#B8E0D2",
  },
  {
    id: 2,
    title: "Silenciando o Crítico Interno",
    icon: <Brain size={32} color="#D6CCFE" />,
    progress: 0,
    total: 7,
    color: "#D6CCFE",
  },
  {
    id: 3,
    title: "Treinando a Atenção Plena",
    icon: <Target size={32} color="#A9C9FF" />,
    progress: 0,
    total: 7,
    color: "#A9C9FF",
  },
];

export default function AnamneseResult() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ score: string, q17: string }>();
  
  const score = parseInt(params.score || "0", 10);
  const isQ17Positive = params.q17 === "true";
  
  // Níveis de Risco:
  // - Normal: 0-6
  // - High: 7-10 (e Q17 negativa)
  // - Critical: 11+ OU Q17 positiva
  const riskLevel = isQ17Positive || score >= 11 ? "critical" : score >= 7 ? "high" : "normal";

  interface ResultConfig {
    icon: React.ReactNode;
    iconBg: string;
    title: string;
    subtitle: string;
    buttonText: string;
    route: string;
    extra?: React.ReactNode;
  }

  const resultConfigs: Record<string, ResultConfig> = {
    normal: {
      icon: <CheckCircle size={48} color="#16a34a" />,
      iconBg: "bg-green-100",
      title: "Seu bem-estar está em dia!",
      subtitle: "Os resultados indicam um equilíbrio emocional saudável. Continue cuidando de você e aproveite o dia!",
      buttonText: "Ir para o Início",
      route: "/(tabs)",
    },
    high: {
      icon: <Brain size={48} color="#eab308" />,
      iconBg: "bg-amber-100",
      title: "Hora de focar no seu fortalecimento",
      subtitle: "Notamos alguns sinais de stress e sobrecarga. Preparei atividades especiais para te ajudar a relaxar e recuperar o equilíbrio.",
      buttonText: "Explorar Atividades",
      route: "/(tabs)/plan",
    },
    critical: {
      icon: <AlertTriangle size={48} color="#dc2626" />,
      iconBg: "bg-red-100",
      title: "Precisamos dar atenção especial a você",
      subtitle: "Vi que você está passando por um momento muito pesado. Quero te ouvir e buscar as melhores alternativas de apoio agora.",
      buttonText: "Falar com Luna agora",
      route: "/(tabs)/chat",
      extra: (
        <View className="bg-red-50 border border-red-200 p-4 rounded-2xl mb-8 flex-row items-center gap-4">
          <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center">
            <Phone size={24} color="#dc2626" />
          </View>
          <View className="flex-1">
            <Text className="text-red-900 font-bold text-lg">CVV 188</Text>
            <Text className="text-red-700 text-sm">Disponível 24h para apoio emocional gratuito.</Text>
          </View>
        </View>
      )
    }
  };

  const config = resultConfigs[riskLevel];

  return (
    <LinearGradient
      colors={["#F0FDF9", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
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
          {/* Result Icon */}
          <View className="items-center mb-6">
            <MotiView
              from={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 200 }}
              className={`w-20 h-20 rounded-full ${config.iconBg} items-center justify-center`}
            >
              {config.icon}
            </MotiView>
          </View>

          <Text
            className="text-3xl text-center mb-4 text-slate-900 font-bold"
          >
            {config.title}
          </Text>

          <Text
            className="text-center text-slate-600 mb-8 text-base leading-6"
          >
            {config.subtitle}
          </Text>

          {config.extra && config.extra}

          {/* Modules */}
          <View className="gap-4 mb-8">
            {modules.map((module, index) => (
              <MotiView
                key={module.id}
                from={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: "timing", delay: 800 + index * 200 }}
              >
                <Card className="border-0 shadow-sm">
                  <View className="flex-row items-center gap-4">
                    <View
                      className="w-16 h-16 rounded-2xl items-center justify-center"
                      style={{ backgroundColor: `${module.color}30` }}
                    >
                      {module.icon}
                    </View>
                    <View className="flex-1 justify-center">
                      <Text className="text-base font-bold text-slate-800 mb-2">
                        {module.title}
                      </Text>
                      <View className="flex-row items-center gap-2">
                        <ProgressBar value={module.progress} max={module.total} className="flex-1" />
                        <Text className="text-sm text-muted-foreground w-10 text-right">
                          {module.progress}/{module.total}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Card>
              </MotiView>
            ))}
          </View>

          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", delay: 1400 }}
          >
            <Button
              variant="primary"
              size="lg"
              // @ts-ignore
              onPress={() => {
                if (riskLevel === "critical") {
                  router.replace({ pathname: "/(tabs)/chat", params: { mode: 'crisis' } });
                } else {
                  router.replace(config.route as any);
                }
              }}
              className="w-full"
            >
              <Text className="text-white font-bold">{config.buttonText}</Text>
            </Button>
          </MotiView>
        </MotiView>
      </ScrollView>
    </LinearGradient>
  );
}
