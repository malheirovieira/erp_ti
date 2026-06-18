import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Eye, EyeOff } from 'lucide-react';

export const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const setoresDisponiveis = [
    'TI', 'RH', 'DP', 'COMPRAS', 'COMERCIAL', 'FINANCEIRO', 
    'DP', 'TST', 'QUALIDADE', 'PCP', 'OPERACIONAL', 'DIRETORIA'
  ];

  const [formData, setFormData] = useState({ nome: '', email: '', setor: '', senha: '' });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostraOpcoes, setMostraOpcoes] = useState(false);

  const setoresFiltrados = setoresDisponiveis.filter((s) =>
    s.toLowerCase().includes(formData.setor.toLowerCase())
  );

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados de cadastro:', formData);
    alert('Cadastro enviado para análise de um administrador.');
    navigate('/login-admin');
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] font-sans p-4">
      
      {/* Container Principal */}
      <div className="w-full max-w-md bg-white border border-[#dee2e6] rounded-md shadow-lg p-12 flex flex-col gap-8">
        
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-[#E95C13] rounded-full flex items-center justify-center text-white shadow-md">
            <UserPlus size={32} />
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight mt-1">Novo Cadastro</h1>
        </div>

        <form onSubmit={handleCadastro} className="flex flex-col gap-5">
          
          {/* Nome */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Nome Completo</label>
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full px-4 py-3 bg-gray-50 border border-[#dee2e6] rounded-sm text-sm outline-none focus:border-[#E95C13] focus:ring-1 focus:ring-[#E95C13] transition-all"
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">E-mail Corporativo</label>
            <input
              type="email"
              placeholder="Email@empresa.com.br"
              className="w-full px-4 py-3 bg-gray-50 border border-[#dee2e6] rounded-sm text-sm outline-none focus:border-[#E95C13] focus:ring-1 focus:ring-[#E95C13] transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          {/* Setor (Com filtro) */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Setor</label>
            <input
              type="text"
              placeholder="Digite para buscar seu setor..."
              value={formData.setor}
              className="w-full px-4 py-3 bg-gray-50 border border-[#dee2e6] rounded-sm text-sm outline-none focus:border-[#E95C13] focus:ring-1 focus:ring-[#E95C13] transition-all"
              onChange={(e) => {
                setFormData({...formData, setor: e.target.value});
                setMostraOpcoes(true);
              }}
              onFocus={() => setMostraOpcoes(true)}
              required
            />
            
            {/* Dropdown de Sugestões */}
            {mostraOpcoes && formData.setor && (
              <div className="absolute top-[75px] left-0 w-full bg-white border border-[#dee2e6] rounded-sm shadow-xl z-20 max-h-40 overflow-y-auto">
                {setoresFiltrados.length > 0 ? (
                  setoresFiltrados.map((s) => (
                    <div
                      key={s}
                      onClick={() => {
                        setFormData({...formData, setor: s});
                        setMostraOpcoes(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-[#E95C13] hover:text-white cursor-pointer transition-colors"
                    >
                      {s}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-400">Setor não encontrado</div>
                )}
              </div>
            )}
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Definir Senha</label>
            <div className="relative w-full">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-[#dee2e6] rounded-sm text-sm outline-none focus:border-[#E95C13] focus:ring-1 focus:ring-[#E95C13] transition-all pr-12"
                onChange={(e) => setFormData({...formData, senha: e.target.value})}
                required
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
            className="w-full bg-[#E95C13] text-white font-bold text-sm py-4 rounded-sm hover:bg-[#d4500f] transition-all mt-2 cursor-pointer"
          >
            Solicitar Acesso
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Já possui conta?{' '}
          <button
            onClick={() => navigate('/login-admin')}
            className="text-[#E95C13] hover:underline font-bold transition-all"
          >
            Voltar para o Login
          </button>
        </div>
      </div>

      {/* Rodapé */}
      <div className="mt-8 text-center text-gray-400 text-[10px] uppercase tracking-widest font-semibold">
        © 2026 Tecnologia da Informação
      </div>
    </div>
  );
};