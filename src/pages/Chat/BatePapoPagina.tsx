import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useBatePapo } from '../../context/BatePapoContext';

// ---------------------------------------------------------------------------
// TODO: substitua pelo ID do usuário logado (ex: via useAuth() / useUsuario())
// Usado para decidir se uma mensagem é "minha" (alinhada à direita, sem cor de nome)
// ---------------------------------------------------------------------------
const USUARIO_ATUAL_ID = 1;

type TipoConversa = 'individual' | 'grupo' | 'global';

interface Conversa {
  id: number;          // id do canal (usado em conectarCanal / enviarMensagem)
  nome: string;
  tipo: TipoConversa;
  preview: string;
  hora: string;
  naoLidas?: number;
  online?: boolean;
  participantes?: number;
}

// ---------------------------------------------------------------------------
// TODO: substituir por dados reais vindos do backend/contexto
// (ex: useBatePapo() poderia expor `canais: Conversa[]`)
// ---------------------------------------------------------------------------
const CONVERSAS_MOCK: Conversa[] = [
  { id: 99, nome: 'Chat Global — Engebag', tipo: 'global', preview: 'Canal aberto para toda a empresa', hora: 'agora', participantes: 312 },
  { id: 1, nome: 'Mariana Souza', tipo: 'individual', preview: 'Beleza, já chamo o suporte então', hora: '09:42', naoLidas: 2, online: true },
  { id: 2, nome: 'Carlos Eduardo', tipo: 'individual', preview: 'Valeu, era isso mesmo!', hora: '08:15', online: true },
  { id: 3, nome: 'Fernanda Lima', tipo: 'individual', preview: 'Te mando o print em instantes', hora: 'Ontem', online: false },
  { id: 10, nome: 'Equipe TI', tipo: 'grupo', preview: 'João: Subi a correção em produção', hora: '10:05', naoLidas: 5, participantes: 4 },
  { id: 11, nome: 'Suporte Técnico — Filial Centro', tipo: 'grupo', preview: 'Você: Resolvido, pode fechar', hora: 'Ontem', participantes: 3 },
];

const CORES = ['#E95C13', '#1a73e8', '#1e8e3e', '#7e22ce', '#eab308', '#0891b2', '#d33b2c'];

