import { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { MotiView, AnimatePresence } from "moti";
import { X, CheckCircle2, ChevronRight } from "lucide-react-native";
import { supabase } from "../../lib/supabase";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CBT_EXPERT_DATA } from '../data/activitiesData';

export default function InteractiveActivity() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fallback caso não encontre
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
    if (selectedOptionIndex === null) return; // Força selecionar opção antes de continuar
    
    const selectedText = steps[currentStepIndex].options[selectedOptionIndex].text;
    setUserAnswers(prev => [...prev, selectedText]);
    
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setSelectedOptionIndex(null); // Reseta a seleção para o próximo passo
    } else {
      setIsFinished(true);
    }
  };

  const handleFinish = async () => {
    try {
      setIsSaving(true);
      
      const clinicalNotes = userAnswers.join(' | ');

      // Salva localmente via AsyncStorage (Fallback / Offline)
      try {
        const localProgressJson = await AsyncStorage.getItem('@completed_modules');
        const localProgress: string[] = localProgressJson ? JSON.parse(localProgressJson) : [];
        if (!localProgress.includes(id as string)) {
          localProgress.push(id as string);
          await AsyncStorage.setItem('@completed_modules', JSON.stringify(localProgress));
        }

        // Salva as respostas no local storage para a Luna ler depois
        const localAnswersJson = await AsyncStorage.getItem('@activity_responses');
        const localAnswers = localAnswersJson ? JSON.parse(localAnswersJson) : [];
        localAnswers.unshift({ module_title: title, responses: clinicalNotes, date: new Date().toISOString() });
        // Mantem apenas as ultimas 10
        await AsyncStorage.setItem('@activity_responses', JSON.stringify(localAnswers.slice(0, 10)));

      } catch (localErr) {
        console.log('Erro ao salvar no AsyncStorage:', localErr);
      }

      // Salva na nuvem via Supabase (se autenticado e online)
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Salva que completou
        await supabase.from('lesson_progress').upsert({
          user_id: session.user.id,
          category: 'ansiedade',
          module_id: id as string,
          completed_lessons: 1,
          status: 'completed',
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id, category, module_id' });

        // Salva as respostas exatas para a Luna ter contexto
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
      console.log('Erro ao salvar progresso no Supabase:', e);
    } finally {
      setIsSaving(false);
      router.back();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* Header */}
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

              {/* Botões de Múltipla Escolha */}
              <View className="gap-y-3">
                {steps[currentStepIndex].options?.map((option: any, index: number) => {
                  const isSelected = selectedOptionIndex === index;
                  const hasSelection = selectedOptionIndex !== null;

                  return (
                    <View key={index}>
                      <Pressable
                        onPress={() => setSelectedOptionIndex(index)}
                        className={`p-4 rounded-xl border-2 flex-row items-center justify-between transition-colors
                          ${isSelected 
                            ? 'bg-purple-50 border-[#8B5CF6]' 
                            : hasSelection 
                              ? 'bg-white border-slate-200 opacity-60 active:opacity-100' 
                              : 'bg-white border-slate-200 active:border-purple-300 active:bg-slate-50'
                          }`}
                      >
                        <Text className={`font-semibold flex-1 ${isSelected ? 'text-[#8B5CF6]' : 'text-slate-700'}`}>
                          {option.text}
                        </Text>
                        {isSelected && <CheckCircle2 size={20} color="#8B5CF6" />}
                      </Pressable>

                      {/* Feedback Condicional Animado */}
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
              <Text className="text-lg text-slate-600 text-center leading-7 px-4">
                {conclusion}
              </Text>
            </MotiView>
          )}
        </AnimatePresence>
      </ScrollView>

      {/* Footer / Botão de Ação */}
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
