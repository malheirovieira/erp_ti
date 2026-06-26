import type { AvisoResponse, ComentarioResponse, CriarAvisoPayload } from '../types/post';

// Importa o store fora do React para pegar o token
// Se já existir outro helper de token no projeto, substitua esta importação
import { useAuthStore } from '../../TI/SuporteTecnico/store/useAuthStore';

const BASE = 'http://localhost:7000';

function getToken(): string {
  // O type assertion resolve o erro "Property 'token' does not exist" 
  // informando ao TypeScript que a propriedade está lá em tempo de execução
  const state = useAuthStore.getState() as { token?: string };
  return state.token ?? '';
}

function headers() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` };
}

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: headers(),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Erro ${res.status}: ${await res.text()}`);
  return res.json();
}

export const postService = {
  // ── Avisos ───────────────────────────────────────────────────────────────
  listarFeed: () => req<AvisoResponse[]>('GET', '/avisos'),

  criarAviso: (payload: CriarAvisoPayload) =>
    req<AvisoResponse>('POST', '/avisos', payload),

  editarAviso: (id: number, payload: Partial<CriarAvisoPayload>) =>
    req<AvisoResponse>('PUT', `/avisos/${id}`, payload),

  excluirAviso: (id: number) =>
    req<string>('DELETE', `/avisos/${id}`),

  toggleFixar: (id: number) =>
    req<{ fixado: boolean }>('PATCH', `/avisos/${id}/fixar`),

  // ── Interações ───────────────────────────────────────────────────────────
  toggleCurtir: (id: number) =>
    req<{ totalCurtidas: number; euCurti: boolean }>('POST', `/avisos/${id}/curtir`),

  toggleFavoritar: (id: number) =>
    req<{ euFavoritei: boolean }>('POST', `/avisos/${id}/favoritar`),

  // ── Comentários ──────────────────────────────────────────────────────────
  listarComentarios: (id: number) =>
    req<ComentarioResponse[]>('GET', `/avisos/${id}/comentarios`),

  criarComentario: (id: number, conteudo: string) =>
    req<ComentarioResponse>('POST', `/avisos/${id}/comentarios`, { conteudo }),

  excluirComentario: (idAviso: number, idComentario: number) =>
    req<string>('DELETE', `/avisos/${idAviso}/comentarios/${idComentario}`),

  // ── Uploads (Necessários para o ModalPost no VisaoGeral.tsx) ─────────────
  uploadImagem: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetch(`${BASE}/avisos/upload/imagem`, {
      method: 'POST',
      // Não enviamos 'Content-Type' manualmente com FormData, o navegador define o boundary automaticamente
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData
    });
    
    if (!res.ok) throw new Error(`Erro no upload de imagem: ${await res.text()}`);
    const data = await res.json();
    return data.url; 
  },

  uploadAnexo: async (file: File): Promise<{ url: string; nomeOriginal: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetch(`${BASE}/avisos/upload/anexo`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData
    });
    
    if (!res.ok) throw new Error(`Erro no upload de anexo: ${await res.text()}`);
    return res.json(); 
  }
};