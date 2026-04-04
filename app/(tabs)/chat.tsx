import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { MotiView, AnimatePresence } from "moti";
import { Send, Heart, AlertCircle } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Clock } from "lucide-react-native";

interface Message {
  id: number;
  sender: "user" | "luna";
  text: string;
  timestamp: Date;
}

const CLINICAL_ID_KEY = "luna_clinical_id";
const MAX_USER_MESSAGES = 20;
const COOLDOWN_HOURS = 48;

const SRQ_QUESTIONS: Record<number, string> = {
  1: "dores de cabeça frequentes",
  2: "falta de apetite",
  3: "dormir mal",
  4: "assustar-se com facilidade",
  5: "tremores nas mãos",
  6: "nervosismo, tensão ou preocupação",
  7: "má digestão",
  8: "dificuldade de pensar com clareza",
  9: "tristeza",
  10: "chorar mais que o costume",
  11: "dificuldade nas atividades diárias",
  12: "dificuldade para tomar decisões",
  13: "dificuldade no trabalho",
  14: "sentir-se incapaz de um papel útil",
  15: "perda de interesse pelas coisas",
  16: "sentir-se sem valor",
  17: "pensamentos de acabar com a vida",
  18: "cansaço o tempo todo",
  19: "sensações desagradáveis no estômago",
  20: "cansar-se com facilidade",
};

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "luna",
    text: "Olá! Eu sou a Luna. Estou aqui para te ouvir sem julgamentos. Como posso ajudar você hoje?",
    timestamp: new Date(),
  },
];

