import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogOut, User as UserIcon, Mail, Settings, Moon, Bell } from 'lucide-react-native';
import { useAuth } from '../../lib/authContext';
import { supabase } from '../../lib/supabase';
import { useTheme } from '../../lib/themeContext';
import * as Crypto from 'expo-crypto';

import { Image } from 'expo-image';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();
  const { activeTheme } = useTheme();
  
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const fullName = user?.user_metadata?.full_name || 'Explorador';
  const email = user?.email || '';

  useEffect(() => {
    // Gerar Gravatar se possível
    const fetchGravatar = async () => {
      if (email) {
        try {
          const hash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.MD5,
            email.toLowerCase().trim()
          );
          setAvatarUrl(`https://www.gravatar.com/avatar/${hash}?d=404&s=200`);
        } catch (e) {
          // Fallback para inicial
        }
      }
    };
    fetchGravatar();
  }, [email]);

  const handleSignOut = async () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja desconectar sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive",
          onPress: async () => {
            setLoggingOut(true);
            await signOut();
            setLoggingOut(false);
          }
        }
      ]
    );
  };

  const initial = fullName.charAt(0).toUpperCase();

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-bold text-foreground mb-6">Seu Perfil</Text>
          
          {/* Card de Informações do Usuário */}
          <View className="bg-card p-6 rounded-3xl border border-secondary/20 items-center mb-6 shadow-sm">
            <View className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/30 items-center justify-center mb-4 border-4 border-background overflow-hidden">
              {avatarUrl ? (
                <Image 
                  source={{ uri: avatarUrl }} 
                  style={{ width: '100%', height: '100%' }} 
                  contentFit="cover"
                />
              ) : (
                <Text className="text-4xl font-bold text-purple-600 dark:text-purple-400">{initial}</Text>
              )}
            </View>
            
            <Text className="text-2xl font-bold text-foreground mb-1 text-center px-4" numberOfLines={1} ellipsizeMode="tail">{fullName}</Text>
            <Text className="text-sm text-muted-foreground text-center px-4" numberOfLines={1} ellipsizeMode="tail">{email}</Text>
          </View>

          <Text className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 mt-4">Conta e Ajustes</Text>
          
          <View className="bg-card rounded-3xl border border-secondary/20 overflow-hidden shadow-sm">
            
            {/* Opção Simulada: Sincronização */}
            <View className="flex-row items-center p-4 border-b border-secondary/10">
              <View className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 items-center justify-center mr-3">
                <Settings size={20} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-foreground">Sincronização</Text>
                <Text className="text-xs text-muted-foreground">Progresso salvo na nuvem</Text>
              </View>
            </View>

            {/* Logout */}
            <Pressable 
              onPress={handleSignOut}
              disabled={loggingOut}
              className="flex-row items-center p-4 active:bg-red-50 dark:active:bg-red-900/10"
            >
              <View className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 items-center justify-center mr-3">
                {loggingOut ? (
                  <ActivityIndicator color="#ef4444" size="small" />
                ) : (
                  <LogOut size={20} color="#ef4444" />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-red-500">Sair da Conta</Text>
              </View>
            </Pressable>
            
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
