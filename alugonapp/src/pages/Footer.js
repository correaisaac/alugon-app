import React from "react";
import "./Footer.css"; // Estilos CSS para o footer

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sobre nós</h3>
          <p>
            Somos uma plataforma de aluguel de espaços.
          </p>
        </div>

        <div className="footer-section">
          <h3>Contato</h3>
          <ul>
            <li>Email: contato@alugon.com</li>
            <li>Telefone: (11) 1234-5678</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Redes sociais</h3>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Alugon. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
