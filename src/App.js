import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; // Importe também o Navigate

import Home from './pages/home/Home';
import TechNipo from './pages/techNipo/TechNipo';
import Login from './pages/login/Login';
import AutomacaoUsuarios from './pages/automacaoUsuarios/AutomacaoUsuarios'
import CentralEstoque from './pages/estoque/CentralEstoque'
import Acessos from './pages/acessos/Acessos.jsx'
import EstoqueTemp from './pages/estoque/EstoqueTemp'
import MeuUsuario from './pages/MeuUsuario/index';
import EntradaEstoque from './pages/estoque/EntradaEstoque';

function App() {
  const { auth } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TechNipo />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={auth ? <Home /> : <Navigate to="/login" />} />
        <Route path='/automation' element={auth ? <AutomacaoUsuarios /> : <Navigate to="/login" />} />
        <Route path='/estoques/central' element={auth ? <CentralEstoque /> : <Navigate to="/login" />} />
        <Route path='/acessos' element={auth ? <Acessos /> : <Navigate to="/login" />} />
        <Route path='/estoques/:id' element={auth ? <EstoqueTemp /> : <Navigate to="/login" />} />
        <Route path='/meu-usuario' element={auth ? <MeuUsuario /> : <Navigate to="/login" />} />
        <Route path='/estoques/entrada' element={auth ? <EntradaEstoque /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
