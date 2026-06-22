import { History } from 'lucide-react';

export default function TicketHistory() {

  const historico = [
    'Chamado criado.',
    'Carlos Silva assumiu o chamado.',
    'Status alterado para Em andamento.',
    'Comentário inserido.'
  ];

  return (

    <div>

      <h3 className="font-semibold mb-4 flex gap-2">
        <History size={18} />
        Histórico
      </h3>

      <div className="space-y-3">

        {historico.map((item, index) => (

          <div
            key={index}
            className="border-l-4 border-orange-500 pl-3 py-1"
          >
            {item}
          </div>

        ))}

      </div>

    </div>
  );
}