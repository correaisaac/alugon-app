document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: password, // ⚠️ Certifique-se de que o backend espera 'senha' e não 'password'!
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "./index.html";
      } else {
        alert(data.error || "Erro ao fazer login!");
      }
    } catch (error) {
      console.error("Erro ao conectar-se ao servidor:", error);
      alert("Erro de conexão com o servidor!");
    }
  });
});
