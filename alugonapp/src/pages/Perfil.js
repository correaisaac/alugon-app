import React from "react";
import { useAuth } from "../context/AuthContext";
import "./Perfil.css";

function formatDate(isoDate) {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function Perfil() {
  const { user, logout } = useAuth(); 
  if (!user) {
    return <p className="profile-data">Você precisa estar logado para acessar esta página.</p>;
  }

  return (
    <div  className="profile-data">
      <h2>Perfil de {user.nome}</h2>
      <p>Email: {user.email}</p>
      <p>Nome: {user.nome}</p>
      <p>CPF: {user.CPF}</p>
      <p>Data de Nascimento: {formatDate(user.data_nascimento)}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}

export default Perfil;