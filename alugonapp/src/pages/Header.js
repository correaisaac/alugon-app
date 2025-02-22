import { useState } from 'react'; // Importe o hook useState
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar a abertura do menu

  const navLinks = user
    ? [
        { to: "/", label: "Home" },
        { to: "/espacos", label: "Meus Espaços" },
        { to: "/perfil", label: "Perfil" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/cadastro", label: "Cadastrar" },
        { to: "/login", label: "Login" },
      ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alterna o estado do menu (aberto/fechado)
  };

  return (
    <header>
      <nav>
        <div className="logo">AlugON</div>
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </button>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="active">{link.label}</Link>
            </li>
          ))}
          {user && <li><button onClick={logout}>Sair</button></li>}
        </ul>
      </nav>

      {/* Menu lateral para mobile */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-menu" onClick={toggleMenu}>&times;</button>
        <ul>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="active">{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
