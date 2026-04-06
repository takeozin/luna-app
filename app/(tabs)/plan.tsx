import { useState } from "react";
import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "../../components/Card";
import { ProgressBar } from "../../components/ProgressBar";
import { MotiView } from "moti";
import { Moon, Brain, Target, Heart, Focus, Users, Zap, Coffee, Lock, Sparkles } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUnlock } from "../../lib/unlockContext";

const allModules = [
  {
    id: 1, title: "Higiene do Sono e Energia",
    icon: <Moon size={32} color="#B8E0D2" />, progress: 0, total: 7,
    color: "#B8E0D2", description: "Aprenda técnicas para melhorar a qualidade do seu sono",
    categoryId: 6,
  },
  {
    id: 2, title: "Silenciando o Crítico Interno",
    icon: <Brain size={32} color="#D6CCFE" />, progress: 0, total: 7,
    color: "#D6CCFE", description: "Identifique e reestruture pensamentos negativos",
    categoryId: 2,
  },
  {
    id: 3, title: "Treinando a Atenção Plena",
    icon: <Target size={32} color="#A9C9FF" />, progress: 0, total: 7,
    color: "#A9C9FF", description: "Desenvolva foco e presença no momento atual",
    categoryId: 3,
  },
  {
    id: 4, title: "Falar em Público sem Pânico",
    icon: <Users size={32} color="#FFD9B0" />, progress: 0, total: 7,
    color: "#FFD9B0", description: "Supere o medo de apresentações",
    categoryId: 4,
  },
  {
    id: 5, title: "Combatendo o Burnout",
    icon: <Zap size={32} color="#FED9E8" />, progress: 0, total: 10,
    color: "#FED9E8", description: "Recupere sua energia e motivação",
    categoryId: 5,
  },
  {
    id: 6, title: "Fortalecendo a Autoconfiança",
    icon: <Heart size={32} color="#B8E0D2" />, progress: 0, total: 7,
    color: "#B8E0D2", description: "Reconheça e valorize seus pontos fortes",
    categoryId: 2,
  },
  {
    id: 7, title: "Melhorando o Foco",
    icon: <Focus size={32} color="#A9C9FF" />, progress: 0, total: 5,
    color: "#A9C9FF", description: "Treine sua mente para manter a concentração",
    categoryId: 3,
  },
  {
    id: 8, title: "Comportamentos Saudáveis",
    icon: <Coffee size={32} color="#FFD9B0" />, progress: 0, total: 6,
    color: "#FFD9B0", description: "Construa hábitos que apoiam seu bem-estar",
    categoryId: 8,
  },
];

export default function MyPlan() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"active" | "library">("active");
  const { isLocked, riskLevel } = useUnlock();

  // Módulos desbloqueados viram "em andamento"
  const activeModules = allModules.filter(m => !isLocked(m.categoryId));
  // Todos aparecem na biblioteca
  const libraryModules = allModules;

  // Tela especial para "sem tratamento"
  if (riskLevel === 'none') {
    return (
      <View className="flex-1 bg-background">
        <LinearGradient
          colors={["rgba(169, 201, 255, 0.2)", "rgba(255, 255, 255, 0)"]}
          style={{ paddingTop: insets.top + 20, paddingBottom: 24, paddingHorizontal: 24 }}
        >
          <Text className="text-3xl font-semibold text-foreground mb-2">Meu Plano</Text>
          <Text className="text-muted-foreground text-sm">Seu plano de fortalecimento personalizado</Text>
        </LinearGradient>

        <View className="flex-1 items-center justify-center px-8" style={{ marginTop: -60 }}>
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="items-center"
          >
            <View className="w-20 h-20 rounded-full items-center justify-center mb-6" style={{ backgroundColor: 'rgba(22, 163, 74, 0.1)'}}>
              <Sparkles size={36} color="#16a34a" />
            </View>
            <Text className="text-xl font-bold text-slate-800 text-center mb-3">
              Você está indo bem! 💚
            </Text>
            <Text className="text-base text-slate-500 text-center leading-6">
              Sua avaliação indica que você está em boa forma! Continue assim e faremos uma nova avaliação em breve.
            </Text>
          </MotiView>
        </View>
      </View>
    );
  }

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
          activeModules.length > 0 ? (
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
            <View className="items-center justify-center py-16">
              <Text className="text-4xl mb-4">📋</Text>
              <Text className="text-muted-foreground text-center text-base">
                Nenhum módulo desbloqueado ainda.{"\n"}Continue suas sessões com a Luna para liberar novos exercícios.
              </Text>
            </View>
          )
        ) : (
          libraryModules.map((module, index) => {
            const locked = isLocked(module.categoryId);
            return (
              <MotiView
                key={module.id}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 400, delay: index * 100 }}
              >
                <Card className="border-0 shadow-sm" style={{ opacity: locked ? 0.5 : 1 }}>
                  <View className="flex-row items-center gap-4">
                    <View className="relative">
                      <View
                        className="w-16 h-16 rounded-2xl items-center justify-center"
                        style={{ backgroundColor: locked ? '#E8E8E8' : `${module.color}30` }}
                      >
                        {module.icon}
                      </View>
                      {locked && (
                        <View className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-slate-200 items-center justify-center border-2 border-white">
                          <Lock size={10} color="#64748b" />
                        </View>
                      )}
                    </View>
                    <View className="flex-1">
                      <Text className={`text-base font-semibold mb-1 ${locked ? 'text-slate-400' : 'text-foreground'}`}>
                        {module.title}
                      </Text>
                      <Text className={`text-sm ${locked ? 'text-slate-300' : 'text-muted-foreground'}`}>
                        {locked ? '🔒 Bloqueado' : `${module.total} dias de exercícios`}
                      </Text>
                    </View>
                    {locked ? (
                      <View className="px-4 py-2 border border-slate-200 rounded-full opacity-50">
                        <Text className="text-slate-300 font-semibold">Bloqueado</Text>
                      </View>
                    ) : (
                      <Pressable className="px-4 py-2 border border-[#A9C9FF] rounded-full active:bg-[#A9C9FF]/10">
                        <Text className="text-[#A9C9FF] font-semibold">Adicionar</Text>
                      </Pressable>
                    )}
                  </View>
                </Card>
              </MotiView>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
