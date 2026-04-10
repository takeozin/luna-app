import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACHIEVEMENTS, CATEGORY_MODULE_IDS, Achievement } from '../app/data/achievementsData';
import { useUnlock } from './unlockContext';

export interface UnlockedAchievement extends Achievement {
  unlocked: boolean;
}

/**
 * Hook que calcula dinamicamente quais conquistas estão desbloqueadas
 * com base nos módulos completados e no XP acumulado.
 */
export function useAchievements() {
  const { currentXP } = useUnlock();
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Recarrega os módulos completados toda vez que a tela fica em foco
  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        try {
          const json = await AsyncStorage.getItem('@completed_modules');
          const modules: string[] = json ? JSON.parse(json) : [];
          setCompletedModules(modules);
        } catch (e) {
          console.error('[useAchievements] Erro ao carregar módulos:', e);
        } finally {
          setIsLoading(false);
        }
      };
      load();
    }, [])
  );

  const checkRule = useCallback((achievement: Achievement): boolean => {
    const { rule } = achievement;

    switch (rule.type) {
      case 'complete_any': {
        // Quantidade total de módulos completados
        return completedModules.length >= (rule.count || 1);
      }

      case 'complete_modules': {
        // Quantidade de módulos completados dentro de uma categoria
        if (!rule.categoryPrefix) return false;
        const categoryModules = completedModules.filter(id => id.startsWith(rule.categoryPrefix!));
        return categoryModules.length >= (rule.count || 1);
      }

      case 'complete_category': {
        // Todos os módulos de uma categoria completados
        if (!rule.categoryPrefix) return false;
        const allInCategory = CATEGORY_MODULE_IDS[rule.categoryPrefix] || [];
        return allInCategory.every(id => completedModules.includes(id));
      }

      case 'xp_threshold': {
        return currentXP >= (rule.xpAmount || 0);
      }

      case 'multi_category': {
        // Completou pelo menos 1 módulo em N categorias diferentes
        if (!rule.categoryPrefixes) return false;
        const categoriesWithProgress = rule.categoryPrefixes.filter(prefix => 
          completedModules.some(id => id.startsWith(prefix))
        );
        return categoriesWithProgress.length >= (rule.count || 1);
      }

      default:
        return false;
    }
  }, [completedModules, currentXP]);

  // Mapeia todas as conquistas com o estado de desbloqueio
  const achievements: UnlockedAchievement[] = ACHIEVEMENTS.map(a => ({
    ...a,
    unlocked: checkRule(a),
  }));

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return {
    achievements,
    unlockedCount,
    totalCount,
    completedModules,
    isLoading,
  };
}
