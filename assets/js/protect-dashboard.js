
const estaLogado =
    sessionStorage.getItem("claudesport-logado") === "true";

if (!estaLogado) {
    window.location.replace("login.html");
}
