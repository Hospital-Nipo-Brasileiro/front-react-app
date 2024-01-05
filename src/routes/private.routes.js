import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home.jsx'
import MeuUsuario from '../pages/MeuUsuario/index.jsx'
import AutomacaoUsuarios from '../pages/automacaoUsuarios/AutomacaoUsuarios.jsx'
import BuildPage from '../pages/build/BuildPage.jsx'
import { useAuth } from '../contexts/AuthContext.js'

export default function PrivateRoutes() {
  const { auth } = useAuth();
  
  return (
    <Routes>
      <Route path='/home' element={auth ? <Home /> : <Navigate to='/login' />} />
      <Route path='/meu-usuario' element={auth ? <MeuUsuario /> : <Navigate to='/login' />} />
      <Route path='/automation' element={auth ? <AutomacaoUsuarios /> : <Navigate to='/login' />} />
      <Route path='/estoques/central' element={auth ? <BuildPage /> : <Navigate to='/login' />} />
      <Route path='/acessos' element={auth ? <BuildPage /> : <Navigate to='/login' />} />
      <Route path='/estoques/:id' element={auth ? <BuildPage /> : <Navigate to='/login' />} />
      <Route path='/estoques/entrada' element={auth ? <BuildPage /> : <Navigate to='/login' />} />
    </Routes>
  )
}
