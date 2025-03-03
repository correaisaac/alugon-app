import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./NovoAluguel.css";

function NovoAluguel() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [rentalData, setRentalData] = useState({
    data_inicio: "",
    data_fim: "",
    valor_total: "",
    contrato_id: "",
    status: "",
    observacao: "",
    modelo_pagamento: "diário", 
  });
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const fetchSpaceDetails = async () => {
    try {
      const response = await fetch(`https://localhost:3333/spaces/${id}`);
      const data = await response.json();
      console.log(data);
      setSpace(data);
      setRentalData((prevState) => ({
        ...prevState,
        valor_total: data.valor,
      }));
    } catch (error) {
      console.error("Erro ao buscar os detalhes do espaço:", error);
    }
  };

  // Função para buscar os contratos existentes
  const fetchContracts = async () => {
    try {
      const response = await fetch("https://localhost:3333/contracts");
      const data = await response.json();
      setContracts(data);
    } catch (error) {
      console.error("Erro ao buscar contratos:", error);
    }
  };

  useEffect(() => {
    fetchSpaceDetails();
    fetchContracts();
  }, [id]);

  const handleChange = (e) => {
    setRentalData({
      ...rentalData,
      [e.target.name]: e.target.value,
    });
  };

   const calculateTotalValue = () => {
    if (!rentalData.data_inicio || !rentalData.data_fim) return;

    const startDate = new Date(rentalData.data_inicio);
    const endDate = new Date(rentalData.data_fim);
    const diffTime = endDate - startDate;
    const diffDays = diffTime / (1000 * 3600 * 24); 

    let total = 0;
    if (rentalData.modelo_pagamento === "diário") {
      total = space.valor * diffDays;
    } else if (rentalData.modelo_pagamento === "semanal") {
      total = space.valor * (diffDays / 7);
    } else if (rentalData.modelo_pagamento === "mensal") {
      total = space.valor * (diffDays / 30);
    } else if (rentalData.modelo_pagamento === "anual") {
      total = space.valor * (diffDays / 365);
    }

    setRentalData((prevState) => ({
      ...prevState,
      valor_total: total.toFixed(2),
    }));
  };

  useEffect(() => {
    calculateTotalValue();
  }, [rentalData.data_inicio, rentalData.data_fim, rentalData.modelo_pagamento]);

  const isContractValidForPeriod = (contract) => {
    if (!rentalData.data_inicio || !rentalData.data_fim) return false;

    const startDate = new Date(rentalData.data_inicio);
    const endDate = new Date(rentalData.data_fim);
    const diffTime = endDate - startDate;
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (contract.modelo_pagamento === "diário") return true;
    if (contract.modelo_pagamento === "semanal" && diffDays >= 7) return true;
    if (contract.modelo_pagamento === "mensal" && diffDays >= 30) return true;
    if (contract.modelo_pagamento === "anual" && diffDays >= 365) return true;

    return false; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      alert("Você precisa estar logado para realizar o aluguel!");
      return;
    }

    if (!rentalData.contrato_id) {
      alert("Por favor, selecione um contrato.");
      return;
    }

    if (space.responsavel === user.id) {
      alert("O locatário não pode ser o mesmo que o locador.");
      return;
    }

    try {
      const response = await fetch("https://localhost:3333/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...rentalData,
          espaco_id: id,
          locador: space.responsavel,
          locatario: user.id,
          status: "pendente",
        }),
      });

      if (response.ok) {
        alert("Aluguel realizado com sucesso!");

        await fetch(`https://localhost:3333/spaces/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            disponibilidade: "indisponível", 
          }),
        });
          
        navigate(`/space/${id}`);
      } else {
        alert("Erro ao realizar o aluguel. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar o aluguel:", error);
      alert("Erro ao realizar o aluguel. Tente novamente.");
    }
  };

  if (!space || !contracts.length) {
    return <p> Carregando detalhes do espaço e contratos... </p>;
  }

  return (
    <div className="novo-aluguel-container">
      <h2> Novo Aluguel - {space.nome} </h2>
      <p>
        <strong> Valor por período: </strong> R${space.valor}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="data_inicio"> Data de Início </label>
          <input
            type="datetime-local"
            id="data_inicio"
            name="data_inicio"
            value={rentalData.data_inicio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="data_fim"> Data de Fim </label>
          <input
            type="datetime-local"
            id="data_fim"
            name="data_fim"
            value={rentalData.data_fim}
            onChange={handleChange}
            required
            onBlur={calculateTotalValue}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contrato_id"> Selecione o Contrato </label>
          <select
            name="contrato_id"
            id="contrato_id"
            value={rentalData.contrato_id}
            onChange={handleChange}
            required
          >
            <option value=""> Escolha um contrato </option>
            {contracts.map((contract) => {
              const validForPeriod = isContractValidForPeriod(contract);
              return (
                <option
                  key={contract.id}
                  value={contract.id}
                  disabled={!validForPeriod}
                >
                  {contract.modelo_pagamento} - {contract.condicoes_pagamento}
                  {validForPeriod ? "" : " (Incompatível com o período)"}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="observacao"> Observações(opcional) </label>
          <textarea
            id="observacao"
            name="observacao"
            value={rentalData.observacao}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="valor_total"> Valor Total </label>
          <input
            type="text"
            id="valor_total"
            name="valor_total"
            value={`R$ ${rentalData.valor_total}`}
            readOnly
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">Solicitar Aluguel</button>
        </div>
      </form>
    </div>
  );
}

export default NovoAluguel;
