function getCookie(cName) {
  const indexOfCookie = document.cookie.indexOf(cName);
  if (indexOfCookie === -1) return "";
  let s = "";
  for (
    let i = indexOfCookie + cName.length + 1;
    i < document.cookie.length;
    i++
  ) {
    if (document.cookie[i] === ";") break;
    s += document.cookie[i];
  }
  return s;
}

function setAutheticatedDisplay(auth) {
  const info = document.querySelector(".perfil-info");
  if (!info) return;
  if (auth) {
    const nomeUsuario = document.createElement("span");
    const usuarioIcon = document.createElement("svg");

    nomeUsuario.classList.add("nome-usuario");
    nomeUsuario.innerText = "Olá, " + getCookie("nome");

    usuarioIcon.classList.add("icone-usuario");
    usuarioIcon.setAttribute("viewBox", "0 0 24 24");
    usuarioIcon.setAttribute("fill", "currentColor");
    usuarioIcon.innerHTML =
      '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>';

    info.appendChild(nomeUsuario);
    info.appendChild(usuarioIcon);
  } else {
    const loginLink = document.createElement("a");
    const cadastroLink = document.createElement("a");

    loginLink.setAttribute("href", "/html/paginaLogin.html");
    loginLink.innerText = "Login";

    cadastroLink.setAttribute("href", "/html/paginaCadastro.html");
    cadastroLink.innerText = "Cadastre-se";

    info.appendChild(loginLink);
    info.appendChild(cadastroLink);
  }
}

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
  console.log(document.cookie);
  const authenticated = getCookie("authenticated") === "true";
  setAutheticatedDisplay(authenticated);

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
  const linksNavegacao = document.querySelectorAll('.item-navegacao');

  linksNavegacao.forEach(link => {
    link.addEventListener('click', (evento) => {
      const destino = link.href;

      if (destino && destino !== window.location.href && !destino.includes('#')) {
        evento.preventDefault(); 
        
        document.body.classList.add('animacao-saida');

        setTimeout(() => {
          window.location.href = destino;
        }, 400); 
      }
    });
  });

  const iconePerfil = document.querySelector('.icone-usuario');
  const menuDropdown = document.querySelector('.menu-dropdown');

  if (iconePerfil && menuDropdown) {
    iconePerfil.addEventListener('click', (evento) => {
      evento.stopPropagation(); 
      menuDropdown.classList.toggle('mostrar');
    });

    document.addEventListener('click', () => {
      menuDropdown.classList.remove('mostrar');
    });
  }

  const campoPesquisa = document.querySelector('.campo-pesquisa');
  const cartoesCelula = document.querySelectorAll('.cartao-celula');
  const mensagemVazia = document.getElementById('mensagem-vazia');
  const tituloSecao = document.querySelector('.cabecalho-secao'); 

  if (campoPesquisa) {
    campoPesquisa.addEventListener('input', (evento) => {
      const termoPesquisa = evento.target.value.toLowerCase().trim();
      let encontrouAlguma = false;

      if (tituloSecao) {
        if (termoPesquisa !== '') {
          tituloSecao.style.display = 'none';
        } else {
          tituloSecao.style.display = 'block';
        }
      }

      cartoesCelula.forEach(cartao => {
        const tituloOriginal = cartao.querySelector('.titulo-cartao').textContent.toLowerCase();
        const responsavelOriginal = cartao.querySelector('.criador-cartao').textContent.toLowerCase();

        const tituloLimpo = tituloOriginal.replace('célula de ', '').replace('célula da ', '');
        const responsavelLimpo = responsavelOriginal.replace('responsável: ', '').replace('criador: ', '');

        if (termoPesquisa === '' || tituloLimpo.startsWith(termoPesquisa) || responsavelLimpo.startsWith(termoPesquisa)) {
          cartao.style.display = 'block'; 
          if (termoPesquisa !== '') {
            cartao.style.animation = 'fadeEntrada 0.4s ease-out'; 
          }
          encontrouAlguma = true; 
        } else {
          cartao.style.display = 'none'; 
        }
      });

      if (!encontrouAlguma) {
        mensagemVazia.style.display = 'block';
      } else {
        mensagemVazia.style.display = 'none'; 
      }
    });
  }
  const botoesAba = document.querySelectorAll(".aba-celula");
  const telasConteudo = document.querySelectorAll(".tela-celula");

  if (botoesAba.length > 0) {
    botoesAba.forEach((botao) => {
      botao.addEventListener("click", () => {
        botoesAba.forEach((b) => b.classList.remove("ativo"));
        telasConteudo.forEach((tela) => tela.classList.remove("ativa"));

        botao.classList.add("ativo");

        const idDaTelaAlvo = botao.getAttribute("data-alvo");
        const telaParaMostrar = document.getElementById(idDaTelaAlvo);

        if (telaParaMostrar) {
          telaParaMostrar.classList.add("ativa");
        }
      });
    });
  }

  const btnAddEncontro = document.getElementById("btnAdicionarEncontro");
  const listaEncontros = document.getElementById("lista-encontros");

  if (btnAddEncontro && listaEncontros) {
    btnAddEncontro.addEventListener("click", () => {
      const novaLinha = document.createElement("div");
      novaLinha.classList.add("linha-encontro");

      novaLinha.innerHTML = `
        <input type="text" placeholder="Dia (Ex: Sexta)" required class="input-encontro">
        <input type="time" required class="input-encontro">
        <input type="text" placeholder="Local (Ex: Sala 204)" required class="input-encontro">
        <button type="button" class="btn-remover-linha" title="Remover encontro">🗑️</button>
      `;

      listaEncontros.appendChild(novaLinha);

      const btnRemover = novaLinha.querySelector(".btn-remover-linha");
      btnRemover.addEventListener("click", () => {
        novaLinha.remove();
      });
    });
  }
});
