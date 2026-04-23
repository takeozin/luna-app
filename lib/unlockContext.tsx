import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadStreak, updateStreak, StreakData, forceSaveStreak } from './streaks';

// === Mapeamento Científico SRQ-20 → Categorias do App ===
// Baseado na análise fatorial de Iacoponi & Mari (1989)
// 4 Domínios: Somático, Humor Depressivo/Ansioso, Energia Vital, Pensamentos Depressivos

export const SRQ_TO_CATEGORIES: Record<number, number[]> = {
  1:  [5],       // Q1  Dores de cabeça        → Burnout e Estresse
  2:  [5],       // Q2  Falta de apetite        → Burnout e Estresse
  3:  [6],       // Q3  Dorme mal               → Sono e Descanso
  4:  [1],       // Q4  Assusta-se fácil        → Ansiedade
  5:  [1],       // Q5  Tremores nas mãos       → Ansiedade
  6:  [1],       // Q6  Nervoso/tenso           → Ansiedade
  7:  [1, 5],    // Q7  Má digestão             → Ansiedade + Burnout
  8:  [3],       // Q8  Dificuldade pensar      → Foco e Concentração
  9:  [2],       // Q9  Triste                  → Autoconfiança
  10: [2, 7],    // Q10 Chorado mais            → Autoconfiança + Relacionamentos
  11: [8],       // Q11 Dif. atividades         → Comportamentos
  12: [3, 2],    // Q12 Dif. decisões           → Foco + Autoconfiança
  13: [5, 4],    // Q13 Dif. trabalho           → Burnout + Falar em Público
  14: [2],       // Q14 Incapaz papel útil      → Autoconfiança
  15: [8],       // Q15 Perdeu interesse         → Comportamentos
  16: [2],       // Q16 Sem valor               → Autoconfiança
  17: [2],       // Q17 Pensamentos suicidas    → Autoconfiança + Luna modo crise
  18: [5, 6],    // Q18 Cansaço constante       → Burnout + Sono
  19: [1, 5],    // Q19 Desconforto estômago    → Ansiedade + Burnout
  20: [5],       // Q20 Cansa fácil             → Burnout
};

export const CATEGORY_NAMES: Record<number, string> = {
  1: 'Ansiedade',
  2: 'Autoconfiança',
  3: 'Foco e Concentração',
  4: 'Falar em Público',
  5: 'Burnout e Estresse',
  6: 'Sono e Descanso',
  7: 'Relacionamentos',
  8: 'Comportamentos',
};

export type RiskLevel = 'none' | 'normal' | 'high' | 'critical';

const STORAGE_KEYS = {
  RISK_LEVEL: 'luna_risk_level',
  UNLOCKED_CATEGORIES: 'luna_unlocked_categories',
  LUNA_UNLOCKED: 'luna_luna_unlocked_categories',
  USER_XP: 'luna_user_xp',
  COMPLETED_MODULES: '@completed_modules',
};

interface UnlockContextType {
  riskLevel: RiskLevel;
  unlockedCategories: number[];
  lunaUnlocked: number[];
  currentXP: number;
  completedModules: string[];
  streakCount: number;
  isLocked: (categoryId: number) => boolean;
  setRiskAndUnlock: (score: number, answers: Record<number, number>, isQ17: boolean) => Promise<void>;
  unlockCategory: (categoryIds: number[]) => Promise<void>;
  addXP: (amount: number) => Promise<void>;
  markModuleComplete: (moduleId: string) => Promise<void>;
  refreshStreak: () => Promise<void>;
  isLoading: boolean;
}

const UnlockContext = createContext<UnlockContextType>({
  riskLevel: 'none',
  unlockedCategories: [],
  lunaUnlocked: [],
  currentXP: 0,
  completedModules: [],
  streakCount: 0,
  isLocked: () => true,
  setRiskAndUnlock: async () => {},
  unlockCategory: async () => {},
  addXP: async () => {},
  markModuleComplete: async () => {},
  refreshStreak: async () => {},
  isLoading: true,
});

export const useUnlock = () => useContext(UnlockContext);

