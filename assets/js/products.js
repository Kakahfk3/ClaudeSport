
"use strict";

// ========================================
// 1. DADOS DOS PRODUTOS
// ========================================

const produtos = [
    { id: 1, nome: "Bola de futebol", categoria: "Futebol", preco: 90, imagem: "bola-de-futebol.jpg" },
    { id: 2, nome: "Camisa esportiva", categoria: "Vestuário", preco: 100, imagem: "camisa-esportiva.jpg" },
    { id: 3, nome: "Chuteira", categoria: "Futebol", preco: 220, imagem: "chuteira.jpg" },
    { id: 4, nome: "Tênis de corrida", categoria: "Calçados", preco: 280, imagem: "tenis-de-corrida.jpg" },
    { id: 5, nome: "Bola de basquete", categoria: "Basquete", preco: 110, imagem: "bola-de-basquete.jpg" },
    { id: 6, nome: "Bola de vôlei", categoria: "Vôlei", preco: 80, imagem: "bola-de-volei.jpg" },
    { id: 7, nome: "Luvas de goleiro", categoria: "Futebol", preco: 110, imagem: "luvas-de-goleiro.jpg" },
    { id: 8, nome: "Mochila esportiva", categoria: "Acessórios", preco: 140, imagem: "mochila-esportiva.jpg" },
    { id: 9, nome: "Garrafa térmica", categoria: "Acessórios", preco: 55, imagem: "garrafa-termica.jpg" },
    { id: 10, nome: "Meias esportivas", categoria: "Vestuário", preco: 25, imagem: "meias-esportivas.jpg" },
    { id: 11, nome: "Bermuda esportiva", categoria: "Vestuário", preco: 75, imagem: "bermuda-esportiva.jpg" },
    { id: 12, nome: "Calça de treino", categoria: "Vestuário", preco: 120, imagem: "calca-de-treino.jpg" },
    { id: 13, nome: "Jaqueta esportiva", categoria: "Vestuário", preco: 200, imagem: "jaqueta-esportiva.jpg" },
    { id: 14, nome: "Boné esportivo", categoria: "Acessórios", preco: 50, imagem: "bone-esportivo.jpg" },
    { id: 15, nome: "Munhequeira", categoria: "Acessórios", preco: 20, imagem: "munhequeira.jpg" },
    { id: 16, nome: "Caneleira", categoria: "Futebol", preco: 35, imagem: "caneleira.jpg" },
    { id: 17, nome: "Tapete de yoga", categoria: "Fitness", preco: 80, imagem: "tapete-de-yoga.jpg" },
    { id: 18, nome: "Halteres (par)", categoria: "Fitness", preco: 100, imagem: "halteres.jpg" },
    { id: 19, nome: "Corda de pular", categoria: "Fitness", preco: 30, imagem: "corda-de-pular.jpg" },
    { id: 20, nome: "Elástico de treino", categoria: "Fitness", preco: 40, imagem: "elastico-de-treino.jpg" },
    { id: 21, nome: "Banco de musculação", categoria: "Fitness", preco: 450, imagem: "banco-de-musculacao.jpg" },
    { id: 22, nome: "Luvas de academia", categoria: "Fitness", preco: 60, imagem: "luvas-de-academia.jpg" },
    { id: 23, nome: "Patins", categoria: "Esportes urbanos", preco: 320, imagem: "patins.jpg" },
    { id: 24, nome: "Skate", categoria: "Esportes urbanos", preco: 200, imagem: "skate.jpg" },
    { id: 25, nome: "Óculos esportivos", categoria: "Acessórios", preco: 100, imagem: "oculos-esportivos.jpg" },
    { id: 26, nome: "Cronômetro", categoria: "Acessórios", preco: 70, imagem: "cronometro.jpg" },
    { id: 27, nome: "Apito profissional", categoria: "Acessórios", preco: 20, imagem: "apito-profissional.jpg" },
    { id: 28, nome: "Rede de vôlei", categoria: "Vôlei", preco: 150, imagem: "rede-de-volei.jpg" },
    { id: 29, nome: "Bomba de encher bolas", categoria: "Acessórios", preco: 35, imagem: "bomba-de-encher-bolas.jpg" },
    { id: 30, nome: "Cone de treinamento (kit)", categoria: "Fitness", preco: 60, imagem: "cones-de-treinamento.jpg" }
];

// ========================================
// 2. ELEMENTOS DO HTML
// ========================================

const gradeProdutos = document.getElementById("grade-produtos");
const campoPesquisa = document.getElementById("pesquisa-produtos");
const seletorCategoria = document.getElementById("seletor-categoria");
const botaoCategoria = document.getElementById("botao-categoria");
const textoBotaoCategoria = document.getElementById("botao-categoria-texto");
const opcoesCategoria = document.getElementById("opcoes-categoria");

let categoriaSelecionada = "todos";
const contadorProdutos = document.getElementById("contador-produtos");

const formatarPreco = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

// ========================================
// 3. CRIAR AS OPÇÕES DE CATEGORIA
// ========================================

