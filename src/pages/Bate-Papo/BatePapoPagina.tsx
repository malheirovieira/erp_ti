import React, { useEffect, useState } from 'react';
import { useBatePapo } from './context/BatePapoContext';
import { useUsuarioAtual } from './hooks/useUsuarioAtual';
import { ListaConversas } from './components/ListaConversas';
import { ChatHeader } from './components/ChatHeader';
import { MensagensLista } from './components/MensagensLista';
import { CaixaTexto } from './components/CaixaTexto';
import type { Conversa } from './mocks/conversasMock';
import type { PessoaSelecionavel } from './mocks/pessoasMock';
import { criarNovoCanal, fetchCanaisUsuario } from '../../services/api'; 

export const BatePapoPagina: React.FC = () => {
  const { mensagens, carregando, conectarCanal, enviarMensagem } = useBatePapo();
  const usuarioAtual = useUsuarioAtual();

  const [conversas, setConversas] = useState<Conversa[]>([]);
  const [conversaAtiva, setConversaAtiva] = useState<Conversa | null>(null);

  // AJUSTADO: Carrega o histórico passando o ID do usuário logado na URL sempre que o componente monta ou muda o ID
  useEffect(() => {
    if (!usuarioAtual?.id) return;

    fetchCanaisUsuario(usuarioAtual.id)
      .then((canais: any[]) => {
        if (!canais) return;
        const listaMapeada: Conversa[] = canais.map((canal) => ({
          id: canal.id,
          nome: canal.nome,
          tipo: canal.tipo.toLowerCase() === 'privado' ? 'individual' : 'grupo',
          preview: 'Clique para abrir',
          hora: 'Ativo',
          naoLidas: 0
        }));
        setConversas(listaMapeada);
      })
      .catch((err) => console.error('Erro ao buscar histórico de conversas:', err));
  }, [usuarioAtual?.id]);

  useEffect(() => {
    if (conversaAtiva) conectarCanal(conversaAtiva.id);
  }, [conversaAtiva?.id, conectarCanal]);

  const handleIniciarNovoChat = async (pessoas: PessoaSelecionavel[]) => {
    if (!pessoas || pessoas.length === 0) return;
    
    const usuarioSelecionado = pessoas[0];
    console.log('Iniciando chat via API com:', usuarioSelecionado);

    try {
      const canalCriado = await criarNovoCanal({
        nome: usuarioSelecionado.nome,
        tipo: 'PRIVADO',
        usuarioIds: [usuarioSelecionado.id]
      });

      const novaConversa: Conversa = {
        id: canalCriado.id, 
        nome: usuarioSelecionado.nome,
        tipo: 'individual', 
        preview: 'Conversa iniciada', 
        hora: 'Agora', 
        naoLidas: 0
      };

      setConversas((anteriores) => {
        const jaExiste = anteriores.some((c) => c.id === novaConversa.id);
        if (jaExiste) return anteriores;
        return [novaConversa, ...anteriores];
      });

      setConversaAtiva(novaConversa);

    } catch (err) {
      console.error('Erro ao iniciar novo chat no back-end:', err);
    }
  };

  return (
    <div className="flex h-full w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <ListaConversas
        conversas={conversas}
        conversaAtivaId={conversaAtiva?.id ?? 0}
        onSelecionar={setConversaAtiva}
        onIniciarNovoChat={handleIniciarNovoChat}
      />

      {conversaAtiva ? (
        <section className="flex-1 flex flex-col min-w-0">
          <ChatHeader conversa={conversaAtiva} />
          <MensagensLista mensagens={mensagens} conversa={conversaAtiva} usuarioAtualId={usuarioAtual.id} carregando={carregando} />
          <CaixaTexto placeholder={`Enviar mensagem para ${conversaAtiva.nome}`} onEnviar={(t) => enviarMensagem(conversaAtiva.id, t)} />
        </section>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">Selecione uma conversa</div>
      )}
    </div>
  );
};
