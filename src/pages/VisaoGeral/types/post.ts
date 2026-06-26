export interface AvisoResponse {
  id: number;
  titulo: string;
  conteudo: string;
  urlImagem: string | null;
  empresaAlvo: string;
  idCriador: number | null; 
  nomeCriador: string;
  cargoCriador: string;
  setorCriador: string;
  fotoCriador: string | null;
  dataCriacao: string;
}

export interface AvisoRequest {
  titulo: string;
  conteudo: string;
  urlImagem?: string;
  empresaAlvo?: string;
  dataExpiracao?: string;
}