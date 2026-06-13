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
});