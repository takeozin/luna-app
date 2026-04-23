/**
 * Sistema de Níveis do Luna App.
 * Extraído em módulo próprio para ser reutilizado em qualquer tela.
 */

export interface LevelInfo {
  level: number;
  title: string;
  xpForNext: number;
  xpInLevel: number;
}

const LEVELS = [
  { threshold: 0,    title: 'Explorador da Mente' },
  { threshold: 300,  title: 'Detetive dos Pensamentos' },
  { threshold: 800,  title: 'Curador Emocional' },
  { threshold: 1500, title: 'Arquiteto da Paz' },
  { threshold: 2500, title: 'Mestre da Resiliência' },
  { threshold: 4000, title: 'Sábio Interior' },
  { threshold: 6000, title: 'Guardião da Serenidade' },
];

/**
 * Calcula o nível do usuário com base no XP acumulado.
 */
export function getLevel(xp: number): LevelInfo {
  let currentLevel = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].threshold) {
      currentLevel = i;
      break;
    }
  }

  const nextLevel = currentLevel < LEVELS.length - 1 ? LEVELS[currentLevel + 1] : null;
  const xpForNext = nextLevel ? nextLevel.threshold - LEVELS[currentLevel].threshold : 0;
  const xpInLevel = xp - LEVELS[currentLevel].threshold;

  return {
    level: currentLevel + 1,
    title: LEVELS[currentLevel].title,
    xpForNext,
    xpInLevel,
  };
}
