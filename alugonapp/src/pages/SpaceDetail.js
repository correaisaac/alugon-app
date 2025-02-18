import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Para capturar o ID do espaço
import "./SpaceDetail.css"; // Arquivo CSS para a página de detalhes

function SpaceDetail() {
  const { id } = useParams(); // Captura o ID do espaço da URL
  const [space, setSpace] = useState(null);

  // Função para buscar o espaço pelo ID
  const fetchSpaceDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3333/spaces/${id}`);
      const data = await response.json();
      setSpace(data); // Atualiza o estado com os dados do espaço
    } catch (error) {
      console.error("Erro ao buscar o espaço:", error);
    }
  };

  // Chama a função para buscar o espaço ao carregar a página
  useEffect(() => {
    fetchSpaceDetails();
    // eslint-disable-next-line
  }, [id]);

  if (!space) {
    return <p>Carregando detalhes do espaço...</p>;
  }

  return (
    <div className="space-detail-container">
      <h2>Detalhes do Espaço {space.numero}</h2>
      <p><strong>Descrição:</strong> {space.descricao}</p>
      <p><strong>Responsável:</strong> {space.responsavel_nome}</p>
      <p><strong>Valor:</strong> R${space.valor}</p>
      <p><strong>Disponibilidade:</strong> {space.disponivel ? "Disponível" : "Indisponível"}</p>
    </div>
  );
}

export default SpaceDetail;
