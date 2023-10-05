import React, { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import PrivateRoutes from './routes/private.routes';
import PublicRoutes from './routes/public.routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import TechNipo from './pages/techNipo/TechNipo';
import Login from './pages/login/Login';
import AutomacaoUsuarios from './pages/automacaoUsuarios/AutomacaoUsuarios'



function App() {
  const auth = useContext(AuthContext)
  return(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<TechNipo/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/home' element={auth ? <Home/>: <Login/>} />
            <Route path='/automation' element={<AutomacaoUsuarios/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;