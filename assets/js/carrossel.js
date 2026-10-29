
const banners = document.querySelectorAll(".banner");

let bannerAtual = 0;
const intervalo = 6000;

function mostrarBanner(indice) {
    banners[bannerAtual].classList.remove("ativo");

    bannerAtual = indice;

    banners[bannerAtual].classList.add("ativo");
}

function proximoBanner() {
    const proximo = (bannerAtual + 1) % banners.length;
    mostrarBanner(proximo);
}

const prefereMovimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (banners.length > 1 && !prefereMovimentoReduzido) {
    setInterval(proximoBanner, intervalo);
}
