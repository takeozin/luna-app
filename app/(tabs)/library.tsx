import { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable, Modal } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "../../components/Card";
import { MotiView } from "moti";
import { Search, Brain, Heart, Users, Zap, Moon, Focus, Coffee, MessageSquare, Lock, X, Clipboard } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useUnlock } from "../../lib/unlockContext";

const categories = [
  { id: 1, name: "Ansiedade", icon: Brain, color: "#D6CCFE", count: 8 },
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
  const { isLocked, riskLevel } = useUnlock();
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  const [lockedModal, setLockedModal] = useState<{ visible: boolean; categoryName: string; isNone: boolean }>({
    visible: false, categoryName: "", isNone: false,
  });

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnlocked = showUnlockedOnly ? !isLocked(category.id) : true;
    return matchesSearch && matchesUnlocked;
  });

  const handleCategoryPress = (category: typeof categories[0]) => {
    if (riskLevel === 'none') {
      setLockedModal({ visible: true, categoryName: category.name, isNone: true });
      return;
    }

    if (isLocked(category.id)) {
      setLockedModal({ visible: true, categoryName: category.name, isNone: false });
      return;
    }

    router.push(`/category/${category.id}` as any);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <LinearGradient 
        colors={['rgba(169, 201, 255, 0.2)', 'transparent']}
        style={{ paddingTop: insets.top + 24, paddingBottom: 20, paddingHorizontal: 24 }}
      >
        <Text className="text-3xl font-bold mb-2 text-foreground">Biblioteca</Text>
        <Text className="text-base text-muted-foreground mb-6 leading-6">
          {riskLevel === 'none' 
            ? "Visualize os exercícios disponíveis no app"
            : "Explore exercícios e módulos para diferentes objetivos"
          }
        </Text>

        {/* Search & Filter */}
        <View className="flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center bg-card rounded-[30px] border border-[#F0F0F0] px-4 py-3 shadow-sm" style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 }}>
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
          
          <Pressable 
            onPress={() => setShowUnlockedOnly(!showUnlockedOnly)}
            className="flex-row items-center gap-2"
          >
            <Text className={`font-semibold ${showUnlockedOnly ? 'text-primary' : 'text-slate-500'}`}>
              Meu Plano
            </Text>
            <View 
              className={`w-11 h-6 rounded-full px-1 justify-center ${showUnlockedOnly ? 'bg-primary' : 'bg-slate-300'}`}
              style={{ elevation: 1 }}
            >
              <MotiView 
                animate={{ translateX: showUnlockedOnly ? 20 : 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                className="w-4 h-4 rounded-full bg-white shadow-sm"
              />
            </View>
          </Pressable>
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
            const locked = isLocked(category.id);
            
            return (
              <MotiView
                key={category.id}
                from={{ opacity: 0, scale: 0.9, translateY: 15 }}
                animate={{ opacity: 1, scale: 1, translateY: 0 }}
                transition={{ delay: index * 50, type: "timing", duration: 350 }}
                style={{ width: '48%', marginBottom: 16 }}
              >
                <Pressable
                  onPress={() => handleCategoryPress(category)}
                  className="active:opacity-70 flex-1"
                >
                  <Card
                    className="border-0 shadow-sm items-center py-5 h-full"
                    style={{ 
                      backgroundColor: locked ? '#F8F8F8' : `${category.color}20`,
                      opacity: locked ? 0.55 : 1,
                    }}
                  >
                    <View className="flex flex-col items-center text-center">
                      <View className="relative">
                        <View
                          className="w-16 h-16 rounded-[16px] items-center justify-center mb-3"
                          style={{ backgroundColor: locked ? '#E8E8E8' : `${category.color}40` }}
                        >
                          <Icon size={32} color={locked ? '#B0B0B0' : category.color} />
                        </View>
                        {/* Ícone de cadeado sobreposto */}
                        {locked && (
                          <View className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-slate-200 items-center justify-center border-2 border-white">
                            <Lock size={12} color="#64748b" />
                          </View>
                        )}
                      </View>
                      <Text className={`text-base font-normal text-center mb-2 ${locked ? 'text-slate-400' : 'text-foreground'}`}>
                        {category.name}
                      </Text>
                      <Text className={`text-sm font-normal ${locked ? 'text-slate-300' : 'text-muted-foreground'}`}>
                        {locked ? '🔒 Bloqueada' : `${category.count} módulos`}
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
            <Text className="text-muted-foreground text-center text-base px-10">
              {showUnlockedOnly && searchQuery === ""
                ? "Você ainda não desbloqueou módulos. Converse com a Luna para começar seu plano personalizado! ✨"
                : `Nenhum resultado encontrado para "${searchQuery}"`}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Modal de Atividade Bloqueada */}
      <Modal
        visible={lockedModal.visible}
        transparent
        animationType="fade"
        onRequestClose={() => setLockedModal({ ...lockedModal, visible: false })}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <MotiView
            from={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 300 }}
            style={{
              backgroundColor: 'white',
              borderRadius: 24,
              padding: 32,
              width: '100%',
              maxWidth: 380,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.15,
              shadowRadius: 30,
              elevation: 20,
            }}
          >
            {/* Botão fechar */}
            <Pressable
              onPress={() => setLockedModal({ ...lockedModal, visible: false })}
              style={{
                position: 'absolute', top: 16, right: 16,
                width: 32, height: 32, borderRadius: 16,
                backgroundColor: '#F5F5F5',
                justifyContent: 'center', alignItems: 'center',
              }}
            >
              <X size={16} color="#999" />
            </Pressable>

            {/* Ícone de cadeado grande */}
            <LinearGradient
              colors={lockedModal.isNone ? ['#E8F5E9', '#C8E6C9'] : ['#FFF3E0', '#FFE0B2']}
              style={{
                width: 80, height: 80, borderRadius: 40,
                justifyContent: 'center', alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Lock size={36} color={lockedModal.isNone ? '#66BB6A' : '#FF9800'} />
            </LinearGradient>

            {/* Título */}
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#1A1A1A', marginBottom: 8, textAlign: 'center' }}>
              {lockedModal.isNone ? 'Conteúdo em Visualização' : 'Atividade Bloqueada'}
            </Text>

            {/* Nome da categoria */}
            <View style={{
              backgroundColor: lockedModal.isNone ? '#E8F5E9' : '#FFF3E0',
              paddingHorizontal: 16, paddingVertical: 6,
              borderRadius: 20, marginBottom: 16,
            }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: lockedModal.isNone ? '#2E7D32' : '#E65100' }}>
                {lockedModal.categoryName}
              </Text>
            </View>

            {/* Descrição */}
            <Text style={{ fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 24, paddingHorizontal: 8 }}>
              {lockedModal.isNone
                ? 'Sua avaliação indica que você está bem! 💚\nEssas atividades estarão disponíveis caso sua próxima avaliação indique necessidade.'
                : 'Esta atividade ainda não foi liberada para você.\nConverse com a Luna sobre novos sintomas para desbloquear exercícios relacionados. 💬'
              }
            </Text>

            {/* Botão */}
            <Pressable
              onPress={() => setLockedModal({ ...lockedModal, visible: false })}
              style={{
                backgroundColor: lockedModal.isNone ? '#66BB6A' : '#FF9800',
                paddingVertical: 14, paddingHorizontal: 32,
                borderRadius: 16, width: '100%', alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                Entendi
              </Text>
            </Pressable>
          </MotiView>
        </View>
      </Modal>
    </View>
  );
}
