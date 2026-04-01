import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { MotiView } from "moti";
import { Moon, Brain, Smile, Target, BriefcaseIcon } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Question {
  id: number;
  question: string;
  icon: React.ReactNode;
  type: "yes_no";
}

const questions: Question[] = [
  { id: 1, question: "Você tem dores de cabeça frequentes?", icon: <Target size={32} color="#A9C9FF" />, type: "yes_no" },
  { id: 2, question: "Tem falta de apetite?", icon: <Target size={32} color="#A9C9FF" />, type: "yes_no" },
  { id: 3, question: "Dorme mal?", icon: <Moon size={32} color="#B8E0D2" />, type: "yes_no" },
  { id: 4, question: "Assusta-se com facilidade?", icon: <Target size={32} color="#FFD9B0" />, type: "yes_no" },
  { id: 5, question: "Sente tremores nas mãos?", icon: <Target size={32} color="#A9C9FF" />, type: "yes_no" },
  { id: 6, question: "Sente-se nervoso(a), tenso(a) ou preocupado(a)?", icon: <Brain size={32} color="#D6CCFE" />, type: "yes_no" },
  { id: 7, question: "Tem má digestão?", icon: <Target size={32} color="#A9C9FF" />, type: "yes_no" },
  { id: 8, question: "Tem dificuldade de pensar com clareza?", icon: <Brain size={32} color="#D6CCFE" />, type: "yes_no" },
  { id: 9, question: "Tem se sentido triste ultimamente?", icon: <Smile size={32} color="#FED9E8" />, type: "yes_no" },
  { id: 10, question: "Tem chorado mais do que de costume?", icon: <Smile size={32} color="#FED9E8" />, type: "yes_no" },
  { id: 11, question: "Encontra dificuldade para realizar suas atividades diárias?", icon: <BriefcaseIcon size={32} color="#FFD9B0" />, type: "yes_no" },
  { id: 12, question: "Tem dificuldade para tomar decisões?", icon: <Brain size={32} color="#D6CCFE" />, type: "yes_no" },
  { id: 13, question: "Tem dificuldade para fazer o seu trabalho?", icon: <BriefcaseIcon size={32} color="#FFD9B0" />, type: "yes_no" },
  { id: 14, question: "Sente que não consegue desempenhar um papel útil em sua vida?", icon: <Smile size={32} color="#FED9E8" />, type: "yes_no" },
  { id: 15, question: "Tem perdido o interesse pelas coisas?", icon: <Smile size={32} color="#FED9E8" />, type: "yes_no" },
  { id: 16, question: "Sente que é uma pessoa inútil ou sem valor?", icon: <Smile size={32} color="#FED9E8" />, type: "yes_no" },
  { id: 17, question: "Você tem tido pensamentos de que não vale a pena continuar ou vontade de sumir?", icon: <Target size={32} color="#FFD9B0" />, type: "yes_no" },
  { id: 18, question: "Sente-se cansado(a) o tempo todo?", icon: <Target size={32} color="#A9C9FF" />, type: "yes_no" },
  { id: 19, question: "Tem sensações desagradáveis no estômago?", icon: <Target size={32} color="#A9C9FF" />, type: "yes_no" },
  { id: 20, question: "Cansa-se com facilidade?", icon: <Target size={32} color="#A9C9FF" />, type: "yes_no" },
];

export default function Anamnese() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleAnswer = (answerValue: number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answerValue };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // Cálculo do score total de Sim (onde Sim = 1) no SRQ-20
      const finalScore = Object.values(newAnswers).reduce((acc, curr) => acc + curr, 0);
      
      setTimeout(() => {
        router.push({
          pathname: "/anamnese-result",
          params: { score: finalScore },
        });
      }, 500);
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <LinearGradient
      colors={["rgba(169, 201, 255, 0.1)", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 24,
        }}
      >
        {/* Progress Bar */}
        <View className="mb-8 max-w-md mx-auto w-full">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm text-muted-foreground">
              Passo {currentQuestion + 1} de {questions.length}
            </Text>
          </View>
          <View className="w-full bg-[#F0F0F0] rounded-full h-2 overflow-hidden">
            <MotiView
              className="bg-[#A9C9FF] h-full rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ type: "timing", duration: 300 }}
            />
          </View>
        </View>

        {/* Luna Avatar */}
        <View className="flex-row items-center gap-3 mb-6 max-w-md mx-auto w-full">
          <View className="w-12 h-12 rounded-full overflow-hidden">
            <LinearGradient
              colors={["#A9C9FF", "#D6CCFE"]}
              className="w-full h-full justify-center items-center"
            >
              <Moon size={24} color="#FFFFFF" />
            </LinearGradient>
          </View>
          <Text className="text-sm font-semibold text-foreground">Luna</Text>
        </View>

        {/* Question Card */}
        <MotiView
          key={`q-${currentQuestion}`}
          from={{ opacity: 0, translateX: 50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: "timing", duration: 300 }}
          className="max-w-md mx-auto w-full"
        >
          <Card className="mb-6 border-0 shadow-sm">
            <View className="flex-row items-center gap-3">
              {question.icon}
              <Text className="text-lg flex-1 text-foreground leading-6 font-medium">
                {question.question}
              </Text>
            </View>
          </Card>

          {/* Answer Options */}
          <View className="gap-3">
            {question.type === "yes_no" && (
              <View className="gap-3 mt-4">
                <Button
                  variant="primary"
                  className="w-full h-14"
                  onPress={() => handleAnswer(1)}
                >
                  <Text className="text-white text-base font-semibold">Sim</Text>
                </Button>
                <Button
                  variant="secondary"
                  className="w-full h-14"
                  onPress={() => handleAnswer(0)}
                >
                  <Text className="text-foreground text-base font-semibold">Não</Text>
                </Button>
              </View>
            )}
          </View>
        </MotiView>
      </ScrollView>
    </LinearGradient>
  );
}
