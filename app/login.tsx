import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Moon, Mail, Lock, ArrowRight } from 'lucide-react-native';
import { supabase } from '../lib/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Preencha e-mail e senha.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    if (cleanEmail.endsWith('@gmail.co') || cleanEmail.endsWith('@hotmail.co') || cleanEmail.endsWith('@outlook.co')) {
      setError('E-mail parece incorreto. Você quis dizer ".com"?');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (signInError) {
        setError(signInError.message.includes('Invalid login credentials') 
          ? 'E-mail ou senha inválidos.' 
          : signInError.message);
      }
    } catch (err: any) {
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-background"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-6 justify-center py-10">
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600 }}
            className="items-center mb-10"
          >
            <View className="w-20 h-20 bg-purple-100 dark:bg-purple-900/40 rounded-3xl items-center justify-center mb-6">
              <Moon size={40} color="#8b5cf6" fill="#8b5cf6" />
            </View>
            <Text className="text-3xl font-bold text-foreground text-center">Bem-vindo(a) ao Luna</Text>
            <Text className="text-base text-muted-foreground text-center mt-2">
              Faça login para continuar sua jornada de autoconhecimento.
            </Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600, delay: 150 }}
            className="gap-4"
          >
            {error ? (
              <View className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-200 dark:border-red-800">
                <Text className="text-red-600 dark:text-red-400 text-sm text-center">{error}</Text>
              </View>
            ) : null}

            <View className="bg-card border border-secondary/20 rounded-2xl p-1 flex-row items-center h-14">
              <View className="w-12 items-center justify-center">
                <Mail size={20} color="#94a3b8" />
              </View>
              <TextInput
                className="flex-1 h-full text-foreground text-base"
                placeholder="Seu e-mail"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View className="bg-card border border-secondary/20 rounded-2xl p-1 flex-row items-center h-14">
              <View className="w-12 items-center justify-center">
                <Lock size={20} color="#94a3b8" />
              </View>
              <TextInput
                className="flex-1 h-full text-foreground text-base"
                placeholder="Sua senha"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <Pressable 
              onPress={handleLogin}
              disabled={loading}
              className={`h-14 rounded-2xl flex-row items-center justify-center mt-2 ${loading ? 'bg-purple-400' : 'bg-purple-600'}`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text className="text-white font-bold text-base mr-2">Entrar</Text>
                  <ArrowRight size={20} color="#fff" />
                </>
              )}
            </Pressable>

            <View className="flex-row items-center justify-center mt-6">
              <Text className="text-muted-foreground text-sm">Não tem uma conta? </Text>
              <Pressable onPress={() => router.push('/register')} className="py-2">
                <Text className="text-purple-600 dark:text-purple-400 font-bold text-sm">Crie agora</Text>
              </Pressable>
            </View>
          </MotiView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
