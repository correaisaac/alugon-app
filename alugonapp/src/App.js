import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Home from './pages/Home';
import Header from './pages/Header';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import SpaceDetail from './pages/SpaceDetail';
import Footer from './pages/Footer';
import Perfil from './pages/Perfil';

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/space/:id" element={<SpaceDetail />} /> 
          <Route path="/perfil" element={<Perfil />} /> 
        </Routes>
        <Footer />
      </Router>
    </AuthProvider> 
  );
}

export default App;
