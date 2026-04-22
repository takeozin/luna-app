import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, Pressable, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "../components/Card";
import { MotiView } from "moti";
import { Bell, Quote, TrendingUp, Heart, ArrowLeft, Clock } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getNotificationLog, markAllNotificationsAsRead, NotificationLogItem } from "../lib/notificationLog";
import * as Notifications from 'expo-notifications';
import { useBorderColor } from "../lib/useBorderColor";

const getIconForType = (type: string) => {
  switch(type) {
    case 'quote': return { icon: <Quote size={20} color="#D6CCFE" />, color: "rgba(214, 204, 254, 0.2)" };
    case 'progress': return { icon: <TrendingUp size={20} color="#B8E0D2" />, color: "rgba(184, 224, 210, 0.2)" };
    case 'achievement': return { icon: <Heart size={20} color="#FED9E8" />, color: "rgba(254, 217, 232, 0.2)" };
    default: return { icon: <Bell size={20} color="#A9C9FF" />, color: "rgba(169, 201, 255, 0.2)" };
  }
};

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  const timeStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  if (diffDays === 0 && date.getDate() === now.getDate()) return `Hoje, ${timeStr}`;
  if (diffDays <= 1) return `Ontem, ${timeStr}`;
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}, ${timeStr}`;
};

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const borderColor = useBorderColor();
  const [notifications, setNotifications] = useState<NotificationLogItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadNotifications = useCallback(async () => {
    const logs = await getNotificationLog();
    setNotifications(logs);
    
    // Marcar como lido e zerar badge do expo
    await markAllNotificationsAsRead();
    await Notifications.setBadgeCountAsync(0);
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  };

  const hoje = notifications.filter(n => {
    const d = new Date(n.timestamp);
    const now = new Date();
    return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const ontem = notifications.filter(n => {
    const d = new Date(n.timestamp);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return d.getDate() === yesterday.getDate() && d.getMonth() === yesterday.getMonth() && d.getFullYear() === yesterday.getFullYear();
  });

  const antigos = notifications.filter(n => !hoje.includes(n) && !ontem.includes(n));

  const renderSection = (title: string, data: NotificationLogItem[], startDelay: number) => {
    if (data.length === 0) return null;

    return (
      <View className="mb-6">
        <Text className="text-muted-foreground font-medium mb-3 ml-1">{title}</Text>
        <View className="gap-3">
          {data.map((item, index) => {
            const { icon, color } = getIconForType(item.type);
            return (
              <MotiView
                key={item.id}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: "timing", duration: 400, delay: startDelay + index * 100 }}
              >
                <Pressable className="active:scale-[0.98] transition-all">
                  <Card 
                    className={`p-4 shadow-sm ${!item.read ? 'border-l-4 border-l-[#A9C9FF]' : ''}`}
                    style={item.read ? { borderColor } : undefined}
                  >
                    <View className="flex-row items-start gap-4">
                      <View 
                        className="w-10 h-10 rounded-full items-center justify-center"
                        style={{ backgroundColor: item.read ? 'rgba(0,0,0,0.05)' : color }}
                      >
                        {icon}
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
                          {formatTime(item.timestamp)}
                        </Text>
                      </View>
                    </View>
                  </Card>
                </Pressable>
              </MotiView>
            );
          })}
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {notifications.length === 0 ? (
          <View className="items-center justify-center py-20 opacity-50">
            <Bell size={48} color="gray" className="mb-4" />
            <Text className="text-muted-foreground text-center">Nenhuma notificação ainda 🔔</Text>
          </View>
        ) : (
          <>
            {renderSection("Hoje", hoje, 100)}
            {renderSection("Ontem", ontem, 300)}
            {renderSection("Anteriores", antigos, 500)}
          </>
        )}
      </ScrollView>
    </View>
  );
}
