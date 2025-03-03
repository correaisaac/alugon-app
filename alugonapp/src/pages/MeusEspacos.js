import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom"; 
import "./MeusEspacos.css";

function formatDate(isoDate) {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function MeusEspacos() {
  const { user, token } = useAuth(); 
  const navigate = useNavigate(); 

  const [espaco, setMeusEspacos] = useState([]);
  const [alugueisPendentes, setAlugueisPendentes] = useState([]);

  const [meusAlugueis, setMeusAlugueis] = useState([]);

  useEffect(() => {
    if (!user || !token) {
      navigate("/login"); 
    } else {
      const fetchEspacos = async () => {
        try {
          const response = await fetch(`https://localhost:3333/spaces/user/${user.id}`);
          const data = await response.json();
          setMeusEspacos(data.filter(espaco => espaco));
        } catch (error) {
          alert("Erro ao carregar os espaços.");
        }
      };
      fetchEspacos();

      const fetchAlugueis = async () => {
        try {
          const response = await fetch(`https://localhost:3333/rentals/owner/${user.id}`);
          const data = await response.json();
          setAlugueisPendentes(data.filter(aluguel => aluguel));
        } catch (error) {
          alert("Erro ao carregar os aluguéis.");
        }
      };
      fetchAlugueis();
      const fetchMeusAlugueis = async () => {
        try {
          const response = await fetch(`https://localhost:3333/rentals/tenant/${user.id}`);
          const data = await response.json();
          setMeusAlugueis(data);
        } catch (error) {
          alert("Erro ao carregar seus aluguéis.");
        }
      };
      fetchMeusAlugueis();
    }
  }, [user, token, navigate]);

  

  const handleExcluirAluguel = async (aluguelId) => {
    try {
      const response = await fetch(`https://localhost:3333/rentals/${aluguelId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Aluguel excluído com sucesso!");
        setAlugueisPendentes(alugueisPendentes.filter(aluguel => aluguel.id !== aluguelId));
      } else {
        alert("Erro ao excluir aluguel.");
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor.");
    }
  };

  const handleAceitarAluguel = async (aluguel) => {
    try {
      const response = await fetch(`https://localhost:3333/rentals/${aluguel.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...aluguel,
          status: "aprovado",
        }),
      });
  
      if (response.ok) {
        alert("Aluguel aceito com sucesso");
  
        setAlugueisPendentes((prevAlugueis) =>
          prevAlugueis.map((a) =>
            a.id === aluguel.id ? { ...a, status: "aprovado" } : a
          )
        );
      } else {
        alert("Erro ao aceitar o aluguel.");
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor.");
    }
  };
  
  const handleExcluirEspaco = async (espacoId) => {
    try {
      const response = await fetch(`https://localhost:3333/spaces/${espacoId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Espaço excluído com sucesso!");
        setMeusEspacos(espaco.filter((espaco) => espaco.id !== espacoId));
      } else {
        alert("Você não pode excluir este espaço.");
      }
    } catch (error) {
      alert("Erro");
    }
  };

  const handleEditarEspaco = (espaco) => {
    navigate(`/editar-espaco/${espaco.id}`);
  };

  return (
    <div className="meus-espacos-container">
      <h2>Meus Espaços</h2>
      <button className="novo-espaco-btn" onClick={() => navigate("/novo-espaco")}>Novo Espaço</button>
      <div className="secoes">
        <div className="espacos-alugados">
          <h3>Aluguéis que Fiz</h3>
          <div className="espacos-lista">
            {meusAlugueis.length > 0 ? (
              meusAlugueis.map((aluguel) => (
                <div key={aluguel.id} className="espaco-card">
                  <h4>Espaço ID: {aluguel.espaco_id}</h4>
                  <p>Locador: {aluguel.locador}</p>
                  <p>Data de Início: {formatDate(aluguel.data_inicio)}</p>
                  <p>Data de Fim: {formatDate(aluguel.data_fim)}</p>
                  <p>Valor Total: R$ {aluguel.valor_total}</p>
                  <p>Status: {aluguel.status}</p>
                  {aluguel.observacao && <p>Observação: {aluguel.observacao}</p>}
                  {aluguel.contrato_id && <p>Contrato ID: {aluguel.contrato_id}</p>}
                </div>
              ))
            ) : (
              <p>Você ainda não fez nenhum aluguel.</p>
            )}
          </div>
        </div>
        <div className="espacos-alugados">
          <h3>Aluguéis</h3>
          <div className="espacos-lista">
            {alugueisPendentes.length > 0 ? (
              alugueisPendentes.map((aluguel) => (
                <div key={aluguel.id} className="espaco-card">
                  <h4>Locatário: {aluguel.locatario}</h4>
                  <p>Locador: {aluguel.locador}</p>
                  <p>Espaço ID: {aluguel.espaco_id}</p>
                  <p>Data de Início: {formatDate(aluguel.data_inicio)}</p>
                  <p>Data de Fim: {formatDate(aluguel.data_fim)}</p>
                  <p>Valor Total: R$ {aluguel.valor_total}</p>
                  <p>Status: {aluguel.status}</p>
                  {aluguel.observacao && <p>Observação: {aluguel.observacao}</p>}
                  {aluguel.contrato_id && <p>Contrato ID: {aluguel.contrato_id}</p>}
                  {aluguel.status !== 'aprovado' && (
                    <button className="editar-btn" onClick={() => handleAceitarAluguel(aluguel)}>
                      Aceitar
                    </button>
                  )}
                <button className="excluir-btn" onClick={() => handleExcluirAluguel(aluguel.id)}>Excluir</button>
                </div>
              ))
            ) : (
              <p>Nenhum aluguel pendente.</p>
            )}
          </div>
        </div>

        <div className="espacos-para-alugar">
          <h3>Meus Espaços para Alugar</h3>
          <div className="espacos-lista">
            {espaco.length > 0 ? (
              espaco.map((espaco) => (
                <div key={espaco.id} className="espaco-card">
                  <img
                    src={espaco.imagem ? `data:image/jpeg;base64,${espaco.imagem}` : 'default-image.jpg'} 
                    alt={`Imagem de ${espaco.nome}`}
                    className="space-photo"
                  />
                  <h4>Número: {espaco.numero}</h4>
                  <p>Disponível: {espaco.disponivel ? "Sim" : "Não"}</p>
                  <p>Descrição: {espaco.descricao}</p>
                  <p>Valor: R$ {espaco.valor}</p>
                  <p>Endereço: {espaco.bairro} - {espaco.cidade}</p>
                  <button className="editar-btn" onClick={() => handleEditarEspaco(espaco)}>Editar</button>
                  <button className="excluir-btn" onClick={() => handleExcluirEspaco(espaco.id)}>Excluir</button>
                </div>
              ))
            ) : (
              <p>Você não cadastrou nenhum espaço ou seus espaços estão alugados</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeusEspacos;
