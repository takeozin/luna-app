// Definição das conquistas dinâmicas do app Luna
// Cada conquista define a lógica de desbloqueio baseada em módulos completados

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'general' | 'ansiedade' | 'autoconfianca' | 'foco' | 'falar_publico' | 'burnout' | 'sono' | 'relacionamentos' | 'comportamentos';
  // Regra de desbloqueio
  rule: {
    type: 'complete_modules' | 'complete_category' | 'complete_any' | 'xp_threshold' | 'multi_category';
    moduleIds?: string[];       // IDs específicos dos módulos necessários
    categoryPrefix?: string;    // Prefixo da categoria (ex: "1" para Ansiedade 101-108)
    count?: number;             // Quantidade mínima
    xpAmount?: number;          // Quantidade de XP necessária
    categoryPrefixes?: string[];// Múltiplas categorias
  };
}

// Mapeamento: prefixo → módulos existentes
export const CATEGORY_MODULE_IDS: Record<string, string[]> = {
  '1': ['101', '102', '103', '104', '105', '106', '107', '108'], // Ansiedade
  '2': ['201', '202', '203', '204', '205', '206'],               // Autoconfiança
  '3': ['301', '302', '303', '304', '305'],                       // Foco
  '4': ['401', '402', '403', '404'],                               // Falar em Público
  '5': ['501', '502', '503', '504', '505', '506', '507'],         // Burnout
  '6': ['601', '602', '603', '604', '605', '606'],                // Sono
  '7': ['701', '702', '703', '704', '705'],                       // Relacionamentos
  '8': ['801', '802', '803', '804'],                               // Comportamentos
};

export const ALL_MODULE_IDS = Object.values(CATEGORY_MODULE_IDS).flat();

