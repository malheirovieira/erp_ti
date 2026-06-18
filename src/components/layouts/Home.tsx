import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { menuConfig } from '../../menuConfig';
import { useEmpresa } from '../../context/EmpresaContext';
import * as LucideIcons from 'lucide-react';

export const Home: React.FC = () => {
  const { empresa, corTema } = useEmpresa();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  
  const userSetor = localStorage.getItem('userSetor') || 'TI';
  const itensMenu = menuConfig[userSetor] || [];

  useEffect(() => {
    if (isSidebarOpen) {
      // Delay reduzido para 200ms para uma aparição mais rápida
      const timer = setTimeout(() => setShowFooter(true), 200);
      return () => clearTimeout(timer);
    } else {
      setShowFooter(false);
    }
  }, [isSidebarOpen]);

  return (
    <div className="h-screen w-screen flex flex-col font-sans overflow-hidden bg-[#f8f9fa]">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .fade-in { transition: opacity 0.3s ease-in-out; }
      `}</style>

      <header 
        className="px-6 flex items-center justify-between z-10 shrink-0 shadow-md" 
        style={{ height: '85px', backgroundColor: corTema }}
      >
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-white/20 rounded flex items-center justify-center font-bold text-white">EB</div>
          <span className="text-white font-bold text-lg">Portal Tecnologia | {empresa}</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`bg-white border-r border-[#dee2e6] h-full flex flex-col shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
          
          <div className="p-6 flex items-center justify-center">
             <LucideIcons.Menu 
                className="text-gray-400 cursor-pointer hover:text-[#E95C13] transition-colors" 
                size={20} 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
             />
          </div>

          <nav className="flex-1 overflow-y-auto no-scrollbar pt-2 space-y-0">
            {itensMenu.map((item) => {
              const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.LayoutDashboard;
              
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  // Fonte ajustada de text-base para text-sm
                  className="flex items-center gap-4 px-6 py-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#E95C13] transition-all border-l-4 border-transparent hover:border-[#E95C13]"
                >
                  <IconComponent size={22} />
                  {isSidebarOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {isSidebarOpen && (
            <div 
              title="Desenvolvido por Gabriel Malheiro e Henrique Arroyo."
              className={`p-4 text-[12px] text-gray-400 text-center font-medium fade-in cursor-help ${showFooter ? 'opacity-100' : 'opacity-0'}`}
            >
              © 2026 Tecnologia da Informação
            </div>
          )}
        </aside>

        <main className="flex-1 p-8 bg-[#f8f9fa] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};