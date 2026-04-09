import { useState, useCallback } from "react";
import { View, Text, Pressable, ScrollView, Dimensions, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { MotiView } from "moti";
import { CheckCircle2, Lock, Brain, Wind, Search, Cloud, Star, ShieldAlert, BookOpen } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUnlock } from "../../lib/unlockContext";
import { libraryCategories, categoryModules } from "../data/mockData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Path } from "react-native-svg";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const catKeys: Record<number, string> = { 
  1: 'ansiedade', 2: 'autoconfianca', 3: 'foco', 4: 'falar_em_publico', 
  5: 'burnout', 6: 'sono', 7: 'relacionamentos', 8: 'comportamentos' 
};

export default function MyPlan() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const { isLocked, riskLevel, unlockedCategories, lunaUnlocked, currentXP } = useUnlock();
  
  // Combine all unlocked items
  const allUnlocked = [...new Set([...unlockedCategories, ...lunaUnlocked])];

  // Refresh progress when screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchProgress = async () => {
        try {
          const localProgressJson = await AsyncStorage.getItem('@completed_modules');
          if (localProgressJson) {
            setCompletedIds(JSON.parse(localProgressJson));
          }
        } catch (e) {}
      };
      fetchProgress();
    }, [])
  );

  // Tela especial para "sem tratamento"
  if (riskLevel === 'none') {
    return (
      <View className="flex-1 bg-background">
        <LinearGradient
          colors={["rgba(169, 201, 255, 0.2)", "rgba(255, 255, 255, 0)"]}
          style={{ paddingTop: insets.top + 20, paddingBottom: 24, paddingHorizontal: 24 }}
        >
          <Text className="text-3xl font-semibold text-foreground mb-2">A Jornada</Text>
          <Text className="text-muted-foreground text-sm">Seu mapa de evolução pessoal</Text>
        </LinearGradient>

        <View className="flex-1 items-center justify-center px-8" style={{ marginTop: -60 }}>
          <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="items-center">
            <View className="w-20 h-20 rounded-full items-center justify-center mb-6" style={{ backgroundColor: 'rgba(22, 163, 74, 0.1)'}}>
               <CheckCircle2 size={36} color="#16a34a" />
            </View>
            <Text className="text-xl font-bold text-foreground text-center mb-3">Você está indo bem! 💚</Text>
            <Text className="text-base text-muted-foreground text-center leading-6">
              Sua avaliação indica que você está em ótima forma! Nenhuma jornada clínica obrigatória no momento.
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
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-3xl font-semibold text-foreground">A Jornada</Text>
          <View className="bg-purple-100 px-3 py-1.5 rounded-full border border-purple-200 flex-row items-center gap-1 shadow-sm">
            <Star size={14} color="#7E22CE" fill="#7E22CE" />
            <Text className="text-sm font-bold text-purple-800">{currentXP} XP</Text>
          </View>
        </View>
        <Text className="text-muted-foreground text-sm">
          Seu caminho para o autoconhecimento
        </Text>
      </LinearGradient>

      {/* Content */}
      <View className="flex-1">
        <ScrollView contentContainerStyle={{ paddingVertical: 20, alignItems: 'center' }}>
          
          {libraryCategories.map((cat, catIndex) => {
            const catKey = catKeys[cat.id as keyof typeof catKeys];
            const modules = categoryModules[cat.id as keyof typeof categoryModules] || [];
            
            // Check if user has completed ANY module in this category before
            const hasCompletedAnyInCat = modules.some(m => completedIds.includes(m.id.toString()));
            
            // ALWAYS unlock the first chapter by default, or if they have past progress, or if Luna authorized it
            const isCatUnlocked = catIndex === 0 || hasCompletedAnyInCat || allUnlocked.includes(catKey);
            
            let firstLockedFound = false;

            return (
              <View key={cat.id} className="w-full items-center mb-10 px-4">
                
                {/* Chapter Banner */}
                <View 
                  className={`w-full p-5 rounded-3xl mb-8 flex-row items-center border-b-4`}
                  style={{ 
                    backgroundColor: isCatUnlocked ? cat.color : '#E2E8F0',
                    borderColor: isCatUnlocked ? 'rgba(0,0,0,0.1)' : '#CBD5E1'
                  }}
                >
                  <View className="w-12 h-12 bg-white/40 rounded-full items-center justify-center mr-4">
                    <Text className="text-2xl">{cat.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-slate-800">
                      Capítulo {catIndex + 1}
                    </Text>
                    <Text className="text-base font-semibold text-slate-700">
                      {cat.name}
                    </Text>
                    {!isCatUnlocked && (
                      <Text className="text-xs text-slate-500 mt-1 font-medium italic">
                        Bloqueado. Converse com a Luna para acessar.
                      </Text>
                    )}
                  </View>
                </View>

                {/* Trail Nodes */}
                {modules.map((node, index) => {
                  const trailOffsets = [-45, 0, 45, 0];
                  const offset = trailOffsets[index % trailOffsets.length];
                  const nextOffset = trailOffsets[(index + 1) % trailOffsets.length];
                  const isLast = index === modules.length - 1;

                  const isCompleted = completedIds.includes(node.id.toString());
                  let status: 'completed' | 'current' | 'locked';
                  
                  if (!isCatUnlocked) {
                    status = 'locked';
                  } else if (isCompleted) {
                    status = 'completed';
                  } else if (!firstLockedFound) {
                    status = 'current';
                    firstLockedFound = true;
                  } else {
                    status = 'locked';
                  }

                  const handlePress = () => {
                    if (status === 'locked') {
                      Alert.alert("Capítulo Bloqueado", isCatUnlocked 
                        ? "Você precisa completar a etapa anterior primeiro!" 
                        : "Converse com a Luna e demonstre necessidade desse tema para desbloqueá-lo.");
                    } else {
                      router.push(`/activities/${node.id}?title=${encodeURIComponent(node.title)}` as any);
                    }
                  };

                  return (
                    <View key={node.id} className="w-full relative" style={{ height: 160, alignItems: 'center' }}>
                      
                      {/* SVGCurved Line to Next Node */}
                      {!isLast && (
                        <View style={{ position: 'absolute', top: 40, left: '50%', marginLeft: -100, width: 200, height: 160, zIndex: 0, elevation: 0 }}>
                          <Svg height="160" width="200">
                            {/* Outer stroke */}
                            <Path 
                              d={`M ${100 + offset} 20 C ${100 + offset} 70, ${100 + nextOffset} 90, ${100 + nextOffset} 140`}
                              stroke={status === 'completed' ? cat.color : '#E2E8F0'}
                              strokeWidth="16"
                              fill="none"
                              strokeLinecap="round"
                            />
                            {/* Inner highlight stroke */}
                            <Path 
                              d={`M ${100 + offset} 20 C ${100 + offset} 70, ${100 + nextOffset} 90, ${100 + nextOffset} 140`}
                              stroke={status === 'completed' ? 'rgba(255,255,255,0.4)' : '#CBD5E1'}
                              strokeWidth="6"
                              fill="none"
                              strokeLinecap="round"
                            />
                          </Svg>
                        </View>
                      )}

                      <MotiView
                        from={{ opacity: 0, scale: 0.8, translateX: offset }}
                        animate={{ opacity: 1, scale: 1, translateX: offset }}
                        transition={{ type: "spring", delay: index * 100 }}
                        style={{ alignItems: 'center', zIndex: 10, elevation: 5 }}
                      >
                        <Pressable 
                          onPress={handlePress}
                          className={`w-20 h-20 rounded-full border-[6px] items-center justify-center shadow-sm`}
                          style={{ 
                            backgroundColor: status === 'locked' ? '#E2E8F0' : cat.color,
                            borderColor: status === 'locked' ? '#CBD5E1' : 'white',
                            opacity: 1,
                            elevation: status === 'current' ? 10 : 2,
                            shadowColor: status === 'current' ? cat.color : '#000',
                            shadowOffset: { width: 0, height: status === 'current' ? 6 : 2 },
                            shadowOpacity: status === 'current' ? 0.4 : 0.05,
                          }}
                        >
                          {status === 'locked' ? <Lock size={24} color="#94A3B8" /> : 
                           status === 'completed' ? <Star size={28} color="white" fill="white" /> : 
                           <BookOpen size={28} color="white" />}
                        </Pressable>
                        
                        {/* Node Label */}
                        <View className="mt-2 text-center w-36 bg-white/90 px-3 py-2 rounded-xl shadow-sm border border-slate-100 items-center justify-center">
                           <Text 
                            numberOfLines={2} 
                            className={`text-xs text-center font-bold leading-tight ${status === 'locked' ? 'text-slate-400' : 'text-slate-700'}`}
                           >
                            {node.title}
                           </Text>
                        </View>
                      </MotiView>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
