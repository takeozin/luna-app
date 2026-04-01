import { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "../../components/Card";
import { MotiView } from "moti";
import { Search, Brain, Heart, Users, Zap, Moon, Focus, Coffee, MessageSquare } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const categories = [
  { id: 101, name: "Ansiedade", icon: Brain, color: "#D6CCFE", count: 8 },
  { id: 2, name: "Autoconfiança", icon: Heart, color: "#FED9E8", count: 6 },
  { id: 3, name: "Foco e Concentração", icon: Focus, color: "#A9C9FF", count: 5 },
  { id: 4, name: "Falar em Público", icon: Users, color: "#FFD9B0", count: 4 },
  { id: 5, name: "Burnout e Estresse", icon: Zap, color: "#B8E0D2", count: 7 },
  { id: 6, name: "Sono e Descanso", icon: Moon, color: "#D6CCFE", count: 6 },
  { id: 7, name: "Relacionamentos", icon: MessageSquare, color: "#FED9E8", count: 5 },
  { id: 8, name: "Comportamentos", icon: Coffee, color: "#FFD9B0", count: 4 },
];

export default function LibraryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <LinearGradient 
        colors={['rgba(169, 201, 255, 0.2)', 'transparent']}
        style={{ paddingTop: insets.top + 24, paddingBottom: 20, paddingHorizontal: 24 }}
      >
        <Text className="text-3xl font-bold mb-2 text-foreground">Biblioteca</Text>
        <Text className="text-base text-muted-foreground mb-6 leading-6">
          Explore exercícios e módulos para diferentes objetivos
        </Text>

        {/* Search */}
        <View className="flex-row items-center bg-white rounded-[30px] border border-[#F0F0F0] px-4 py-3 shadow-sm" style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 }}>
          <Search size={20} color="#a1a1aa" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar por tema..."
            placeholderTextColor="#a1a1aa"
            className="flex-1 ml-3 text-base text-foreground pb-0.5"
            returnKeyType="search"
          />
        </View>
      </LinearGradient>

      {/* Categories Grid */}
      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between">
          {filteredCategories.map((category, index) => {
            const Icon = category.icon;
            // NativeWind doesn't reliably map `${hex}20` alpha if overridden by bg- styles, 
            // so we set the backgroundColor inline exactly like Web.
            return (
              <MotiView
                key={category.id}
                from={{ opacity: 0, scale: 0.9, translateY: 15 }}
                animate={{ opacity: 1, scale: 1, translateY: 0 }}
                transition={{ delay: index * 50, type: "timing", duration: 350 }}
                style={{ width: '48%', marginBottom: 16 }}
              >
                <Pressable
                  onPress={() => router.push(`/category/${category.id}` as any)}
                  className="active:opacity-70 flex-1"
                >
                  <Card
                    className="border-0 shadow-sm items-center py-5 h-full"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <View className="flex flex-col items-center text-center">
                      <View
                        className="w-16 h-16 rounded-[16px] items-center justify-center mb-3"
                        style={{ backgroundColor: `${category.color}40` }}
                      >
                        <Icon size={32} color={category.color} />
                      </View>
                      <Text className="text-base font-normal text-center text-foreground mb-2">
                        {category.name}
                      </Text>
                      <Text className="text-sm font-normal text-muted-foreground">
                        {category.count} módulos
                      </Text>
                    </View>
                  </Card>
                </Pressable>
              </MotiView>
            );
          })}
        </View>

        {filteredCategories.length === 0 && (
          <View className="items-center justify-center py-16">
            <Search size={48} color="#e4e4e7" className="mb-4" />
            <Text className="text-muted-foreground text-center text-base">
              Nenhum resultado encontrado para "{searchQuery}"
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
