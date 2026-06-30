// src/menuConfig.ts

const SUPORTE_ITEM = { label: 'Suporte Técnico', path: 'suporte-tecnico', icon: 'Headset' };

const menusBase: Record<string, Array<{ label: string; path: string; icon: string }>> = {
  COMERCIAL: [],
  COMPRAS: [],
  DIRETORIA: [],
  DP: [],
  EXPEDICAO: [],
  FINANCEIRO: [],
  LOGISTICA: [],
  MANUTENCAO: [],
  OPERACIONAL: [],
  PCP: [],
  QUALIDADE: [],
  RECEPCAO: [],
  RH: [],
  TI: [
    { label: 'Visão Geral', path: 'visao-geral', icon: 'LayoutDashboard' },
    { label: 'Bate-Papo', path: 'batepapo', icon: 'MessageSquare' }
  ],
  AUTH: [
    { label: 'Login', path: '/login', icon: 'LogIn' }
  ]
};

// Função para gerar o menu mesclado
const gerarMenuComSuporte = () => {
  const menuFinal: Record<string, Array<{ label: string; path: string; icon: string }>> = {};
  
  Object.keys(menusBase).forEach((setor) => {
    // Não adicionamos Suporte na tela de Login (AUTH)
    if (setor === 'AUTH') {
      menuFinal[setor] = menusBase[setor];
    } else {
      menuFinal[setor] = [SUPORTE_ITEM, ...menusBase[setor]];
    }
  });
  
  return menuFinal;
};

export const menuConfig = gerarMenuComSuporte();