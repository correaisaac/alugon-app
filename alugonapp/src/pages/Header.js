import { useState } from 'react'; 
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false); 
  const navLinks = user
    ? [
        { to: "/", label: "Home" },
        { to: "/espacos", label: "Meus Espaços" },
        { to: "/faturas", label: "Faturas" },
        { to: "/perfil", label: "Perfil" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/cadastro", label: "Cadastrar" },
        { to: "/login", label: "Login" },
      ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); 
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
