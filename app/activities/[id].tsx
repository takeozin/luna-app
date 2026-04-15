import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, ScrollView, SafeAreaView, Dimensions, Animated, Easing, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { MotiView, AnimatePresence } from "moti";
import { X, CheckCircle2, ChevronRight } from "lucide-react-native";
import { supabase } from "../../lib/supabase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

import { CBT_EXPERT_DATA } from '../data/activitiesData';
import { useUnlock } from "../../lib/unlockContext";

// Custom Confetti Particle
const ConfettiParticle = ({ delay, color, initialX }: { delay: number, color: string, initialX: number }) => {
  const fall = useRef(new Animated.Value(-100)).current;
  const swing = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(fall, {
        toValue: Dimensions.get('window').height + 100,
        duration: Math.random() * 2000 + 3000,
        delay: delay,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(swing, {
          toValue: Math.random() * 30 + 15,
          duration: Math.random() * 800 + 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(swing, {
          toValue: -(Math.random() * 30 + 15),
          duration: Math.random() * 800 + 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: Math.random() * 200 + 300,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: initialX,
        width: Math.random() < 0.5 ? 8 : 12,
        height: Math.random() < 0.5 ? 12 : 8,
        backgroundColor: color,
        borderRadius: Math.random() < 0.5 ? 20 : 0,
        transform: [
          { translateY: fall },
          { translateX: swing },
          { rotateX: spin },
          { rotateY: spin }
        ],
      }}
    />
  );
};

export default function InteractiveActivity() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addXP, markModuleComplete } = useUnlock();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [particles] = useState(() => {
    const colors = ['#8B5CF6', '#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#EC4899', '#14B8A6'];
    const p = [];
    const screenWidth = Dimensions.get('window').width;
    for (let i = 0; i < 150; i++) {
      p.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2500,
        initialX: Math.random() * screenWidth
      });
    }
    return p;
  });

  const activity = CBT_EXPERT_DATA[id as string];

  if (!activity) {
    return (
      <SafeAreaView className="flex-1 bg-[#FAFAFA] items-center justify-center">
        <Text className="text-slate-800">Atividade não encontrada.</Text>
        <Pressable onPress={() => router.back()} className="mt-4 p-4 bg-slate-100 rounded-xl">
          <Text className="text-slate-800 font-medium">Voltar</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const { title, objective, steps, conclusion } = activity;
  const totalSteps = steps.length;
  const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const handleNext = () => {
    if (selectedOptionIndex === null) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const selectedText = steps[currentStepIndex].options[selectedOptionIndex].text;
    setUserAnswers(prev => [...prev, selectedText]);
    
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleFinish = async () => {
    try {
      setIsSaving(true);
      const clinicalNotes = userAnswers.join(' | ');

      // Marca módulo como concluído (salva local + Supabase automaticamente)
      await markModuleComplete(id as string);
      await addXP(100);

      // Salva respostas localmente para histórico
      try {
        const localAnswersJson = await AsyncStorage.getItem('@activity_responses');
        const localAnswers = localAnswersJson ? JSON.parse(localAnswersJson) : [];
        localAnswers.unshift({ module_title: title, responses: clinicalNotes, date: new Date().toISOString() });
        await AsyncStorage.setItem('@activity_responses', JSON.stringify(localAnswers.slice(0, 10)));
      } catch (localErr) {
        console.log('Erro ao salvar respostas no AsyncStorage:', localErr);
      }

      // Salva progresso detalhado e respostas no Supabase
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Detecta a categoria real do módulo pela faixa numérica (ex: 1xx = ansiedade, 2xx = autoconfianca)
        const moduleIdNum = parseInt(id as string, 10);
        const categoryMap: Record<number, string> = {
          1: 'ansiedade', 2: 'autoconfianca', 3: 'foco',
          4: 'falar_em_publico', 5: 'burnout', 6: 'sono',
          7: 'relacionamentos', 8: 'comportamentos',
        };
        const catIdx = Math.floor(moduleIdNum / 100);
        const category = categoryMap[catIdx] || 'geral';

        await supabase.from('lesson_progress').upsert({
          user_id: session.user.id,
          category: category,
          module_id: id as string,
          completed_lessons: 1,
          status: 'completed',
          last_activity: new Date().toISOString(),
        }, { onConflict: 'user_id, category, module_id' });

        if (clinicalNotes.length > 0) {
          await supabase.from('activity_responses').insert({
            user_id: session.user.id,
            module_id: id as string,
            module_title: title,
            responses: clinicalNotes,
          });
        }
      }
    } catch (e) {
      console.log(`[UnlockContext] Erro ao sincronizar módulo [${id}]:`, e);
    } finally {
      setIsSaving(false);
      router.back();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {isFinished && (
        <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}>
          {particles.map(p => (
            <ConfettiParticle key={p.id} delay={p.delay} color={p.color} initialX={p.initialX} />
          ))}
        </View>
      )}

      <View className="px-6 py-4 flex-row items-center justify-between">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2 rounded-full active:bg-slate-100">
          <X size={24} color="#64748b" />
        </Pressable>
        <Text className="text-slate-800 font-bold text-base flex-1 text-center mr-8">
          {title}
        </Text>
      </View>

      <View className="px-6 mb-4 mt-2">
        <View className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <MotiView 
            className="h-full bg-[#8B5CF6] rounded-full"
            animate={{ width: `${isFinished ? 100 : progressPercentage}%` }}
            transition={{ type: "timing", duration: 400 }}
          />
        </View>
        <Text className="text-center text-xs font-semibold text-slate-500 mt-2 uppercase tracking-widest">
          {isFinished ? "Conclusão" : `Passo ${currentStepIndex + 1} de ${totalSteps}`}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 100 }}>
        <AnimatePresence exitBeforeEnter={true}>
          {!isFinished ? (
            <MotiView
              key={`step-${currentStepIndex}`}
              from={{ opacity: 0, translateX: 15 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: -15 }}
              transition={{ type: "timing", duration: 300 }}
              className="flex-1 mt-6"
            >
              {currentStepIndex === 0 && (
                <View className="mb-6 bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <Text className="text-[#8B5CF6] font-bold text-[10px] uppercase tracking-widest mb-2">Objetivo Clínico CBT/DBT</Text>
                  <Text className="text-slate-700 font-medium text-sm leading-5">{objective}</Text>
                </View>
              )}

              <Text className="text-2xl font-bold text-slate-800 leading-9 mb-8">
                "{steps[currentStepIndex].text}"
              </Text>

              <View className="gap-y-3">
                {steps[currentStepIndex].options?.map((option: any, index: number) => {
                  const isSelected = selectedOptionIndex === index;
                  const hasSelection = selectedOptionIndex !== null;

                  return (
                    <View key={index}>
                      <Pressable
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                          setSelectedOptionIndex(index);
                        }}
                        className={`p-4 rounded-xl border-2 flex-row items-center justify-between transition-colors
                          ${isSelected 
                            ? 'bg-purple-50 border-[#8B5CF6]' 
                            : hasSelection 
                              ? 'bg-card border-slate-200 opacity-60 active:opacity-100' 
                              : 'bg-card border-slate-200 active:border-purple-300 active:bg-slate-50'
                          }`}
                      >
                        <Text className={`font-semibold flex-1 ${isSelected ? 'text-[#8B5CF6]' : 'text-slate-700'}`}>
                          {option.text}
                        </Text>
                        {isSelected && <CheckCircle2 size={20} color="#8B5CF6" />}
                      </Pressable>

                      <AnimatePresence>
                        {isSelected && option.feedback && (
                          <MotiView
                            from={{ opacity: 0, height: 0, translateY: -10 }}
                            animate={{ opacity: 1, height: 'auto', translateY: 0 }}
                            transition={{ type: "timing", duration: 300 }}
                            className="mt-3 p-4 bg-[#F8FAFC] border-l-4 border-[#8B5CF6] rounded-r-xl"
                          >
                            <Text className="text-slate-600 font-medium leading-6">
                              <Text className="font-bold text-slate-700">Resposta da Luna:</Text> {option.feedback}
                            </Text>
                          </MotiView>
                        )}
                      </AnimatePresence>
                    </View>
                  );
                })}
              </View>
            </MotiView>
          ) : (
            <MotiView
              key="conclusion"
              from={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "timing", duration: 400 }}
              className="flex-1 items-center justify-center -mt-10"
            >
              <View className="w-24 h-24 rounded-full items-center justify-center mb-8 bg-[#DCFCE7]">
                <CheckCircle2 size={48} color="#16a34a" />
              </View>
              <Text className="text-3xl font-bold text-slate-800 text-center mb-4">Sessão Concluída</Text>
              <Text className="text-lg text-slate-600 text-center leading-7 px-4 mb-4">
                {conclusion}
              </Text>

              <MotiView 
                from={{ opacity: 0, translateY: 10, scale: 0.9 }}
                animate={{ opacity: 1, translateY: 0, scale: 1 }}
                transition={{ delay: 500, type: "spring" }}
                className="bg-purple-100 px-4 py-2 rounded-full border border-purple-200 mt-2"
              >
                <Text className="text-sm font-bold text-purple-700">+100 XP Adquiridos!</Text>
              </MotiView>
            </MotiView>
          )}
        </AnimatePresence>
      </ScrollView>

      <View style={{ paddingBottom: 34, backgroundColor: '#FAFAFA' }}>
        {!isFinished ? (
          <Pressable 
            onPress={handleNext}
            disabled={selectedOptionIndex === null}
            className={`rounded-2xl p-5 flex-row items-center justify-center mx-6 mb-6 shadow-sm transition-all
              ${selectedOptionIndex !== null ? 'bg-[#8B5CF6] active:opacity-80' : 'bg-slate-200'}`}
          >
            <Text className={`text-lg font-bold flex-1 text-center ml-6 ${selectedOptionIndex !== null ? 'text-white' : 'text-slate-400'}`}>
              {selectedOptionIndex !== null ? 'Continuar' : 'Escolha uma opção'}
            </Text>
            {selectedOptionIndex !== null && <ChevronRight size={24} color="white" />}
          </Pressable>
        ) : (
          <Pressable 
            onPress={handleFinish}
            disabled={isSaving}
            className={`rounded-2xl p-5 flex-row items-center justify-center mx-6 mb-6 transition-all
              ${isSaving ? 'bg-slate-300' : 'bg-[#16a34a] active:opacity-80'}`}
          >
            <Text className="text-white text-lg font-bold flex-1 text-center">
              {isSaving ? 'Salvando progresso...' : 'Retornar ao Plano'}
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
