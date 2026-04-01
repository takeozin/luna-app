import { useState, useRef } from "react";
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { MotiView, AnimatePresence } from "moti";
import { Send, Heart, AlertCircle } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

interface Message {
  id: number;
  sender: "user" | "luna";
  text: string;
  timestamp: Date;
}

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
  
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const sessionIdRef = useRef(`session-${Date.now()}-${Math.floor(Math.random() * 1000)}`);

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

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const response = await fetch("[N8N_URL_REMOVED]", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          sessionId: sessionIdRef.current,
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
            <Text className="text-xs text-muted-foreground font-medium">Sempre disponível para você</Text>
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

      {/* Input Area */}
      <View 
        className="px-6 py-4 bg-white border-t border-gray-100"
        style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 16 }}
      >
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
            disabled={!inputValue.trim()}
            className={`w-11 h-11 rounded-full items-center justify-center transition-opacity ${
              inputValue.trim() ? "bg-[#A9C9FF] opacity-100" : "bg-[#F4F4F5] opacity-50"
            }`}
          >
            <Send size={18} color={inputValue.trim() ? "white" : "#A1A1AA"} style={inputValue.trim() ? {marginLeft: 2} : {}} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
