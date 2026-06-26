// src/config/api.ts

export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:7000';

export function getAuthHeaders(isFormData: boolean = false): HeadersInit {
  const token = localStorage.getItem('token');
  
  const headers: HeadersInit = {
    'Authorization': `Bearer ${token}`
  };

  // Se for FormData, omitimos o Content-Type para o navegador injetar o boundary correto
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
}

export async function uploadAnexoChamado(chamadoId: number, arquivo: File) {
  const formData = new FormData();
  
  // O backend exige exatamente a key 'arquivo' para mapear o arquivo
  formData.append('arquivo', arquivo);

  const response = await fetch(`${API_URL}/chamados/${chamadoId}/mensagens`, {
    method: 'POST',
    headers: getAuthHeaders(true), // Passa true para não enviar o Content-Type padrão
    body: formData,
  });

  if (!response.ok) {
    const textoErro = await response.text();
    throw new Error(textoErro || 'Ocorreu um erro ao enviar o anexo.');
  }

  return response.json();
}