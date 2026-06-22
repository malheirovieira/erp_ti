import React from 'react';

export const BackupsServidores: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">Backups & Servidores</h1>
        <p className="text-sm text-gray-500">Monitorização de rotinas de cópia de segurança.</p>
      </div>
      
      {/* Aqui você poderá adicionar a lógica de fetch para os dados do banco */}
      <div className="p-8 border border-dashed border-gray-300 rounded-lg text-center text-gray-500">
        Nenhum dado de backup disponível.
      </div>
    </div>
  );
};