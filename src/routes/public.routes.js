import React from 'react'
import TechNipo from '../pages/techNipo/TechNipo'
import Login from '../pages/login/Login'
import { Route, Routes } from 'react-router-dom'

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path='/' element={<TechNipo />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}
