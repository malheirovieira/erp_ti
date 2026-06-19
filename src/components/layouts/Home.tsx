import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { menuConfig } from '../../menuConfig';
import { useEmpresa } from '../../context/EmpresaContext';
import * as LucideIcons from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { MenuBar } from '../layouts/MenuBar';
import { ProfileMenuModal } from '../layouts/ProfileMenuModal';

export const Home: React.FC = () => {
  const { empresa, corTema } = useEmpresa();
  const { theme, toggleTheme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const nomeUsuario = localStorage.getItem('userName') || 'Usuário';
  const userSetor = localStorage.getItem('userSetor') || 'TI';

  const itensMenuRaw = (menuConfig as any)[userSetor] || [];

  const itensMenu = useMemo(() => {
    const lista = [...itensMenuRaw];
    const indexVisaoGeral = lista.findIndex(
      (item: any) => item.label.toLowerCase() === 'visão geral'
    );
    
    if (indexVisaoGeral > 0) {
      const [visaoGeral] = lista.splice(indexVisaoGeral, 1);
      lista.unshift(visaoGeral);
    }
    return lista;
  }, [itensMenuRaw]);

  const getIniciais = (nome: string) => {
    const partes = nome.split(' ');
    if (partes.length >= 2) return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
    return nome.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    setIsMenuBarOpen(false);
    setIsLoggingOut(true);
    
    if (nomeUsuario) {
      localStorage.setItem(`theme_${nomeUsuario}`, theme);
    }
    
    setTimeout(() => {
      setTheme('light');
      localStorage.removeItem('userName');
      localStorage.removeItem('userSetor');
      navigate('/login');
    }, 1000);
  };

  const menuPerfilItens = useMemo(() => [
    { label: 'Meu Perfil', icon: 'User', action: () => setIsProfileModalOpen(true) },
    { label: 'Ajuda', icon: 'LifeBuoy', action: () => console.log('Ajuda') },
    { 
      label: theme === 'light' ? 'Modo Escuro' : 'Modo Claro', 
      icon: theme === 'light' ? 'Moon' : 'Sun', 
      action: toggleTheme
    },
  ], [theme, toggleTheme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsMenuBarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`h-screen w-screen flex flex-col font-sans overflow-hidden transition-colors duration-700 animate-page-in ${theme === 'dark' ? 'bg-[#35363a]' : 'bg-[#f8f9fa]'}`}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .dark main h1, .dark main h2, .dark main h3, .dark main p, .dark main span, .dark main .bg-white { transition: color 0.7s ease-in-out, background-color 0.7s ease-in-out, border-color 0.7s ease-in-out !important; }
        .dark main h1, .dark main h2, .dark main h3, .dark main .text-gray-900, .dark main .text-gray-800, .dark main .text-slate-900, .dark main .text-slate-800 { color: #e8eaed !important; }
        .dark main p, .dark main .text-gray-600, .dark main .text-gray-500, .dark main .text-gray-400, .dark main .text-slate-600, .dark main .text-slate-500, .dark main .text-slate-400 { color: #b0b3b8 !important; }
        .dark main .bg-white { background-color: #404145 !important; border-color: #4a4b50 !important; }
        @keyframes customFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-custom-fade { animation: customFadeIn 0.5s ease-in-out forwards; }
        @keyframes pageFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-page-in { animation: pageFadeIn 0.7s ease-in-out forwards; }
      `}</style>

      <header 
        className="px-6 flex items-center justify-between z-20 shrink-0 shadow-[0_7px_10px_rgba(0,0,0,0.15)] transition-colors duration-700" 
        style={{ height: '85px', backgroundColor: theme === 'dark' ? '#202124' : corTema }}
      >
        <div className="flex items-center gap-4">
          <span className="text-white font-bold text-lg">Portal Tecnologia {empresa}</span>
        </div>

        <div className="flex items-center gap-6 ml-auto relative" ref={profileRef}>
          <LucideIcons.Bell className="text-white cursor-pointer hover:text-gray-300 transition-colors" size={24} />
          
          <div 
            onClick={() => setIsMenuBarOpen(!isMenuBarOpen)}
            className={`flex items-center gap-3 px-5 py-2.5 rounded-full cursor-pointer transition-all shadow-md border min-w-[160px] justify-start ${
              theme === 'dark' 
                ? 'bg-[#404145] border-[#4a4b50] text-white hover:bg-[#4a4b50]' 
                : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
            }`}
          >
            <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs shrink-0 ${theme === 'dark' ? 'text-[#202124]' : 'text-gray-800'}`}>
              {getIniciais(nomeUsuario)}
            </div>
            <span className="text-white font-medium text-sm pr-2 whitespace-nowrap overflow-hidden text-ellipsis">
              {nomeUsuario}
            </span>
          </div>

          <MenuBar 
            isOpen={isMenuBarOpen}
            onClose={() => setIsMenuBarOpen(false)}
            menuItems={menuPerfilItens}
            nomeUsuario={nomeUsuario}
            userSetor={userSetor}
            onLogout={handleLogout}
            theme={theme}
          />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`border-r h-full flex flex-col shrink-0 transition-all duration-700 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} ${theme === 'dark' ? 'bg-[#2a2b2e] border-[#35363a]' : 'bg-white border-[#dee2e6]'}`}>
          <div className="p-6 flex items-center justify-center">
             <LucideIcons.Menu className="text-gray-400 cursor-pointer hover:text-[#E95C13] transition-colors" size={20} onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          </div>
          <nav className="flex-1 overflow-y-auto no-scrollbar pt-2 space-y-0">
            {itensMenu.map((item: any) => {
              const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.LayoutDashboard;
              const normalizedPath = String(item.path).startsWith('/') ? item.path : `/${item.path}`;
              const isActive = location.pathname.includes(normalizedPath);
              return (
                <Link key={item.path} to={item.path} className={`flex items-center gap-4 px-6 py-3 text-sm transition-all duration-200 border-l-4 ${isActive ? 'border-[#E95C13]' : 'border-transparent hover:border-[#E95C13]'} ${theme === 'dark' ? isActive ? 'text-[#E95C13] bg-[#404145]' : 'text-[#e8eaed] hover:bg-[#404145] hover:text-[#E95C13]' : isActive ? 'text-[#E95C13] bg-orange-50' : 'text-gray-600 hover:bg-orange-50 hover:text-[#E95C13]'}`}>
                  <IconComponent size={22} className={`shrink-0 ${isActive ? 'text-[#E95C13]' : ''}`} />
                  <span className={`font-medium whitespace-nowrap transition-all duration-700 ease-in-out ${isSidebarOpen ? 'opacity-100 max-w-[200px] translate-x-0 delay-200' : 'opacity-0 max-w-0 overflow-hidden -translate-x-4 pointer-events-none'}`}>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div title="Desenvolvido por Gabriel Malheiro e Henrique Arroyo." className={`p-4 text-[12px] text-center font-medium text-gray-400 cursor-help transition-opacity duration-700 ease-in-out whitespace-nowrap overflow-hidden ${isSidebarOpen ? 'opacity-100 delay-300' : 'opacity-0 delay-0 pointer-events-none'}`}>
            © 2026 Tecnologia da Informação
          </div>
        </aside>

        <main className={`flex-1 p-8 overflow-y-auto transition-colors duration-700 ${theme === 'dark' ? 'bg-[#35363a]' : 'bg-[#f8f9fa]'}`} onClick={() => setIsMenuBarOpen(false)}>
          <Outlet />
        </main>
      </div>

      <ProfileMenuModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        userName={nomeUsuario} 
      />

      {isLoggingOut && (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center backdrop-blur-md animate-custom-fade ${theme === 'dark' ? 'bg-[#202124]/90' : 'bg-white/90'}`}>
          <LucideIcons.Loader2 className="animate-spin text-[#E95C13] mb-4" size={42} />
          <p className={`text-base font-semibold animate-pulse tracking-wide ${theme === 'dark' ? 'text-[#e8eaed]' : 'text-gray-700'}`}>Encerrando sessão...</p>
        </div>
      )}
    </div>
  );
};