const crisisKeywords = ["suicídio", "me matar", "acabar com tudo", "não aguento mais", "morrer", "desistir"];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [cooldownStartAt, setCooldownStartAt] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [clinicalId, setClinicalId] = useState<string | null>(null);
  const params = useLocalSearchParams<{ mode?: string }>();

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const sessionIdRef = useRef(`session-${Date.now()}-${Math.floor(Math.random() * 1000)}`);

  useEffect(() => {
    const init = async () => {
      const id = await loadClinicalId();
      if (id) {
        await checkSessionStatus(id);
      }
    };
    init();
  }, []);

  useEffect(() => {
    // Se entrar em modo de crise, mostrar alerta e mensagem especial
    if (params.mode === 'crisis') {
      setShowCrisisAlert(true);
      const hasCrisisMsg = messages.some(m => m.text.includes("CVV no 188"));
      if (!hasCrisisMsg) {
        const crisisWelcome: Message = {
          id: Date.now() + 99,
          sender: "luna",
          text: "Oi... vi que as coisas estão muito difíceis para você agora. Quero que saiba que estou aqui para te ouvir, mas se sentir que está em perigo imediato, por favor, ligue para o CVV no 188. Você não precisa carregar tudo isso sozinho(a).",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, crisisWelcome]);
      }
    }
  }, [params.mode]);

  useEffect(() => {
    let interval: any;
    if (cooldownStartAt) {
      interval = setInterval(() => {
        calculateTimeLeft();
      }, 1000);
      calculateTimeLeft();
    }
    return () => clearInterval(interval);
  }, [cooldownStartAt]);

  const loadClinicalId = async () => {
    const id = await AsyncStorage.getItem(CLINICAL_ID_KEY);
    setClinicalId(id);
    return id;
  };

  const calculateTimeLeft = () => {
    if (!cooldownStartAt) return;
    
    const start = new Date(cooldownStartAt).getTime();
    const expiry = start + (COOLDOWN_HOURS * 60 * 60 * 1000);
    const now = new Date().getTime();
    const diff = expiry - now;

    if (diff <= 0) {
      setCooldownStartAt(null);
      setUserMessageCount(0);
      setCurrentSessionId(null);
      return;
    }

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
  };

  const checkSessionStatus = async (stableId: string) => {
    setIsLoadingSession(true);
    try {
      const { data: lastSession, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('clinical_id', stableId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (lastSession) {
        if (lastSession.cooldown_start_at) {
          const start = new Date(lastSession.cooldown_start_at).getTime();
          const expiry = start + (COOLDOWN_HOURS * 60 * 60 * 1000);
          if (new Date().getTime() < expiry) {
            setCooldownStartAt(lastSession.cooldown_start_at);
            setIsLoadingSession(false);
            return;
          }
        }
        
        // Se a sessão anterior foi concluída mas o cooldown passou, ou ainda está ativa
        setCurrentSessionId(lastSession.id);
        setUserMessageCount(lastSession.user_message_count || 0);
        sessionIdRef.current = lastSession.n8n_session_id;

        // Carregar mensagens salvas no banco
        const { data: dbMessages } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('session_id', lastSession.id)
          .order('created_at', { ascending: true });

        if (dbMessages && dbMessages.length > 0) {
          const formatted = dbMessages.map(m => ({
            id: m.id,
            sender: m.sender as "user" | "luna",
            text: m.content,
            timestamp: new Date(m.created_at)
          }));
          setMessages(formatted);
        }
      } else {
        // Criar primeira sessão
        await startNewSession(stableId);
      }
    } catch (err) {
      console.log("[Luna] Iniciando nova sessão - nenhuma anterior ativa.");
      await startNewSession(stableId);
    } finally {
      setIsLoadingSession(false);
    }
  };

  const buildAnamnesisComparison = (previous: Record<string, number>, current: Record<string, number>) => {
    const improved: string[] = [];
    const worsened: string[] = [];
    const maintained: string[] = [];

    for (const key of Object.keys(current)) {
      const qId = parseInt(key);
      const label = SRQ_QUESTIONS[qId];
      if (!label) continue;

      const prev = previous[key] ?? 0;
      const curr = current[key] ?? 0;

      if (prev === 1 && curr === 0) improved.push(label);
      else if (prev === 0 && curr === 1) worsened.push(label);
      else if (prev === 1 && curr === 1) maintained.push(label);
    }

    return { improved, worsened, maintained };
  };

  const fetchAnamnesisComparison = async (stableId: string) => {
    try {
      const { data: records } = await supabase
        .from('anamnesis_responses')
        .select('score, answers, created_at')
        .eq('clinical_id', stableId)
        .order('created_at', { ascending: false })
        .limit(2);

      if (!records || records.length < 2) return null;

      const current = records[0];
      const previous = records[1];
      const comparison = buildAnamnesisComparison(previous.answers, current.answers);

      return {
        previousScore: previous.score,
        currentScore: current.score,
        scoreDiff: previous.score - current.score,
        ...comparison,
      };
    } catch (err) {
      console.log("[Luna] Erro ao buscar comparação de anamnese:", err);
      return null;
    }
  };

  const sendComparisonToLuna = async (comparison: any, sessionId: string, stableId: string) => {
    setIsTyping(true);

    let contextParts: string[] = [];
    contextParts.push(`[CONTEXTO AUTOMÁTICO - Comparação de anamnese]`);
    contextParts.push(`Score anterior: ${comparison.previousScore}/20 → Score atual: ${comparison.currentScore}/20 (diferença: ${comparison.scoreDiff > 0 ? '+' + comparison.scoreDiff : comparison.scoreDiff} pontos).`);

    if (comparison.improved.length > 0) {
      contextParts.push(`Melhorou em: ${comparison.improved.join(', ')}.`);
    }
    if (comparison.worsened.length > 0) {
      contextParts.push(`Piorou em: ${comparison.worsened.join(', ')}.`);
    }
    if (comparison.maintained.length > 0) {
      contextParts.push(`Manteve dificuldade em: ${comparison.maintained.join(', ')}.`);
    }

    contextParts.push(`Use essas informações para iniciar a conversa validando o progresso do usuário de forma empática e acolhedora. Não cite números ou scores diretamente, fale de forma natural sobre as mudanças.`);

    const contextMessage = contextParts.join('\n');

    try {
      const response = await fetch("[N8N_URL_REMOVED]", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: contextMessage,
          sessionId: sessionId,
          clinicalId: stableId,
        }),
      });

      const data = await response.json();
      const replyText = data.output || data.text || data.response || "Olá! Que bom te ver de volta. Como você tem se sentido?";

      const lunaMessage: Message = {
        id: Date.now() + 1,
        sender: "luna",
        text: replyText,
        timestamp: new Date(),
      };

      setMessages([lunaMessage]);
    } catch (error) {
      console.error("[Luna] Erro ao enviar comparação:", error);
      setMessages(initialMessages);
    } finally {
      setIsTyping(false);
    }
  };

  const startNewSession = async (stableId: string) => {
    const newSessionId = `session-${Date.now()}`;
    const { data: sessionData, error } = await supabase
      .from('chat_sessions')
      .insert({
        clinical_id: stableId,
        n8n_session_id: newSessionId,
        user_message_count: 0
      })
      .select()
      .single();

    if (sessionData) {
      setCurrentSessionId(sessionData.id);
      setUserMessageCount(0);
      sessionIdRef.current = newSessionId;

      // Buscar comparação de anamneses anteriores
      const comparison = await fetchAnamnesisComparison(stableId);
      
      if (comparison) {
        // Se há comparação, enviar para Luna gerar uma saudação personalizada
        await sendComparisonToLuna(comparison, newSessionId, stableId);
      } else {
        // Primeira vez — saudação padrão
        setMessages(initialMessages);
      }
    }
  };

  const handleEndSession = async () => {
    if (!currentSessionId) return;
    const now = new Date().toISOString();
    const { error } = await supabase
      .from('chat_sessions')
      .update({ cooldown_start_at: now })
      .eq('id', currentSessionId);

    if (!error) {
      setCooldownStartAt(now);
    }
  };

  const detectCrisis = (text: string) => {
    return crisisKeywords.some((keyword) =>
      text.toLowerCase().includes(keyword)
    );
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    if (detectCrisis(inputValue)) {
      setShowCrisisAlert(true);
    }

    const userText = inputValue;
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Incrementar e salvar no banco
    const newCount = userMessageCount + 1;
    setUserMessageCount(newCount);
    
    if (currentSessionId) {
      await supabase.from('chat_messages').insert({
        session_id: currentSessionId,
        sender: 'user',
        content: userText,
        clinical_id: clinicalId
      });
      await supabase.from('chat_sessions').update({ 
        user_message_count: newCount,
        last_active_at: new Date().toISOString()
      }).eq('id', currentSessionId);
    }

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const response = await fetch("[N8N_URL_REMOVED]", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          sessionId: sessionIdRef.current,
          userId: user?.id || null, 
          clinicalId: clinicalId, 
        }),
      });

      const data = await response.json();
      
      const replyText = data.output || data.text || data.response || "Compreendo. Me conte um pouco mais.";

      const lunaMessage: Message = {
        id: Date.now() + 1,
        sender: "luna",
        text: replyText,
        timestamp: new Date(),
      };
      
      if (currentSessionId) {
        await supabase.from('chat_messages').insert({
          session_id: currentSessionId,
          sender: 'luna',
          content: replyText,
          clinical_id: clinicalId
        });
      }

      setMessages((prev) => [...prev, lunaMessage]);
    } catch (error) {
      console.error("Error communicating with n8n Luna agent:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "luna",
        text: "Me desculpe, estou com instabilidade de conexão no momento. Ah, e por favor verifique se configurou a API Key do Gemini lá no meu Agent (n8n)! 🥺",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  if (isLoadingSession) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="items-center"
        >
          <Text className="text-muted-foreground mt-4 font-medium">Iniciando conexão segura...</Text>
        </MotiView>
      </View>
    );
  }

  if (cooldownStartAt) {
    return (
      <View className="flex-1 bg-background">
        <LinearGradient 
          colors={['rgba(169, 201, 255, 0.1)', 'transparent']}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}
        >
          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="items-center bg-white p-10 rounded-[40px] shadow-sm border border-gray-100"
          >
            <View className="w-20 h-20 bg-[#A9C9FF]/10 rounded-full items-center justify-center mb-6">
              <Clock size={40} color="#A9C9FF" />
            </View>
            <Text className="text-2xl font-bold text-slate-900 text-center mb-2">Pausa para Reflexão</Text>
            <Text className="text-slate-500 text-center mb-8 leading-6">
              Sua sessão foi processada. Para que sua jornada seja mais proveitosa, Luna estará disponível novamente em:
            </Text>
            <View className="bg-slate-50 px-8 py-4 rounded-3xl border border-slate-100">
              <Text className="text-4xl font-mono font-bold text-[#A9C9FF]" style={{ letterSpacing: 2 }}>
                {timeLeft}
              </Text>
            </View>
            <Text className="text-xs text-slate-400 mt-8 text-center px-10">
              Enquanto isso, você pode explorar a Biblioteca e seus Planos de Fortalecimento.
            </Text>
          </MotiView>
          
          <Pressable 
            onPress={() => router.push('/')}
            className="mt-12 flex-row items-center gap-2"
          >
            <Text className="text-slate-400 font-semibold">Ir para o Início</Text>
          </Pressable>
        </LinearGradient>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-[#FAFAFA]"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Header */}
      <LinearGradient 
        colors={['rgba(169, 201, 255, 0.2)', 'transparent']}
        style={{ paddingTop: insets.top + 16, paddingBottom: 16, paddingHorizontal: 24 }}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center gap-3">
          <View className="w-12 h-12 rounded-full overflow-hidden">
            <LinearGradient
              colors={['#A9C9FF', '#D6CCFE']}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text className="text-2xl">🌙</Text>
            </LinearGradient>
          </View>
          <View>
            <Text className="text-xl font-bold text-foreground mb-0.5">Luna</Text>
            <Text className="text-xs text-muted-foreground font-medium">Sessão Ativa • {userMessageCount}/20</Text>
          </View>
        </View>
        
        <Pressable 
          className="w-10 h-10 rounded-full bg-[#FFE5E5] items-center justify-center active:bg-[#FFD1D1]"
          onPress={() => router.push('/(tabs)')} 
        >
          <Heart size={20} color="#d4183d" />
        </Pressable>
      </LinearGradient>

      {/* Crisis Alert */}
      <AnimatePresence>
        {showCrisisAlert && (
          <MotiView
            from={{ opacity: 0, translateY: -20, height: 0 }}
            animate={{ opacity: 1, translateY: 0, height: 'auto' }}
            exit={{ opacity: 0, translateY: -20, height: 0 }}
            className="mx-6 mb-4"
          >
            <Card className="bg-[#FFE5E5] border border-[#d4183d] p-4 flex-row items-start gap-3">
              <AlertCircle size={24} color="#d4183d" className="mt-0.5" />
              <View className="flex-1">
                <Text className="text-sm text-[#450a1a] mb-3 font-medium leading-5">
                  Percebo que você pode estar passando por um momento muito difícil.
                </Text>
                <Button 
                  onPress={() => {}} 
                  className="bg-[#d4183d] w-full" 
                  size="sm"
                >
                  <Text className="text-white font-semibold flex-1 text-center py-1">Falar com psicólogo agora</Text>
                </Button>
              </View>
            </Card>
          </MotiView>
        )}
      </AnimatePresence>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 10, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => {
          const isUser = message.sender === "user";
          return (
            <MotiView
              key={message.id}
              from={{ opacity: 0, translateY: 15 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index === messages.length - 1 ? 0 : 0 }}
              className={`flex-row ${isUser ? "justify-end" : "justify-start"}`}
            >
              <View
                className={`max-w-[80%] p-4 ${
                  isUser 
                    ? "bg-[#A9C9FF] rounded-t-[20px] rounded-bl-[20px] rounded-br-[4px]" 
                    : "bg-white shadow-sm border border-gray-100 rounded-t-[20px] rounded-br-[20px] rounded-bl-[4px]"
                }`}
              >
                <Text className={`text-[15px] leading-6 ${isUser ? "text-white" : "text-foreground"}`}>
                  {message.text}
                </Text>
                <Text 
                  className={`text-[10px] mt-2 font-medium ${isUser ? "text-white/70 text-right" : "text-muted-foreground/70"}`}
                >
                  {message.timestamp.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </MotiView>
          );
        })}

        {isTyping && (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-row justify-start"
          >
            <View className="bg-white shadow-sm border border-gray-100 p-4 rounded-t-[20px] rounded-br-[20px] rounded-bl-[4px] flex-row gap-1.5 items-center">
              <MotiView 
                from={{ translateY: 0 }} animate={{ translateY: -5 }} 
                transition={{ loop: true, type: 'timing', duration: 400 }}
                className="w-2 h-2 rounded-full bg-[#A9C9FF]" 
              />
              <MotiView 
                from={{ translateY: 0 }} animate={{ translateY: -5 }} 
                transition={{ loop: true, type: 'timing', duration: 400, delay: 150 }}
                className="w-2 h-2 rounded-full bg-[#A9C9FF]" 
              />
              <MotiView 
                from={{ translateY: 0 }} animate={{ translateY: -5 }} 
                transition={{ loop: true, type: 'timing', duration: 400, delay: 300 }}
                className="w-2 h-2 rounded-full bg-[#A9C9FF]" 
              />
            </View>
          </MotiView>
        )}
      </ScrollView>

      {/* Input Area or End Session Button */}
      <View 
        className="px-6 py-4 bg-white border-t border-gray-100"
        style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 16 }}
      >
        {userMessageCount >= MAX_USER_MESSAGES ? (
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
          >
            <Text className="text-slate-500 text-center text-sm mb-4 leading-5">
              A sessão acabou por aqui, clique em encerrar e aguarde a próxima.
            </Text>
            <Button 
              onPress={handleEndSession}
              variant="primary"
              className="w-full bg-[#A9C9FF]"
            >
              Encerrar Sessão
            </Button>
          </MotiView>
        ) : (
          <View className="flex-row items-end gap-3 bg-gray-50 rounded-[28px] border border-gray-200 pl-5 pr-2 py-2">
            <TextInput
              className="flex-1 min-h-[40px] max-h-[120px] text-[15px] text-foreground pt-3"
              placeholder="Desabafe aqui..."
              placeholderTextColor="#A1A1AA"
              multiline
              value={inputValue}
              onChangeText={setInputValue}
              textAlignVertical="center"
            />
            <Pressable 
              onPress={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className={`w-11 h-11 rounded-full items-center justify-center transition-opacity ${
                inputValue.trim() && !isTyping ? "bg-[#A9C9FF] opacity-100" : "bg-[#F4F4F5] opacity-50"
              }`}
            >
              <Send size={18} color={inputValue.trim() && !isTyping ? "white" : "#A1A1AA"} style={inputValue.trim() ? {marginLeft: 2} : {}} />
            </Pressable>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
