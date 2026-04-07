import { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { MotiView } from "moti";
import { Moon, Brain, Smile, Target, BriefcaseIcon, Clock, ArrowLeft, X } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { calculateRiskLevel, calculateUnlockedCategories } from "../lib/unlockContext";

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
  const [cooldownTarget, setCooldownTarget] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    initAndCheckCooldown();
  }, []);

  const getOrCreateClinicalId = async () => {
    let id = await AsyncStorage.getItem(CLINICAL_ID_KEY);
    if (!id) {
      id = "cli_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      await AsyncStorage.setItem(CLINICAL_ID_KEY, id);
    }
    return id;
  };

  const initAndCheckCooldown = async () => {
    try {
      setLoading(true);
      
      // 1. Garante sessão ativa
      const { data: { user } } = await supabase.auth.getUser();
      let currentUserId = user?.id;
      
      if (!user) {
        const { data: authData } = await supabase.auth.signInAnonymously();
        currentUserId = authData.user?.id;
      }

      if (!currentUserId) return;

      // 2. Busca última resposta pelo user_id
      const { data: lastResponse } = await supabase
        .from('anamnesis_responses')
        .select('created_at')
        .eq('user_id', currentUserId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (lastResponse) {
        const lastDate = new Date(lastResponse.created_at);
        const targetDate = new Date(lastDate.getTime() + 15 * 24 * 60 * 60 * 1000).getTime();
        
        if (targetDate > Date.now()) {
          setCooldownTarget(targetDate);
        }
      }
    } catch (err) {
      console.log("[Luna] Checagem de cooldown:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cooldownTarget) return;

    const updateTimer = () => {
      const now = Date.now();
      const difference = cooldownTarget - now;

      if (difference <= 0) {
        setCooldownTarget(null);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60)
      });
    };

    updateTimer(); // Initial call
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [cooldownTarget]);

  const submitAnamnesisBackground = async (answersData: Record<number, number>, score: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const stableId = await getOrCreateClinicalId();
      const isQ17 = answersData[17] === 1;
      const riskLevel = calculateRiskLevel(score, isQ17);
      const unlockedCategories = riskLevel === 'none' ? [] : calculateUnlockedCategories(answersData);

      await supabase.from('anamnesis_responses').insert({
        user_id: user.id,
        clinical_id: stableId, // Mantemos como referência secundária
        score: score,
        answers: answersData,
        risk_level: riskLevel,
        unlocked_categories: unlockedCategories,
      });
      
    } catch (error: any) {
      console.error("❌ [Luna] Erro ao salvar anamnese:", error);
      Alert.alert("Erro", "Não conseguimos salvar seus dados. Tente novamente.");
    }
  };

  const handleAnswer = (answerValue: number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answerValue };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      const finalScore = Object.values(newAnswers).reduce((acc: number, curr: any) => acc + (curr as number), 0);
      const isQ17Positive = newAnswers[17] === 1;

      submitAnamnesisBackground(newAnswers, finalScore);

      setTimeout(() => {
        router.push({
          pathname: "/anamnese-result",
          params: { 
            score: finalScore,
            q17: isQ17Positive ? "true" : "false",
            answers: JSON.stringify(newAnswers),
          },
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

  if (cooldownTarget !== null) {
    if (!timeLeft) {
      return (
        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator size="large" color="#A9C9FF" />
        </View>
      );
    }

    return (
      <LinearGradient colors={["#F8FAFC", "#FFFFFF"]} style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center px-8" style={{ paddingTop: insets.top }}>
          <View className="w-20 h-20 bg-slate-100 rounded-full items-center justify-center mb-8">
            <Clock color="#64748b" size={40} />
          </View>
          <Text className="text-3xl font-bold text-slate-900 mb-4 text-center">Oi de novo! 🌙</Text>
          <Text className="text-lg text-slate-600 text-center mb-10 leading-6">
            Você já realizou sua triagem nos últimos 15 dias. O ideal é que as avaliações tenham esse intervalo para acompanharmos seu progresso real.
          </Text>
          <Card className="w-full p-6 mb-8 border-dashed border-2 border-[#A9C9FF] justify-center items-center">
            <Text className="text-center text-slate-500 font-medium mb-5">Próxima avaliação em:</Text>
            
            <View className="flex-row justify-center items-center w-full mb-2">
              <View className="flex-1 items-center border-r border-[#A9C9FF]/30">
                <Text className="text-3xl font-bold text-[#A9C9FF]">{timeLeft.d}</Text>
                <Text className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Dias</Text>
              </View>
              <View className="flex-1 items-center border-r border-[#A9C9FF]/30">
                <Text className="text-3xl font-bold text-[#A9C9FF]">{timeLeft.h.toString().padStart(2, '0')}</Text>
                <Text className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Horas</Text>
              </View>
              <View className="flex-1 items-center border-r border-[#A9C9FF]/30">
                <Text className="text-3xl font-bold text-[#A9C9FF]">{timeLeft.m.toString().padStart(2, '0')}</Text>
                <Text className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Min</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-3xl font-bold text-[#A9C9FF]">{timeLeft.s.toString().padStart(2, '0')}</Text>
                <Text className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Seg</Text>
              </View>
            </View>
          </Card>
          <Button variant="outline" onPress={() => router.replace("/(tabs)")} className="w-full border-slate-200">
            <Text className="text-slate-600 font-semibold text-base">Voltar para o Menu</Text>
          </Button>
        </View>
      </LinearGradient>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <LinearGradient colors={["#F8FAFC", "#FFFFFF"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }}>
        <View className="mb-8 max-w-md mx-auto w-full">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm text-muted-foreground">Passo {currentQuestion + 1} de {questions.length}</Text>
          </View>
          <View className="w-full bg-[#F0F0F0] rounded-full h-2 overflow-hidden">
            <MotiView className="bg-[#A9C9FF] h-full rounded-full" animate={{ width: `${progress}%` }} transition={{ type: "timing", duration: 300 }} />
          </View>
        </View>

        <View className="flex-row items-center gap-3 mb-6 max-w-md mx-auto w-full">
          <View className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 items-center justify-center">
            <Moon size={20} color="#64748b" />
          </View>
          <Text className="text-sm font-bold text-slate-800 uppercase tracking-widest">Luna</Text>
        </View>

        <MotiView key={`q-${currentQuestion}`} from={{ opacity: 0, translateX: 50 }} animate={{ opacity: 1, translateX: 0 }} transition={{ type: "timing", duration: 300 }} className="max-w-md mx-auto w-full">
          <Card className="mb-6 border-0 shadow-sm bg-white">
            <View className="flex-row items-center gap-4 p-2">
              <View className="w-12 h-12 bg-slate-50 rounded-xl items-center justify-center">{question.icon}</View>
              <Text className="text-lg font-semibold text-slate-800 flex-1 leading-6">{question.question}</Text>
            </View>
          </Card>

          <View className="gap-3 mt-4">
            <Button variant="primary" className="w-full h-14" onPress={() => handleAnswer(1)}>
              <Text className="text-white text-base font-semibold">Sim</Text>
            </Button>
            <Button variant="secondary" className="w-full h-14" onPress={() => handleAnswer(0)}>
              <Text className="text-foreground text-base font-semibold">Não</Text>
            </Button>
          </View>
        </MotiView>
      </ScrollView>
    </LinearGradient>
  );
}
