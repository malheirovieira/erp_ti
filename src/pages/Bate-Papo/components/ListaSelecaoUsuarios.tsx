import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from './Avatar';
import type { PessoaSelecionavel } from '../mocks/pessoasMock';
import { fetchUsuariosChat } from '../../../services/api';

interface Props {
  onSelecionar: (pessoas: PessoaSelecionavel[]) => void;
  onFechar: () => void;
}

export const ListaSelecaoUsuarios: React.FC<Props> = ({ onSelecionar, onFechar }) => {
  const [usuarios, setUsuarios] = useState<PessoaSelecionavel[]>([]);
  const [busca, setBusca] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUsuariosChat()
      .then((dados) => {
        setUsuarios(dados || []);
      })
      .catch((err) => {
        console.error("Erro ao carregar usuários do chat:", err);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onFechar();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onFechar]);

  const filtrados = usuarios.filter((u) =>
    u.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      {/* CSS para esconder o scrollbar sem perder a funcionalidade */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div 
        ref={dropdownRef}
        className="w-full h-full bg-white border-2 border-[#E95C13] shadow-lg rounded-xl overflow-hidden flex flex-col transition-all duration-300"
      >
        {/* Container do campo de busca reduzido com a lupa */}
        <div className="p-2 bg-white shrink-0">
          <div className="flex items-center gap-1.5 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-200 transition-all duration-300 focus-within:bg-white focus-within:border-[#E95C13]">
            {/* Lupa reduzida para 15px */}
            <svg 
              width="15" 
              height="15" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#5f6368" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            {/* Input e texto reduzidos para text-[13px] */}
            <input
              autoFocus
              className="w-full bg-transparent outline-none text-[13px] text-gray-800"
              placeholder="Buscar usuário..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {filtrados.length > 0 ? (
            filtrados.map((u) => (
              <div
                key={u.id}
                onClick={() => { onSelecionar([u]); onFechar(); }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 cursor-pointer transition-colors border-b border-gray-50 last:border-none"
              >
                <Avatar nome={u.nome} tamanho={32} />
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-gray-800">{u.nome}</span>
                  <span className="text-[11px] text-gray-400">{u.email}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-sm text-gray-400 text-center">Nenhum encontrado</p>
          )}
        </div>
      </div>
    </>
  );
};
