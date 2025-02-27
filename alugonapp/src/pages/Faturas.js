import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Faturas.css";

function formatDate(isoDate) {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function Faturas() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [faturas, setFaturas] = useState([]);

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    } else {
      const fetchFaturas = async () => {
        try {
          const response = await fetch(`https://localhost:3333/invoices/user/${user.id}`);
          const data = await response.json();
          setFaturas(data);
        } catch (error) {
          alert("Erro ao carregar as faturas.");
        }
      };
      fetchFaturas();
    }
  }, [user, token, navigate]);

  return (
    <div className="faturas-container">
      <h2>Minhas Faturas</h2>
      <table className="faturas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Valor</th>
            <th>Vencimento</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {faturas.length > 0 ? (
            faturas.map((fatura) => (
              <tr key={fatura.id}>
                <td>{fatura.id}</td>
                <td>R$ {parseFloat(fatura.valor).toFixed(2)}</td>
                <td>{formatDate(fatura.data_venc)}</td>
                <td>{fatura.status}</td>
                <td>
                  {fatura.status !== "Paga" && (
                    <button onClick={() => navigate(`/pagamento/${fatura.id}`)}>Pagar</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhuma fatura encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Faturas;
