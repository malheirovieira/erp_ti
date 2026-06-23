export const STATUS_MAP: Record<string, string> = {
  'ABERTO': 'Aberto',
  'EM ANDAMENTO': 'Em andamento',
  'EM_ANDAMENTO': 'Em andamento',
  'RESOLVIDO': 'Resolvido',
  'FECHADO': 'Fechado'
};

export const PRIORIDADE_MAP: Record<string, string> = {
  'BAIXA': 'Baixa',
  'MEDIA': 'Média',
  'MÉDIA': 'Média',
  'ALTA': 'Alta',
  'CRITICA': 'Crítica',
  'CRÍTICA': 'Crítica'
};

export const PRIORIDADE_COLORS: Record<string, string> = {
  'Baixa': 'bg-green-500',
  'Média': 'bg-yellow-500',
  'Alta': 'bg-orange-600',
  'Crítica': 'bg-red-600'
};