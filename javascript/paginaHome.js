document.addEventListener("DOMContentLoaded", () => {
  const carrosseis = document.querySelectorAll('.container-carrossel');

  carrosseis.forEach(container => {
    
    const trilha = container.querySelector('.trilha-carrossel');
    const btnAnterior = container.querySelector('.btn-anterior');
    const btnProximo = container.querySelector('.btn-proximo');

    const atualizarSetas = () => {
      const maxScroll = trilha.scrollWidth - trilha.clientWidth;

      if (maxScroll <= 0) {
        btnAnterior.classList.add('desativado');
        btnProximo.classList.add('desativado');
        return;
      }

      if (trilha.scrollLeft <= 0) {
        btnAnterior.classList.add('desativado');
      } else {
        btnAnterior.classList.remove('desativado');
      }

      if (trilha.scrollLeft >= maxScroll - 5) {
        btnProximo.classList.add('desativado');
      } else {
        btnProximo.classList.remove('desativado');
      }
    };

    const animacao = (elemento, distancia, duracao) => {
      const inicio = elemento.scrollLeft;
      const tempoInicio = performance.now();

      const animarRolagem = (tempoAtual) => {
        const tempoDecorrido = tempoAtual - tempoInicio;
        const progresso = Math.min(tempoDecorrido / duracao, 1);

        const suavizacao = progresso < 0.5 
          ? 2 * progresso * progresso 
          : -1 + (4 - 2 * progresso) * progresso;

        elemento.scrollLeft = inicio + (distancia * suavizacao);

        if (tempoDecorrido < duracao) {
          requestAnimationFrame(animarRolagem);
        }
      };

      requestAnimationFrame(animarRolagem);
    };

    btnProximo.addEventListener('click', () => {
      const distancia = trilha.clientWidth * 0.90; 
      animacao(trilha, distancia, 600);
    });

    btnAnterior.addEventListener('click', () => {
      const distancia = trilha.clientWidth * 0.90; 
      animacao(trilha, -distancia, 600); 
    });

    trilha.addEventListener('scroll', atualizarSetas);
    
    atualizarSetas();
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
});