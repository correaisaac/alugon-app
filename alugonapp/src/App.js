import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './pages/Header';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import SpaceDetail from './pages/SpaceDetail'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/space/:id" element={<SpaceDetail />} /> 
      </Routes>
    </Router>
  );
}

export default App;
