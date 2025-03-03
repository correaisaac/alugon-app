import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Edicao.css";

function EdicaoUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [conta, setConta] = useState("");
  const [agencia, setAgencia] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://localhost:3333/users/${id}`);
        const data = await response.json();

        if (response.ok) {
          setNome(data.nome);
          setEmail(data.email);
          setDataNascimento(data.data_nascimento);
          setCpf(data.CPF);
          setTelefone(data.telefone);
          setConta(data.conta);
          setAgencia(data.agencia);
        } else {
          alert("Erro ao carregar os dados do usuário");
        }
      } catch (error) {
        alert("Erro ao conectar ao servidor.");
      }
    };
    fetchUserData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (novaSenha && novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      let fotoBase64 = "";
      if (fotoPerfil) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          fotoBase64 = reader.result;
          await enviarDados(fotoBase64);
        };
        reader.readAsDataURL(fotoPerfil);
      } else {
        await enviarDados(null);
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor.");
    }
  };

  const enviarDados = async (fotoBase64) => {
    const userData = {
      CPF: cpf,
      nome,
      data_nascimento: dataNascimento,
      telefone,
      email,
      foto: fotoBase64,
      conta,
      agencia,
    };

    if (novaSenha) {
      userData.senha = novaSenha;
    }

    const response = await fetch(`https://localhost:3333/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Usuário atualizado com sucesso!");
      navigate("/perfil");
    } else {
      alert("Erro ao atualizar: " + data.message);
    }
  };

  return (
    <div className="edicao-container">
      <form className="edicao-form" onSubmit={handleSubmit}>
        <h2>Editar Usuário</h2>
        <div className="input-group">
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input type="date" id="dataNascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" value={cpf} required disabled />
        </div>
        <div className="input-group">
          <label htmlFor="telefone">Telefone</label>
          <input type="tel" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="conta">Número da Conta</label>
          <input type="text" id="conta" value={conta} onChange={(e) => setConta(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="agencia">Número da Agência</label>
          <input type="text" id="agencia" value={agencia} onChange={(e) => setAgencia(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="novaSenha">Nova Senha</label>
          <input type="password" id="novaSenha" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
          <input type="password" id="confirmarSenha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="fotoPerfil">Foto de Perfil</label>
          <input type="file" id="fotoPerfil" accept="image/*" onChange={(e) => setFotoPerfil(e.target.files[0])} />
        </div>
        <button type="submit" className="edicao-btn">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EdicaoUsuario;
