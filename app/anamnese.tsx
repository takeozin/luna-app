import { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
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
      
      // Garante que temos uma sessão antes de salvar
      const { data: { session } } = await supabase.auth.getSession();
      let userId = session?.user?.id;
      
      if (!session) {
        const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
        if (authError) throw authError;
        userId = authData.user?.id;
      }

      console.log("[Luna] Salvando anamnese para ID:", stableId);

      const { error: dbError } = await supabase.from('anamnesis_responses').insert({
        user_id: userId,
        clinical_id: stableId,
        score: score,
        answers: answersData
      });
      
      if (dbError) {
        console.error("❌ [Luna] Erro DB:", dbError);
        Alert.alert("Erro ao Salvar", `Não conseguimos registrar sua resposta: ${dbError.message} (${dbError.code})`);
        throw dbError;
      }
      
      console.log("✅ [Luna] SRQ-20 salvo com sucesso!");
    } catch (error: any) {
      console.error("❌ [Luna] Erro geral no salvamento:", error);
      Alert.alert("Erro", "Ocorreu um problema ao salvar seus dados. Por favor, tente novamente em instantes.");
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
      <LinearGradient colors={["#F8FAFC", "#FFFFFF"]} style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center px-8" style={{ paddingTop: insets.top }}>
          <View className="w-20 h-20 bg-slate-100 rounded-full items-center justify-center mb-8">
            <Clock color="#64748b" size={40} />
          </View>

          <Text className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Oi de novo! 🌙
          </Text>

          <Text className="text-lg text-slate-600 text-center mb-10 leading-6">
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
            onPress={() => router.replace("/(tabs)")}
            className="w-full border-slate-200"
          >
            <Text className="text-slate-600">Voltar para o Menu</Text>
          </Button>
        </View>
      </LinearGradient>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <LinearGradient
      colors={["#F8FAFC", "#FFFFFF"]}
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
          <View className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 items-center justify-center">
            <Moon size={20} color="#64748b" />
          </View>
          <Text className="text-sm font-bold text-slate-800 uppercase tracking-widest">Luna</Text>
        </View>

        <MotiView
          key={`q-${currentQuestion}`}
          from={{ opacity: 0, translateX: 50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: "timing", duration: 300 }}
          className="max-w-md mx-auto w-full"
        >
          <Card className="mb-6 border-0 shadow-sm bg-white">
            <View className="flex-row items-center gap-4 p-2">
              <View className="w-12 h-12 bg-slate-50 rounded-xl items-center justify-center">
                {question.icon}
              </View>
              <Text className="text-lg font-semibold text-slate-800 flex-1 leading-6">
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
