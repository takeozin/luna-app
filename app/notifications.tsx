import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "../components/Card";
import { MotiView } from "moti";
import { Bell, Quote, TrendingUp, Heart, ArrowLeft, Clock } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const notifications = [
  {
    id: 1,
    type: "reminder",
    icon: <Bell size={20} color="#A9C9FF" />,
    title: "Lembrete de Exercício",
    message: "Hora do seu exercício: Respiração para Ansiedade",
    time: "2 horas atrás",
    read: false,
    color: "rgba(169, 201, 255, 0.2)",
  },
  {
    id: 2,
    type: "quote",
    icon: <Quote size={20} color="#D6CCFE" />,
    title: "Inspiração do Dia",
    message: "Seus pensamentos não são fatos. Eles são apenas hipóteses.",
    time: "Hoje, 8:00",
    read: false,
    color: "rgba(214, 204, 254, 0.2)",
  },
  {
    id: 3,
    type: "progress",
    icon: <TrendingUp size={20} color="#B8E0D2" />,
    title: "Progresso Semanal",
    message: "Parabéns! Você completou 5 exercícios esta semana 🎉",
    time: "Ontem",
    read: true,
    color: "rgba(184, 224, 210, 0.2)",
  },
  {
    id: 4,
    type: "achievement",
    icon: <Heart size={20} color="#FED9E8" />,
    title: "Nova Conquista",
    message: "Você desbloqueou: Detetive dos Pensamentos 🔍",
    time: "Ontem",
    read: true,
    color: "rgba(254, 217, 232, 0.2)",
  },
  {
    id: 5,
    type: "reminder",
    icon: <Clock size={20} color="#FFD9B0" />,
    title: "Check-in Diário",
    message: "Como você está se sentindo hoje?",
    time: "2 dias atrás",
    read: true,
    color: "rgba(255, 217, 176, 0.2)",
  },
];

const groupedNotifications = {
  hoje: notifications.filter((n) => n.time.includes("atrás") || n.time.includes("Hoje")),
  ontem: notifications.filter((n) => n.time === "Ontem"),
  antiga: notifications.filter((n) => n.time.includes("dias atrás")),
};

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const renderSection = (title: string, data: typeof notifications, startDelay: number) => {
    if (data.length === 0) return null;

    return (
      <View className="mb-6">
        <Text className="text-muted-foreground font-medium mb-3 ml-1">{title}</Text>
        <View className="gap-3">
          {data.map((item, index) => (
            <MotiView
              key={item.id}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: "timing", duration: 400, delay: startDelay + index * 100 }}
            >
              <Pressable className="active:scale-[0.98] transition-all">
                <Card className={`p-4 border-0 shadow-sm ${!item.read ? 'border-l-4 border-l-[#A9C9FF]' : ''}`}>
                  <View className="flex-row items-start gap-4">
                    <View 
                      className="w-10 h-10 rounded-full items-center justify-center"
                      style={{ backgroundColor: item.read ? 'rgba(0,0,0,0.05)' : item.color }}
                    >
                      {item.icon}
                    </View>
                    <View className="flex-1">
                      <View className="flex-row justify-between items-center mb-1">
                        <Text className={`text-base ${!item.read ? 'font-bold' : 'font-semibold'} text-foreground`}>
                          {item.title}
                        </Text>
                        {!item.read && (
                          <View className="w-2 h-2 rounded-full bg-[#A9C9FF]" />
                        )}
                      </View>
                      <Text className="text-sm text-muted-foreground leading-5 mb-2">
                        {item.message}
                      </Text>
                      <Text className="text-xs text-muted-foreground/60">
                        {item.time}
                      </Text>
                    </View>
                  </View>
                </Card>
              </Pressable>
            </MotiView>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <View
        style={{ paddingTop: insets.top + 20, paddingBottom: 24, paddingHorizontal: 24 }}
      >
        <Pressable 
          onPress={() => router.back()} 
          className="flex-row items-center gap-2 mb-4 active:opacity-60"
        >
          <ArrowLeft size={20} color="gray" />
          <Text className="text-muted-foreground font-medium">Voltar</Text>
        </Pressable>
        <Text className="text-3xl font-bold text-foreground mb-1">Notificações</Text>
        <Text className="text-muted-foreground">Acompanhe suas atualizações</Text>
      </View>

      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {renderSection("Hoje", groupedNotifications.hoje, 100)}
        {renderSection("Ontem", groupedNotifications.ontem, 300)}
        {renderSection("Anteriores", groupedNotifications.antiga, 500)}
      </ScrollView>
    </View>
  );
}
