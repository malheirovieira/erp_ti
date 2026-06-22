import DashboardCards from './components/DashboardCards';
import TicketFilters from './components/TicketFilters';
import TicketModal from './components/TicketModal';
import { useTicketStore } from '../../../store/useTicketStore';
import type { Ticket } from './types/ticket';

export default function SuporteTecnico() {
    const setSelectedTicket = useTicketStore((state) => state.setSelectedTicket);

    // Mock dos seus tickets
    const tickets: Ticket[] = [
        { id: 1, titulo: 'Falha no Servidor', categoria: 'Infraestrutura', prioridade: 'Crítica', cliente: 'Empresa A', descricao: 'Servidor down.', status: 'Aberto' }
    ];

    return (
        <div className="p-6">
            <DashboardCards />
            <TicketFilters />

            <div className="space-y-4">
                {tickets.map(ticket => (
                    <div key={ticket.id} onClick={() => setSelectedTicket(ticket)} className="p-4 border rounded-lg cursor-pointer hover:shadow-md">
                        {ticket.titulo}
                    </div>
                ))}
            </div>

            <TicketModal />
        </div>
    );
}