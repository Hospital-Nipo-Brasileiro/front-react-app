import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TechNipo from '../pages/techNipo/TechNipo'
import Login from '../pages/login/Login'

export default function PublicRoutes() {
    const privateRouter = createBrowserRouter([
        {
            path: "/",
            element: <TechNipo />
        },
        {
            path: "/login",
            element: <Login/>
        }
    ])

  return (
    <RouterProvider router={privateRouter} />
  )
}
