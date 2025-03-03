import React from "react";
import { Link } from "react-router-dom";
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

  const handleDelete = async () => {
    if (window.confirm("Tem certeza de que deseja excluir sua conta?")) {
      try {
        const response = await fetch(`https://localhost:3333/users/${user.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Conta excluída com sucesso!");
          logout();  // Faz logout após a exclusão
        } else {
          const data = await response.json();
          alert("Erro ao excluir conta: " + data.message);
        }
      } catch (error) {
        alert("Erro ao conectar ao servidor.");
      }
    }
  };

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
        <p><strong>Conta:</strong> {user.conta}</p>
        <p><strong>Agência:</strong> {user.agencia}</p>
        <Link to={`/editar-usuario/${user.id}`} className="edit-button">Editar Perfil</Link>
        <button className="logout-button" onClick={logout}>Sair</button>
        <button className="delete-button" onClick={handleDelete}>Excluir Conta</button>
      </div>
    </div>
  );
}

export default Perfil;
