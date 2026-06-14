const imageURLs = [
  "/imagens/celulas_imagens/baralho.webp",
  "/imagens/celulas_imagens/clashOfClans.png",
  "/imagens/celulas_imagens/clashRoyale.png",
  "/imagens/celulas_imagens/dugeonsAndDragons.webp",
  "/imagens/celulas_imagens/enigmaDoMedo.avif",
  "/imagens/celulas_imagens/filmes.jpg",
  "/imagens/celulas_imagens/justDance.jpg",
  "/imagens/celulas_imagens/leitura.webp",
  "/imagens/celulas_imagens/lol.jpg",
  "/imagens/celulas_imagens/magic.webp",
  "/imagens/celulas_imagens/minecraft.jpg",
  "/imagens/celulas_imagens/mortalKombat.webp",
  "/imagens/celulas_imagens/pokemon.jpg",
  "/imagens/celulas_imagens/poker.jpg",
  "/imagens/celulas_imagens/riftbound.webp",
  "/imagens/celulas_imagens/turmaDaMonicaJovem.webp",
];
window.onload = async () => {
  await fetch("/celula")
    .then((blob) => blob.json())
    .then((json) => {
      const grade = document.querySelector(".grade-celulas");

      for (let i = 0; i < json.length; i++) {
        const link = document.createElement("a");
        link.setAttribute("href", `/celula/${json[i].id}`);

        const cartao = document.createElement("div");
        const img = document.createElement("img");
        const info = document.createElement("div");
        const title = document.createElement("h3");
        const responsavel = document.createElement("p");

        cartao.classList.add("cartao-celula");

        img.classList.add("imagem-cartao");
        img.setAttribute("src", imageURLs[i % imageURLs.length]);
        img.setAttribute("alt", `Foto da ${json[i].nome}`);

        title.classList.add("titulo-cartao");
        title.innerText = json[i].nome;

        responsavel.classList.add("criador-cartao");
        responsavel.innerText = json[i].responsavel;

        info.classList.add("informacoes-cartao");
        info.appendChild(title);
        info.appendChild(responsavel);

        cartao.appendChild(img);
        cartao.appendChild(info);

        link.appendChild(cartao);
        grade.appendChild(link);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  const linksNavegacao = document.querySelectorAll(".item-navegacao");

  linksNavegacao.forEach((link) => {
    link.addEventListener("click", (evento) => {
      const destino = link.href;

      if (
        destino &&
        destino !== window.location.href &&
        !destino.includes("#")
      ) {
        evento.preventDefault();

        document.body.classList.add("animacao-saida");

        setTimeout(() => {
          window.location.href = destino;
        }, 400);
      }
    });
  });

  const iconePerfil = document.querySelector(".icone-usuario");
  const menuDropdown = document.querySelector(".menu-dropdown");

  if (iconePerfil && menuDropdown) {
    iconePerfil.addEventListener("click", (evento) => {
      evento.stopPropagation();
      menuDropdown.classList.toggle("mostrar");
    });

    document.addEventListener("click", () => {
      menuDropdown.classList.remove("mostrar");
    });
  }

  const campoPesquisa = document.querySelector(".campo-pesquisa");
  const cartoesCelula = document.querySelectorAll(".cartao-celula");
  const mensagemVazia = document.getElementById("mensagem-vazia");
  const tituloSecao = document.querySelector(".cabecalho-secao");

  if (campoPesquisa) {
    campoPesquisa.addEventListener("input", (evento) => {
      const termoPesquisa = evento.target.value.toLowerCase().trim();
      let encontrouAlguma = false;

      if (tituloSecao) {
        if (termoPesquisa !== "") {
          tituloSecao.style.display = "none";
        } else {
          tituloSecao.style.display = "block";
        }
      }

      cartoesCelula.forEach((cartao) => {
        const tituloOriginal = cartao
          .querySelector(".titulo-cartao")
          .textContent.toLowerCase();
        const responsavelOriginal = cartao
          .querySelector(".criador-cartao")
          .textContent.toLowerCase();

        const tituloLimpo = tituloOriginal
          .replace("célula de ", "")
          .replace("célula da ", "");
        const responsavelLimpo = responsavelOriginal
          .replace("responsável: ", "")
          .replace("criador: ", "");

        if (
          termoPesquisa === "" ||
          tituloLimpo.startsWith(termoPesquisa) ||
          responsavelLimpo.startsWith(termoPesquisa)
        ) {
          cartao.style.display = "block";
          if (termoPesquisa !== "") {
            cartao.style.animation = "fadeEntrada 0.4s ease-out";
          }
          encontrouAlguma = true;
        } else {
          cartao.style.display = "none";
        }
      });

      if (!encontrouAlguma) {
        mensagemVazia.style.display = "block";
      } else {
        mensagemVazia.style.display = "none";
      }
    });
  }
});
