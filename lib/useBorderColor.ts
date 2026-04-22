import { useTheme, rawColors } from './themeContext';

/**
 * Hook que retorna a cor de borda adequada ao tema ativo.
 * Usa rawColors para garantir compatibilidade com NativeWind
 * (que não resolve CSS variables para borderColor).
 */
export function useBorderColor() {
  const { activeTheme } = useTheme();
  return rawColors[activeTheme].border;
}
