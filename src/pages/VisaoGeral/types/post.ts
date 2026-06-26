
export interface AvisoResponse {
  id: number;
  titulo: string;
  conteudo: string;
  urlImagem?: string;
  urlAnexo?: string;
  nomeAnexo?: string;
  empresaAlvo: string;
  idCriador: number | null;
  nomeCriador: string;
  cargoCriador: string;
  setorCriador: string;
  fotoCriador?: string | null;
  dataCriacao: string;
  editadoEm?: string | null;
  fixado?: boolean;
  totalCurtidas?: number;
  totalComentarios?: number;
  euCurti?: boolean;
  euFavoritei?: boolean;
}
 
export interface ComentarioResponse {
  id: number;
  idUsuario: number;
  nomeUsuario: string;
  fotoUsuario?: string | null;
  conteudo: string;
  criadoEm: string;
  editadoEm?: string | null;
}
 
export interface CriarAvisoPayload {
  titulo?: string;
  conteudo: string;
  urlImagem?: string;
  urlAnexo?: string;
  empresaAlvo?: string;
  dataExpiracao?: string | null;
}
 