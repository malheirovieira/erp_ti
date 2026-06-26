import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { postService } from '../services/postService';

interface CriarPostProps {
  onPostCreated: () => void;
  onClose: () => void;
}

export function CriarPost({ onPostCreated, onClose }: CriarPostProps) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState(''); // Agora guardará HTML
  const [imagem, setImagem] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePostar = async () => {
    // Evita postar se estiver vazio ou se o Quill só tiver parágrafos vazios <p><br></p>
    if (!titulo.trim() || !conteudo.replace(/<[^>]*>?/gm, '').trim()) return;

    setLoading(true);
    try {
      let urlImagemSalva = undefined;

      // 1. Se tiver imagem, faz o upload dela primeiro
      if (imagem) {
        urlImagemSalva = await postService.uploadImagemAviso(imagem);
      }

      // 2. Cria o aviso com o HTML do Quill e a URL da imagem (se houver)
      await postService.criarAviso({
        titulo,
        conteudo, // Vai salvar o HTML direto no banco de dados!
        urlImagem: urlImagemSalva,
        empresaAlvo: "AMBAS" 
      });

      onPostCreated();
      onClose();
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Não foi possível publicar o aviso.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col h-[85vh]">
        
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
          <h2 className="text-lg font-bold text-gray-800">Criar Novo Aviso Corporativo</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
        </div>

        {/* Corpo do Modal com Scroll */}
        <div className="p-6 flex flex-col gap-4 overflow-y-auto flex-1">
          <input
            type="text"
            placeholder="Título principal do aviso..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-gray-800 placeholder-gray-400 font-bold text-lg transition-all"
          />

          {/* Área de Anexo de Imagem Capa */}
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50 text-center hover:bg-gray-100 transition-colors">
            <input 
              type="file" 
              accept="image/*" 
              id="upload-capa" 
              className="hidden" 
              onChange={(e) => setImagem(e.target.files?.[0] || null)}
            />
            <label htmlFor="upload-capa" className="cursor-pointer flex flex-col items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className="text-sm text-gray-600 font-medium">
                {imagem ? `Imagem selecionada: ${imagem.name}` : 'Clique para adicionar uma Imagem de Capa (Opcional)'}
              </span>
            </label>
          </div>
          
          {/* Editor Rich Text */}
          <div className="flex-1 flex flex-col">
            <ReactQuill 
              theme="snow" 
              value={conteudo} 
              onChange={setConteudo} 
              className="flex-1 bg-white"
              placeholder="Escreva os detalhes do aviso... Você pode usar links, negrito e listas!"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
            Cancelar
          </button>
          <button 
            onClick={handlePostar}
            disabled={loading || !titulo.trim()}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Publicando...' : 'Publicar Aviso'}
          </button>
        </div>

      </div>
    </div>
  );
}