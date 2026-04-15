import { Tabs } from "expo-router";
import { Home, Clipboard, MessageCircle, Library, TrendingUp } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, rawColors } from "../../lib/themeContext";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { activeTheme } = useTheme();
  
  const currentColors = rawColors[activeTheme] || rawColors.calm;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: currentColors.activeIcon,
        tabBarInactiveTintColor: currentColors.icon,
        tabBarStyle: {
          backgroundColor: currentColors.card,
          borderTopWidth: 1,
          borderTopColor: currentColors.border,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          paddingTop: 8,
          paddingBottom: insets.bottom > 0 ? insets.bottom + 4 : 12,
          height: insets.bottom > 0 ? 60 + insets.bottom : 70,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: "Meu Plano",
          tabBarIcon: ({ color }) => <Clipboard size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Luna",
          tabBarIcon: ({ color }) => <MessageCircle size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Biblioteca",
          tabBarIcon: ({ color }) => <Library size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progresso",
          tabBarIcon: ({ color }) => <TrendingUp size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
