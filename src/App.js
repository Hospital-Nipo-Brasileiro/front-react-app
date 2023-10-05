import React, { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import TechNipo from './pages/techNipo/TechNipo';
import Login from './pages/login/Login';
import AutomacaoUsuarios from './pages/automacaoUsuarios/AutomacaoUsuarios'
import CentralEstoque from './pages/estoque/CentralEstoque'
import Acessos from './pages/acessos/Acessos.jsx'
import Estoque from './pages/estoque/Estoque'


function App() {
  const auth = useContext(AuthContext)
  return(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<TechNipo/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/home' element={auth ? <Home/>: <Login/>} />
            <Route path='/automation' element={auth ? <AutomacaoUsuarios/> : <Login/>} />
            <Route path='/central-estoques' element={auth ? <CentralEstoque /> : <Login/>} />
            <Route path='/acessos' element={auth ? <Acessos /> : <Login/>} />
            <Route path='/estoque/temp' element={auth ? <Estoque /> : <Login/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;