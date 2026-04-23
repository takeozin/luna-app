import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Moon, Mail, Lock, User as UserIcon, ArrowRight, ArrowLeft } from 'lucide-react-native';
import { supabase } from '../lib/supabase';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanName || !cleanEmail || !cleanPassword) {
      setError('Por favor, preencha todos os campos vazios.');
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

    if (cleanPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password: cleanPassword,
        options: {
          data: {
            full_name: cleanName,
          }
        }
      });

      if (signUpError) {
        setError(signUpError.message);
      } else if (data && !data.session) {
        setSuccess('Conta criada com sucesso! Verifique sua caixa de entrada (ou Spam) para confirmar seu e-mail.');
      }
    } catch (err: any) {
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-6 justify-center pt-10 pb-10">
          
          <Pressable 
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-card border border-secondary/20 mb-8"
          >
            <ArrowLeft size={20} color="#64748b" />
          </Pressable>

          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600 }}
            className="mb-8"
          >
            <Text className="text-3xl font-bold text-foreground">Criar Conta</Text>
            <Text className="text-base text-muted-foreground mt-2">
              Comece sua jornada com o Luna agora mesmo.
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

            {success ? (
              <View className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl border border-green-200 dark:border-green-800">
                <Text className="text-green-600 dark:text-green-400 text-sm text-center">{success}</Text>
              </View>
            ) : null}

            <View className="bg-card border border-secondary/20 rounded-2xl p-1 flex-row items-center h-14">
              <View className="w-12 items-center justify-center">
                <UserIcon size={20} color="#94a3b8" />
              </View>
              <TextInput
                className="flex-1 h-full text-foreground text-base"
                placeholder="Seu nome"
                placeholderTextColor="#94a3b8"
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
              />
            </View>

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
                placeholder="Sua senha (mín. 6 caracteres)"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <Pressable 
              onPress={handleRegister}
              disabled={loading}
              className={`h-14 rounded-2xl flex-row items-center justify-center mt-4 ${loading ? 'bg-purple-400' : 'bg-purple-600'}`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text className="text-white font-bold text-base mr-2">Começar Jornada</Text>
                  <ArrowRight size={20} color="#fff" />
                </>
              )}
            </Pressable>
          </MotiView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
