import { useState, useCallback } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { Card } from "../../components/Card";
import { MotiView } from "moti";
import { ArrowLeft, Brain, Heart, Users, Zap, Moon, Focus, Coffee, MessageSquare, PlayCircle, CheckCircle2 } from "lucide-react-native";
import { categoryModules } from "../data/mockData";
import { CBT_EXPERT_DATA } from "../data/activitiesData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useUnlock } from "../../lib/unlockContext";

const getCategoryDetails = (numericId: number) => {
  switch (numericId) {
    case 1:
      return { name: "Ansiedade", icon: <Brain size={28} color="#9381ff" />, color: "#D6CCFE" };
    case 2:
      return { name: "Autoconfiança", icon: <Heart size={28} color="#e11d48" />, color: "#FED9E8" };
    case 3:
      return { name: "Foco e Concentração", icon: <Focus size={28} color="#2563eb" />, color: "#A9C9FF" };
    case 4:
      return { name: "Falar em Público", icon: <Users size={28} color="#ea580c" />, color: "#FFD9B0" };
    case 5:
      return { name: "Burnout e Estresse", icon: <Zap size={28} color="#059669" />, color: "#B8E0D2" };
    case 6:
      return { name: "Sono e Descanso", icon: <Moon size={28} color="#7c3aed" />, color: "#D6CCFE" };
    case 7:
      return { name: "Relacionamentos", icon: <MessageSquare size={28} color="#be123c" />, color: "#FED9E8" };
    case 8:
      return { name: "Comportamentos", icon: <Coffee size={28} color="#c2410c" />, color: "#FFD9B0" };
    default:
      return { name: "Categoria", icon: <Brain size={28} color="#9381ff" />, color: "#D6CCFE" };
  }
};

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const categoryId = Array.isArray(id) ? id[0] : id;
  const numericId = Number(categoryId) || 1;
  const categoryDetails = getCategoryDetails(numericId);
  const modules = categoryModules[numericId] || [];

  const { completedModules, isLoading: isLoadingProgress } = useUnlock();


  return (
    <View className="flex-1 bg-background">
      {/* Header Content */}
      <LinearGradient
        colors={[`${categoryDetails.color}30`, 'transparent']}
        style={{ paddingTop: insets.top + 20, paddingBottom: 24, paddingHorizontal: 24 }}
      >
        <Pressable 
          onPress={() => router.back()}
          className="flex-row items-center gap-2 mb-6"
          hitSlop={15}
        >
          <ArrowLeft size={20} color="#71717A" />
          <Text className="text-[#71717A] font-medium">Voltar</Text>
        </Pressable>

        <View className="flex-row items-center gap-4">
          <View 
            className="w-16 h-16 rounded-[20px] items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${categoryDetails.color}40` }}
          >
            {categoryDetails.icon}
          </View>
          <View className="flex-1 justify-center">
            <Text className="text-2xl font-bold text-foreground mb-1">{categoryDetails.name}</Text>
            <Text className="text-muted-foreground text-sm font-medium">
              {modules.length} {modules.length === 1 ? 'módulo' : 'módulos'} disponíveis
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Modules List */}
      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {modules.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Text className="text-muted-foreground text-center">Nenhum módulo disponível ainda nesta categoria.</Text>
          </View>
        ) : (
          <View className="gap-4">
            {modules.map((module, index) => {
              const isCompleted = completedModules.includes(String(module.id));
              const exactSteps = CBT_EXPERT_DATA[module.id]?.steps?.length || 3;
              const estTime = exactSteps <= 3 ? "2 min" : "3 min";
              
              return (
                <MotiView
                  key={module.id}
                  from={{ opacity: 0, translateX: -20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ delay: 100 + index * 100, type: "spring", damping: 20 }}
                >
                  <Pressable
                    onPress={() => router.push(`/activities/${module.id}` as any)}
                    className="active:opacity-80"
                  >
                    <Card className={`border-0 shadow-sm p-5 rounded-3xl flex-row items-center gap-4 ${isCompleted ? 'bg-green-50 border-2 border-green-500/20' : 'bg-card'}`}>
                      <View 
                        className={`w-14 h-14 rounded-full items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-green-100' : 'bg-gray-50 border border-gray-100'}`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={24} color="#16a34a" />
                        ) : (
                          <Text className="text-2xl">{module.emoji || "📚"}</Text>
                        )}
                      </View>
                      
                      <View className="flex-1">
                        <Text className={`font-bold text-[15px] mb-1 leading-5 ${isCompleted ? 'text-green-800' : 'text-foreground'}`}>
                          {module.title}
                        </Text>
                        <View className="flex-row items-center gap-2">
                          {isCompleted ? (
                            <View className="flex-row items-center">
                              <Text className="text-xs font-bold text-green-600 uppercase tracking-wider">
                                Finalizado
                              </Text>
                            </View>
                          ) : (
                            <>
                              <PlayCircle size={14} color="#a1a1aa" />
                              <Text className="text-xs font-semibold text-muted-foreground">
                                {exactSteps} {exactSteps === 1 ? 'etapa' : 'etapas'} • ~{estTime}
                              </Text>
                            </>
                          )}
                        </View>
                      </View>
                    </Card>
                  </Pressable>
                </MotiView>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
