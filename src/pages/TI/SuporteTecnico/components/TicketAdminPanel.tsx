import type { Ticket } from '../types/ticket';

interface Props {
  ticket: Ticket;
}

export default function TicketAdminPanel({
  ticket
}: Props) {

  return (

    <div className="space-y-5">

      <h3 className="font-bold">
        Painel Administrativo
      </h3>

      <div>

        <label className="text-sm text-gray-500">
          Responsável
        </label>

        <select className="w-full border rounded-lg p-2 mt-1">

          <option>Carlos Silva</option>
          <option>Ana Pereira</option>

        </select>

      </div>

      <div>

        <label className="text-sm text-gray-500">
          Status
        </label>

        <select
          className="w-full border rounded-lg p-2 mt-1"
          defaultValue={ticket.status}
        >
          <option>Aberto</option>
          <option>Em andamento</option>
          <option>Aguardando cliente</option>
          <option>Resolvido</option>
          <option>Fechado</option>
        </select>

      </div>

      <div>

        <label className="text-sm text-gray-500">
          Prioridade
        </label>

        <select
          className="w-full border rounded-lg p-2 mt-1"
          defaultValue={ticket.prioridade}
        >
          <option>Baixa</option>
          <option>Média</option>
          <option>Alta</option>
          <option>Crítica</option>
        </select>

      </div>

      <button className="w-full bg-orange-600 text-white rounded-lg p-3">
        Salvar Alterações
      </button>

    </div>
  );
}