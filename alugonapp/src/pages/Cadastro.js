import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Cadastro.css"; // Arquivo CSS para os estilos

function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          senha,
          dataNascimento,
          cpf,
          telefone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro bem-sucedido!");
      } else {
        alert("Erro ao cadastrar: " + data.message);
      }
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

        <button type="submit" className="cadastro-btn">Cadastrar</button>

        <p className="login-link">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </div>
  );
}

export default Cadastro;
