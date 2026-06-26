import React, { useEffect, useState, useRef } from 'react';
import { CriarPost } from './components/CriarPost';
import { FeedPost } from './components/FeedPost';
import { postService } from './services/postService';
import type { AvisoResponse } from './types/post';
import { useAuthStore } from '../TI/SuporteTecnico/store/useAuthStore';

export function VisaoGeral() {
  const [posts, setPosts] = useState<AvisoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Controles de layout e do efeito 3D
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState<'TODOS' | 'MEUS'>('TODOS');
  const [activeIndex, setActiveIndex] = useState(0);
  
  const isScrollingRef = useRef(false); // Trava para controlar a velocidade do scroll
  const { usuario, fetchUsuarioLogado } = useAuthStore();

  const carregarFeed = async () => {
    setLoading(true);
    try {
      const data = await postService.listarFeed();
      setPosts(data);
      setActiveIndex(0); // Reseta para o primeiro post ao recarregar
    } catch (error) {
      console.error("Erro ao carregar o feed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarFeed();
    if (!usuario) {
      fetchUsuarioLogado();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleExcluir = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este aviso?")) {
      try {
        await postService.excluirAviso(id);
        setPosts(posts.filter(post => post.id !== id));
        // Ajusta o índice ativo caso o post excluído quebre a paginação
        if (activeIndex >= posts.length - 1 && activeIndex > 0) {
          setActiveIndex(prev => prev - 1);
        }
      } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir o aviso.");
      }
    }
  };

  const postsFiltrados = posts.filter(post => {
    if (filtroAtivo === 'MEUS' && usuario) {
      return post.idCriador === usuario.id;
    }
    return true;
  });

  // ================= MÁGICA DO SCROLL EM CAMADAS 3D =================
  const handleWheel = (e: React.WheelEvent) => {
    // Se não houver posts suficientes para rolar, ignora
    if (postsFiltrados.length <= 1) return;
    
    // Evita que a rolagem padrão da página interfira no efeito do container
    e.preventDefault();

    // Se a trava estiver ativa, ignora novos comandos de scroll rápidos
    if (isScrollingRef.current) return;

    isScrollingRef.current = true;

    if (e.deltaY > 0) {
      // Scroll para BAIXO -> Próximo Post (Vem de trás para frente)
      if (activeIndex < postsFiltrados.length - 1) {
        setActiveIndex(prev => prev + 1);
      }
    } else if (e.deltaY < 0) {
      // Scroll para CIMA -> Post Anterior (Volta para a frente)
      if (activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
    }

    // Libera o scroll novamente após 600 milissegundos (tempo da transição CSS)
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  };

return (
    // Reduzi o padding vertical (py-2) e o espaço entre os elementos (gap-3)
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto px-4 py-2 md:px-6 md:py-3 gap-3 overflow-hidden">
      
      {/* Cabeçalho */}
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Mural de Avisos</h1>
        <p className="text-sm text-gray-500 mt-1">
          Role o scroll do mouse sobre os cards para navegar no histórico.
        </p>
      </div>

      {/* Barra de Ferramentas */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => { setFiltroAtivo('TODOS'); setActiveIndex(0); }}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              filtroAtivo === 'TODOS' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Todos os Avisos ({posts.length})
          </button>
          
          <button 
            onClick={() => { setFiltroAtivo('MEUS'); setActiveIndex(0); }}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              filtroAtivo === 'MEUS' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Meus Posts
          </button>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          Criar Post
        </button>
      </div>

      {/* Renderização do Modal de Criação */}
      {isModalOpen && (
        <CriarPost onPostCreated={carregarFeed} onClose={() => setIsModalOpen(false)} />
      )}

     {/* ÁREA CENTRAL DO FEED COM EFEITO EM CAMADAS */}
      <div 
        onWheel={handleWheel}
        className="relative flex-1 w-full bg-gray-50/50 rounded-2xl border border-gray-200/60 p-4 overflow-hidden flex items-center justify-center select-none"
        style={{ perspective: '1000px' }}
      >
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : postsFiltrados.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8" /></svg>
            <p className="text-gray-500 font-medium">Nenhum aviso encontrado.</p>
          </div>
        ) : (
          <>
            <div className="absolute bottom-4 right-6 z-40 bg-gray-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {activeIndex + 1} / {postsFiltrados.length}
            </div>

            {postsFiltrados.map((post, index) => {
              const delta = index - activeIndex;

              let transformStyle = '';
              let opacityStyle = 0;
              let zIndexStyle = 0;
              let pointerEvents: 'auto' | 'none' = 'none';

              if (delta < 0) {
                transformStyle = 'translateY(-120px) translateZ(-150px) rotateX(15deg)';
                opacityStyle = 0;
                zIndexStyle = 10 + delta; 
                pointerEvents = 'none';
              } else if (delta === 0) {
                transformStyle = 'translateY(0px) translateZ(0px) rotateX(0deg)';
                opacityStyle = 1;
                zIndexStyle = 30;
                pointerEvents = 'auto';
              } else if (delta > 0 && delta <= 3) {
                transformStyle = `translateY(${delta * 22}px) translateZ(${-delta * 45}px) rotateX(-2deg)`;
                opacityStyle = delta === 1 ? 0.65 : delta === 2 ? 0.35 : 0.1;
                zIndexStyle = 30 - delta;
                pointerEvents = 'none';
              } else {
                transformStyle = 'translateY(100px) translateZ(-200px)';
                opacityStyle = 0;
                zIndexStyle = 0;
                pointerEvents = 'none';
              }

              const isAdmin = usuario?.role === 'ADMIN';
              const isAutor = usuario?.id != null && post.idCriador === usuario?.id;

              return (
                <div
                  key={post.id}
                  className="absolute w-full max-w-2xl px-2 transition-all duration-500 ease-out"
                  style={{
                    transform: transformStyle,
                    opacity: opacityStyle,
                    zIndex: zIndexStyle,
                    pointerEvents: pointerEvents,
                    transformOrigin: 'bottom center',
                  }}
                >
                  <FeedPost 
                    post={post} 
                    onDelete={handleExcluir} 
                    podeDeletar={isAdmin || isAutor} 
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}