import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { MotiView } from "moti";
import { Moon, Smile, Brain, BriefcaseIcon, HardHat } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Question {
  id: number;
  question: string;
  icon: React.ReactNode;
  type: "emoji" | "frequency" | "quality" | "choice";
  options?: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Como você está se sentindo hoje?",
    icon: <Smile size={32} color="#A9C9FF" />,
    type: "emoji",
  },
  {
    id: 2,
    question: "Nos últimos dias, você tem sentido ansiedade ou preocupação?",
    icon: <Brain size={32} color="#D6CCFE" />,
    type: "frequency",
  },
  {
    id: 3,
    question: "Como está a qualidade do seu sono?",
    icon: <Moon size={32} color="#B8E0D2" />,
    type: "quality",
  },
  {
    id: 4,
    question: "Qual descreve melhor seu tipo de trabalho?",
    icon: <BriefcaseIcon size={32} color="#FFD9B0" />,
    type: "choice",
    options: ["Campo/Operacional", "Escritório/Administrativo"],
  },
  {
    id: 5,
    question: "Com que frequência você tem pensamentos de incapacidade ou preocupação excessiva?",
    icon: <Brain size={32} color="#FED9E8" />,
    type: "frequency",
  },
];

export default function Anamnese() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});

  const handleAnswer = (answer: string | number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => router.push("/anamnese-result"), 500);
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
            <View className="flex-row items-start gap-3">
              {question.icon}
              <Text className="text-lg flex-1 text-foreground leading-6">
                {question.question}
              </Text>
            </View>
          </Card>

          {/* Answer Options */}
          <View className="gap-3">
            {question.type === "emoji" && (
              <View className="flex-row justify-between w-full">
                {[
                  { emoji: "😫", label: "Péssimo", value: 1 },
                  { emoji: "😟", label: "Mal", value: 2 },
                  { emoji: "😐", label: "Ok", value: 3 },
                  { emoji: "🙂", label: "Bem", value: 4 },
                  { emoji: "😊", label: "Ótimo", value: 5 },
                ].map((option) => (
                  <Pressable
                    key={option.value}
                    onPress={() => handleAnswer(option.value)}
                    className="items-center gap-2 p-3 rounded-2xl active:bg-[#A9C9FF]/20"
                  >
                    <Text className="text-4xl">{option.emoji}</Text>
                    <Text className="text-xs text-muted-foreground">{option.label}</Text>
                  </Pressable>
                ))}
              </View>
            )}

            {question.type === "frequency" && (
              <View className="gap-2">
                {[
                  { label: "Nunca", value: 1 },
                  { label: "Raramente", value: 2 },
                  { label: "Às vezes", value: 3 },
                  { label: "Frequentemente", value: 4 },
                  { label: "Sempre", value: 5 },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant="secondary"
                    className="w-full"
                    onPress={() => handleAnswer(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </View>
            )}

            {question.type === "quality" && (
              <View className="gap-2">
                {[
                  { label: "Péssima", value: 1 },
                  { label: "Ruim", value: 2 },
                  { label: "Média", value: 3 },
                  { label: "Boa", value: 4 },
                  { label: "Ótima", value: 5 },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant="secondary"
                    className="w-full"
                    onPress={() => handleAnswer(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </View>
            )}

            {question.type === "choice" && question.options && (
              <View className="gap-2">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    className="w-full flex-row items-center justify-center gap-2"
                    onPress={() => handleAnswer(option)}
                  >
                    {option.includes("Campo") ? (
                      <HardHat size={20} color="#0b1b3d" />
                    ) : (
                      <BriefcaseIcon size={20} color="#0b1b3d" />
                    )}
                    <Text className="text-foreground ml-2">{option}</Text>
                  </Button>
                ))}
              </View>
            )}
          </View>
        </MotiView>
      </ScrollView>
    </LinearGradient>
  );
}
