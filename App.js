import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TechNipo from './screens/initial-route/TechNipo.jsx';
import Login from './screens/login/Login.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TechNipo />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
