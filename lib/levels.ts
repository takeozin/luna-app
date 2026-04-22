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
  { threshold: 0,    title: 'Iniciante' },
  { threshold: 300,  title: 'Aprendiz' },
  { threshold: 800,  title: 'Praticante' },
  { threshold: 1500, title: 'Avançado' },
  { threshold: 2500, title: 'Especialista' },
  { threshold: 4000, title: 'Mestre' },
  { threshold: 6000, title: 'Lenda' },
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
