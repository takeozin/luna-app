import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { MotiView } from "moti";
import { ArrowLeft, Video, FileText, Headphones, CheckCircle2, Circle } from "lucide-react-native";
import { modules, categoryModules } from "../data/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";

const exercises = [
  { id: 1, type: "video", title: "Introdução ao Sono Reparador", duration: "5 min", completed: true },
  { id: 2, type: "text", title: "Diário do Sono", duration: "10 min", completed: true },
  { id: 3, type: "audio", title: "Meditação para Dormir", duration: "15 min", completed: true },
  { id: 4, type: "text", title: "Criando Rotina Noturna", duration: "8 min", completed: false },
  { id: 5, type: "video", title: "Exercícios de Relaxamento", duration: "12 min", completed: false },
  { id: 6, type: "text", title: "Higiene do Ambiente", duration: "6 min", completed: false },
  { id: 7, type: "practice", title: "Reflexão Semanal", duration: "10 min", completed: false },
];

const exercisesModule2 = [
  { id: 8, type: "video", title: "O que é o Crítico Interno?", duration: "6 min", completed: true },
  { id: 9, type: "text", title: "Identificando Pensamentos Automáticos", duration: "8 min", completed: true },
  { id: 10, type: "text", title: "Distorções Cognitivas Comuns", duration: "10 min", completed: true },
  { id: 11, type: "text", title: "Questionando Evidências", duration: "12 min", completed: false },
  { id: 12, type: "practice", title: "Reestruturação Cognitiva", duration: "15 min", completed: false },
  { id: 13, type: "audio", title: "Autocompaixão", duration: "10 min", completed: false },
  { id: 14, type: "practice", title: "Reflexão e Consolidação", duration: "12 min", completed: false },
];

const exercisesModule3 = [
  { id: 15, type: "video", title: "O que é Mindfulness?", duration: "7 min", completed: true },
  { id: 16, type: "audio", title: "Respiração Consciente", duration: "10 min", completed: true },
  { id: 17, type: "audio", title: "Body Scan (Varredura Corporal)", duration: "15 min", completed: true },
  { id: 18, type: "text", title: "Mindfulness no Dia a Dia", duration: "8 min", completed: false },
  { id: 19, type: "text", title: "Observando Pensamentos sem Julgar", duration: "12 min", completed: false },
  { id: 20, type: "practice", title: "Mindful Eating (Alimentação Consciente)", duration: "10 min", completed: false },
  { id: 21, type: "practice", title: "Reflexão e Prática Contínua", duration: "10 min", completed: false },
];

// Módulos da categoria Ansiedade (101-108)
const exercisesModule101 = [
  { id: 22, type: "video", title: "O que é Ansiedade?", duration: "5 min", completed: true },
  { id: 23, type: "text", title: "O Ciclo da Ansiedade", duration: "4 min", completed: true },
  { id: 24, type: "text", title: "O Sistema Nervoso e a Ansiedade", duration: "4 min", completed: false },
  { id: 25, type: "text", title: "Tipos de Ansiedade", duration: "4 min", completed: false },
  { id: 26, type: "practice", title: "Reflexão: Minha Ansiedade", duration: "3 min", completed: false },
];

const exercisesModule102 = [
  { id: 27, type: "video", title: "Por Que Respiração Funciona?", duration: "3 min", completed: true },
  { id: 28, type: "audio", title: "Respiração Diafragmática", duration: "3 min", completed: true },
  { id: 29, type: "audio", title: "Respiração 4-7-8", duration: "2 min", completed: false },
  { id: 30, type: "audio", title: "Box Breathing (Respiração Quadrada)", duration: "2 min", completed: false },
  { id: 31, type: "audio", title: "Respiração Alternada (Nadi Shodhana)", duration: "3 min", completed: false },
  { id: 32, type: "practice", title: "Plano de Prática Respiratória", duration: "2 min", completed: false },
];

const getExerciseIcon = (type: string, size = 20) => {
  switch (type) {
    case "video":
      return <Video size={size} color="#A9C9FF" />;
    case "text":
      return <FileText size={size} color="#B8E0D2" />;
    case "audio":
      return <Headphones size={size} color="#D6CCFE" />;
    default:
      return <FileText size={size} color="#FFD9B0" />;
  }
};

