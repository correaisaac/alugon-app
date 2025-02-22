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
    <div className="profile-data">
      <div className="profile-card">
        <h2>Perfil de {user.nome}</h2>
        <img
          src={user.foto ? `data:image/jpeg;base64,${user.foto}` : 'default-image.jpg'} 
          alt={`Foto de ${user.nome}`}
          className="user-photo"
        />
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Nome:</strong> {user.nome}</p>
        <p><strong>CPF:</strong> {user.CPF}</p>
        <p><strong>Data de Nascimento:</strong> {formatDate(user.data_nascimento)}</p>
        <button className="logout-button" onClick={logout}>Sair</button>
      </div>
    </div>
  );
}

export default Perfil;
