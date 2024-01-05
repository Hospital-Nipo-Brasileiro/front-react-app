import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NaoEncontrado from '../pages/NaoEncontrado/NaoEncontrado.jsx'

function Erro404Route() {
  return(
    <Routes>
        <Route path='*' element={<NaoEncontrado />} />
    </Routes>
  );
}

export default Erro404Route;