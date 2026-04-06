import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
};

interface UnlockContextType {
  riskLevel: RiskLevel;
  unlockedCategories: number[];
  lunaUnlocked: number[];
  isLocked: (categoryId: number) => boolean;
  setRiskAndUnlock: (score: number, answers: Record<number, number>, isQ17: boolean) => Promise<void>;
  unlockCategory: (categoryIds: number[]) => Promise<void>;
  isLoading: boolean;
}

const UnlockContext = createContext<UnlockContextType>({
  riskLevel: 'none',
  unlockedCategories: [],
  lunaUnlocked: [],
  isLocked: () => true,
  setRiskAndUnlock: async () => {},
  unlockCategory: async () => {},
  isLoading: true,
});

export const useUnlock = () => useContext(UnlockContext);

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
  const [isLoading, setIsLoading] = useState(true);

  // Carrega estado salvo do AsyncStorage
  useEffect(() => {
    const loadState = async () => {
      try {
        const [risk, unlocked, lunaUnl] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.RISK_LEVEL),
          AsyncStorage.getItem(STORAGE_KEYS.UNLOCKED_CATEGORIES),
          AsyncStorage.getItem(STORAGE_KEYS.LUNA_UNLOCKED),
        ]);
        
        if (risk) setRiskLevel(risk as RiskLevel);
        if (unlocked) setUnlockedCategories(JSON.parse(unlocked));
        if (lunaUnl) setLunaUnlocked(JSON.parse(lunaUnl));
      } catch (error) {
        console.error('[UnlockContext] Erro ao carregar estado:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadState();
  }, []);

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
  }, []);

  const unlockCategory = useCallback(async (categoryIds: number[]) => {
    const allUnlocked = [...new Set([...unlockedCategories, ...lunaUnlocked])];
    const newOnes = categoryIds.filter(id => !allUnlocked.includes(id));
    
    if (newOnes.length === 0) return;

    const updated = [...new Set([...lunaUnlocked, ...newOnes])];
    setLunaUnlocked(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.LUNA_UNLOCKED, JSON.stringify(updated));
  }, [unlockedCategories, lunaUnlocked]);

  return (
    <UnlockContext.Provider value={{
      riskLevel,
      unlockedCategories,
      lunaUnlocked,
      isLocked,
      setRiskAndUnlock,
      unlockCategory,
      isLoading,
    }}>
      {children}
    </UnlockContext.Provider>
  );
}
