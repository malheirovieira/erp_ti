import React from 'react';

export const VisaoGeral: React.FC = () => {
  // Dados simulados para preencher os widgets temporariamente
  const estatisticas = [
    { id: 1, titulo: 'Chamados Abertos', valor: '14', descricao: 'Aguardando atendimento', cor: 'text-[#E95C13] bg-orange-50' },
    { id: 2, titulo: 'Backups em Dia', valor: '5 / 6', descricao: '1 falha nas últimas 24h', cor: 'text-green-600 bg-green-50' },
    { id: 3, titulo: 'Scripts SQL Executados', valor: '42', descricao: 'Automações ativas hoje', cor: 'text-blue-600 bg-blue-50' },
    { id: 4, titulo: 'Itens em Estoque Baixo', valor: '03', descricao: 'Patrimônio requer atenção', cor: 'text-red-600 bg-red-50' },
  ];

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Cabeçalho Interno do Dashboard */}
      <div>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">Visão Geral</h1>
        <p className="text-sm text-gray-500">Métricas centrais e status em tempo real do ecossistema Engebag & Bag Cleaner.</p>
      </div>

      {/* Grid de Widgets / Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {estatisticas.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-md border border-[#dee2e6] shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">{item.titulo}</span>
              <span className="text-3xl font-extrabold text-gray-800 block">{item.valor}</span>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">{item.descricao}</span>
              <span className={`w-2 h-2 rounded-full ${item.id === 2 ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Seção Inferior: Atividades Recentes ou Gráficos Simulados */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Painel de Alertas Rápidos */}
        <div className="bg-white p-5 rounded-md border border-[#dee2e6] shadow-sm lg:col-span-2">
          <h3 className="text-sm font-bold text-gray-700 border-b border-gray-100 pb-3 mb-4">Alertas Recentes do Sistema</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded text-sm text-red-800">
              <span className="font-bold">🚨 BACKUP:</span> O espelhamento do banco `RM_BAGCLEANER` falhou na rotina das 02:14h.
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded text-sm text-orange-800">
              <span className="font-bold">⚠️ SUPORTE:</span> Chamado #1402 (Diretoria) aguarda retorno há mais de 2 horas.
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded text-sm text-green-800">
              <span className="font-bold">✅ SQL:</span> Script `correcao_cfo_duplicado.sql` executado com sucesso em Homologação.
            </div>
          </div>
        </div>

        {/* Resumo de Licenças / Estoque */}
        <div className="bg-white p-5 rounded-md border border-[#dee2e6] shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 border-b border-gray-100 pb-3 mb-4">Uso de Infraestrutura</h3>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                <span>Licenças Microsoft 365</span>
                <span>87%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-[#E95C13] h-full rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                <span>Armazenamento AWS S3</span>
                <span>64%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};