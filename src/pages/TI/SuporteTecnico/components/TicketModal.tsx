import { X } from 'lucide-react';
import { useTicketStore } from '../../../../store/useTicketStore';
import TicketTimeline from './TicketTimeline';
import TicketChatInput from './TicketChatInput';
import TicketAdminPanel from './TicketAdminPanel';
import TicketHistory from './TicketHistory';

export default function TicketModal() {
  const { selectedTicket, setSelectedTicket } = useTicketStore();

  if (!selectedTicket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold">#{selectedTicket.id} - {selectedTicket.titulo}</h2>
            <p className="text-sm text-gray-500">Cliente: {selectedTicket.cliente}</p>
          </div>
          <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-gray-200 rounded-full"><X size={20} /></button>
        </div>

        {/* Content Grid */}
        <div className="flex-1 grid grid-cols-12 overflow-hidden">
          <div className="col-span-8 flex flex-col border-r overflow-hidden">
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Descrição Inicial</h3>
                <p>{selectedTicket.descricao}</p>
              </div>
              <TicketTimeline />
            </div>
            <TicketChatInput />
          </div>

          <div className="col-span-4 p-6 overflow-y-auto bg-gray-50">
            <TicketAdminPanel ticket={selectedTicket} />
            <div className="mt-8 border-t pt-8">
              <TicketHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}