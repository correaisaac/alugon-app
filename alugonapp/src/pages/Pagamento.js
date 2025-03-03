import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Pagamento.css";

function formatDate(isoDate) {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function generateValidationCode(faturaId) {
  return Math.random().toString(36).substring(2, 10).toUpperCase() + faturaId;
}

function Pagamento() {
  const { id } = useParams();
  const [fatura, setFatura] = useState(null);
  const [pagamento, setPagamento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationCode, setValidationCode] = useState("");
  const navigate = useNavigate();

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

  const handleCriarPagamento = async () => {
    if (!fatura) return;

    setLoading(true);
    const generatedValidationCode = generateValidationCode(fatura.id);

    try {
      const response = await fetch(`https://localhost:3333/payments`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fatura_id: fatura.id,
          num_transacao: generatedValidationCode,
        }),
      });

      if (response.ok) {
        const paymentData = await response.json();
        setPagamento(paymentData); 
        alert("Pagamento criado com sucesso! Gere um boleto para prosseguir.");
        fetchBoleto(paymentData.id); 
      } else {
        alert("Erro ao criar pagamento.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleValidarPagamento = async () => {
    if (!fatura || !pagamento) return;
    try {
      const search = await fetch(`https://localhost:3333/payments/${pagamento.id}`);
      
      if (!search.ok) {
        alert("Pagamento não encontrado.");
        return;
      }

      const paymentData = await search.json(); 
      const validCode = paymentData.num_transacao;
      if (validationCode === validCode) {
        alert("Pagamento validado com sucesso!");
        await fetch(`https://localhost:3333/invoices/${fatura.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            aluguel_id: fatura.aluguel_id,
            status: "Pago",
            valor: fatura.valor,
            data_emissaoao: fatura.data_emiss,
            data_venc: fatura.data_venc,
            descontos: fatura.descontos,
            imposto: fatura.imposto,
          }),
        });

        setFatura((prev) => ({ ...prev, status: "Pago" }));
        navigate('/faturas');
      } else {
        alert("Código de validação inválido.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  const fetchBoleto = async (paymentId) => {
    try {
      const response = await fetch(`https://localhost:3333/payments/${paymentId}`);
      const paymentData = await response.json();
      
      if (paymentData.boleto_pdf) {
        const blob = new Blob([new Uint8Array(atob(paymentData.boleto_pdf).split("").map(c => c.charCodeAt(0)))], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        
        window.open(url, '_blank');
      } else {
        alert("Boleto não encontrado.");
      }
    } catch (error) {
      alert("Erro ao carregar o boleto.");
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

      {fatura.status !== "Pago" && (
        <button className="pagamento-btn" onClick={handleCriarPagamento} disabled={loading}>
          {loading ? "Criando Pagamento..." : "Criar Pagamento"}
        </button>
      )}

      <div>
        <h3>Validar Pagamento</h3>
        <input
          type="text"
          value={validationCode}
          onChange={(e) => setValidationCode(e.target.value)}
          placeholder="Insira o código de validação"
        />
        <button className="pagamento-btn" onClick={handleValidarPagamento}>
          Validar Pagamento
        </button>
      </div>
    </div>
  );
}

export default Pagamento;
