import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Pagamento.css";

function formatDate(isoDate) {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function Pagamento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fatura, setFatura] = useState(null);
  const [formaPagamento, setFormaPagamento] = useState("Pix");
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    const fetchFatura = async () => {
      try {
        const response = await fetch(`https://localhost:3333/invoices/${id}`);
        const data = await response.json();
        setFatura(data);
      } catch (error) {
        alert("Erro ao carregar a fatura.");
      }
    };
    fetchFatura();
  }, [id]);

  const handlePagamento = async () => {
    setLoading(true);
    setPaymentError(null);

    try {
      const response = await fetch(`https://localhost:3333/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fatura_id: id,
          forma_pagamento: formaPagamento,
        }),
      });

      if (response.ok) {
        const payment = await response.json();
        
        // Se o pagamento for com Cartão, faça o processamento necessário com o Stripe
        if (formaPagamento === "Cartão") {
          // Exemplo: Iniciar o processo de pagamento com o Stripe ou outro gateway
          const { num_transacao } = payment;
          
          // Aqui você pode fazer a integração com o Stripe ou outro serviço de pagamento.
          // Para simplificação, vamos apenas simular o pagamento bem-sucedido.
          alert("Pagamento realizado com sucesso!");
          navigate("/faturas");
        } else {
          alert("Pagamento realizado com sucesso!");
          navigate("/faturas");
        }
      } else {
        alert(response.id);
        setPaymentError("Erro ao processar o pagamento.");
      }
    } catch (error) {
      setPaymentError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (!fatura) return <p className="loading">Carregando fatura...</p>;

  return (
    <div className="pagamento-container">
      <h2>Pagamento da Fatura #{fatura.id}</h2>

      <div className="pagamento-info">
        <p><strong>Valor:</strong> R$ {parseFloat(fatura.valor).toFixed(2)}</p>
        <p><strong>Vencimento:</strong> {formatDate(fatura.data_venc)}</p>
        <p><strong>Status:</strong> {fatura.status}</p>
      </div>

      <label className="pagamento-label">Forma de Pagamento:</label>
      <select
        className="pagamento-select"
        value={formaPagamento}
        onChange={(e) => setFormaPagamento(e.target.value)}
      >
        <option value="Pix">Pix</option>
        <option value="Boleto">Boleto</option>
        <option value="TED">TED</option>
        <option value="Cartão">Cartão</option>
      </select>

      <button
        className="pagamento-btn"
        onClick={handlePagamento}
        disabled={loading}
      >
        {loading ? "Processando..." : "Confirmar Pagamento"}
      </button>

      {paymentError && <p className="error">{paymentError}</p>}
    </div>
  );
}

export default Pagamento;
