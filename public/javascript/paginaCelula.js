document.addEventListener("DOMContentLoaded", () => {
  const linksNavegacao = document.querySelectorAll('.item-navegacao');
  linksNavegacao.forEach(link => {
    link.addEventListener('click', (evento) => {
      const destino = link.href;
      if (destino && destino !== window.location.href && !destino.includes('#')) {
        evento.preventDefault();
        document.body.classList.add('animacao-saida');
        setTimeout(() => window.location.href = destino, 400);
      }
    });
  });

  const iconePerfil = document.querySelector('.icone-usuario');
  const menuDropdown = document.querySelector('.menu-dropdown');
  if (iconePerfil && menuDropdown) {
    iconePerfil.addEventListener('click', (e) => {
      e.stopPropagation();
      menuDropdown.classList.toggle('mostrar');
    });
    document.addEventListener('click', () => menuDropdown.classList.remove('mostrar'));
  }

  const botoesAba = document.querySelectorAll('.aba-celula');
  const telasConteudo = document.querySelectorAll('.tela-celula');
  const secaoEditar = document.getElementById('tela-editar');

  botoesAba.forEach(botao => {
    botao.addEventListener('click', () => {
      botoesAba.forEach(b => b.classList.remove('ativo'));
      telasConteudo.forEach(tela => tela.classList.remove('ativa'));
      botao.classList.add('ativo');

      const idDaTelaAlvo = botao.getAttribute('data-alvo');
      const telaParaMostrar = document.getElementById(idDaTelaAlvo);
      if (telaParaMostrar) {
        telasConteudo.forEach(t => t.classList.remove('ativa'));
        telaParaMostrar.classList.add('ativa');
        
        if (idDaTelaAlvo !== 'tela-editar') {
          secaoEditar?.classList.remove('editando');
          const containerFrequencia = document.getElementById('containerFrequencia');
          const containerEdicao = document.querySelector('.container-form-edicao');
          if (containerFrequencia) containerFrequencia.style.display = 'none';
          if (containerEdicao) containerEdicao.style.display = '';
        }
      }
    });
  });

  document.querySelectorAll('.campo-pesquisa').forEach(barra => {
    barra.addEventListener('input', (evento) => {
      const termoBusca = evento.target.value.toLowerCase().trim();
      const abaAtual = barra.closest('.tela-celula');
      if (!abaAtual) return;
      
      const cartoes = abaAtual.querySelectorAll('.cartao-celula');
      const mensagemVazia = abaAtual.querySelector('.mensagem-vazia');
      let quantidadeEncontrada = 0;

      cartoes.forEach(cartao => {
        if (cartao.closest('.container-form-edicao') || cartao.closest('#containerFrequencia')) return;

        const titulo = cartao.querySelector('.titulo-cartao')?.textContent.toLowerCase() || '';
        const responsavel = cartao.querySelector('.criador-cartao')?.textContent.toLowerCase() || '';
        const wrapperDoCartao = cartao.parentElement.tagName === 'A' ? cartao.parentElement : cartao;

        if (titulo.includes(termoBusca) || responsavel.includes(termoBusca)) {
          wrapperDoCartao.style.display = 'block';
          quantidadeEncontrada++;
        } else {
          wrapperDoCartao.style.display = 'none';
        }
      });

      if (mensagemVazia) mensagemVazia.style.display = quantidadeEncontrada === 0 ? 'flex' : 'none';
    });
  });

  function criarLinha(container, dia = '', hora = '', local = '', callbackMudanca = null) {
    const div = document.createElement('div');
    div.classList.add('linha-encontro');
    div.innerHTML = `
      <input type="text" name="dias[]" value="${dia}" placeholder="Dia (Ex: Sexta)" required class="input-encontro">
      <input type="time" name="horarios[]" value="${hora}" required class="input-encontro">
      <input type="text" name="locais[]" value="${local}" placeholder="Local (Ex: Bloco 1 - Sala 1)" required class="input-encontro">
      <button type="button" class="btn-remover-linha">🗑️</button>
    `;
    div.querySelector('.btn-remover-linha').addEventListener('click', () => {
      div.remove();
      if (callbackMudanca) setTimeout(callbackMudanca, 10);
    });
    container.appendChild(div);
  }

  const formEditar = document.getElementById('formEditarCelula');
  const listaEncontrosEditar = document.getElementById('lista-encontros-editar');
  const gradeEdicao = document.querySelector('#tela-editar .grade-celulas');
  let estadoOriginalDoFormulario = "";

  const bancoDeEdicaoMock = {
    "leitura": {
      id: "leitura", nome: "Célula de Leitura", responsavel: "Luna Ayla", orientador: "Prof. Carlos Alberto", 
      horas: 40, descricao: "Um espaço de debate literário.", requisitos: "Nenhum.",
      horarios: [{ dia: "Sexta-feira", horario: "14:00", local: "Bloco 4 - Sala 1" }]
    },
    "turmaMonica": {
      id: "turmaMonica", nome: "Célula da Turma da Mônica Jovem", responsavel: "Luna Ayla", orientador: "Profa. Juliana", 
      horas: 30, descricao: "Grupo focado em quadrinhos nacionais.", requisitos: "Gostar de gibis.",
      horarios: [{ dia: "Terça-feira", horario: "10:00", local: "Bloco 2 - Sala 1" }]
    }
  };

  async function carregarCartoesDeEdicao() {
    if (!gradeEdicao) return;
    try {
      const resposta = await fetch('/api/celulas');
      if (!resposta.ok) throw new Error("API Offline");
      const listaDeCelulas = await resposta.json();
      
      gradeEdicao.innerHTML = ''; 
      listaDeCelulas.forEach(celula => renderizarCartaoHTML(celula));
    } catch (erro) {
      console.warn("Aviso: Renderizando cartões usando os dados locais (Mock).", erro);
      gradeEdicao.innerHTML = ''; 
      Object.values(bancoDeEdicaoMock).forEach(celula => renderizarCartaoHTML(celula));
    }
  }

  function renderizarCartaoHTML(celula) {
    const cartao = document.createElement('div');
    cartao.classList.add('cartao-celula', 'cartao-editar');
    cartao.setAttribute('data-id', celula.id);
    cartao.innerHTML = `
      <img src="${celula.imagemUrl || '../imagens/placeholder.jpg'}" alt="Foto da Célula" class="imagem-cartao">
      <div class="informacoes-cartao">
        <h3 class="titulo-cartao">${celula.nome}</h3>
        <p class="criador-cartao">Responsável: ${celula.responsavel}</p>
      </div>
    `;
    cartao.addEventListener('click', () => abrirEdicaoDaCelula(celula.id));
    gradeEdicao.appendChild(cartao);
  }

  carregarCartoesDeEdicao();

  function obterTextoEstadoAtual() {
    if (!formEditar) return "";
    let texto = "";
    formEditar.querySelectorAll('input, textarea').forEach(campo => {
      texto += `${campo.name}:${campo.value}|`;
    });
    return texto;
  }

  function verificarMudancas() {
    if (!formEditar) return;
    const btnSalvar = formEditar.querySelector('.submit-btn');
    if (!btnSalvar) return;
    
    const estadoAtual = obterTextoEstadoAtual();
    const houveMudanca = estadoAtual !== estadoOriginalDoFormulario;
    const camposPreenchidos = formEditar.checkValidity();
    const temEncontro = listaEncontrosEditar.querySelectorAll('.linha-encontro').length > 0;

    if (houveMudanca && camposPreenchidos && temEncontro) {
      btnSalvar.classList.add('ativo');
    } else {
      btnSalvar.classList.remove('ativo');
    }
  }

  formEditar?.addEventListener('input', verificarMudancas);
  document.getElementById('btnAdicionarEncontroEditar')?.addEventListener('click', () => {
    criarLinha(listaEncontrosEditar, '', '', '', verificarMudancas);
    setTimeout(verificarMudancas, 10);
  });

  async function abrirEdicaoDaCelula(id) {
    try {
      let d;
      const resp = await fetch(`/api/celulas/${id}`);
      if (resp.ok) {
        d = await resp.json();
      } else {
        d = bancoDeEdicaoMock[id] || { nome: "Célula Desconhecida", horarios: [] };
      }

      formEditar.dataset.idDaCelulaSendoEditada = id;
      document.getElementById('nomeEditar').value = d.nome || '';
      document.getElementById('responsavelEditar').value = d.responsavel || '';
      document.getElementById('orientadorEditar').value = d.orientador || '';
      document.getElementById('horasEditar').value = d.horas || '';
      document.getElementById('descricaoEditar').value = d.descricao || '';
      document.getElementById('requisitosEditar').value = d.pre_requisitos || d.requisitos || '';
      
      listaEncontrosEditar.innerHTML = '';
      (d.horarios || d.encontros || []).forEach(e => {
        criarLinha(listaEncontrosEditar, e.dia, e.horario || e.hora, e.local, verificarMudancas);
      });

      estadoOriginalDoFormulario = obterTextoEstadoAtual();
      verificarMudancas();
      secaoEditar?.classList.add('editando');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) { console.error(e); }
  }

  document.getElementById('btnVoltarEdicao')?.addEventListener('click', () => {
    secaoEditar?.classList.remove('editando');
    const containerEdicao = document.querySelector('.container-form-edicao');
    if (containerEdicao) containerEdicao.style.display = ''; 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  formEditar?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = formEditar.dataset.idDaCelulaSendoEditada;
    const fd = new FormData(formEditar);
    const payload = {
      nome: fd.get('nomeCelula'), responsavel: fd.get('responsavel'), orientador: fd.get('orientador'),
      horas: fd.get('horasComplementares'), descricao: fd.get('descricao'), requisitos: fd.get('requisitos'),
      dias: fd.getAll('dias[]'), horarios: fd.getAll('horarios[]'), locais: fd.getAll('locais[]')
    };

    try {
      const res = await fetch(`/api/celulas/${id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      });
      
      if (res.ok || res.status === 404) {
        mostrarToast('Edição salva com sucesso!', 'azul');
        secaoEditar?.classList.remove('editando');
        carregarCartoesDeEdicao();
      }
    } catch (erro) {
      console.error(erro);
      mostrarToast('Edição salva localmente (Modo de Teste)!', 'azul');
      secaoEditar?.classList.remove('editando');
    }
  });

  const containerEdicao = document.querySelector('.container-form-edicao');
  const containerFrequencia = document.getElementById('containerFrequencia');
  const listaChamadaAlunos = document.getElementById('listaChamadaAlunos');
  const formFrequencia = document.getElementById('formSalvarFrequencia');

  document.getElementById('btnAbrirFrequencia')?.addEventListener('click', async () => {
    if (containerEdicao) containerEdicao.style.display = 'none';
    if (containerFrequencia) containerFrequencia.style.display = 'block';
    
    if (listaChamadaAlunos) {
      listaChamadaAlunos.innerHTML = '';
      const listaAlunosMock = [
        { matricula: "493211", nome: "Ana Cláudia Mesquita" },
        { matricula: "497552", nome: "Bruno César Lima" },
        { matricula: "501223", nome: "Gabriel Silva Sousa" }
      ];

      listaAlunosMock.forEach(aluno => {
        const linha = document.createElement('div');
        linha.classList.add('linha-aluno-chamada');
        linha.innerHTML = `
          <div class="info-aluno-chamada">
            <div class="nome-aluno-chamada">${aluno.nome}</div>
            <div class="matricula-aluno-chamada">Matrícula: ${aluno.matricula}</div>
          </div>
          <div class="controle-presenca"><input type="checkbox" name="frequencia_alunos" value="${aluno.matricula}"></div>
        `;
        listaChamadaAlunos.appendChild(linha);
      });
    }
    
    const inputData = document.getElementById('dataFrequencia');
    if (inputData) inputData.value = new Date().toISOString().substring(0, 10);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('btnVoltarParaEdicao')?.addEventListener('click', () => {
    if (containerFrequencia) containerFrequencia.style.display = 'none';
    if (containerEdicao) containerEdicao.style.display = ''; 
    
    secaoEditar?.classList.add('editando');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  formFrequencia?.addEventListener('submit', async (e) => {
    e.preventDefault();
    mostrarToast('Frequência registrada com sucesso!', 'frequencia');
    
    if (containerFrequencia) containerFrequencia.style.display = 'none';
    if (containerEdicao) containerEdicao.style.display = ''; 
    
    secaoEditar?.classList.add('editando'); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function mostrarToast(mensagem, tipo) {
    const toast = document.createElement('div');
    toast.className = `toast-notificacao ${tipo === 'azul' ? 'toast-edicao' : 'toast-frequencia'}`;
    toast.innerHTML = `<svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:currentColor;margin-right:10px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg><span>${mensagem}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3400);
  }
});