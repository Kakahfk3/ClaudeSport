
const CHAVE_CARRINHO = "claudesport-carrinho";

function carregarCarrinho() {
    const dadosSalvos = localStorage.getItem(CHAVE_CARRINHO);

    if (dadosSalvos === null) {
        return [];
    }

    try {
        const carrinho = JSON.parse(dadosSalvos);

        return Array.isArray(carrinho) ? carrinho : [];
    } catch (erro) {
        console.error("Erro ao ler o carrinho:", erro);
        return [];
    }
}

function salvarCarrinho(carrinho) {
    localStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(carrinho)
    );
}

let carrinho = carregarCarrinho();

console.log("Carrinho carregado:", carrinho);


function adicionarAoCarrinho(id) {
    const produto = document.querySelector(
        `.produto-card[data-id="${id}"]`
    );

    if (!produto) {
        console.error("Produto não encontrado:", id);
        return;
    }

    const nome = produto.dataset.nome;
    const preco = Number(produto.dataset.preco);

    const itemExistente = carrinho.find(
        item => item.id === id
    );

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id: id,
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    salvarCarrinho(carrinho);

    console.log("Carrinho atualizado:", carrinho);
}

document.querySelectorAll("[data-adicionar]").forEach(botao => {
    botao.addEventListener("click", () => {
        adicionarAoCarrinho(botao.dataset.adicionar);
    });
});
