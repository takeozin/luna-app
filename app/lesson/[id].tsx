import { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { MotiView, AnimatePresence } from "moti";
import { ArrowLeft, CheckCircle2, Play, Pause, Sparkles } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Diminished mock data for lessons to keep file size reasonable
const fallbackLesson = {
  id: "fallback",
  title: "Aula Genérica",
  duration: "5 min",
  type: "text",
  emoji: "📚",
  completed: false,
  content: [
    {
      type: "intro",
      title: "Bem-vindo à Aula",
      text: "Esta é uma aula genérica gerada para demonstração no aplicativo móvel.",
    },
    {
      type: "info",
      icon: "💡",
      title: "Informações Importantes",
      items: [
        "Aprenda com calma",
        "Pratique o que foi ensinado",
        "Seja consistente",
      ],
    },
    {
      type: "practice",
      title: "Reflexão",
      fields: [
        { label: "O que você aprendeu?", type: "textarea", placeholder: "Escreva aqui..." }
      ]
    }
  ]
};

const mockLessons: Record<string, any> = {
  "1": {
    id: 1,
    title: "Introdução ao Sono Reparador",
    duration: "5 min",
    type: "video",
    emoji: "🌙",
    completed: true,
    content: [
      {
        type: "intro",
        title: "Por que o sono é importante?",
        text: "O sono não é um luxo, é uma necessidade biológica fundamental. Durante o sono, seu corpo e mente se recuperam, consolidam memórias e regulam hormônios essenciais.",
      },
      {
        type: "info",
        icon: "🧠",
        title: "Benefícios do Sono de Qualidade",
        items: [
          "Melhora a concentração e memória",
          "Fortalece o sistema imunológico",
          "Regula o humor e reduz ansiedade",
        ],
      },
      {
        type: "callout",
        text: "A qualidade do seu sono afeta diretamente sua saúde mental, produtividade e qualidade de vida.",
        color: "#B8E0D2",
      },
      {
        type: "question",
        question: "Quantas horas você tem dormido por noite?",
        options: ["Menos de 5h", "5-6h", "7-8h", "Mais de 8h"],
      },
    ],
  },
  "5": {
    id: 5,
    title: "Exercícios de Relaxamento",
    duration: "12 min",
    type: "video",
    emoji: "🧘",
    completed: false,
    content: [
      {
        type: "intro",
        title: "Relaxamento Muscular Progressivo",
        text: "Esta técnica ajuda a liberar tensão física acumulada durante o dia, preparando seu corpo para o descanso.",
      },
      {
        type: "interactive",
        title: "Siga as Instruções",
        description: "Vamos fazer juntos agora. Deite-se confortavelmente.",
        steps: [
          { instruction: "Feche os olhos e respire profundamente 3 vezes", duration: 5 },
          { instruction: "Contraia os músculos dos pés por 5 segundos", duration: 5 },
          { instruction: "Relaxe completamente e sinta a diferença", duration: 5 },
        ],
      },
    ],
  },
  "13": {
    id: 13,
    title: "Autocompaixão",
    duration: "10 min",
    type: "audio",
    emoji: "💚",
    completed: false,
    content: [
      {
        type: "intro",
        title: "Tratando-se Como Trataria um Amigo",
        text: "Autocompaixão é reconhecer que você é humano, que erros fazem parte da vida, e que você merece gentileza - especialmente de si mesmo.",
      },
      {
        type: "audio-player",
        title: "Meditação de Autocompaixão - 10 minutos",
        description: "Encontre um lugar tranquilo. Esta meditação vai guiá-lo em práticas de gentileza consigo mesmo.",
        audioSrc: null,
      },
      {
        type: "practice",
        title: "Carta de Autocompaixão",
        description: "Escreva uma carta para si mesmo como se estivesse consolando um amigo querido:",
        fields: [
          { label: "Sobre qual situação difícil você quer ser gentil consigo?", type: "textarea" },
          { label: "Escreva sua carta de autocompaixão:", type: "textarea", placeholder: "Querido(a) [seu nome]..." },
        ],
      },
    ],
  }
};

export default function Lesson() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Interactive exercise states
  const [exerciseStep, setExerciseStep] = useState(0);
  const [exerciseStarted, setExerciseStarted] = useState(false);

  const lessonStr = Array.isArray(id) ? id[0] : id;
  const lesson = mockLessons[lessonStr || "1"] || Object.assign({}, fallbackLesson, { id: lessonStr, title: `Aula ${lessonStr}` });

  const currentContent = lesson.content[currentSection] || lesson.content[0];
  const progress = ((currentSection + 1) / lesson.content.length) * 100;
  const isLastSection = currentSection === lesson.content.length - 1;

  const handleNext = () => {
    if (isLastSection) {
      router.back();
    } else {
      setCurrentSection(currentSection + 1);
    }
  };

  const handleFieldChange = (fieldLabel: string, value: any) => {
    setAnswers({ ...answers, [fieldLabel]: value });
  };

  const canProceed = () => {
    if (currentContent.type === "practice" && currentContent.fields) {
      return currentContent.fields.every((field: any) => {
        const val = answers[field.label];
        return val !== undefined && val.toString().trim() !== "";
      });
    }
    return true;
  };

  const startInteractiveExercise = () => {
    if (!currentContent.steps) return;
    setExerciseStarted(true);
    setExerciseStep(0);
    runExerciseSteps(currentContent.steps);
  };

  const runExerciseSteps = (steps: any[]) => {
    let currentStepIndex = 0;
    
    const stepRunner = () => {
      if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        setExerciseStep(currentStepIndex);
        setTimeout(stepRunner, (steps[currentStepIndex].duration || 3) * 1000);
      } else {
        setTimeout(() => {
          setExerciseStarted(false);
          setExerciseStep(0);
        }, 2000);
      }
    };
    
    setTimeout(stepRunner, (steps[0].duration || 3) * 1000);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View 
        style={{ paddingTop: insets.top + 16, paddingBottom: 16, paddingHorizontal: 24 }}
        className="bg-[#B8E0D2]/10"
      >
        <View className="flex-row items-center justify-between mb-6">
          <Pressable 
            onPress={() => router.back()}
            className="flex-row items-center gap-2"
            hitSlop={15}
          >
            <ArrowLeft size={20} color="#71717A" />
            <Text className="text-[#71717A] font-medium">Voltar</Text>
          </Pressable>
          {lesson.completed && (
            <View className="flex-row items-center gap-1.5 bg-[#B8E0D2]/20 px-3 py-1.5 rounded-full">
              <CheckCircle2 size={16} color="#059669" />
              <Text className="text-xs font-semibold text-[#059669]">Concluído</Text>
            </View>
          )}
        </View>

        {/* Progress Bar */}
        <View className="w-full bg-[#F0F0F0] rounded-full h-1.5 mb-5 overflow-hidden">
          <MotiView
            className="bg-[#B8E0D2] h-full"
            from={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "timing", duration: 400 }}
          />
        </View>

        <View className="flex-row items-start gap-4">
          <Text className="text-4xl">{lesson.emoji}</Text>
          <View className="flex-1 justify-center">
            <Text className="text-2xl font-bold text-foreground mb-1 leading-8">{lesson.title}</Text>
            <Text className="text-sm font-medium text-muted-foreground">{lesson.duration}</Text>
          </View>
        </View>
      </View>

      {/* Content Area */}
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        {currentContent.type === "intro" && (
          <MotiView from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} key={`intro-${currentSection}`}>
            <Card className="border-0 shadow-sm bg-gray-50/50 p-6">
              <Text className="text-xl font-bold mb-3">{currentContent.title}</Text>
              <Text className="text-base text-muted-foreground leading-6">{currentContent.text}</Text>
            </Card>
          </MotiView>
        )}

        {currentContent.type === "info" && (
          <MotiView from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} key={`info-${currentSection}`}>
            <Card className="border-0 shadow-sm">
              <View className="flex-row items-center gap-3 mb-5">
                <Text className="text-3xl">{currentContent.icon}</Text>
                <Text className="text-xl font-bold flex-1">{currentContent.title}</Text>
              </View>
              <View className="gap-4">
                {currentContent.items?.map((item: string, index: number) => (
                  <MotiView
                    key={index}
                    from={{ opacity: 0, translateX: -10 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ delay: index * 100 }}
                    className="flex-row items-start gap-3"
                  >
                    <View className="w-6 h-6 rounded-full bg-[#B8E0D2]/30 items-center justify-center mt-0.5">
                      <Text className="text-[#059669] text-xs font-bold">{index + 1}</Text>
                    </View>
                    <Text className="text-base text-muted-foreground flex-1 leading-6">{item}</Text>
                  </MotiView>
                ))}
              </View>
            </Card>
          </MotiView>
        )}

        {currentContent.type === "callout" && (
          <MotiView from={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={`callout-${currentSection}`}>
            <Card
              className="border-2 p-5"
              style={{
                backgroundColor: `${currentContent.color}10`,
                borderColor: currentContent.color,
              }}
            >
              <View className="flex-row items-start gap-4">
                <Sparkles size={24} color={currentContent.color} className="mt-1" />
                <Text className="text-base font-medium leading-6 flex-1 text-foreground">
                  {currentContent.text}
                </Text>
              </View>
            </Card>
          </MotiView>
        )}

        {currentContent.type === "question" && (
          <MotiView from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} key={`question-${currentSection}`}>
            <Card className="border-0 shadow-sm p-6">
              <Text className="text-lg font-bold mb-5">{currentContent.question}</Text>
              <View className="gap-3">
                {currentContent.options?.map((option: string, index: number) => {
                  const isSelected = answers["question"] === option;
                  return (
                    <Pressable
                      key={index}
                      onPress={() => handleFieldChange("question", option)}
                      className={`w-full p-4 rounded-2xl border-2 transition-colors ${
                        isSelected
                          ? "border-[#B8E0D2] bg-[#B8E0D2]/10"
                          : "border-gray-100 bg-white"
                      }`}
                    >
                      <Text className={`font-medium ${isSelected ? 'text-[#059669]' : 'text-muted-foreground'}`}>{option}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </Card>
          </MotiView>
        )}

        {currentContent.type === "practice" && (
          <MotiView from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} key={`practice-${currentSection}`}>
            <View className="gap-4">
              {currentContent.title && (
                <Card className="border-0 shadow-sm p-6 bg-[#A9C9FF]/10">
                  <Text className="text-xl font-bold mb-2">{currentContent.title}</Text>
                  {currentContent.description && (
                    <Text className="text-sm text-foreground/80">{currentContent.description}</Text>
                  )}
                </Card>
              )}

              <Card className="border-0 shadow-sm p-6">
                <View className="gap-5">
                  {currentContent.fields?.map((field: any, index: number) => (
                    <View key={index}>
                      <Text className="mb-2 text-sm font-semibold">{field.label}</Text>
                      {field.type === "textarea" ? (
                        <TextInput
                          value={answers[field.label] || ""}
                          onChangeText={(val) => handleFieldChange(field.label, val)}
                          placeholder={field.placeholder}
                          multiline
                          numberOfLines={4}
                          textAlignVertical="top"
                          className="w-full p-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-[#B8E0D2] focus:bg-white text-base"
                        />
                      ) : (
                        <TextInput
                          value={answers[field.label] || ""}
                          onChangeText={(val) => handleFieldChange(field.label, val)}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-[#B8E0D2] focus:bg-white text-base"
                        />
                      )}
                    </View>
                  ))}
                </View>
              </Card>
            </View>
          </MotiView>
        )}

        {currentContent.type === "audio-player" && (
          <MotiView from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} key={`audio-${currentSection}`}>
            <Card className="border-0 shadow-sm p-6">
              <Text className="text-lg font-bold mb-2">{currentContent.title}</Text>
              <Text className="text-sm text-muted-foreground mb-6">{currentContent.description}</Text>

              <View className="bg-gradient-to-br from-[#A9C9FF]/20 to-[#D6CCFE]/20 rounded-3xl p-6 items-center">
                <Pressable
                  onPress={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 rounded-full bg-[#A9C9FF] items-center justify-center shadow-md mb-6 active:scale-95"
                  style={{ elevation: 4 }}
                >
                  {isPlaying ? <Pause size={32} color="white" /> : <Play size={32} color="white" className="ml-1" />}
                </Pressable>

                <View className="w-full bg-white/60 rounded-full h-2 mb-3">
                  <View className="bg-[#A9C9FF] h-2 rounded-full" style={{ width: `${audioProgress}%` }} />
                </View>
                <View className="w-full flex-row justify-between">
                  <Text className="text-xs text-muted-foreground font-medium">0:00</Text>
                  <Text className="text-xs text-muted-foreground font-medium">10:00</Text>
                </View>
              </View>

              <Text className="text-xs text-center text-muted-foreground mt-4">
                💡 Player de demonstração - Módulo Nativo
              </Text>
            </Card>
          </MotiView>
        )}

        {currentContent.type === "interactive" && (
          <MotiView from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} key={`interactive-${currentSection}`}>
            <Card className="border-0 shadow-sm p-6">
              <Text className="text-lg font-bold mb-2">{currentContent.title}</Text>
              <Text className="text-sm text-muted-foreground mb-6">{currentContent.description}</Text>

              {!exerciseStarted ? (
                <Button variant="primary" onPress={startInteractiveExercise}>
                  Começar Exercício
                </Button>
              ) : (
                <View className="rounded-3xl p-8 min-h-[250px] flex-col items-center justify-center bg-[#B8E0D2]/20">
                  <AnimatePresence mode="wait">
                    <MotiView
                      key={exerciseStep}
                      from={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 400 }}
                      className="items-center w-full"
                    >
                      <Text className="text-2xl font-bold text-center text-foreground mb-8 leading-9">
                        {currentContent.steps?.[exerciseStep]?.instruction}
                      </Text>
                      <View className="w-16 h-16 rounded-full bg-[#059669] items-center justify-center">
                        <Text className="text-white text-2xl font-bold">{exerciseStep + 1}</Text>
                      </View>
                    </MotiView>
                  </AnimatePresence>
                </View>
              )}
            </Card>
          </MotiView>
        )}

      </ScrollView>

      {/* Floating Bottom Bar Navigation */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 flex-row gap-3">
        {currentSection > 0 && (
          <Button
            variant="secondary"
            onPress={() => setCurrentSection(currentSection - 1)}
            className="flex-1"
          >
            Anterior
          </Button>
        )}
        <Button
          variant="primary"
          onPress={handleNext}
          className="flex-1"
          style={!canProceed() ? { opacity: 0.5 } : {}}
        >
          {isLastSection ? "Concluir Aula" : "Próximo"}
        </Button>
      </View>
    </View>
  );
}
