import React, { useState, useRef } from 'react';
import { X, Camera, Pencil, Lock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ProfileMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export const ProfileMenuModal: React.FC<ProfileMenuModalProps> = ({ isOpen, onClose, userName }) => {
  const { theme } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  
  const [email, setEmail] = useState('usuario@engebag.com.br');
  const userSetor = localStorage.getItem('userSetor') || 'TI';
  const userCargo = localStorage.getItem('userCargo') || 'Não definido';

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const InputField = ({ label, value, readOnly = false, onChange }: any) => (
    <div>
      <label className="text-[10px] font-bold uppercase text-gray-400">{label}</label>
      <div className="relative mt-1">
        <input 
          type="text" 
          value={value} 
          readOnly={readOnly}
          onChange={onChange}
          className={`w-full p-3 rounded border pr-10 ${
            readOnly 
              ? 'bg-gray-100 cursor-not-allowed opacity-70 text-gray-500' 
              : theme === 'dark' ? 'bg-[#35363a] border-[#4a4b50] text-white' : 'bg-white border-gray-200'
          }`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {readOnly ? <Lock size={14} /> : <Pencil size={14} />}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-custom-fade" onClick={handleOverlayClick}>
      <div ref={modalRef} className={`w-full max-w-md rounded-xl shadow-2xl p-6 ${theme === 'dark' ? 'bg-[#202124]' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Meu Perfil</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500"><X size={20} /></button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full bg-[#E95C13] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {userName.substring(0, 2).toUpperCase()}
            <button className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full text-white hover:bg-black"><Camera size={14} /></button>
          </div>
        </div>

        <div className="space-y-4">
          <InputField label="Nome Completo" value={userName} readOnly />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Setor" value={userSetor} readOnly />
            <InputField label="Cargo" value={userCargo} readOnly />
          </div>
          <InputField label="E-mail" value={email} onChange={(e: any) => setEmail(e.target.value)} />
          <InputField label="Nova Senha" value="••••••••" onChange={() => {}} />
        </div>

        <button className="w-full mt-8 bg-[#E95C13] text-white py-3 rounded font-bold hover:bg-[#d4500f] transition-all">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};