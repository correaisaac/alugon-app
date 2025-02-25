import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Para capturar o ID do espaço e navegar
import { useAuth } from "../context/AuthContext"; // Importando o contexto de autenticação
import "./SpaceDetail.css"; // Arquivo CSS para a página de detalhes

function SpaceDetail() {
  const { id } = useParams(); // Captura o ID do espaço da URL
  const [space, setSpace] = useState(null);
  const { user, token } = useAuth(); // Obtém o usuário e token do contexto
  const navigate = useNavigate(); // Hook de navegação

  // Função para buscar os detalhes do espaço
  const fetchSpaceDetails = async () => {
    try {
      const response = await fetch(`https://localhost:3333/spaces/${id}`);
      const data = await response.json();
      setSpace(data); // Atualiza o estado com os dados do espaço
    } catch (error) {
      console.error("Erro ao buscar o espaço:", error);
    }
  };

  // Chama a função para buscar os detalhes ao carregar a página
  useEffect(() => {
    fetchSpaceDetails();
    // eslint-disable-next-line
  }, [id]);

  const handleAlugarClick = () => {
    if (user && token) {
      navigate(`/novo-aluguel/${id}`); // Redireciona para a página de novo aluguel
    } else {
      alert("Você precisa estar logado para realizar o aluguel!");
    }
  };

  const handleNovoAluguelClick = () => {
    if (user && token) {
      navigate(`/novo-aluguel/${id}`); // Redireciona para a página de novo aluguel
    } else {
      alert("Você precisa estar logado para realizar o aluguel!");
    }
  };

  if (!space) {
    return <p>Carregando detalhes do espaço...</p>;
  }

  return (
    <div className="space-detail-container">
      <h2>Detalhes do Espaço {space.numero}</h2>
      <strong><img src={space.imagem} alt="Imagem do espaço" className="space-image"/></strong> 
      <p><strong>Descrição:</strong> {space.descricao}</p>
      <p><strong>Responsável:</strong> {space.responsavel_nome}</p>
      <p><strong>Valor:</strong> R${space.valor}</p>
      <p><strong>Disponibilidade:</strong> {space.disponivel ? "Disponível" : "Indisponível"}</p>
      <p><strong>Bairro: </strong> {space.bairro}</p>
      <p><strong>Cidade:</strong> {space.cidade}</p>

      {/* Botão de Alugar */}
      {space.disponivel && user && token && (
        <button onClick={handleAlugarClick} className="alugar-button">
          Alugar
        </button>
      )}

      {!user && !token && (
        <p><em>Você precisa estar logado para alugar este espaço.</em></p>
      )}
    </div>
  );
}

export default SpaceDetail;
