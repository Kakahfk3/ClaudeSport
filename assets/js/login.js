
const formLogin = document.querySelector("#form-login");
const mensagemLogin = document.querySelector("#mensagem-login");

formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value;

    if (!email || !senha) {
        mensagemLogin.textContent = "Preencha todos os campos.";
        return;
    }

    // Registra o login demonstrativo nesta sessão.
    sessionStorage.setItem("claudesport-logado", "true");
    sessionStorage.setItem("claudesport-email", email);

    mensagemLogin.textContent = "Login realizado! Redirecionando...";

    window.location.href = "dashboard.html";
});
