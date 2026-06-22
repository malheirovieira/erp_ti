import { Briefcase, Clock, CheckCircle } from 'lucide-react';

export default function DashboardCards() {
  // Exemplo de dados (você poderá substituir por chamadas de API depois)
  const cards = [
    { title: 'Chamados em Aberto', count: 1, icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Em Andamento', count: 1, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Finalizados', count: 1, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className={`w-12 h-12 rounded-lg ${card.bg} flex items-center justify-center mb-4`}>
            <card.icon size={24} className={card.color} />
          </div>
          <h3 className="text-gray-500 font-medium">{card.title}</h3>
          <p className="text-3xl font-bold mt-1 text-gray-800">{card.count}</p>
        </div>
      ))}
    </div>
  );
}