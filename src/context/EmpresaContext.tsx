import React, { createContext, useContext, useState } from 'react';

type Empresa = 'Engebag' | 'Bag Cleaner';

interface EmpresaContextType {
  empresa: Empresa;
  setEmpresa: (e: Empresa) => void;
  corTema: string;
}

const EmpresaContext = createContext<EmpresaContextType | undefined>(undefined);

export const EmpresaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [empresa, setEmpresa] = useState<Empresa>('Engebag');
  const corTema = empresa === 'Engebag' ? '#E95C13' : '#2b15cb';

  return (
    <EmpresaContext.Provider value={{ empresa, setEmpresa, corTema }}>
      {children}
    </EmpresaContext.Provider>
  );
};

export const useEmpresa = () => {
  const context = useContext(EmpresaContext);
  if (!context) throw new Error('useEmpresa deve ser usado dentro do EmpresaProvider');
  return context;
};