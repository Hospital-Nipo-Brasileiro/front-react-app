import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TechNipo from './screens/initial-route/TechNipo.jsx';
import Login from './screens/login/Login.jsx';
import Home from './screens/home/Home.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TechNipo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}


export default App;
