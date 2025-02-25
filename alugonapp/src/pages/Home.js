import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Link para navegação entre páginas
import "./Home.css"; // Estilos para o Home


function Home() {
  const [spaces, setSpaces] = useState([]);

  // Função para buscar espaços
  const fetchSpaces = async () => {
    try {
      const response = await fetch("https://localhost:3333/spaces");
      const data = await response.json();
      setSpaces(data); // Atualiza o estado com os espaços recebidos da API
    } catch (error) {
      console.error("Erro ao buscar espaços:", error);
    }
  };

  // Chama a função de buscar espaços quando o componente é montado
  useEffect(() => {
    fetchSpaces();
  }, []);

  return (
    <div className="home-container">
      <section className="featured-spaces">
        <h2>Espaços em destaque</h2>
        <div className="space-grid">
          {/* Aqui mapeamos os espaços para criar os cards */}
          {spaces.length > 0 ? (
            spaces.map((space) => (
              <div key={space.id} className="space-card">
                <img src={space.imagem} alt={`Imagem do espaço ${space.numero}`} className="space-image" />
                <h3>{space.numero}</h3>
                <p>{space.descricao}</p>
                <p>Responsável: {space.responsavel}</p>
                <p>Valor: R${space.valor}</p>
                <p>{space.disponivel ? "Disponível" : "Indisponível"}</p>
                {/* Link para a página de detalhes do espaço */}
                <Link to={`/space/${space.id}`}>Ver detalhes</Link>
              </div>
            ))
          ) : (
            <p>Carregando espaços...</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
