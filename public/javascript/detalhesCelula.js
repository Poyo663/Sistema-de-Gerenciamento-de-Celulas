document.addEventListener("DOMContentLoaded", () => {
  const linksNavegacao = document.querySelectorAll('.item-navegacao, .item-navegacao-animada');

  linksNavegacao.forEach(link => {
    link.addEventListener('click', (evento) => {
      const destino = link.href;

      if (destino && destino !== window.location.href && !destino.includes('#')) {
        evento.preventDefault(); 
        document.body.classList.add('animacao-saida');
        setTimeout(() => { window.location.href = destino; }, 400); 
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

  const bancoDeDadosCelulas = {
    "lol": {
      nome: "Célula de League of Legends",
      imagem: "../imagens/celulas_imagens/lol.jpg",
      responsavel: "Marcos Silva Santos",
      orientador: "Prof. Tiago de Almeida",
      horas: "40 horas complementares fornecidas.",
      encontros: `<p>
          <svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg> 
          Sexta às 15:00 
          <span class="separador-encontro">—</span> 
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> 
          Bloco 3 - Sala 3
        </p>`,
      descricao: "Um espaço para treinar mecânicas, debater estratégias, analisar rotas e formar equipes competitivas no universo de League of Legends.",
      requisitos: "Ter uma conta no servidor BR e possuir microfone."
    },
    "minecraft": {
      nome: "Célula de Minecraft",
      imagem: "../imagens/celulas_imagens/minecraft.jpg",
      responsavel: "Ana Beatriz Lima",
      orientador: "Prof. Dra. Juliana",
      horas: "30 horas complementares fornecidas.",
      encontros: `<p>
        <svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg> 
          Quarta-feira às 15:00 
          <span class="separador-encontro">—</span> 
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> 
          Laboratório 3
        </p>`,
      descricao: "Célula focada em usar o Minecraft com Redstone para aprender lógica de programação e arquitetura de computadores de forma lúdica.",
      requisitos: "Trazer notebook próprio com o jogo instalado."
    }
  };

  const parametrosURL = new URLSearchParams(window.location.search);
  const idClicado = parametrosURL.get('id');

  if (idClicado && bancoDeDadosCelulas[idClicado]) {
    const dados = bancoDeDadosCelulas[idClicado];

    document.getElementById('detalheNome').textContent = dados.nome;
    document.getElementById('detalheImagem').src = dados.imagem;
    document.getElementById('detalheResponsavel').textContent = dados.responsavel;
    document.getElementById('detalheOrientador').textContent = dados.orientador;
    document.getElementById('detalheHoras').textContent = dados.horas;
    document.getElementById('detalheEncontros').innerHTML = dados.encontros;
    document.getElementById('detalheDescricao').textContent = dados.descricao;
    document.getElementById('detalheRequisitos').textContent = dados.requisitos;
  }

});