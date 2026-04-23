import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { Session, User } from '@supabase/supabase-js';
import { useRouter, useSegments } from 'expo-router';
import { pullSettingsFromCloud } from './sync';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isInitialized: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Busca a sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsInitialized(true);
      if (session?.user) pullSettingsFromCloud(session.user.id);
    });

    // Escuta mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) pullSettingsFromCloud(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Lógica de proteção de rotas
  useEffect(() => {
    if (!isInitialized) return;

    // Se não estiver logado e não estiver na tela de login ou registro
    // @ts-ignore - Ignore type error because types haven't been regenerated yet
    const inAuthGroup = segments[0] === 'login' || segments[0] === 'register';
    
    if (!session && !inAuthGroup) {
      // Redireciona para o login
      // @ts-ignore
      router.replace('/login');
    } else if (session && inAuthGroup) {
      // Se estiver logado, não precisa ver login/registro
      router.replace('/');
    }
  }, [session, isInitialized, segments]);

  const signOut = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('[Auth] Erro ao limpar AsyncStorage', e);
    }
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, isInitialized, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
