import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import "./Home.css"; 

function Home() {
  const [spaces, setSpaces] = useState([]);

  const fetchSpaces = async () => {
    try {
      const response = await fetch("https://localhost:3333/spaces");
      const data = await response.json();
      setSpaces(data); 
    } catch (error) {
      console.error("Erro ao buscar espaços:", error);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  return (
    <div className="home-container">
      <section className="featured-spaces">
        <h2> Espaços em destaque </h2>{" "}
        <div className="space-grid">
          {" "}
          {spaces.length > 0 ? (
            spaces.map((space) => (
              <div key={space.id} className="space-card">
                <img
                    src={space.imagem ? `data:image/jpeg;base64,${space.imagem}` : 'default-image.jpg'} 
                    alt={`Foto do espaço`}
                    className="space-image"
                />
                <h3> {space.numero} </h3> <p> {space.descricao} </p>{" "}
                <p> Responsável: {space.responsavel} </p>{" "}
                <p> Valor: R$ {space.valor} </p>{" "}
                <p> {space.disponivel ? "Disponível" : "Indisponível"} </p>{" "}
                <Link to={`/space/${space.id}`}> Ver detalhes </Link>{" "}
              </div>
            ))
          ) : (
            <p> Carregando espaços... </p>
          )}{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
}

export default Home;
