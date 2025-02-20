import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

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

  return (
    <header>
      <nav>
        <div className="logo">AlugON</div>
        <button className="menu-toggle">&#9776;</button>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="active">{link.label}</Link>
            </li>
          ))}
          {user && <li><button onClick={logout}>Sair</button></li>}
        </ul>
      </nav>

      {/* Menu lateral para mobile */}
      <div className="mobile-menu">
        <button className="close-menu">&times;</button>
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
