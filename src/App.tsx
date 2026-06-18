import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { EmpresaProvider } from './context/EmpresaContext';
import { AutomacaoSQL } from './pages/TI/AutomacaoSQL';
import { BackupsServidores } from './pages/TI/BackupsServidores';
import { Login } from './pages/Login'; // Nome correto do seu arquivo de login
import { VisaoGeral } from './pages/TI/VisaoGeral';
import { Cadastro } from './pages/Cadastro';
import { Home } from './components/layouts/Home'; // AJUSTE ESTE CAMINHO PARA ONDE O SEU HOME.TSX ESTÁ

// Componentes temporários
const SuporteTecnico = () => <div className="p-8">Módulo de Suporte Técnico</div>;

export default function App() {
  return (
    <EmpresaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          
          {/* Rota do Home (Layout) */}
          <Route path="/home" element={<Home />}>
            {/* Redirecionamento automático ao acessar /home */}
            <Route index element={<Navigate to="visao-geral" replace />} />
            
            <Route path="visao-geral" element={<VisaoGeral />} />
            <Route path="automacao-sql" element={<AutomacaoSQL />} />
            <Route path="backups" element={<BackupsServidores />} />
            <Route path="suporte-tecnico" element={<SuporteTecnico />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </EmpresaProvider>
  );
}