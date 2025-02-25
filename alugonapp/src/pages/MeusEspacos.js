import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Importando o contexto de autenticação
import { useNavigate } from "react-router-dom"; // Importando o hook para redirecionamento
import "./MeusEspacos.css";

function formatDate(isoDate) {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function MeusEspacos() {
  const { user, token } = useAuth(); // Obtendo os dados de autenticação do contexto
  const navigate = useNavigate(); // Hook de navegação

  const [espaco, setMeusEspacos] = useState([]);
  const [alugueisPendentes, setAlugueisPendentes] = useState([]);
  const [nomeEspaco, setNomeEspaco] = useState("");
  const [descricaoEspaco, setDescricaoEspaco] = useState("");
  const [precoEspaco, setPrecoEspaco] = useState("");
  const [fotoEspaco, setFotoEspaco] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  // Se o usuário não estiver logado, redireciona para o login
  useEffect(() => {
    if (!user || !token) {
      navigate("/login"); // Redireciona para o login se não estiver logado
    } else {
      // Buscar espaços disponíveis e alugados
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
          const response = await fetch(`https://localhost:3333/rentals/tenant/${user.id}`);
          const data = await response.json();
          setAlugueisPendentes(data.filter(aluguel => aluguel));
        } catch (error) {
          alert("Erro ao carregar os aluguéis.");
        }
      };
      fetchAlugueis();
    }
  }, [user, token, navigate]);

  // Enviar o espaço para o backend
  const handleCadastrarEspaco = async (event) => {
    event.preventDefault();

    const newEspaco = {
      nome: nomeEspaco,
      descricao: descricaoEspaco,
      preco: precoEspaco,
      foto: fotoEspaco,
    };

    try {
      const response = await fetch("https://localhost:3333/spaces", {
      const response = await fetch("https://localhost:3333/spaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEspaco),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Espaço cadastrado com sucesso!");
        setNomeEspaco("");
        setDescricaoEspaco("");
        setPrecoEspaco("");
        setFotoEspaco(null);
      } else {
        alert("Erro ao cadastrar espaço: " + data.message);
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor.");
    }
  };

  // Para o campo de foto do espaço
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFotoEspaco(URL.createObjectURL(file)); // Exibe a imagem localmente
    }
  };

  // Controla a exibição do formulário
  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div className="meus-espacos-container">
      <h2> Meus Espaços </h2>
      <div className="secoes">
        {" "}
        {/* Seção de espaços alugados */}{" "}
        <div className="espacos-alugados">
          <h3>Soliciatações de Aluguel</h3>
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
                <button className="alugar-btn">Alugar</button>
              </div>
            ))
          ) : (
            <p>Nenhum aluguel pendente.</p>
          )}
          </div>
        </div>

          {/* Seção de espaços para alugar */}
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
                  </div>
                ))
              ) : (
                <p>Você não cadastrou nenhum espaço.</p>
              )}
            </div>

        </div>
      </div>
    </div>
  );
}

export default MeusEspacos;
