import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
import "./SpaceDetail.css"; 

function SpaceDetail() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const { user, token } = useAuth(); 
  const navigate = useNavigate();

  
  const fetchSpaceDetails = async () => {
    try {
      const response = await fetch(`https://localhost:3333/spaces/${id}`);
      const data = await response.json();
      setSpace(data); 
    } catch (error) {
      console.error("Erro ao buscar o espaço:", error);
    }
  };

  useEffect(() => {
    fetchSpaceDetails();
  }, [id]);

  const handleAlugarClick = () => {
    if (user && token) {
      navigate(`/novo-aluguel/${id}`); 
    } else {
      alert("Você precisa estar logado para realizar o aluguel!");
    }
  };

  const handleNovoAluguelClick = () => {
    if (user && token) {
      navigate(`/novo-aluguel/${id}`); 
    } else {
      alert("Você precisa estar logado para realizar o aluguel!");
    }
  };

  if (!space) {
    return <p> Carregando detalhes do espaço... </p>;
  }
  console.log(space.numero);
  return (
    <div className="space-detail-container">
      <h2> Detalhes do Espaço {space.numero} </h2>{" "}
      <strong>
        {" "}
        <img
          src={space.imagem ? `data:image/jpeg;base64,${space.imagem}` : 'default-image.jpg'}
          alt="Imagem do espaço"
          className="space-image"
        />{" "}
      </strong>{" "}
      <p>
        {" "}
        <strong> Descrição: </strong> {space.descricao}
      </p>
      <p>
        {" "}
        <strong> Responsável: </strong> {space.responsavel_nome}
      </p>
      <p>
        {" "}
        <strong> Valor: </strong> R${space.valor}
      </p>
      <p>
        {" "}
        <strong> Disponibilidade: </strong>{" "}
        {space.disponivel ? "Disponível" : "Indisponível"}
      </p>
      <p>
        {" "}
        <strong> Bairro: </strong> {space.bairro}
      </p>
      <p>
        {" "}
        <strong> Cidade: </strong> {space.cidade}
      </p>
      {space.disponivel && user && token && (
        <button onClick={handleAlugarClick} className="alugar-button">
          Alugar{" "}
        </button>
      )}
      {!user && !token && (
        <p>
          {" "}
          <em> Você precisa estar logado para alugar este espaço. </em>
        </p>
      )}{" "}
    </div>
  );
}

export default SpaceDetail;