function carregarCategorias() {
    const categorias = [...new Set(
        produtos.map(produto => produto.categoria)
    )].sort((a, b) => a.localeCompare(b, "pt-BR"));

    const todasCategorias = ["todos", ...categorias];

    todasCategorias.forEach(categoria => {
        const opcao = document.createElement("button");

        opcao.type = "button";
        opcao.className = "opcao-categoria";
        opcao.role = "option";
        opcao.dataset.categoria = categoria;
        opcao.textContent =
            categoria === "todos"
                ? "Todas as categorias"
                : categoria;

        opcao.setAttribute(
            "aria-selected",
            String(categoria === categoriaSelecionada)
        );

        opcao.addEventListener("click", () => {
            selecionarCategoria(categoria);
        });

        opcoesCategoria.appendChild(opcao);
    });
}

function selecionarCategoria(categoria) {
    categoriaSelecionada = categoria;

    textoBotaoCategoria.textContent =
        categoria === "todos"
            ? "Todas as categorias"
            : categoria;

    opcoesCategoria.querySelectorAll(".opcao-categoria")
        .forEach(opcao => {
            opcao.setAttribute(
                "aria-selected",
                String(opcao.dataset.categoria === categoria)
            );
        });

    fecharCategorias();
    filtrarProdutos();
}

function abrirCategorias() {
    opcoesCategoria.hidden = false;
    botaoCategoria.setAttribute("aria-expanded", "true");
}

function fecharCategorias() {
    opcoesCategoria.hidden = true;
    botaoCategoria.setAttribute("aria-expanded", "false");
}

botaoCategoria.addEventListener("click", () => {
    if (opcoesCategoria.hidden) {
        abrirCategorias();
    } else {
        fecharCategorias();
    }
});

document.addEventListener("click", evento => {
    if (!seletorCategoria.contains(evento.target)) {
        fecharCategorias();
    }
});

botaoCategoria.addEventListener("keydown", evento => {
    if (evento.key === "Escape") {
        fecharCategorias();
    }
});

// ========================================
// 4. CRIAR UM CARD DE PRODUTO
// ========================================

function criarCard(produto) {
    const card = document.createElement("article");

    card.className = "produto-card";
    card.dataset.id = produto.id;
    card.dataset.nome = produto.nome;
    card.dataset.preco = produto.preco;

    const imagem = document.createElement("img");
    imagem.className = "produto-imagem";

    // CAMINHO CORRETO: imagens exclusivas da loja
    imagem.src = `assets/images/store/${produto.imagem}`;

    imagem.alt = produto.nome;
    imagem.loading = "lazy";

    imagem.addEventListener("error", () => {
        imagem.alt = `${produto.nome} — imagem indisponível`;
        imagem.removeAttribute("src");
        imagem.classList.add("imagem-indisponivel");
    }, { once: true });

    const categoria = document.createElement("p");
    categoria.className = "produto-categoria";
    categoria.textContent = produto.categoria;

    const nome = document.createElement("h2");
    nome.className = "produto-nome";
    nome.textContent = produto.nome;

    const preco = document.createElement("p");
    preco.className = "produto-preco";
    preco.textContent = formatarPreco.format(produto.preco);

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao-adicionar";
    botao.dataset.adicionar = produto.id;
    botao.textContent = "Adicionar ao carrinho";
    botao.setAttribute(
        "aria-label",
        `Adicionar ${produto.nome} ao carrinho`
    );

    card.append(imagem, categoria, nome, preco, botao);

    return card;
}

// ========================================
// 5. MOSTRAR OS PRODUTOS
// ========================================

function renderizarProdutos(lista) {
    gradeProdutos.replaceChildren();

    if (lista.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.className = "catalogo-vazio";
        mensagem.textContent =
            "Nenhum produto encontrado. Tente outra pesquisa ou categoria.";

        gradeProdutos.appendChild(mensagem);
    } else {
        const fragmento = document.createDocumentFragment();

        lista.forEach(produto => {
            fragmento.appendChild(criarCard(produto));
        });

        gradeProdutos.appendChild(fragmento);
    }

    contadorProdutos.textContent =
        `${lista.length} ${
            lista.length === 1
                ? "produto encontrado"
                : "produtos encontrados"
        }`;
}

// ========================================
// 6. PESQUISA E FILTRO
// ========================================

function filtrarProdutos() {
    const termo = campoPesquisa.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    const categoriaAtual = categoriaSelecionada;

    const resultado = produtos.filter(produto => {
        const correspondePesquisa =
            produto.nome.toLocaleLowerCase("pt-BR").includes(termo) ||
            produto.categoria.toLocaleLowerCase("pt-BR").includes(termo);

    const correspondeCategoria =
    categoriaAtual === "todos" ||
    produto.categoria === categoriaAtual;

        return correspondePesquisa && correspondeCategoria;
    });

    renderizarProdutos(resultado);
}

// ========================================
// 7. INICIALIZAÇÃO
// ========================================

if (
    gradeProdutos &&
    campoPesquisa &&
    seletorCategoria &&
    botaoCategoria &&
    textoBotaoCategoria &&
    opcoesCategoria &&
    contadorProdutos
) {
    carregarCategorias();
    renderizarProdutos(produtos);

    campoPesquisa.addEventListener("input", filtrarProdutos);
} else {
    console.error(
        "ClaudeSport: não foi possível encontrar todos os elementos do catálogo no HTML."
    );
}
