import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Importando o contexto de autenticação
import { useNavigate } from "react-router-dom"; // Importando o hook para redirecionamento
import "./MeusEspacos.css";

function MeusEspacos() {
  const { user, token } = useAuth(); // Obtendo os dados de autenticação do contexto
  const navigate = useNavigate(); // Hook de navegação

  const [espacosDisponiveis, setEspacosDisponiveis] = useState([]);
  const [espacosAlugados, setEspacosAlugados] = useState([]);
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
          const response = await fetch("http://localhost:3333/spaces");
          const data = await response.json();
          setEspacosDisponiveis(data.filter(espaco => !espaco.alugado));
          setEspacosAlugados(data.filter(espaco => espaco.alugado));
        } catch (error) {
          alert("Erro ao carregar os espaços.");
        }
      };
      fetchEspacos();
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
      const response = await fetch("http://localhost:3333/spaces", {
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
      <h2>Meus Espaços</h2>

      <div className="secoes">
        {/* Seção de espaços alugados */}
        <div className="espacos-alugados">
          <h3>Meus Espaços Alugados</h3>
          <div className="espacos-lista">
            {espacosAlugados.length > 0 ? (
              espacosAlugados.map((espaco) => (
                <div key={espaco.id} className="espaco-card">
                  <img
                    src={espaco.foto}
                    alt={espaco.nome}
                    className="espaco-imagem"
                  />
                  <h4>{espaco.nome}</h4>
                  <p>{espaco.descricao}</p>
                  <p>Preço: R$ {espaco.preco}</p>
                  <button className="alugar-btn" disabled>
                    Alugado
                  </button>
                </div>
              ))
            ) : (
              <p>Você não alugou nenhum espaço ainda.</p>
            )}
          </div>
        </div>

        {/* Seção de espaços para alugar */}
        <div className="espacos-para-alugar">
          <h3>Meus Espaços para Alugar</h3>
          <div className="espacos-lista">
            {espacosDisponiveis.length > 0 ? (
              espacosDisponiveis.map((espaco) => (
                <div key={espaco.id} className="espaco-card">
                  <img
                    src={espaco.foto}
                    alt={espaco.nome}
                    className="espaco-imagem"
                  />
                  <h4>{espaco.nome}</h4>
                  <p>{espaco.descricao}</p>
                  <p>Preço: R$ {espaco.preco}</p>
                  <button className="alugar-btn">Alugar</button>
                </div>
              ))
            ) : (
              <p>Você não tem espaços disponíveis para alugar.</p>
            )}
          </div>
        </div>
      </div>

      {/* Botão para mostrar/esconder o formulário */}
      <div className="botao-cadastrar">
        <button onClick={toggleFormVisibility} className="cadastrar-btn">
          {formVisible ? "Fechar Formulário" : "Cadastrar Novo Espaço"}
        </button>
      </div>

      {/* Formulário de cadastro de espaço (visível quando formVisible for true) */}
      {formVisible && (
        <div className="cadastrar-espaco">
          <h3>Cadastrar Espaço para Alugar</h3>
          <form onSubmit={handleCadastrarEspaco}>
            <div className="input-group">
              <label htmlFor="nome">Nome do Espaço</label>
              <input
                type="text"
                id="nome"
                value={nomeEspaco}
                onChange={(e) => setNomeEspaco(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                value={descricaoEspaco}
                onChange={(e) => setDescricaoEspaco(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="preco">Preço</label>
              <input
                type="number"
                id="preco"
                value={precoEspaco}
                onChange={(e) => setPrecoEspaco(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="foto">Foto do Espaço</label>
              <input
                type="file"
                id="foto"
                accept="image/*"
                onChange={handleFileChange}
              />
              {fotoEspaco && (
                <div className="foto-preview">
                  <img
                    src={fotoEspaco}
                    alt="Foto do espaço"
                    className="foto-preview-imagem"
                  />
                </div>
              )}
            </div>

            <button type="submit" className="cadastrar-btn">
              Cadastrar Espaço
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default MeusEspacos;
