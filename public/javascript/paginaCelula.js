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

  const botoesAba = document.querySelectorAll('.aba-celula');
  const telasConteudo = document.querySelectorAll('.tela-celula');

  if (botoesAba.length > 0) {
    botoesAba.forEach(botao => {
      botao.addEventListener('click', () => {
        
        botoesAba.forEach(b => b.classList.remove('ativo'));
        telasConteudo.forEach(tela => tela.classList.remove('ativa'));

        botao.classList.add('ativo');

        const idDaTelaAlvo = botao.getAttribute('data-alvo');
        const telaParaMostrar = document.getElementById(idDaTelaAlvo);
        
        if (telaParaMostrar) {
          telaParaMostrar.classList.add('ativa');
        }
      });
    });
  }

  const btnAddEncontro = document.getElementById('btnAdicionarEncontro');
  const listaEncontros = document.getElementById('lista-encontros');

  if (btnAddEncontro && listaEncontros) {
    btnAddEncontro.addEventListener('click', () => {
      
      const novaLinha = document.createElement('div');
      novaLinha.classList.add('linha-encontro');
      
      novaLinha.innerHTML = `
        <input type="text" placeholder="Dia (Ex: Sexta)" required class="input-encontro">
        <input type="time" required class="input-encontro">
        <input type="text" placeholder="Local (Ex: Sala 204)" required class="input-encontro">
        <button type="button" class="btn-remover-linha" title="Remover encontro">🗑️</button>
      `;

      listaEncontros.appendChild(novaLinha);

      const btnRemover = novaLinha.querySelector('.btn-remover-linha');
      btnRemover.addEventListener('click', () => {
        novaLinha.remove();
      });
    });
  }

  const formCriarCelula = document.getElementById('formCriarCelula');
  const abaVerCelulas = document.querySelector('[data-alvo="tela-ver"]');

  if (formCriarCelula) {
    formCriarCelula.addEventListener('submit', (evento) => {
      evento.preventDefault(); 

      // 1. Cria a caixinha do Toast (Notificação)
      const toast = document.createElement('div');
      toast.classList.add('toast-notificacao');
      toast.innerHTML = `
        <svg viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span>Célula criada com sucesso!</span>
      `;

      document.body.appendChild(toast);

      formCriarCelula.reset();

      if (abaVerCelulas) {
        abaVerCelulas.click();
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      setTimeout(() => {
        toast.remove();
      }, 3400);
    });
  }

});