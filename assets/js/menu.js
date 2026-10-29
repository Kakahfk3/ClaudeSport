
const botaoMenu = document.querySelector("#botao-menu");
const menuPrincipal = document.querySelector("#menu-principal");

function configurarMenu() {
    // Algumas páginas podem não ter o menu.
    if (!botaoMenu || !menuPrincipal) {
        return;
    }

    const estaLogado =
        sessionStorage.getItem("claudesport-logado") === "true";

    const linkEntrar = menuPrincipal.querySelector(
        'a[href="login.html"]'
    );

    if (estaLogado && linkEntrar) {
        // Transforma "Entrar" em "Dashboard", preservando o SVG.
        linkEntrar.href = "dashboard.html";
        linkEntrar.querySelector("span:not(.seta-menu)").textContent =
            "Dashboard";
        linkEntrar.setAttribute("aria-label", "Dashboard");

        // Evita criar o link de sair mais de uma vez.
        if (!menuPrincipal.querySelector('[data-acao="sair"]')) {
            const linkSair = document.createElement("a");
            linkSair.href = "#";
            linkSair.dataset.acao = "sair";

            linkSair.innerHTML = `
                <svg class="icone-menu" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="1.8"
                     stroke-linecap="round" stroke-linejoin="round"
                     aria-hidden="true">
                    <path d="M10 17l5-5-5-5"/>
                    <path d="M15 12H3"/>
                    <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/>
                </svg>
                <span>Sair da conta</span>
                <span class="seta-menu">↗</span>
            `;

            menuPrincipal.appendChild(linkSair);
        }
    }

    // Abre e fecha o menu hambúrguer.
    botaoMenu.addEventListener("click", () => {
        const menuAberto = menuPrincipal.classList.toggle("aberto");

        botaoMenu.setAttribute("aria-expanded", menuAberto);
        botaoMenu.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu" : "Abrir menu"
        );
    });

    // Fecha o menu ao clicar fora.
    document.addEventListener("click", (evento) => {
        const clicouNoMenu = menuPrincipal.contains(evento.target);
        const clicouNoBotao = botaoMenu.contains(evento.target);

        if (!clicouNoMenu && !clicouNoBotao) {
            menuPrincipal.classList.remove("aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
        }
    });

    // Fecha o menu com Escape.
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            menuPrincipal.classList.remove("aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
            botaoMenu.focus();
        }
    });

    // Encerra a sessão sem apagar o carrinho.
    menuPrincipal.addEventListener("click", (evento) => {
        const linkSair = evento.target.closest('[data-acao="sair"]');

        if (!linkSair) {
            return;
        }

        evento.preventDefault();

        sessionStorage.removeItem("claudesport-logado");
        sessionStorage.removeItem("claudesport-email");

        window.location.href = "index.html";
    });
}

configurarMenu();
