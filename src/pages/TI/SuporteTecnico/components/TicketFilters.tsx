import { Search } from 'lucide-react';

export default function TicketFilters() {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl mb-6 flex flex-wrap gap-4 items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Buscar chamado por ID ou título..." 
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" 
        />
      </div>
      
      {/* Exemplo de select que você já tem no seu layout */}
      <select className="border border-gray-300 rounded-md px-4 py-2">
        <option>Filtrar por Categoria</option>
      </select>
      
      <select className="border border-gray-300 rounded-md px-4 py-2">
        <option>Filtrar por Prioridade</option>
      </select>
    </div>
  );
}