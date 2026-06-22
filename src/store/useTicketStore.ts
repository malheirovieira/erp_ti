import { create } from 'zustand';
import type { Ticket } from '../pages/TI/SuporteTecnico/types/ticket';

interface TicketStore {
  selectedTicket: Ticket | null;
  setSelectedTicket: (ticket: Ticket | null) => void;
}

export const useTicketStore = create<TicketStore>((set) => ({
  selectedTicket: null,
  setSelectedTicket: (ticket) => set({ selectedTicket: ticket }),
}));