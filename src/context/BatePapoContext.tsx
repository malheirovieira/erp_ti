import React, { createContext, useContext, useState } from 'react';
import batePapoService from '../services/BatePapoService';

interface BatePapoContextType {
  mensagens: any[];
  enviarMensagem: (canalId: number, conteudo: string) => void;
  carregarHistorico: (canalId: number) => void;
  conectarCanal: (canalId: number) => void;
}

const BatePapoContext = createContext<BatePapoContextType | undefined>(undefined);

export const BatePapoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mensagens, setMensagens] = useState<any[]>([]);

  // Conecta ao servidor e assina o canal após confirmação de conexão
  const conectarCanal = (canalId: number) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error("Token não encontrado. Não é possível conectar ao BatePapo.");
      return;
    }

    batePapoService.connect(token, () => {
      console.log("Conectado ao WebSocket com sucesso!");
      
      // Realiza a inscrição no canal após o sucesso da conexão
      batePapoService.subscribe(canalId, (novaMensagem) => {
        setMensagens((prev) => [...prev, novaMensagem]);
      });
    });
  };

  const enviarMensagem = (canalId: number, conteudo: string) => {
    // ID do usuário pode ser pego do localStorage ou de um AuthContext
    const remetenteId = parseInt(localStorage.getItem('userId') || '1'); 
    batePapoService.sendMessage(canalId, remetenteId, conteudo);
  };

  const carregarHistorico = async (canalId: number) => {
    // Exemplo: 
    // const response = await api.get(`/api/batepapo/historico/${canalId}`);
    // setMensagens(response.data);
  };

  return (
    <BatePapoContext.Provider value={{ mensagens, enviarMensagem, carregarHistorico, conectarCanal }}>
      {children}
    </BatePapoContext.Provider>
  );
};

export const useBatePapo = () => {
  const context = useContext(BatePapoContext);
  if (!context) throw new Error("useBatePapo deve ser usado dentro de um BatePapoProvider");
  return context;
};