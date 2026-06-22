import type { Ticket } from '../types/ticket';
import { Clock, User } from 'lucide-react';

interface Props {
  ticket: Ticket;
  onClick?: () => void;
}

const prioridadeColors: Record<string, string> = {
  Baixa: 'bg-green-50 text-green-600',
  Média: 'bg-yellow-50 text-yellow-600',
  Alta: 'bg-orange-50 text-orange-600',
  Crítica: 'bg-red-50 text-red-600',
};

export default function TicketCard({ ticket, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-shadow bg-white"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">
          #{ticket.id} - {ticket.titulo}
        </h3>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${prioridadeColors[ticket.prioridade] || 'bg-gray-50 text-gray-600'}`}>
          {ticket.prioridade}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
        {ticket.descricao}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <User size={14} />
          {ticket.cliente}
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          {ticket.status}
        </div>
      </div>
    </div>
  );
}