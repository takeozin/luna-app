import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "../../components/Card";
import { ProgressBar } from "../../components/ProgressBar";
import { MotiView } from "moti";
import { Moon, Brain, Target, Heart, Focus, Users, Zap, Coffee } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const activeModules = [
  {
    id: 1,
    title: "Higiene do Sono e Energia",
    icon: <Moon size={32} color="#B8E0D2" />,
    progress: 3,
    total: 7,
    color: "#B8E0D2",
    description: "Aprenda técnicas para melhorar a qualidade do seu sono",
  },
  {
    id: 2,
    title: "Silenciando o Crítico Interno",
    icon: <Brain size={32} color="#D6CCFE" />,
    progress: 1,
    total: 7,
    color: "#D6CCFE",
    description: "Identifique e reestruture pensamentos negativos",
  },
  {
    id: 3,
    title: "Treinando a Atenção Plena",
    icon: <Target size={32} color="#A9C9FF" />,
    progress: 0,
    total: 7,
    color: "#A9C9FF",
    description: "Desenvolva foco e presença no momento atual",
  },
];

const libraryModules = [
  {
    id: 4,
    title: "Falar em Público sem Pânico",
    icon: <Users size={32} color="#FFD9B0" />,
    duration: "7 dias",
    color: "#FFD9B0",
  },
  {
    id: 5,
    title: "Burnout e Estresse",
    icon: <Zap size={32} color="#FED9E8" />,
    duration: "10 dias",
    color: "#FED9E8",
  },
  {
    id: 6,
    title: "Autoconfiança",
    icon: <Heart size={32} color="#B8E0D2" />,
    duration: "7 dias",
    color: "#B8E0D2",
  },
  {
    id: 7,
    title: "Foco e Concentração",
    icon: <Focus size={32} color="#A9C9FF" />,
    duration: "5 dias",
    color: "#A9C9FF",
  },
];

export default function MyPlan() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"active" | "library">("active");

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <LinearGradient
        colors={["rgba(169, 201, 255, 0.2)", "rgba(255, 255, 255, 0)"]}
        style={{ paddingTop: insets.top + 20, paddingBottom: 24, paddingHorizontal: 24 }}
      >
        <Text className="text-3xl font-semibold text-foreground mb-2">Meu Plano</Text>
        <Text className="text-muted-foreground text-sm">
          Continue seu progresso ou explore novos módulos
        </Text>
      </LinearGradient>

      {/* Segmented Tabs */}
      <View className="px-6 mb-6">
        <View className="flex-row gap-2 bg-[#F0F0F0] p-1 rounded-full">
          <Pressable
            onPress={() => setActiveTab("active")}
            className={`flex-1 py-2 px-4 rounded-full items-center justify-center ${
              activeTab === "active" ? "bg-white" : ""
            }`}
            style={activeTab === "active" ? { elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 3 } : {}}
          >
            <Text className={`font-medium ${activeTab === "active" ? "text-foreground" : "text-muted-foreground"}`}>
              Em Andamento
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("library")}
            className={`flex-1 py-2 px-4 rounded-full items-center justify-center ${
              activeTab === "library" ? "bg-white" : ""
            }`}
            style={activeTab === "library" ? { elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 3 } : {}}
          >
            <Text className={`font-medium ${activeTab === "library" ? "text-foreground" : "text-muted-foreground"}`}>
              Biblioteca
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, gap: 16 }}>
        {activeTab === "active" ? (
          activeModules.map((module, index) => (
            <MotiView
              key={module.id}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 400, delay: index * 100 }}
            >
              <Pressable onPress={() => router.push(`/plan/${module.id}`)}>
                <Card className="border-0 shadow-sm">
                  <View className="flex-row items-center gap-4 mb-4">
                    <View
                      className="w-16 h-16 rounded-2xl items-center justify-center"
                      style={{ backgroundColor: `${module.color}30` }}
                    >
                      {module.icon}
                    </View>
                    <View className="flex-1 justify-center">
                      <Text className="text-base font-semibold text-foreground mb-1">{module.title}</Text>
                      <Text className="text-sm text-muted-foreground mb-2 leading-5">
                        {module.description}
                      </Text>
                      <View className="flex-row items-center gap-2">
                        <ProgressBar value={module.progress} max={module.total} className="flex-1" />
                        <Text className="text-xs text-muted-foreground">
                          {module.progress}/{module.total}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-sm font-semibold text-[#A9C9FF]">
                      {module.progress === 0 ? "Começar" : "Continuar"} →
                    </Text>
                  </View>
                </Card>
              </Pressable>
            </MotiView>
          ))
        ) : (
          libraryModules.map((module, index) => (
            <MotiView
              key={module.id}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 400, delay: index * 100 }}
            >
              <Card className="border-0 shadow-sm">
                <View className="flex-row items-center gap-4">
                  <View
                    className="w-16 h-16 rounded-2xl items-center justify-center"
                    style={{ backgroundColor: `${module.color}30` }}
                  >
                    {module.icon}
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground mb-1">{module.title}</Text>
                    <Text className="text-sm text-muted-foreground">
                      {module.duration} de exercícios
                    </Text>
                  </View>
                  <Pressable className="px-4 py-2 border border-[#A9C9FF] rounded-full active:bg-[#A9C9FF]/10">
                    <Text className="text-[#A9C9FF] font-semibold">Adicionar</Text>
                  </Pressable>
                </View>
              </Card>
            </MotiView>
          ))
        )}
      </ScrollView>
    </View>
  );
}
