import { useState } from "react";
import { View, Text, ScrollView, Pressable, Switch } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "../components/Card";
import { MotiView } from "moti";
import { 
  ArrowLeft, 
  Palette, 
  Bell, 
  Smartphone, 
  Lock, 
  Globe, 
  ChevronRight,
  User,
  Trash2
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { useTheme, ThemeType } from "../lib/themeContext";

const themes: { id: ThemeType; name: string; color: string; description: string }[] = [
  { id: "calm", name: "Calma", color: "#A9C9FF", description: "Azul serenidade" },
  { id: "focus", name: "Foco", color: "#B8E0D2", description: "Verde menta" },
  { id: "energy", name: "Energia", color: "#FFD9B0", description: "Laranja pêssego" },
  { id: "oled", name: "Dark Mode", color: "#000000", description: "Preto absoluto para telas OLED" },
  { id: "system", name: "Sistema", color: "#71717A", description: "Segue as configurações do aparelho" },
];

const notificationTimes = [
  { id: "morning", label: "Manhã", time: "08:00" },
  { id: "afternoon", label: "Tarde", time: "14:00" },
  { id: "evening", label: "Noite", time: "20:00" },
];

export default function SettingsScreen() {
  const { theme, setTheme, hapticsEnabled, setHapticsEnabled } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedTimes, setSelectedTimes] = useState(["morning", "evening"]);
  
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const userName = "Ana";

  const toggleTime = (timeId: string) => {
    if (selectedTimes.includes(timeId)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== timeId));
    } else {
      setSelectedTimes([...selectedTimes, timeId]);
    }
  };

  const handleClearChat = async () => {
    Alert.alert(
      "Limpar Histórico?",
      "Isso apagará mensagens, sessões e registros de humor do banco de dados. O XP local não será afetado.",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Limpar", 
          style: "destructive",
          onPress: async () => {
            try {
              const { data: { user } } = await supabase.auth.getUser();
              if (!user) {
                Alert.alert("Erro", "Usuário não autenticado!");
                return;
              }

              // 1. Pegar IDs de todas as sessões
              const { data: sessions } = await supabase
                .from('chat_sessions')
                .select('id')
                .eq('user_id', user.id);

              const sessionIds = sessions?.map(s => s.id) || [];
              let msgCount = 0;

              // 2. Deletar mensagens
              if (sessionIds.length > 0) {
                const { data: delMsgs } = await supabase
                  .from('chat_messages')
                  .delete()
                  .in('session_id', sessionIds)
                  .select();
                msgCount = delMsgs?.length || 0;
              }

              // 3. Deletar sessões e humores
              const { data: delSessions } = await supabase
                .from('chat_sessions')
                .delete()
                .eq('user_id', user.id)
                .select();
              
              const { data: delMoods } = await supabase
                .from('mood_entries')
                .delete()
                .eq('user_id', user.id)
                .select();

              const summary = [
                `--- Dados Limpos ---`,
                `Conversas: ${msgCount}`,
                `Sessões: ${delSessions?.length || 0}`,
                `Histórico de Humor: ${delMoods?.length || 0}`,
              ].join('\n');

              Alert.alert("Limpeza Concluída", summary);
            } catch (error: any) {
              Alert.alert("Erro Técnico", error.message);
            }
          }
        }
      ]
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
        <Text className="text-3xl font-bold text-foreground mb-1">Configurações</Text>
        <Text className="text-muted-foreground">Personalize sua experiência</Text>
      </View>

      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Perfil */}
        <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "timing", duration: 400 }}>
          <Card className="flex-row items-center gap-4 mb-6 p-4">
            <View className="w-16 h-16 rounded-full bg-[#D6CCFE]/20 items-center justify-center">
              <User size={32} color="#D6CCFE" />
            </View>
            <View>
              <Text className="text-xl font-bold text-foreground">{userName}</Text>
              <Text className="text-sm text-muted-foreground">Premium User</Text>
            </View>
          </Card>
        </MotiView>

        {/* Temas */}
        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-4 ml-1">
            <Palette size={20} color="#A9C9FF" />
            <Text className="text-lg font-semibold text-foreground">Tema</Text>
          </View>
          <Card className="p-4">
            <Text className="text-sm text-muted-foreground mb-4">Escolha a paleta de cores do seu Luna</Text>
            <View className="gap-2">
              {themes.map((themeItem) => (
                <Pressable
                  key={themeItem.id}
                  onPress={() => setTheme(themeItem.id)}
                  className={`flex-row items-center gap-4 p-3 rounded-2xl border-2 transition-all ${
                    theme === themeItem.id ? 'border-primary bg-primary/10' : 'border-border'
                  }`}
                >
                  <View className={`w-8 h-8 rounded-full ${themeItem.id === 'oled' ? 'border border-slate-700' : ''}`} style={{ backgroundColor: themeItem.color }} />
                  <View className="flex-1">
                    <Text className="font-bold text-foreground">{themeItem.name}</Text>
                    <Text className="text-xs text-muted-foreground">{themeItem.description}</Text>
                  </View>
                  {theme === themeItem.id && <Text className="text-primary font-bold text-lg">✓</Text>}
                </Pressable>
              ))}
            </View>
          </Card>
        </View>

        {/* Notificações */}
        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-4 ml-1">
            <Bell size={20} color="#B8E0D2" />
            <Text className="text-lg font-semibold text-foreground">Notificações</Text>
          </View>
          <Card className="p-4">
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="font-bold text-foreground">Ativar lembretes</Text>
                <Text className="text-xs text-muted-foreground">Receba inspirações diárias</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "rgba(0,0,0,0.1)", true: "#B8E0D2" }}
                thumbColor="#FFFFFF"
              />
            </View>

            {notificationsEnabled && (
              <MotiView 
                from={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-border gap-2"
              >
                <Text className="text-sm text-muted-foreground mb-2">Horários preferidos</Text>
                {notificationTimes.map((time) => (
                  <Pressable
                    key={time.id}
                    onPress={() => toggleTime(time.id)}
                    className={`flex-row justify-between items-center p-3 rounded-xl border ${
                      selectedTimes.includes(time.id) ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <Text className="font-medium text-foreground">{time.label}</Text>
                    <Text className="text-sm text-muted-foreground">{time.time}</Text>
                  </Pressable>
                ))}
              </MotiView>
            )}
          </Card>
        </View>

        {/* Gamificação / Feedback */}
        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-4 ml-1">
            <Smartphone size={20} color="#D6CCFE" />
            <Text className="text-lg font-semibold text-foreground">Sensorial</Text>
          </View>
          <Card className="p-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-bold text-foreground">Vibrações Hápticas</Text>
                <Text className="text-xs text-muted-foreground">Sinta o app ao ganhar XP ou completar lições</Text>
              </View>
              <Switch
                value={hapticsEnabled}
                onValueChange={setHapticsEnabled}
                trackColor={{ false: "rgba(0,0,0,0.1)", true: "#B8E0D2" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </Card>
        </View>

        {/* Outras Opções */}
        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-4 ml-1">
            <Lock size={20} color="#FFD9B0" />
            <Text className="text-lg font-semibold text-foreground">Privacidade</Text>
          </View>
          <Card className="p-2 gap-1">
            <Pressable className="flex-row items-center justify-between p-3 active:bg-muted rounded-xl">
              <Text className="text-foreground font-medium">Termos de Uso</Text>
              <ChevronRight size={20} color="gray" />
            </Pressable>
            <Pressable className="flex-row items-center justify-between p-3 active:bg-muted rounded-xl">
              <Text className="text-foreground font-medium">Política de Privacidade</Text>
              <ChevronRight size={20} color="gray" />
            </Pressable>
          </Card>
        </View>

        {/* Gerenciamento de Dados */}
        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-4 ml-1">
            <Trash2 size={20} color="#EF4444" />
            <Text className="text-lg font-semibold text-foreground">Dados</Text>
          </View>
          <Card className="p-2">
            <Pressable 
              onPress={handleClearChat}
              className="flex-row items-center justify-between p-4 active:bg-red-50 rounded-xl"
            >
              <View>
                <Text className="text-red-500 font-bold">Limpar Histórico de Chat</Text>
                <Text className="text-[10px] text-red-400">Apaga apenas as conversas</Text>
              </View>
              <ChevronRight size={18} color="#EF4444" />
            </Pressable>
          </Card>
        </View>

        {/* Footer Info */}
        <View className="items-center py-4">
          <Text className="text-muted-foreground/40 text-xs">Mente Equilibrada v1.0.0</Text>
          <Text className="text-muted-foreground/40 text-[10px] mt-1">Made with 💜 for Luna</Text>
        </View>
      </ScrollView>
    </View>
  );
}
