import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./NovoEspaco.css";

function NovoEspaco() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [espaco, setEspaco] = useState({
    numero: "",
    descricao: "",
    valor: "",
    imagem: null,
    cidade: "",
    bairro: "",
    disponivel: 1,
  });
  const [fotoEspaco, setFotoEspaco] = useState(null);
  const [titulo, setTitulo] = useState("Novo Espaço");

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    } else {
      // Se o ID estiver presente na URL, significa que estamos editando um espaço
      if (id) {
        setTitulo("Editar Espaço");
        const fetchEspaco = async () => {
          try {
            const response = await fetch(`https://localhost:3333/spaces/${id}`, {
              method: "GET",
              headers: { "Authorization": `Bearer ${token}` },
            });
            const data = await response.json();
            if (data) {
              setEspaco(data);
              setFotoEspaco(data.imagem ? `data:image/jpeg;base64,${data.imagem}` : null);
            }
          } catch (error) {
            alert("Erro ao carregar o espaço.");
          }
        };
        fetchEspaco();
      }
    }
  }, [user, token, id, navigate]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFotoEspaco(URL.createObjectURL(file));
      setEspaco((prevEspaco) => ({
        ...prevEspaco,
        imagem: file,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("numero", espaco.numero);
    formData.append("descricao", espaco.descricao);
    formData.append("valor", espaco.valor);
    formData.append("imagem", espaco.imagem);
    formData.append("cidade", espaco.cidade);
    formData.append("bairro", espaco.bairro);
    formData.append("disponivel", espaco.disponivel);
    try {
      let response;
      if (id) {
        response = await fetch(`https://localhost:3333/spaces/${id}`, {
          method: "PUT",
          headers: { "Authorization": `Bearer ${token}` },
          body: formData,
        });
      } else {
        response = await fetch("https://localhost:3333/spaces", {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` },
          body: formData,
        });
      }
      const data = await response.json();
      if (response.ok) {
        alert("Espaço salvo com sucesso!");
        navigate("/meus-espacos");
      } else {
        alert("Erro ao salvar espaço: " + data.message);
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="novo-espaco-container">
      <h2>{titulo}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="numero">Número do Espaço:</label>
          <input
            type="text"
            id="numero"
            value={espaco.numero}
            onChange={(e) => setEspaco({ ...espaco, numero: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            value={espaco.descricao}
            onChange={(e) => setEspaco({ ...espaco, descricao: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="valor">Valor:</label>
          <input
            type="number"
            id="valor"
            value={espaco.valor}
            onChange={(e) => setEspaco({ ...espaco, valor: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="foto">Imagem:</label>
          <input
            type="file"
            id="foto"
            onChange={handleFileChange}
          />
          {fotoEspaco && <img src={fotoEspaco} alt="Foto do espaço" className="preview-img" />}
        </div>

        <div className="form-group">
          <label htmlFor="cidade">Cidade:</label>
          <input
            type="text"
            id="cidade"
            value={espaco.cidade}
            onChange={(e) => setEspaco({ ...espaco, cidade: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bairro">Bairro:</label>
          <input
            type="text"
            id="bairro"
            value={espaco.bairro}
            onChange={(e) => setEspaco({ ...espaco, bairro: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="disponivel">Disponível:</label>
          <select
            id="disponivel"
            value={espaco.disponivel}
            onChange={(e) => setEspaco({ ...espaco, disponivel: parseInt(e.target.value) })}
          >
            <option value="1">Sim</option>
            <option value="0">Não</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          {id ? "Salvar Alterações" : "Criar Espaço"}
        </button>
      </form>
    </div>
  );
}

export default NovoEspaco;
