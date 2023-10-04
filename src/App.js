import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TechNipo from './pages/techNipo/TechNipo';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import AutomacaoUsuarios from './pages/automacaoUsuarios/AutomacaoUsuarios';
import { AuthContext } from './contexts/AuthContext';
import Estoque from './pages/estoque/Estoque';
import Acessos from './pages/acessos/acessos';
import CentralEstoque from './pages/estoque/CentralEstoque';


function App() {
  const privateRouter = createBrowserRouter([
    {
      path: "/",
      element: <TechNipo />
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/automation",
        element: <AutomacaoUsuarios />
    },
    {
      path: "/central-estoques",
      element: <CentralEstoque />
    },
    {
      path: "/estoque",
      element: <Estoque />
    },
    {
      path: "/acessos",
      element: <Acessos />
    }
  ]);

  const publicRoute = createBrowserRouter([
    {
        path: "/",
        element: <TechNipo />
    },
    {
        path: "/login",
        element: <Login/>
    }
  ]);

  const auth = useContext(AuthContext)
  return(
    auth ? <RouterProvider router={publicRoute} /> 
    : <RouterProvider router={privateRouter} />
  )
}

export default App;