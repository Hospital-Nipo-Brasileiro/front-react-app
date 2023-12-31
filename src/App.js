import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado.jsx';
import TechNipo from './pages/techNipo/TechNipo.jsx';
import Login from './pages/login/Login.jsx';
import Home from './pages/home/Home.jsx';
import MeuUsuario from './pages/MeuUsuario/index.jsx'
import AutomacaoUsuarios from './pages/automacaoUsuarios/AutomacaoUsuarios.jsx'
import BuildPage from './pages/build/BuildPage.jsx'
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
        <Route path='/estoques/central' element={auth ? <BuildPage /> : <Navigate to="/login" />} />
        <Route path='/acessos' element={auth ? <BuildPage /> : <Navigate to="/login" />} />
        <Route path='/estoques/:id' element={auth ? <BuildPage /> : <Navigate to="/login" />} />
        <Route path='/estoques/entrada' element={auth ? <BuildPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<NaoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
}