export const ACHIEVEMENTS: Achievement[] = [
  // ===== CONQUISTAS GERAIS =====
  {
    id: 'first_step',
    title: 'Primeiro Passo',
    description: 'Completou sua primeira atividade',
    icon: '🌱',
    category: 'general',
    rule: { type: 'complete_any', count: 1 },
  },
  {
    id: 'explorer',
    title: 'Explorador Corajoso',
    description: 'Completou atividades em 3 categorias diferentes',
    icon: '🧭',
    category: 'general',
    rule: { type: 'multi_category', count: 3, categoryPrefixes: ['1','2','3','4','5','6','7','8'] },
  },
  {
    id: 'dedicated',
    title: 'Dedicação Total',
    description: 'Completou 10 atividades no total',
    icon: '💎',
    category: 'general',
    rule: { type: 'complete_any', count: 10 },
  },
  {
    id: 'unstoppable',
    title: 'Imparável',
    description: 'Completou 25 atividades no total',
    icon: '🔥',
    category: 'general',
    rule: { type: 'complete_any', count: 25 },
  },
  {
    id: 'legend',
    title: 'Lenda da Luna',
    description: 'Completou todas as 45 atividades',
    icon: '👑',
    category: 'general',
    rule: { type: 'complete_any', count: 45 },
  },
  {
    id: 'xp_500',
    title: 'Acumulador',
    description: 'Alcançou 500 XP',
    icon: '⭐',
    category: 'general',
    rule: { type: 'xp_threshold', xpAmount: 500 },
  },
  {
    id: 'xp_2000',
    title: 'Estrela em Ascensão',
    description: 'Alcançou 2.000 XP',
    icon: '🌟',
    category: 'general',
    rule: { type: 'xp_threshold', xpAmount: 2000 },
  },
  {
    id: 'xp_5000',
    title: 'Mestre Supremo',
    description: 'Alcançou 5.000 XP',
    icon: '🏅',
    category: 'general',
    rule: { type: 'xp_threshold', xpAmount: 5000 },
  },

  // ===== ANSIEDADE =====
  {
    id: 'anxiety_starter',
    title: 'Domando a Fera',
    description: 'Completou 3 atividades de Ansiedade',
    icon: '🧠',
    category: 'ansiedade',
    rule: { type: 'complete_modules', categoryPrefix: '1', count: 3 },
  },
  {
    id: 'anxiety_master',
    title: 'Mestre da Calma',
    description: 'Completou todas as atividades de Ansiedade',
    icon: '🏆',
    category: 'ansiedade',
    rule: { type: 'complete_category', categoryPrefix: '1' },
  },

  // ===== AUTOCONFIANÇA =====
  {
    id: 'confidence_starter',
    title: 'Amor Próprio',
    description: 'Completou 3 atividades de Autoconfiança',
    icon: '❤️',
    category: 'autoconfianca',
    rule: { type: 'complete_modules', categoryPrefix: '2', count: 3 },
  },
  {
    id: 'confidence_master',
    title: 'Guerreiro de Si',
    description: 'Completou todas as atividades de Autoconfiança',
    icon: '💪',
    category: 'autoconfianca',
    rule: { type: 'complete_category', categoryPrefix: '2' },
  },

  // ===== FOCO =====
  {
    id: 'focus_starter',
    title: 'Mente Afiada',
    description: 'Completou 3 atividades de Foco',
    icon: '🎯',
    category: 'foco',
    rule: { type: 'complete_modules', categoryPrefix: '3', count: 3 },
  },
  {
    id: 'focus_master',
    title: 'Mestre do Foco',
    description: 'Completou todas as atividades de Foco',
    icon: '🧘',
    category: 'foco',
    rule: { type: 'complete_category', categoryPrefix: '3' },
  },

  // ===== FALAR EM PÚBLICO =====
  {
    id: 'public_starter',
    title: 'Voz Forte',
    description: 'Completou 2 atividades de Falar em Público',
    icon: '🎤',
    category: 'falar_publico',
    rule: { type: 'complete_modules', categoryPrefix: '4', count: 2 },
  },
  {
    id: 'public_master',
    title: 'Dono do Palco',
    description: 'Completou todas as atividades de Falar em Público',
    icon: '🌟',
    category: 'falar_publico',
    rule: { type: 'complete_category', categoryPrefix: '4' },
  },

  // ===== BURNOUT =====
  {
    id: 'burnout_starter',
    title: 'Cuidando da Energia',
    description: 'Completou 3 atividades de Burnout',
    icon: '⚡',
    category: 'burnout',
    rule: { type: 'complete_modules', categoryPrefix: '5', count: 3 },
  },
  {
    id: 'burnout_master',
    title: 'Fênix Renascida',
    description: 'Completou todas as atividades de Burnout',
    icon: '🦅',
    category: 'burnout',
    rule: { type: 'complete_category', categoryPrefix: '5' },
  },

  // ===== SONO =====
  {
    id: 'sleep_starter',
    title: 'Noite Tranquila',
    description: 'Completou 3 atividades de Sono',
    icon: '🌙',
    category: 'sono',
    rule: { type: 'complete_modules', categoryPrefix: '6', count: 3 },
  },
  {
    id: 'sleep_master',
    title: 'Guerreiro do Sono',
    description: 'Completou todas as atividades de Sono',
    icon: '😴',
    category: 'sono',
    rule: { type: 'complete_category', categoryPrefix: '6' },
  },

  // ===== RELACIONAMENTOS =====
  {
    id: 'relationship_starter',
    title: 'Ponte de Conexão',
    description: 'Completou 3 atividades de Relacionamentos',
    icon: '💬',
    category: 'relacionamentos',
    rule: { type: 'complete_modules', categoryPrefix: '7', count: 3 },
  },
  {
    id: 'relationship_master',
    title: 'Mestre das Relações',
    description: 'Completou todas as atividades de Relacionamentos',
    icon: '🤝',
    category: 'relacionamentos',
    rule: { type: 'complete_category', categoryPrefix: '7' },
  },

  // ===== COMPORTAMENTOS =====
  {
    id: 'behavior_starter',
    title: 'Novos Hábitos',
    description: 'Completou 2 atividades de Comportamentos',
    icon: '☕',
    category: 'comportamentos',
    rule: { type: 'complete_modules', categoryPrefix: '8', count: 2 },
  },
  {
    id: 'behavior_master',
    title: 'Dono dos Hábitos',
    description: 'Completou todas as atividades de Comportamentos',
    icon: '🎖️',
    category: 'comportamentos',
    rule: { type: 'complete_category', categoryPrefix: '8' },
  },
];
