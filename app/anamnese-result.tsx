import { View, Text, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ProgressBar } from "../components/ProgressBar";
import { MotiView, MotiText } from "moti";
import { Moon, Brain, Target, CheckCircle } from "lucide-react-native";
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
  const params = useLocalSearchParams<{ score: string }>();
  
  const score = parseInt(params.score || "0", 10);
  const isElevatedRisk = score >= 7;

  const resultConfig = isElevatedRisk
    ? {
        icon: <Brain size={48} color="#eab308" />,
        iconBg: "bg-amber-100",
        title: "Percebemos que você está passando por um momento delicado",
        subtitle: `Sua triagem indica sintomas de sobrecarga emocional. Seu Plano de Fortalecimento foi adaptado para focar no resgate do seu equilíbrio.\n\nLembre-se: O aplicativo não substitui ajuda médica, e buscar terapia é um forte aliado agora.`,
      }
    : {
        icon: <CheckCircle size={48} color="#16a34a" />,
        iconBg: "bg-[#D4EDDA]",
        title: "Seu Plano de Fortalecimento Mental está pronto!",
        subtitle: "Com base nas suas respostas, notamos que seu nível de bem-estar está equilibrado hoje. Preparei um plano personalizado para mantermos esse ritmo saudável.",
      };

  return (
    <LinearGradient
      colors={["rgba(184, 224, 210, 0.2)", "#FFFFFF"]}
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
              className={`w-20 h-20 rounded-full ${resultConfig.iconBg} items-center justify-center`}
            >
              {resultConfig.icon}
            </MotiView>
          </View>

          <MotiText
            className="text-3xl text-center mb-4 text-foreground font-semibold"
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", delay: 400 }}
          >
            {resultConfig.title}
          </MotiText>

          <MotiText
            className="text-center text-muted-foreground mb-8 text-base leading-6"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", delay: 600 }}
          >
            {resultConfig.subtitle}
          </MotiText>

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
                      <Text className="text-base font-semibold text-foreground mb-2">
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
              // @ts-ignore - Ignorando o aviso de tipagem restrita do expo-router
              onPress={() => router.replace("/(tabs)")}
              className="w-full"
            >
              Explorar meu plano
            </Button>
          </MotiView>
        </MotiView>
      </ScrollView>
    </LinearGradient>
  );
}
