/**
 * Utilitários globais do aplicativo Luna
 */

/**
 * Faz o parse seguro de uma string JSON, retornando um fallback em caso de erro
 * ou se o valor for nulo/indefinido. Previne crashes do AsyncStorage.
 * 
 * @param value String JSON para fazer o parse
 * @param fallback Valor padrão a ser retornado em caso de erro
 * @returns O objeto parseado ou o fallback
 */
export const safeJSONParse = <T,>(value: string | null | undefined, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch (e) {
    console.warn('[Utils] Erro no JSON.parse (usando fallback):', e);
    return fallback;
  }
};
