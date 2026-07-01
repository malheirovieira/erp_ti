import React from 'react';
import { Avatar } from './Avatar';
import type { Conversa } from '../mocks/conversasMock';

interface Props {
  conversa: Conversa;
}

const tipoAvatar = (tipo: Conversa['tipo']) =>
  tipo === 'individual' ? 'pessoa' : tipo === 'grupo' ? 'grupo' : 'global';

export const ChatHeader: React.FC<Props> = ({ conversa }) => (
  <div className="h-16 shrink-0 border-b border-[#dee2e6] flex items-center justify-between px-5">
    <div className="flex items-center gap-3">
      {/* Força o tipo de avatar baseado na natureza real do chat aberto */}
      <Avatar nome={conversa.nome} tipo={tipoAvatar(conversa.tipo)} tamanho={36} />
      <div>
        <p className="text-[16px] font-medium text-gray-900">{conversa.nome}</p>
        <div className="text-xs text-gray-500 flex items-center gap-1.5">
          {conversa.tipo === 'individual' ? (
            <>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: conversa.online ? '#1e8e3e' : '#9aa3ad' }}
              />
              <span>{conversa.online ? 'online' : 'offline'}</span>
            </>
          ) : (
            <span>{conversa.participantes ?? 0} participantes</span>
          )}
        </div>
      </div>
    </div>
  </div>
);
