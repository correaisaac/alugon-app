import { Link } from "react-router-dom";

function Header() {
    return (
      <header>
        <nav>
          <div className="logo">AlugON</div>
          <button className="menu-toggle">&#9776;</button>
          <ul className="nav-links">
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/espacos">Meus Espaços</Link></li>
            <li><Link to="/perfil">Perfil</Link></li>
            <li><Link to="/cadastro">Cadastrar</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
  
        {/* Menu lateral para mobile */}
        <div className="mobile-menu">
          <button className="close-menu">&times;</button>
          <ul>
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/espacos">Espaços</Link></li>
            <li><Link to="/perfil">Perfil</Link></li>
            <li><Link to="/cadastro">Cadastrar</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </header>
    );
  }

export default Header;