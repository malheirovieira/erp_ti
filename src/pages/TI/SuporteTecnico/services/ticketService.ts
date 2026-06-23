// src/services/ticketService.ts
import { API_URL, getAuthHeaders } from '../../../../services/api';

// Mantenha aqui apenas funções de chamada direta à API (POST, PUT, PATCH)
// A listagem de GET já está delegada para a Store para melhor performance.
export const atualizarStatusChamado = async (id: number, status: string) => {
  return fetch(`${API_URL}/chamados/${id}/status`, {
    method: 'PATCH',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
};