import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Headset, Eye, EyeOff } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
  
    setTimeout(() => {
      const usuarioFormatado = usuario.trim();
      
      // Recupera o tema específico deste usuário
      const temaUsuario = localStorage.getItem(`theme_${usuarioFormatado}`) as 'light' | 'dark' || 'light';
      
      // Aplica o tema ANTES de entrar no sistema
      setTheme(temaUsuario);
      
      localStorage.setItem('userName', usuarioFormatado);
      localStorage.setItem('userSetor', 'TI');
      localStorage.setItem('userCargo', 'Analista'); // Cargo definido para o usuário logado

      setCarregando(false);
      navigate('/home', { replace: true }); 
    }, 1000);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#f8f9fa] font-sans p-4">
      <div className="w-full max-w-md bg-white border border-[#dee2e6] rounded-md shadow-lg p-12 flex flex-col gap-8">
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-[#E95C13] rounded-full flex items-center justify-center text-white shadow-md">
            <Headset size={32} />
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight mt-1">Portal da Tecnologia</h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {erro && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-sm">⚠️ {erro}</div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Usuário ou E-mail</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Usuário ou usuario@email.com.br"
              className="w-full px-4 py-3 bg-gray-50 border border-[#dee2e6] rounded-sm text-sm outline-none focus:border-[#E95C13] focus:ring-1 focus:ring-[#E95C13] transition-all text-gray-800"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Senha</label>
            <div className="relative w-full">
              <input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-[#dee2e6] rounded-sm text-sm outline-none focus:border-[#E95C13] focus:ring-1 focus:ring-[#E95C13] transition-all pr-12 text-gray-800"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E95C13] transition-colors"
              >
                {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-[#E95C13] text-white font-bold text-sm py-4 rounded-sm hover:bg-[#d4500f] transition-all disabled:opacity-50 mt-2"
          >
            {carregando ? 'Autenticando...' : 'Entrar no Portal'}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Não possui cadastro?{' '}
          <button
            onClick={() => navigate('/cadastro')}
            className="text-[#E95C13] hover:underline font-bold transition-all"
          >
            Clique aqui e cadastre-se
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 text-[10px] uppercase tracking-widest font-semibold">
        © 2026 Tecnologia da Informação
      </div>
    </div>
  );
};