import React from 'react'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Home from '../pages/home/Home.jsx'
import TechNipo from '../pages/techNipo/TechNipo.jsx'
import Login from '../pages/login/Login.jsx'

export default function PrivateRoutes() {
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
            element: <Home />
        }
    ])

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/home' element={Home} />
        </Routes>
    </BrowserRouter>
  )
}
