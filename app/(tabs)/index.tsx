import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { MotiView, MotiText } from "moti";
import { Bell, Settings, Quote, Clock, Heart } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const dailyQuotes = [
  "Seus pensamentos não são fatos. Eles são apenas hipóteses.",
  "Qual a evidência para esse pensamento?",
  "Hoje, seja seu próprio melhor amigo.",
  "Pausas não são fraqueza, são estratégia.",
  "Você não é sua ansiedade. Você é quem observa a ansiedade.",
];

const moods = [
  { emoji: "😫", label: "Péssimo", value: 1 },
  { emoji: "😟", label: "Mal", value: 2 },
  { emoji: "😐", label: "Ok", value: 3 },
  { emoji: "🙂", label: "Bem", value: 4 },
  { emoji: "😊", label: "Ótimo", value: 5 },
];

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  
  const userName = "Ana";
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite";
  // To avoid hydration mismatch errors on native, we just get a random quote on mount properly, but here we keep it simple
  const dailyQuote = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <LinearGradient
        colors={["rgba(169, 201, 255, 0.2)", "rgba(255, 255, 255, 0)"]}
        style={{ paddingTop: insets.top + 20, paddingBottom: 24, paddingHorizontal: 24 }}
      >
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full overflow-hidden">
              <LinearGradient
                colors={["#A9C9FF", "#D6CCFE"]}
                className="w-full h-full justify-center items-center"
              >
                <Text className="text-white text-lg font-semibold">{userName.charAt(0)}</Text>
              </LinearGradient>
            </View>
            <View>
              <Text className="text-sm text-muted-foreground">{greeting}</Text>
              <Text className="text-xl text-foreground font-semibold">{userName}!</Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => router.push("/(tabs)/")}
              className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
              style={{ elevation: 2 }}
            >
              <Bell size={20} color="#0b1b3d" />
            </Pressable>
            <Pressable
              onPress={() => router.push("/(tabs)/")}
              className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
              style={{ elevation: 2 }}
            >
              <Settings size={20} color="#0b1b3d" />
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, gap: 24 }}>
        {/* Check-in Rápido */}
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "timing", duration: 400, delay: 100 }}>
          <Card className="border-0 shadow-sm">
            <Text className="text-foreground font-semibold mb-4 text-base">Como você está se sentindo agora?</Text>
            <View className="flex-row justify-between w-full">
              {moods.map((mood) => (
                <Pressable
                  key={mood.value}
                  onPress={() => setSelectedMood(mood.value)}
                  className={`items-center gap-2 p-2 rounded-2xl ${
                    selectedMood === mood.value ? "bg-[#A9C9FF]/30" : "active:bg-[#F0F0F0]"
                  }`}
                >
                  <MotiText
                    animate={{ scale: selectedMood === mood.value ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-3xl"
                  >
                    {mood.emoji}
                  </MotiText>
                  <Text className="text-xs text-muted-foreground">{mood.label}</Text>
                </Pressable>
              ))}
            </View>
          </Card>
        </MotiView>

        {/* Inspiração do Dia */}
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "timing", duration: 400, delay: 200 }}>
          <Card className="border-0 overflow-hidden" style={{ backgroundColor: "transparent" }}>
            <LinearGradient
              colors={["rgba(214, 204, 254, 0.3)", "rgba(169, 201, 255, 0.3)"]}
              className="absolute inset-0"
            />
            <View className="flex-row items-start gap-3">
              <View className="mt-1">
                <Quote size={24} color="#A9C9FF" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Inspiração do Dia</Text>
                <Text className="text-base text-foreground leading-relaxed font-medium">{dailyQuote}</Text>
              </View>
            </View>
          </Card>
        </MotiView>

        {/* Próxima Tarefa */}
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "timing", duration: 400, delay: 300 }}>
          <Card className="border-0 shadow-sm">
            <View className="flex-row items-center gap-3 mb-3">
              <Clock size={20} color="#B8E0D2" />
              <Text className="text-sm text-muted-foreground">Seu próximo exercício</Text>
            </View>
            <Text className="text-lg font-semibold text-foreground mb-1">Respiração para Ansiedade</Text>
            <Text className="text-sm text-muted-foreground mb-5">Daqui a 2 horas</Text>
            <Button
              variant="primary"
              size="sm"
              onPress={() => router.push("/(tabs)/plan")}
              className="w-full"
            >
              Começar agora
            </Button>
          </Card>
        </MotiView>

        {/* Módulos em Andamento */}
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "timing", duration: 400, delay: 400 }}>
          <View className="flex-row items-center justify-between mb-4 mt-2">
            <Text className="text-lg font-semibold text-foreground">Módulos em Andamento</Text>
            <Pressable onPress={() => router.push("/(tabs)/plan")}>
              <Text className="text-sm font-semibold text-[#A9C9FF]">Ver todos</Text>
            </Pressable>
          </View>
          <View className="gap-3">
            <Card className="border-0 shadow-sm">
              <View className="flex-row items-center gap-4 py-1">
                <View className="w-12 h-12 rounded-xl bg-[#B8E0D2]/30 items-center justify-center">
                  <Text className="text-xl">🌙</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground mb-1">Higiene do Sono</Text>
                  <Text className="text-xs text-muted-foreground">3 de 7 dias completos</Text>
                </View>
                <View>
                  <Text className="text-2xl font-bold text-[#B8E0D2]">43%</Text>
                </View>
              </View>
            </Card>

            <Card className="border-0 shadow-sm">
              <View className="flex-row items-center gap-4 py-1">
                <View className="w-12 h-12 rounded-xl bg-[#D6CCFE]/30 items-center justify-center">
                  <Text className="text-xl">🧠</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground mb-1">Crítico Interno</Text>
                  <Text className="text-xs text-muted-foreground">1 de 7 dias completos</Text>
                </View>
                <View>
                  <Text className="text-2xl font-bold text-[#D6CCFE]">14%</Text>
                </View>
              </View>
            </Card>
          </View>
        </MotiView>

        {/* Ajuda Profissional */}
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "timing", duration: 400, delay: 500 }} className="mt-2">
          <Card className="border border-[#FFE5E5] bg-[#FFE5E5]/20 shadow-sm">
            <View className="flex-row items-start gap-4">
              <View className="mt-1">
                <Heart size={24} color="#d4183d" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground mb-1">Precisa de apoio profissional?</Text>
                <Text className="text-xs text-muted-foreground mb-4">
                  Fale com um psicólogo credenciado agora
                </Text>
                <Button
                  variant="emergency"
                  size="sm"
                  onPress={() => router.push("/(tabs)/")}
                >
                  Falar com profissional
                </Button>
              </View>
            </View>
          </Card>
        </MotiView>
      </ScrollView>
    </View>
  );
}
