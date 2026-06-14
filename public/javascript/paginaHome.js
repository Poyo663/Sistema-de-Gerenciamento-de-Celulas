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

document.addEventListener("DOMContentLoaded", () => {
  console.log(document.cookie);
  const authenticated = getCookie("authenticated") === "true";
  setAutheticatedDisplay(authenticated);

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

  const carrosseis = document.querySelectorAll(".container-carrossel");

  carrosseis.forEach((container) => {
    const trilha = container.querySelector(".trilha-carrossel");
    const btnAnterior = container.querySelector(".btn-anterior");
    const btnProximo = container.querySelector(".btn-proximo");

    const atualizarSetas = () => {
      const maxScroll = trilha.scrollWidth - trilha.clientWidth;

      if (maxScroll <= 0) {
        btnAnterior.classList.add("desativado");
        btnProximo.classList.add("desativado");
        return;
      }

      if (trilha.scrollLeft <= 0) {
        btnAnterior.classList.add("desativado");
      } else {
        btnAnterior.classList.remove("desativado");
      }

      if (trilha.scrollLeft >= maxScroll - 5) {
        btnProximo.classList.add("desativado");
      } else {
        btnProximo.classList.remove("desativado");
      }
    };

    const animacao = (elemento, distancia, duracao) => {
      const inicio = elemento.scrollLeft;
      const tempoInicio = performance.now();

      const animarRolagem = (tempoAtual) => {
        const tempoDecorrido = tempoAtual - tempoInicio;
        const progresso = Math.min(tempoDecorrido / duracao, 1);

        const suavizacao =
          progresso < 0.5
            ? 2 * progresso * progresso
            : -1 + (4 - 2 * progresso) * progresso;

        elemento.scrollLeft = inicio + distancia * suavizacao;

        if (tempoDecorrido < duracao) {
          requestAnimationFrame(animarRolagem);
        }
      };

      requestAnimationFrame(animarRolagem);
    };

    btnProximo.addEventListener("click", () => {
      const distancia = trilha.clientWidth * 0.9;
      animacao(trilha, distancia, 600);
    });

    btnAnterior.addEventListener("click", () => {
      const distancia = trilha.clientWidth * 0.9;
      animacao(trilha, -distancia, 600);
    });

    trilha.addEventListener("scroll", atualizarSetas);

    atualizarSetas();
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
});
