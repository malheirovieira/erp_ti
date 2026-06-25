// src/pages/TI/SuporteTecnico/types/ticket.ts

type TicketStatus = 'ABERTO' | 'EM_ANDAMENTO' | 'EM ANDAMENTO' | 'RESOLVIDO' | 'FECHADO';

export type TicketPrioridade = 'Baixa' | 'Média' | 'Alta' | 'Crítica';

export interface TicketAnexo {
  nome: string;
  tamanho: number; // em bytes
  tipo: string; // mime type
  /** Por enquanto guardamos o arquivo em memória (File). Quando o back-end estiver pronto, troque por uma URL após o upload. */
  arquivo?: File;
  url?: string;
}

/** Representa um usuário resumido vindo da API. */
interface UsuarioResumo {
  id: number;
  nome: string;
  email: string;
  role?: string;
  /** URL da foto de perfil — preenchida quando o usuário fizer upload futuramente. */
  fotoPerfil?: string;
}

export interface Ticket {
  id: number;
  titulo: string;
  categoria: string;
  prioridade: TicketPrioridade;
  cliente: string;
  usuario: string;
  descricao: string;
  status: TicketStatus;
  responsavel?: string;
  dataAbertura?: string;
  anexos?: TicketAnexo[];

  // ─── CAMPOS VINDOS DA API DO BACK-END ────────────────────────────────────
  empresa?: string;

  /** Usuário que abriu o chamado. */
  usuarioAbriu?: UsuarioResumo;

  /** Técnico principal responsável pelo chamado (preenchido após "Assumir chamado"). */
  tecnicoPrincipal?: UsuarioResumo;
  // ─────────────────────────────────────────────────────────────────────────
}

/** Dados preenchidos pelo cliente ao abrir um novo chamado. */
export interface NovoChamadoInput {
  titulo: string;
  categoria: string;
  prioridade: TicketPrioridade;
  cliente: string;
  usuario: string;
  descricao: string;
  anexos: TicketAnexo[];
}

/** Dados enviados pelo TicketChatInput ao mandar uma mensagem dentro de um chamado. */
export interface TicketChatMensagemInput {
  texto: string;
  anexos: TicketAnexo[];
}

/** Mensagem já registrada no histórico de conversa do chamado. */
export interface TicketChatMensagem extends TicketChatMensagemInput {
  id: string;
  autor: string;
  /** E-mail do autor — usado para identificar se a mensagem é do usuário logado e alinhar a bolha. */
  autorEmail?: string;
  /** @deprecated Use autorEmail para identificar o lado da bolha. Mantido para compatibilidade. */
  autorTipo?: 'cliente' | 'tecnico';
  enviadoEm: string; // ISO datetime
}