function iniciais(nome: string) {
  return nome
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function corPara(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = seed.charCodeAt(i) + ((h << 5) - h);
  return CORES[Math.abs(h) % CORES.length];
}

export const BatePapoPagina: React.FC = () => {
  const { mensagens, conectarCanal, enviarMensagem } = useBatePapo();

  const [abaAtiva, setAbaAtiva] = useState<'individual' | 'grupos' | 'global'>('individual');
  const [conversaAtivaId, setConversaAtivaId] = useState<number>(CONVERSAS_MOCK[1].id);
  const [texto, setTexto] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversaAtiva = useMemo(
    () => CONVERSAS_MOCK.find((c) => c.id === conversaAtivaId)!,
    [conversaAtivaId]
  );

  // mapeia aba -> tipo de conversa
  const tipoPorAba: Record<typeof abaAtiva, TipoConversa> = {
    individual: 'individual',
    grupos: 'grupo',
    global: 'global',
  };

  const conversasDaAba = useMemo(
    () => CONVERSAS_MOCK.filter((c) => c.tipo === tipoPorAba[abaAtiva]),
    [abaAtiva]
  );

  // conecta ao canal real sempre que a conversa ativa muda
  useEffect(() => {
    conectarCanal(conversaAtivaId);
  }, [conversaAtivaId, conectarCanal]);

  // rola para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  const handleSelecionarAba = (aba: typeof abaAtiva) => {
    setAbaAtiva(aba);
    const primeira = CONVERSAS_MOCK.find((c) => c.tipo === tipoPorAba[aba]);
    if (primeira) setConversaAtivaId(primeira.id);
  };

  const handleEnviar = () => {
    const conteudo = texto.trim();
    if (!conteudo) return;
    enviarMensagem(conversaAtivaId, conteudo);
    setTexto('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEnviar();
    }
  };

  const isQuadrado = conversaAtiva.tipo !== 'individual';

  return (
    <div className="flex h-full overflow-hidden bg-white">
      {/* ===================== LISTA LATERAL ===================== */}
      <aside className="w-[300px] shrink-0 border-r border-[#dee2e6] flex flex-col">
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-[22px] font-normal text-gray-900 mb-3">Bate-Papo</h1>
          <div className="flex items-center gap-2 bg-[#f8f9fa] rounded-full px-3.5 py-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Buscar pessoas, espaços..."
              className="bg-transparent outline-none text-sm w-full text-gray-700"
            />
          </div>
        </div>

        {/* abas */}
        <div className="flex border-b border-[#dee2e6] px-2 mt-2">
          {([
            { key: 'individual', label: 'Conversas' },
            { key: 'grupos', label: 'Grupos' },
            { key: 'global', label: 'Global' },
          ] as const).map((aba) => (
            <button
              key={aba.key}
              onClick={() => handleSelecionarAba(aba.key)}
              className={`flex-1 text-center py-2.5 text-[13px] font-semibold border-b-2 transition-colors ${
                abaAtiva === aba.key
                  ? 'text-[#E95C13] border-[#E95C13]'
                  : 'text-gray-500 border-transparent hover:text-[#E95C13]'
              }`}
            >
              {aba.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {conversasDaAba.map((conv) => {
            const ativa = conv.id === conversaAtivaId;
            const cor = corPara(conv.nome);
            return (
              <div
                key={conv.id}
                onClick={() => setConversaAtivaId(conv.id)}
                className={`flex items-center gap-3 px-4 py-2 mr-2 rounded-r-full cursor-pointer ${
                  ativa ? 'bg-orange-50' : 'hover:bg-[#f1f3f4]'
                }`}
              >
                <div
                  className={`relative w-8 h-8 flex items-center justify-center text-white text-xs font-semibold shrink-0 ${
                    conv.tipo === 'individual' ? 'rounded-full' : 'rounded-lg'
                  }`}
                  style={{ backgroundColor: cor }}
                >
                  {conv.tipo === 'global' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
                    </svg>
                  ) : conv.tipo === 'grupo' ? (
                    '#'
                  ) : (
                    iniciais(conv.nome)
                  )}
                  {conv.online !== undefined && (
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                      style={{ backgroundColor: conv.online ? '#1e8e3e' : '#9aa3ad' }}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[13.5px] truncate ${
                      ativa ? 'text-[#E95C13] font-bold' : 'text-gray-900 font-medium'
                    }`}
                  >
                    {conv.nome}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[170px]">{conv.preview}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[11px] text-gray-500">{conv.hora}</span>
                  {!!conv.naoLidas && <span className="w-2 h-2 rounded-full bg-[#E95C13]" />}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* ===================== PAINEL DO CHAT ===================== */}
      <section className="flex-1 flex flex-col min-w-0">
        {/* cabeçalho */}
        <div className="h-16 shrink-0 border-b border-[#dee2e6] flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 flex items-center justify-center text-white text-sm font-semibold ${
                isQuadrado ? 'rounded-lg' : 'rounded-full'
              }`}
              style={{ backgroundColor: corPara(conversaAtiva.nome) }}
            >
              {conversaAtiva.tipo === 'global' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
                </svg>
              ) : conversaAtiva.tipo === 'grupo' ? (
                '#'
              ) : (
                iniciais(conversaAtiva.nome)
              )}
            </div>
            <div>
              <p className="text-[16px] font-medium text-gray-900">{conversaAtiva.nome}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                {conversaAtiva.tipo === 'individual' ? (
                  <>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: conversaAtiva.online ? '#1e8e3e' : '#9aa3ad' }}
                    />
                    {conversaAtiva.online ? 'online' : 'offline'}
                  </>
                ) : (
                  `${conversaAtiva.participantes ?? 0} participantes`
                )}
              </p>
            </div>
          </div>
        </div>

        {/* mensagens (dados reais do contexto) */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {conversaAtiva.tipo === 'global' && (
            <div className="bg-orange-50 text-[#E95C13] text-[12.5px] font-medium px-3.5 py-2.5 rounded-lg mb-4">
              Espaço visível para todos os colaboradores da empresa
            </div>
          )}

          {mensagens.length === 0 && (
            <p className="text-sm text-gray-400 text-center mt-8">
              Nenhuma mensagem ainda. Diga oi 👋
            </p>
          )}

          {mensagens.map((msg, index) => {
            const ehMinha = msg.remetente?.id === USUARIO_ATUAL_ID;
            const mostrarCabecalho =
              index === 0 || mensagens[index - 1]?.remetente?.id !== msg.remetente?.id;
            const nome = ehMinha ? 'Você' : msg.remetente?.nome ?? 'Desconhecido';
            const cor = corPara(nome);

            return (
              <div key={index} className="flex gap-3 px-2 py-1 -mx-2 rounded-lg hover:bg-[#f1f3f4]">
                {mostrarCabecalho ? (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0 mt-0.5"
                    style={{ backgroundColor: cor }}
                  >
                    {iniciais(nome)}
                  </div>
                ) : (
                  <div className="w-8 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  {mostrarCabecalho && (
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className={`text-[13.5px] font-bold ${ehMinha ? 'text-[#E95C13]' : 'text-gray-900'}`}>
                        {nome}
                      </span>
                      {/* TODO: usar msg.criadoEm (ou campo equivalente) para o horário real */}
                      <span className="text-[11px] text-gray-500">agora</span>
                    </div>
                  )}
                  <p className="text-[13.5px] leading-relaxed text-gray-700 break-words">
                    {msg.conteudo}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* caixa de digitação */}
        <div className="shrink-0 px-5 pb-4">
          <div className="border border-[#dee2e6] rounded-2xl shadow-sm overflow-hidden">
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Enviar mensagem para ${conversaAtiva.nome}`}
              className="w-full px-4 pt-3 pb-1 text-sm outline-none text-gray-700"
            />
            <div className="flex items-center justify-between px-2 pb-2 pt-1">
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-[#f1f3f4] hover:text-[#E95C13]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-[#f1f3f4] hover:text-[#E95C13]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" x2="9.01" y1="9" y2="9" />
                    <line x1="15" x2="15.01" y1="9" y2="9" />
                  </svg>
                </button>
              </div>
              <button
                onClick={handleEnviar}
                className="w-8 h-8 rounded-full bg-[#E95C13] hover:bg-[#cf4d0e] flex items-center justify-center text-white shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};