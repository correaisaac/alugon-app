import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import "./Cadastro.css"; 

function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null); // Novo estado para a foto
  const [conta, setConta] = useState(""); // Novo estado para a conta
  const [agencia, setAgencia] = useState(""); // Novo estado para a agência
  const navigate = useNavigate(); // Definir o hook de navegação

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      // Se houver foto, converta para base64
      let fotoBase64 = "";
      if (fotoPerfil) {
        const reader = new FileReader();
        reader.onloadend = () => {
          fotoBase64 = reader.result;
          enviarDados();
        };
        reader.readAsDataURL(fotoPerfil); // Converte a foto em base64
      } else {
        enviarDados();
      }

      const enviarDados = async () => {
        const response = await fetch("https://localhost:3333/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            CPF: cpf, 
            nome, 
            data_nascimento: dataNascimento, 
            telefone, 
            email, 
            senha,
            foto: fotoBase64, // Envia a foto como base64
            conta, // Envia a conta
            agencia, // Envia a agência
          }),        
        });

        const data = await response.json();

        if (response.ok) {
          alert("Cadastro bem-sucedido!");
          navigate("/login"); 
        } else {
          alert("Erro ao cadastrar: " + data.message);
        }
      };

    } catch (error) {
      alert("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2>Cadastre-se</h2>

        <div className="input-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            placeholder="Digite seu telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="conta">Número da Conta</label>
          <input
            type="text"
            id="conta"
            placeholder="Digite o número da sua conta"
            value={conta}
            onChange={(e) => setConta(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="agencia">Número da Agência</label>
          <input
            type="text"
            id="agencia"
            placeholder="Digite o número da sua agência"
            value={agencia}
            onChange={(e) => setAgencia(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmar-senha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmar-senha"
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="fotoPerfil">Foto de Perfil</label>
          <input
            type="file"
            id="fotoPerfil"
            accept="image/*"
            onChange={(e) => setFotoPerfil(e.target.files[0])} // Atualiza o estado com o arquivo
          />
        </div>

        <button type="submit" className="cadastro-btn">Cadastrar</button>

        <p className="login-link">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </div>
  );
}

export default Cadastro;