import { supabase } from './supabase';
import * as Haptics from 'expo-haptics';
import { useTheme } from './themeContext';
import { safeJSONParse } from './utils';

export function calculateRiskLevel(score: number, isQ17Positive: boolean): RiskLevel {
  if (isQ17Positive || score >= 11) return 'critical';
  if (score >= 8) return 'high';
  if (score >= 4) return 'normal';
  return 'none';
}

export function calculateUnlockedCategories(answers: Record<number, number>): number[] {
  const categories = new Set<number>();
  for (const [questionId, answer] of Object.entries(answers)) {
    if (answer === 1) {
      const mappedCategories = SRQ_TO_CATEGORIES[parseInt(questionId)];
      if (mappedCategories) {
        mappedCategories.forEach(c => categories.add(c));
      }
    }
  }
  return Array.from(categories).sort();
}

export function UnlockProvider({ children }: { children: React.ReactNode }) {
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('none');
  const [unlockedCategories, setUnlockedCategories] = useState<number[]>([]);
  const [lunaUnlocked, setLunaUnlocked] = useState<number[]>([]);
  const [currentXP, setCurrentXP] = useState<number>(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [streakData, setStreakData] = useState<StreakData>({ count: 0, lastActiveDate: null });
  const [isLoading, setIsLoading] = useState(true);
  const { hapticsEnabled } = useTheme();

  // Carrega e atualiza a streak (chamado na inicialização e ao completar módulo)
  const refreshStreak = useCallback(async () => {
    const current = await loadStreak();
    const updated = await updateStreak(current);
    setStreakData(updated);
    setStreakCount(updated.count);

    // Salva no Supabase silenciosamente
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('profiles')
          .update({ 
            streak_count: updated.count, 
            last_active_date: updated.lastActiveDate,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
      }
    } catch (e) {}
  }, []);

  // HELPER: Sincroniza perfil completo com Supabase
  const syncProfileToSupabase = useCallback(async (
    risk: RiskLevel, 
    unlocked: number[], 
    luna: number[],
    xp?: number,
    modules?: string[],
    streak?: StreakData
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const allUnlocked = [...new Set([...unlocked, ...luna])];
      
      const profileData: any = {
        id: user.id,
        risk_level: risk,
        unlocked_categories: allUnlocked,
        updated_at: new Date().toISOString()
      };

      // Inclui propriedades opcionais
      if (xp !== undefined) profileData.current_xp = xp;
      if (modules !== undefined) profileData.completed_modules = modules;
      if (streak !== undefined) {
        profileData.streak_count = streak.count;
        profileData.last_active_date = streak.lastActiveDate;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData);

      if (error) console.error('[UnlockContext] Erro ao sincronizar perfil:', error.message);
      else console.log('[UnlockContext] Perfil sincronizado com Supabase ✅');
    } catch (err) {
      console.error('[UnlockContext] Erro inesperado na sincronia:', err);
    }
  }, []);

  // Carrega estado: primeiro tenta Supabase (fonte de verdade), fallback para AsyncStorage
  useEffect(() => {
    const loadState = async () => {
      try {
        // 1. Tenta carregar do Supabase primeiro (fonte de verdade)
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('risk_level, unlocked_categories, current_xp, completed_modules, streak_count, last_active_date')
            .eq('id', user.id)
            .single();

          if (profile && !error) {
            const cloudRisk = (profile.risk_level as RiskLevel) || 'none';
            const cloudUnlocked = profile.unlocked_categories || [];
            const cloudXP = profile.current_xp || 0;
            const cloudModules = profile.completed_modules || [];
            const cloudStreakCount = profile.streak_count || 0;
            const cloudLastActive = profile.last_active_date || null;

            // 2. Carrega também do AsyncStorage para comparar
            const [localRisk, localUnlocked, localLunaUnl, localXpStr, localModulesStr] = await Promise.all([
              AsyncStorage.getItem(STORAGE_KEYS.RISK_LEVEL),
              AsyncStorage.getItem(STORAGE_KEYS.UNLOCKED_CATEGORIES),
              AsyncStorage.getItem(STORAGE_KEYS.LUNA_UNLOCKED),
              AsyncStorage.getItem(STORAGE_KEYS.USER_XP),
              AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_MODULES),
            ]);

            const localXP = localXpStr ? parseInt(localXpStr, 10) : 0;
            const localModules = safeJSONParse<string[]>(localModulesStr, []);
            const localLuna = safeJSONParse<number[]>(localLunaUnl, []);
            
            const localStreak = await loadStreak();

            // 3. Usa o MAIOR valor (merge inteligente: nuvem vs local)
            const mergedXP = Math.max(cloudXP, localXP);
            const mergedModules = [...new Set([...cloudModules, ...localModules])];
            const mergedRisk = cloudRisk !== 'none' ? cloudRisk : (localRisk as RiskLevel) || 'none';

            let mergedStreak: StreakData = { count: 0, lastActiveDate: null };
            if (!cloudLastActive && !localStreak.lastActiveDate) {
              mergedStreak = { count: 0, lastActiveDate: null };
            } else if (!cloudLastActive) {
              mergedStreak = localStreak;
            } else if (!localStreak.lastActiveDate) {
              mergedStreak = { count: cloudStreakCount, lastActiveDate: cloudLastActive };
            } else {
              if (cloudLastActive > localStreak.lastActiveDate) {
                mergedStreak = { count: cloudStreakCount, lastActiveDate: cloudLastActive };
              } else if (localStreak.lastActiveDate > cloudLastActive) {
                mergedStreak = localStreak;
              } else {
                mergedStreak = { count: Math.max(cloudStreakCount, localStreak.count), lastActiveDate: cloudLastActive };
              }
            }

            setRiskLevel(mergedRisk);
            setUnlockedCategories(cloudUnlocked);
            setLunaUnlocked(localLuna);
            setCurrentXP(mergedXP);
            setCompletedModules(mergedModules);
            setStreakData(mergedStreak);
            setStreakCount(mergedStreak.count);

            // 4. Salva o merge de volta em ambos os lados
            await Promise.all([
              AsyncStorage.setItem(STORAGE_KEYS.RISK_LEVEL, mergedRisk),
              AsyncStorage.setItem(STORAGE_KEYS.USER_XP, mergedXP.toString()),
              AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_MODULES, JSON.stringify(mergedModules)),
              forceSaveStreak(mergedStreak),
            ]);

            // Se houve diferença, atualiza Supabase com o merge
            const needSyncXP = mergedXP > cloudXP;
            const needSyncMod = mergedModules.length > cloudModules.length;
            const needSyncStreak = mergedStreak.lastActiveDate !== cloudLastActive || mergedStreak.count !== cloudStreakCount;

            if (needSyncXP || needSyncMod || needSyncStreak) {
              syncProfileToSupabase(mergedRisk, cloudUnlocked, localLuna, mergedXP, mergedModules, mergedStreak);
            }

            console.log(`[UnlockContext] Carregado com merge: XP=${mergedXP}, Módulos=${mergedModules.length}`);
            setIsLoading(false);
            return;
          }
        }

        // Fallback: carrega apenas do AsyncStorage (sem internet ou sem login)
        const [risk, unlocked, lunaUnl, xp, modulesStr] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.RISK_LEVEL),
          AsyncStorage.getItem(STORAGE_KEYS.UNLOCKED_CATEGORIES),
          AsyncStorage.getItem(STORAGE_KEYS.LUNA_UNLOCKED),
          AsyncStorage.getItem(STORAGE_KEYS.USER_XP),
          AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_MODULES),
        ]);
        
        const currentRisk = (risk as RiskLevel) || 'none';
        const currentUnlocked = safeJSONParse<number[]>(unlocked, []);
        const currentLunaUnl = safeJSONParse<number[]>(lunaUnl, []);
        const loadedXP = xp ? parseInt(xp, 10) : 0;
        const loadedModules = safeJSONParse<string[]>(modulesStr, []);

        setRiskLevel(currentRisk);
        setUnlockedCategories(currentUnlocked);
        setLunaUnlocked(currentLunaUnl);
        setCurrentXP(loadedXP);
        setCompletedModules(loadedModules);

        console.log(`[UnlockContext] Carregado do AsyncStorage: XP=${loadedXP}, Módulos=${loadedModules.length}`);
      } catch (error) {
        console.error('[UnlockContext] Erro ao carregar estado:', error);
      } finally {
        // Carrega streak independentemente do Supabase
        await refreshStreak();
        setIsLoading(false);
      }
    };
    loadState();
  }, [syncProfileToSupabase, refreshStreak]);

  const isLocked = useCallback((categoryId: number): boolean => {
    if (riskLevel === 'none') return true;
    const allUnlocked = [...new Set([...unlockedCategories, ...lunaUnlocked])];
    return !allUnlocked.includes(categoryId);
  }, [riskLevel, unlockedCategories, lunaUnlocked]);

  const setRiskAndUnlock = useCallback(async (
    score: number,
    answers: Record<number, number>,
    isQ17Positive: boolean
  ) => {
    const risk = calculateRiskLevel(score, isQ17Positive);
    const categories = risk === 'none' ? [] : calculateUnlockedCategories(answers);

    setRiskLevel(risk);
    setUnlockedCategories(categories);
    setLunaUnlocked([]);

    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.RISK_LEVEL, risk),
      AsyncStorage.setItem(STORAGE_KEYS.UNLOCKED_CATEGORIES, JSON.stringify(categories)),
      AsyncStorage.setItem(STORAGE_KEYS.LUNA_UNLOCKED, JSON.stringify([])),
    ]);

    // Sincroniza com Supabase
    syncProfileToSupabase(risk, categories, []);
  }, [syncProfileToSupabase]);

  const unlockCategory = useCallback(async (categoryIds: number[]) => {
    const allUnlocked = [...new Set([...unlockedCategories, ...lunaUnlocked])];
    const newOnes = categoryIds.filter(id => !allUnlocked.includes(id));
    
    if (newOnes.length === 0) return;

    const updated = [...new Set([...lunaUnlocked, ...newOnes])];
    setLunaUnlocked(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.LUNA_UNLOCKED, JSON.stringify(updated));

    // Sincroniza com Supabase
    syncProfileToSupabase(riskLevel, unlockedCategories, updated, currentXP, completedModules);
  }, [unlockedCategories, lunaUnlocked, riskLevel, currentXP, completedModules, syncProfileToSupabase]);

  const addXP = useCallback(async (amount: number) => {
    const newXP = currentXP + amount;
    setCurrentXP(newXP);

    if (hapticsEnabled) {
      if (amount >= 50) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }

    // Salva local
    await AsyncStorage.setItem(STORAGE_KEYS.USER_XP, newXP.toString());

    // Salva no Supabase
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('profiles')
          .update({ current_xp: newXP, updated_at: new Date().toISOString() })
          .eq('id', user.id);
        console.log(`[UnlockContext] XP sincronizado: ${newXP} ✅`);
      }
    } catch (err) {
      console.error('[UnlockContext] Erro ao sincronizar XP:', err);
    }
  }, [currentXP]);

  const markModuleComplete = useCallback(async (moduleId: string) => {
    if (completedModules.includes(moduleId)) return;

    if (hapticsEnabled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    const updated = [...completedModules, moduleId];
    setCompletedModules(updated);

    // Atualiza streak ao completar um módulo
    await refreshStreak();

    // Salva local
    await AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_MODULES, JSON.stringify(updated));

    // Salva no Supabase
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('profiles')
          .update({ completed_modules: updated, updated_at: new Date().toISOString() })
          .eq('id', user.id);
        console.log(`[UnlockContext] Módulos sincronizados: ${updated.length} ✅`);
      }
    } catch (err) {
      console.error('[UnlockContext] Erro ao sincronizar módulos:', err);
    }
  }, [completedModules, refreshStreak]);

  return (
    <UnlockContext.Provider value={{
      riskLevel,
      unlockedCategories,
      lunaUnlocked,
      currentXP,
      completedModules,
      streakCount,
      isLocked,
      setRiskAndUnlock,
      unlockCategory,
      addXP,
      markModuleComplete,
      refreshStreak,
      isLoading,
    }}>
      {children}
    </UnlockContext.Provider>
  );
}
