import React, { useState } from 'react'; // Adicionado useState
import { Link, Outlet } from 'react-router-dom';
import { menuConfig } from '../../menuConfig';
import { useEmpresa } from '../../context/EmpresaContext';
import { Menu, LayoutDashboard } from 'lucide-react';

export const Home: React.FC = () => { // Nome alterado
  const { empresa, corTema } = useEmpresa();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado do Toggle
  
  const userSetor = localStorage.getItem('userSetor') || 'TI';
  const itensMenu = menuConfig[userSetor] || [];

  return (
    <div className="h-screen w-screen flex flex-col font-sans overflow-hidden bg-[#f8f9fa]">
      <header 
        className="px-6 flex items-center justify-between z-10 shrink-0 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-colors duration-300" 
        style={{ height: '70px', backgroundColor: corTema }}
      >
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-white/20 rounded flex items-center justify-center font-bold text-white border border-white/30">EB</div>
          <span className="text-white font-bold text-lg tracking-wide">Portal Tecnologia | {empresa}</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR COM LARGURA DINÂMICA */}
        <aside className={`bg-white border-r border-[#dee2e6] h-full flex flex-col shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
             {isSidebarOpen && <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Menu Principal</span>}
             <Menu 
                className="text-gray-400 cursor-pointer hover:text-gray-600 ml-auto" 
                size={18} 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle do estado
             />
          </div>

          <nav className="flex-1 overflow-y-auto pt-4">
            {itensMenu.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="flex items-center gap-3 px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#E95C13] transition-all border-l-4 border-transparent hover:border-[#E95C13]"
              >
                <LayoutDashboard size={18} />
                {isSidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* RODAPÉ CONDICIONAL */}
          <div className="p-6 border-t border-gray-100 text-gray-400 flex flex-col items-center">
            {isSidebarOpen ? (
                <>
                    <div className="text-[11px] font-mono w-full text-left">{new Date().toLocaleString()}</div>
                    <div className="text-[10px] mt-1 opacity-75 w-full text-left">© 2026 Engebag | Dev. TI</div>
                </>
            ) : (
                <div className="text-[10px] font-mono">2026</div>
            )}
          </div>
        </aside>

        <main className="flex-1 p-8 bg-[#f8f9fa] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};