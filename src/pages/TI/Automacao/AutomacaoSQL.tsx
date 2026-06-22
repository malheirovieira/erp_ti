import React, { useState } from 'react';

interface ScriptPreDefinido {
  id: number;
  nome: string;
  descricao: string;
  categoria: 'RM TOTVS' | 'Bag Cleaner' | 'Infra';
  sql: string;
}

export const AutomacaoSQL: React.FC = () => {
  // Lista de scripts comumente utilizados na rotina administrativa
  const scriptsOrcamentarios: ScriptPreDefinido[] = [
    {
      id: 1,
      nome: 'Buscar Clientes com CFO Duplicado',
      descricao: 'Identifica divergências de cadastro de clientes/fornecedores no RM.',
      categoria: 'RM TOTVS',
      sql: 'SELECT CODCFO, NOME, CGCCFO, COUNT(*) \nFROM FCFO \nGROUP BY CODCFO, NOME, CGCCFO \nHAVING COUNT(*) > 1;',
    },
    {
      id: 2,
      nome: 'Log de Erros de Integração Recentes',
      descricao: 'Lista os últimos erros gerados nas APIs de integração do Bag Cleaner.',
      categoria: 'Bag Cleaner',
      sql: 'SELECT TOP 50 DATA_ERRO, MENSAGEM, ENDPOINT \nFROM LOG_INTEGRACAO_CLEANER \nWHERE STATUS = \'ERRO\' \nORDER BY DATA_ERRO DESC;',
    },
    {
      id: 3,
      nome: 'Validar Fórmulas Ativas por Usuário',
      descricao: 'Retorna fórmulas de automação internas do sistema e permissões associadas.',
      categoria: 'RM TOTVS',
      sql: 'SELECT CODCOLIGADA, CODFORMULA, DESCRICAO \nFROM GFORMULA \nWHERE ATIVO = 1;',
    },
  ];

  const [scriptSelecionado, setScriptSelecionado] = useState<ScriptPreDefinido | null>(null);
  const [queryPersonalizada, setQueryPersonalizada] = useState<string>('');
  const [carregando, setCarregando] = useState<boolean>(false);
  const [resultado, setResultado] = useState<any[] | null>(null);

  const carregarScript = (script: ScriptPreDefinido) => {
    setScriptSelecionado(script);
    setQueryPersonalizada(script.sql);
    setResultado(null);
  };

  const executarQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryPersonalizada.trim()) return;

    setCarregando(true);
    // Simulação de execução na API do backend
    setTimeout(() => {
      setResultado([
        { ID: 1042, CAMPO_ALTERADO: 'FCFO.NOME', VALOR_ANTIGO: 'ENGEBAG IND', VALOR_NOVO: 'ENGEBAG EMBALAGENS', RESPONSAVEL: 'ti_admin' },
        { ID: 1043, CAMPO_ALTERADO: 'FCFO.CGCCFO', VALOR_ANTIGO: '00.000.000/0001-00', VALOR_NOVO: '12.345.678/0001-99', RESPONSAVEL: 'ti_admin' },
      ]);
      setCarregando(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">Automação SQL</h1>
        <p className="text-sm text-gray-500">Execução rápida de rotinas, consultas homologadas e auditorias de banco de dados.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Painel Esquerdo: Biblioteca de Scripts */}
        <div className="bg-white p-5 rounded-md border border-[#dee2e6] shadow-sm flex flex-col gap-4">
          <h3 className="text-sm font-bold text-gray-700 border-b border-gray-100 pb-2">Scripts Homologados</h3>
          
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px] pr-1">
            {scriptsOrcamentarios.map((script) => (
              <button
                key={script.id}
                onClick={() => carregarScript(script)}
                className={`w-full text-left p-3.5 rounded border transition-all cursor-pointer flex flex-col gap-1 ${
                  scriptSelecionado?.id === script.id
                    ? 'border-[#E95C13] bg-orange-50/40'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-bold text-xs text-gray-800 truncate max-w-[180px]">{script.nome}</span>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                    script.categoria === 'RM TOTVS' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {script.categoria}
                  </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">{script.descricao}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Painel Direito: Editor e Resultado */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Console / Editor */}
          <div className="bg-white p-5 rounded-md border border-[#dee2e6] shadow-sm">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Console de Execução</h3>
            <form onSubmit={executarQuery} className="flex flex-col gap-4">
              <textarea
                value={queryPersonalizada}
                onChange={(e) => setQueryPersonalizada(e.target.value)}
                placeholder="SELECT * FROM TABELA WHERE..."
                className="w-full h-44 p-4 font-mono text-sm bg-gray-900 text-green-400 rounded border border-gray-800 focus:outline-none focus:ring-1 focus:ring-[#E95C13] resize-none"
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  ⚠️ Certifique-se de validar a query em ambiente de homologação antes de rodar em produção.
                </span>
                <button
                  type="submit"
                  disabled={carregando}
                  className="bg-[#E95C13] text-white font-bold text-xs px-6 py-2.5 rounded hover:bg-[#d4500f] transition-all cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {carregando ? 'Executando...' : 'Executar Query'}
                </button>
              </div>
            </form>
          </div>

          {/* Área de Resultados */}
          <div className="bg-white p-5 rounded-md border border-[#dee2e6] shadow-sm flex-1 min-h-[220px]">
            <h3 className="text-sm font-bold text-gray-700 border-b border-gray-100 pb-2 mb-4">Resultado da Consulta</h3>
            
            {carregando && (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <div className="w-6 h-6 border-2 border-[#E95C13] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs text-gray-500 font-medium">Buscando dados nos servidores...</span>
              </div>
            )}

            {!carregando && !resultado && (
              <div className="text-center py-12 text-gray-400 text-xs">
                Selecione um script ou digite uma instrução SQL para visualizar o retorno da tabela.
              </div>
            )}

            {!carregando && resultado && (
              <div className="overflow-x-auto border border-gray-200 rounded">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 font-bold text-gray-700">
                      <th className="p-3">ID</th>
                      <th className="p-3">CAMPO_ALTERADO</th>
                      <th className="p-3">VALOR_ANTIGO</th>
                      <th className="p-3">VALOR_NOVO</th>
                      <th className="p-3">RESPONSÁVEL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-600 font-mono">
                    {resultado.map((linha, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="p-3">{linha.ID}</td>
                        <td className="p-3 text-blue-600 font-medium">{linha.CAMPO_ALTERADO}</td>
                        <td className="p-3 text-red-600">{linha.VALOR_ANTIGO}</td>
                        <td className="p-3 text-green-600">{linha.VALOR_NOVO}</td>
                        <td className="p-3 font-sans">{linha.RESPONSAVEL}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};