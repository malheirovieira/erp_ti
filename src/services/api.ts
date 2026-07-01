// src/services/api.ts

// Configuração das URLs de cada serviço
export const API_URL_SUPORTE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:7000';
export const API_URL_CHAT = 'http://127.0.0.1:7000';

/**
 * Função unificada para gerar headers de autenticação.
 * @param isFormData Define se o Content-Type deve ser omitido (para uploads)
 */
export function getAuthHeaders(isFormData: boolean = false): HeadersInit {
  const token = localStorage.getItem('token');
  
  const headers: HeadersInit = {
    'Authorization': `Bearer ${token}`
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
}

/**
 * Função auxiliar genérica para realizar chamadas Fetch.
 * Centraliza o tratamento de erros e a injeção de headers.
 */
export async function apiRequest(url: string, options: RequestInit = {}) {
  const config: RequestInit = {
    ...options,
    headers: {
      ...getAuthHeaders(options.body instanceof FormData),
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Ocorreu um erro na requisição.');
  }

  return response.json();
}

// --- Funções Específicas do Suporte (Legado/Manutenção) ---

export async function uploadAnexoChamado(chamadoId: number, arquivo: File) {
  const formData = new FormData();
  formData.append('arquivo', arquivo);

  return await apiRequest(`${API_URL_SUPORTE}/chamados/${chamadoId}/mensagens`, {
    method: 'POST',
    body: formData,
  });
}

// --- Funções do Chat ---

export async function fetchUsuariosChat() {
  // AJUSTADO: Mudamos de '/usuarios/get' para '/usuarios/participantes' que é a rota real do seu Java
  return await apiRequest(`${API_URL_CHAT}/usuarios/participantes`, {
    method: 'GET'
  });
}

// 1. Busca a lista de canais/conversas passando o ID do usuário logado por parâmetro
export async function fetchCanaisUsuario(usuarioId: number | string) {
  // AJUSTADO: Agora envia o ?usuarioId=X exigido pelo seu endpoint do Java
  return await apiRequest(`${API_URL_CHAT}/api/canais?usuarioId=${usuarioId}`, {
    method: 'GET'
  });
}


// 2. Cria um novo grupo ou Espaço Geral (dados enviados como objeto simples para evitar quebras)
export async function criarNovoCanal(dados: { nome: string; tipo: string; usuarioIds: number[] }) {
  // AJUSTADO: Adicionado prefixo /api para mapear corretamente o CanalController do Java
  return await apiRequest(`${API_URL_CHAT}/api/canais/criar`, {
    method: 'POST',
    body: JSON.stringify(dados)
  });
}

// 3. Busca o histórico de mensagens antigas de um canal específico (Ajustado para o seu endpoint real)
export async function fetchHistoricoMensagens(canalId: number | string) {
  return await apiRequest(`${API_URL_CHAT}/api/batepapo/historico/${canalId}`, {
    method: 'GET'
  });
}

export const API_URL = API_URL_SUPORTE;