export default function ModuleDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const numericId = Number(id);

  let moduleData: any = null;
  let isFromLibrary = false;

  // Check plan modules first (IDs 1-8 from plan.tsx / mockData.modules)
  moduleData = modules.find(m => m.id === numericId);
  
  if (!moduleData) {
    // Check library modules (IDs 101+)
    Object.values(categoryModules).forEach((categoryMods) => {
      const found = categoryMods.find(m => m.id === numericId);
      if (found) {
        moduleData = found;
        isFromLibrary = true;
      }
    });
  }

  if (!moduleData) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-muted-foreground">Módulo não encontrado</Text>
        <Button className="mt-4" onPress={() => router.back()}>Voltar</Button>
      </View>
    );
  }

  // Select correct exercises based on module ID
  let generatedExercises: any[] = [];
  if (isFromLibrary) {
    const lessonCount = moduleData.lessons || 5;
    generatedExercises = Array.from({ length: lessonCount }, (_, i) => ({
      id: i + 1,
      type: i % 3 === 0 ? "video" : i % 3 === 1 ? "text" : "audio",
      title: `Aula ${i + 1}`,
      duration: moduleData.duration || "10 min",
      completed: i < 2,
    }));
  } else if (numericId === 1) {
    generatedExercises = exercises;
  } else if (numericId === 2) {
    generatedExercises = exercisesModule2;
  } else if (numericId === 3) {
    generatedExercises = exercisesModule3;
  } else if (numericId === 101) {
    generatedExercises = exercisesModule101;
  } else if (numericId === 102) {
    generatedExercises = exercisesModule102;
  } else {
    generatedExercises = exercises;
  }

  const completedLessons = generatedExercises.filter(e => e.completed).length;
  const nextLesson = generatedExercises.find(e => !e.completed);
  
  const moduleColor = moduleData.color || '#B8E0D2';
  
  // Calculate RGB values to make gradient correctly
  // Simple heuristic mapping since we know the colors
  const gradientColorMap: Record<string, string> = {
    '#B8E0D2': 'rgba(184, 224, 210, 0.4)',
    '#D6CCFE': 'rgba(214, 204, 254, 0.4)',
    '#A9C9FF': 'rgba(169, 201, 255, 0.4)',
    '#FFD9B0': 'rgba(255, 217, 176, 0.4)',
    '#FED9E8': 'rgba(254, 217, 232, 0.4)'
  };
  const gradientStart = gradientColorMap[moduleColor] || 'rgba(184, 224, 210, 0.4)';

  return (
    <View className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header Content */}
        <LinearGradient
          colors={[gradientStart, 'rgba(255, 255, 255, 0)']}
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

          <View className="flex-row items-start gap-4 mb-5">
            <View 
              className="w-16 h-16 rounded-2xl items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${moduleColor}30` }}
            >
              <Text className="text-3xl">{moduleData.emoji || '🌙'}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-bold text-foreground mb-2">{moduleData.title}</Text>
              <Text className="text-muted-foreground text-sm mb-2 leading-5">
                {moduleData.description}
              </Text>
              <Text className="text-sm text-muted-foreground font-medium">
                {completedLessons} de {generatedExercises.length} aulas completas
              </Text>
            </View>
          </View>

          {/* Progress Bar overall */}
          <View className="bg-[#F0F0F0] rounded-full h-2 w-full overflow-hidden mt-2">
            <MotiView
              from={{ width: '0%' }}
              animate={{ width: `${(completedLessons / generatedExercises.length) * 100}%` }}
              transition={{ type: 'spring', damping: 20 }}
              style={{ height: '100%', backgroundColor: moduleColor, borderRadius: 9999 }}
            />
          </View>
        </LinearGradient>

        <View className="px-6 pb-6">
          {/* Next Exercise */}
          {nextLesson && (
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 100 }}
              className="mb-8"
            >
              <Card className="border-0 shadow-sm" style={{ backgroundColor: '#F8FAFC' }}>
                <Text className="text-sm text-muted-foreground mb-2 font-medium">Próxima aula</Text>
                <Text className="text-lg font-bold text-foreground mb-4">{nextLesson.title}</Text>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    {getExerciseIcon(nextLesson.type)}
                    <Text className="text-sm text-muted-foreground">{nextLesson.duration}</Text>
                  </View>
                  <Pressable 
                    className="bg-[#A9C9FF] px-5 py-2.5 rounded-full"
                    onPress={() => router.push(`/lesson/${nextLesson.id}`)}
                  >
                    <Text className="text-white font-semibold">Começar agora</Text>
                  </Pressable>
                </View>
              </Card>
            </MotiView>
          )}

          {/* All Exercises */}
          <Text className="text-xl font-bold text-foreground mb-4">Todas as Aulas</Text>
          <View className="gap-3">
            {generatedExercises.map((exercise, index) => (
              <MotiView
                key={exercise.id}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 200 + index * 50 }}
              >
                <Pressable
                  onPress={() => !exercise.completed && router.push(`/lesson/${exercise.id}`)}
                >
                  <Card className={`border-0 shadow-sm flex-row items-center gap-4 py-4 px-4 ${exercise.completed ? 'opacity-70' : ''}`}>
                    {exercise.completed ? (
                      <CheckCircle2 size={24} color={moduleColor} className="flex-shrink-0" />
                    ) : (
                      <Circle size={24} color="#D4D4D8" className="flex-shrink-0" />
                    )}
                    
                    <View className="flex-1">
                      <View className="flex-row items-center gap-2 mb-1">
                        {getExerciseIcon(exercise.type, 16)}
                        <Text 
                          className={`font-semibold text-foreground flex-1 ${exercise.completed ? "line-through text-muted-foreground" : ""}`}
                          numberOfLines={1}
                        >
                          {exercise.title}
                        </Text>
                      </View>
                      <Text className="text-xs text-muted-foreground">{exercise.duration}</Text>
                    </View>

                    {!exercise.completed && (
                      <Text className="text-sm font-semibold" style={{ color: '#A9C9FF' }}>
                        Iniciar →
                      </Text>
                    )}
                  </Card>
                </Pressable>
              </MotiView>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
