
const CHAVE_CARRINHO = "claudesport-carrinho";

// Lê os produtos salvos no navegador.
function lerCarrinho() {
    try {
        const dados = localStorage.getItem(CHAVE_CARRINHO);
        const carrinho = dados ? JSON.parse(dados) : [];

        return Array.isArray(carrinho) ? carrinho : [];
    } catch (erro) {
        console.error("Erro ao carregar o carrinho:", erro);
        return [];
    }
}

// Salva o carrinho atualizado.
function salvarCarrinho(carrinho) {
    localStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(carrinho)
    );
}

// Converte números em valores monetários brasileiros.
function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Atualiza os números e desenha os produtos na tela.
function atualizarPainel() {
    const carrinho = lerCarrinho();

    const quantidadeTotal = carrinho.reduce(
        (soma, item) => soma + Number(item.quantidade),
        0
    );

    const subtotal = carrinho.reduce(
        (soma, item) =>
            soma + Number(item.preco) * Number(item.quantidade),
        0
    );

    document.querySelector("#total-itens").textContent =
        quantidadeTotal;

    document.querySelector("#total-carrinho").textContent =
        formatarPreco(subtotal);

    document.querySelector("#subtotal-carrinho").textContent =
        formatarPreco(subtotal);

    const lista = document.querySelector("#lista-carrinho");

    // Mostra uma mensagem quando não existem produtos.
    if (carrinho.length === 0) {
        lista.replaceChildren();

        const mensagem = document.createElement("p");
        mensagem.className = "dashboard-descricao";
        mensagem.textContent = "Seu carrinho está vazio por enquanto.";

        lista.appendChild(mensagem);
        return;
    }

    // Limpa a lista antes de desenhar os produtos novamente.
    lista.replaceChildren();

    carrinho.forEach(item => {
        const linha = document.createElement("article");
        linha.className = "item-carrinho";

        const informacoes = document.createElement("div");
        informacoes.className = "item-carrinho-info";

        const nome = document.createElement("h3");
        nome.textContent = item.nome;

        const preco = document.createElement("p");
        preco.textContent =
            `${formatarPreco(item.preco)} por unidade`;

        informacoes.append(nome, preco);

        // Controles de quantidade.
        const controles = document.createElement("div");
        controles.className = "item-carrinho-controles";

        const diminuir = document.createElement("button");
        diminuir.type = "button";
        diminuir.className = "quantidade-botao";
        diminuir.textContent = "−";
        diminuir.setAttribute(
            "aria-label",
            `Diminuir quantidade de ${item.nome}`
        );

        diminuir.addEventListener("click", () => {
            alterarQuantidade(item.id, -1);
        });

        const quantidade = document.createElement("span");
        quantidade.className = "quantidade-valor";
        quantidade.textContent = item.quantidade;

        const aumentar = document.createElement("button");
        aumentar.type = "button";
        aumentar.className = "quantidade-botao";
        aumentar.textContent = "+";
        aumentar.setAttribute(
            "aria-label",
            `Aumentar quantidade de ${item.nome}`
        );

        aumentar.addEventListener("click", () => {
            alterarQuantidade(item.id, 1);
        });

        controles.append(diminuir, quantidade, aumentar);

        // Preço total daquele produto.
        const totalProduto = document.createElement("strong");
        totalProduto.className = "item-carrinho-total";
        totalProduto.textContent = formatarPreco(
            Number(item.preco) * Number(item.quantidade)
        );

        // Botão para remover o produto inteiro.
        const remover = document.createElement("button");
        remover.type = "button";
        remover.className = "remover-produto";
        remover.textContent = "Remover";
        remover.addEventListener("click", () => {
            removerProduto(item.id);
        });

        const ladoDireito = document.createElement("div");
        ladoDireito.className = "item-carrinho-acoes";
        ladoDireito.append(controles, totalProduto, remover);

        linha.append(informacoes, ladoDireito);
        lista.appendChild(linha);
    });
}

// Altera a quantidade de um produto.
// Se a quantidade chegar a zero, remove o produto.
function alterarQuantidade(id, variacao) {
    const carrinho = lerCarrinho();

    const produto = carrinho.find(item => item.id === id);

    if (!produto) {
        return;
    }

    produto.quantidade = Number(produto.quantidade) + variacao;

    const carrinhoAtualizado = carrinho.filter(
        item => Number(item.quantidade) > 0
    );

    salvarCarrinho(carrinhoAtualizado);
    atualizarPainel();
}

// Remove um produto independentemente da quantidade.
function removerProduto(id) {
    const carrinho = lerCarrinho();

    const carrinhoAtualizado = carrinho.filter(
        item => item.id !== id
    );

    salvarCarrinho(carrinhoAtualizado);
    atualizarPainel();
}

// Atualiza o painel quando a página é aberta.
atualizarPainel();

// Atualiza também se o carrinho mudar em outra aba.
window.addEventListener("storage", atualizarPainel);
