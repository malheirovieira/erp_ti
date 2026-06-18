import React, { useState } from 'react';

interface ServidorBackup {
  id: string;
  servidor: string;
  banco: string;
  marca: 'Engebag' | 'Bag Cleaner';
  tipo: 'Full' | 'Incremental';
  status: 'Sucesso' | 'Falha' | 'Em execução';
  tamanho: string;
  ultimaExecucao: string;
}

export const BackupsServidores: React.FC = () => {
  const [backups] = useState<ServidorBackup[]>([
    {
      id: "BK-9842",
      servidor: "SRV-ERP-PROD",
      banco: "RM_ENGEBAG",
      marca: "Engebag",
      tipo: "Full",
      status: "Sucesso",
      tamanho: "245 GB",
      ultimaExecucao: "18/06/2026 02:00"
    },
    {
      id: "BK-9843",
      servidor: "SRV-ERP-PROD",
      banco: "RM_BAGCLEANER",
      marca: "Bag Cleaner",
      tipo: "Full",
      status: "Falha",
      tamanho: "12 GB",
      ultimaExecucao: "18/06/2026 02:14"
    },
    {
      id: "BK-9844",
      servidor: "SRV-PONTOSYST",
      banco: "PONTO_BIOMETRIA",
      marca: "Engebag",
      tipo: "Incremental",
      status: "Sucesso",
      tamanho: "4.2 GB",
      ultimaExecucao: "18/06/2026 06:00"
    },
    {
      id: "BK-9846",
      servidor: "SRV-CLOUD-SYNC",
      banco: "DIRETORIAS_INFO",
      marca: "Engebag",
      tipo: "Incremental",
      status: "Em execução",
      tamanho: "--",
      ultimaExecucao: "18/06/2026 13:00"
    }
  ]);

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">Backups & Servidores</h1>
        <p className="text-sm text-gray-500">Monitorização de rotinas de cópia de segurança, integridade e storages ativos.</p>
      </div>

      {/* Listagem de Backups */}
      <div className="bg-white border border-[#dee2e6] rounded-md shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#dee2e6] bg-gray-50/50 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Jobs de Cópia de Segurança</span>
          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-mono font-bold">{backups.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-[#dee2e6] text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-4 pl-6">ID / Marca</th>
                <th className="p-4">Servidor / BD</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">Última Execução</th>
                <th className="p-4">Tamanho</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dee2e6]">
              {backups.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="font-mono text-xs text-gray-400">{job.id}</div>
                    <div className="mt-1">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        job.marca === 'Engebag' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-orange-50 text-orange-800 border border-orange-100'
                      }`}>
                        {job.marca}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-800 text-xs">{job.servidor}</div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">{job.banco}</div>
                  </td>
                  <td className="p-4 text-xs font-medium text-gray-600">{job.tipo}</td>
                  <td className="p-4 text-xs font-mono text-gray-500">{job.ultimaExecucao}</td>
                  <td className="p-4 text-xs font-mono font-semibold text-gray-700">{job.tamanho}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-sm ${
                      job.status === 'Sucesso' ? 'bg-green-50 text-green-700' :
                      job.status === 'Falha' ? 'bg-red-50 text-red-700 border border-red-100' :
                      'bg-blue-50 text-blue-600 animate-pulse'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        job.status === 'Sucesso' ? 'bg-green-600' :
                        job.status === 'Falha' ? 'bg-red-600' : 'bg-blue-500'
                      }`} />
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};