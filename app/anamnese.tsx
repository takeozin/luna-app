import { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { MotiView } from "moti";
import { Moon, Brain, Smile, Target, BriefcaseIcon, Clock, ArrowLeft } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const CLINICAL_ID_KEY = "luna_clinical_id";

export default function Anamnese() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [cooldownDays, setCooldownDays] = useState<number | null>(null);
  const [clinicalId, setClinicalId] = useState<string | null>(null);

  useEffect(() => {
    initClinicalIdAndCheckCooldown();
  }, []);

  const getOrCreateClinicalId = async () => {
    let id = await AsyncStorage.getItem(CLINICAL_ID_KEY);
    if (!id) {
      id = "cli_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      await AsyncStorage.setItem(CLINICAL_ID_KEY, id);
    }
    return id;
  };

  const initClinicalIdAndCheckCooldown = async () => {
    try {
      setLoading(true);
      const stableId = await getOrCreateClinicalId();
      setClinicalId(stableId);

      console.log("[Luna] Clinical ID estável:", stableId);

      // 1. Verifica se já existe uma sessão para evitar logins anônimos desnecessários
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log("[Luna] Sem sessão ativa. Criando login anônimo...");
        await supabase.auth.signInAnonymously();
      }

      // 2. Busca a última resposta enviada filtrando pelo CLINICAL_ID estável
      // Nota: Agora com a RLS corrigida, o clinical_id é o nosso identificador principal
      const { data: lastResponse, error } = await supabase
        .from('anamnesis_responses')
        .select('created_at')
        .eq('clinical_id', stableId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 é o erro de "not found" do single() - este ignoramos, pois significa que é a primeira vez
        console.error("[Luna] Erro ao buscar histórico clínico:", error);
      }

      if (lastResponse) {
        const lastDate = new Date(lastResponse.created_at);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        console.log(`[Luna] Última resposta em: ${lastDate.toISOString()}. Dias desde então: ${diffDays}`);

        if (diffDays <= 15) {
          console.log("[Luna] Cooldown ativo. Bloqueando acesso.");
          setCooldownDays(15 - diffDays + 1);
        }
      } else {
        console.log("[Luna] Nenhum histórico clínico anterior encontrado para este ID.");
      }
    } catch (err) {
      console.log("[Luna] Erro na checagem clínica:", err);
    } finally {
      setLoading(false);
    }
  };

  const submitAnamnesisBackground = async (answersData: Record<number, number>, score: number) => {
    try {
      const stableId = await getOrCreateClinicalId();
      const { data: authData } = await supabase.auth.signInAnonymously();

      const { error: dbError } = await supabase.from('anamnesis_responses').insert({
        user_id: authData.user?.id,
        clinical_id: stableId, // Enviando identificador persistente ao dispositivo
        score: score,
        answers: answersData
      });
      
      if (dbError) throw dbError;
      console.log("✅ [Luna] SRQ-20 com Clinical ID salvo com sucesso!");
    } catch (error) {
      console.error("❌ [Luna] Erro ao salvar anamnese estável:", error);
    }
  };

  const handleAnswer = (answerValue: number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answerValue };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      const finalScore = Object.values(newAnswers).reduce((acc, curr) => acc + curr, 0);
      submitAnamnesisBackground(newAnswers, finalScore);

      setTimeout(() => {
        router.push({
          pathname: "/anamnese-result",
          params: { score: finalScore },
        });
      }, 500);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#A9C9FF" />
      </View>
    );
  }

  if (cooldownDays !== null) {
    return (
      <LinearGradient colors={["rgba(169, 201, 255, 0.1)", "#FFFFFF"]} style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center px-8" style={{ paddingTop: insets.top }}>
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="items-center w-full"
          >
            <View className="w-20 h-20 bg-[#A9C9FF]/20 rounded-full items-center justify-center mb-6">
              <Clock size={40} color="#A9C9FF" />
            </View>
            
            <Text className="text-2xl font-bold text-foreground text-center mb-4">
              Oi de novo! 🌙
            </Text>
            
            <Text className="text-lg text-muted-foreground text-center mb-8 leading-6">
              Você já realizou sua triagem nos últimos 15 dias. O ideal é que as avaliações tenham esse intervalo para acompanharmos seu progresso real.
            </Text>

            <Card className="w-full p-6 mb-8 border-dashed border-2 border-[#A9C9FF]">
              <Text className="text-center text-muted-foreground mb-1">Próxima avaliação em:</Text>
              <Text className="text-3xl font-bold text-[#A9C9FF] text-center">
                {cooldownDays === 1 ? 'Amanhã' : `${cooldownDays} dias`}
              </Text>
            </Card>

            <Button
              variant="outline"
              className="w-full h-14 border-[#A9C9FF]"
              onPress={() => router.replace("/(tabs)")}
            >
              <ArrowLeft size={20} color="#A9C9FF" className="mr-2" />
              <Text className="text-[#A9C9FF] text-base font-semibold">Voltar para o Menu</Text>
            </Button>
          </MotiView>
        </View>
      </LinearGradient>
    );
  }

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
