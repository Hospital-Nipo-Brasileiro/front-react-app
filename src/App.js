import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado.jsx';
import TechNipo from './pages/techNipo/TechNipo.jsx';
import Login from './pages/login/Login.jsx';
import Home from './pages/home/Home.jsx';
import MeuUsuario from './pages/MeuUsuario/index.jsx'
import AutomacaoUsuarios from './pages/automacaoUsuarios/AutomacaoUsuarios.jsx'
import CentralEstoque from './pages/estoque/CentralEstoque.jsx'
import EstradaEstoque from './pages/estoque/EntradaEstoque.jsx'
import EstoqueTemp from './pages/estoque/EstoqueTemp.jsx'
import Acessos from './pages/acessos/AcessosUsuarios.jsx'
import Pessoas from './pages/pessoas/Pessoas.jsx';
import { useAuth } from './contexts/AuthContext.js'

export default function App() {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TechNipo />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={auth ? <Home /> : <Navigate to="/login" />} />
        <Route path='/meu-usuario' element={auth ? <MeuUsuario /> : <Navigate to="/login" />} />
        <Route path='/automation' element={auth ? <AutomacaoUsuarios /> : <Navigate to="/login" />} />
        <Route path='/estoques/central' element={auth ? <CentralEstoque /> : <Navigate to="/login" />} />
        <Route path='/pessoas' element={auth ? <Pessoas /> : <Navigate to="/login" />} />
        <Route path='/acessos' element={auth ? <Acessos /> : <Navigate to="/login" />} />
        <Route path='/estoques/:id' element={auth ? <EstoqueTemp /> : <Navigate to="/login" />} />
        <Route path='/estoques/entrada' element={auth ? <EstradaEstoque /> : <Navigate to="/login" />} />
        <Route path="*" element={<NaoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
}