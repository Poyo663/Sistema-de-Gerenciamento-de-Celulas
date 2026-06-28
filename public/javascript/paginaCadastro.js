document.addEventListener("DOMContentLoaded", () => {
  const allInputs = document.querySelectorAll('input');
  const form = document.querySelector('form');
  const senhaInput = document.getElementById('senha');
  const confirmarSenhaInput = document.getElementById('confirmarSenha');

  allInputs.forEach(input => {
<<<<<<< HEAD
=======
    // Evento quando o usuário sai do campo de texto
>>>>>>> 6abf74b (frontend inicial 1.2)
    input.addEventListener('blur', () => {
      const wrapper = input.closest('.envoltorio-entrada');
      const errorMsg = wrapper.querySelector('.mensagem-erro');
      
      if (input.value.trim() === '') {
        wrapper.classList.add('tem-erro');
        if(errorMsg) errorMsg.textContent = 'Este campo é obrigatório';
      } else {
        wrapper.classList.remove('tem-erro');
      }
    });

    // Evento enquanto o usuário digita
    input.addEventListener('input', () => {
      const wrapper = input.closest('.envoltorio-entrada');
      if (input.value.trim() !== '') {
        wrapper.classList.remove('tem-erro');
      }
    });
  });

  function validarSenhas() {
    if (!senhaInput || !confirmarSenhaInput) return;

    const wrapperConfirmar = confirmarSenhaInput.closest('.envoltorio-entrada');
    const msgErroConfirmar = wrapperConfirmar.querySelector('.mensagem-erro');

    if (confirmarSenhaInput.value.length > 0) {
      if (senhaInput.value !== confirmarSenhaInput.value) {
        confirmarSenhaInput.setCustomValidity("As senhas não são iguais");
        wrapperConfirmar.classList.add('tem-erro');
        if (msgErroConfirmar) msgErroConfirmar.textContent = 'As senhas digitadas não são iguais';
        
      } else {
        confirmarSenhaInput.setCustomValidity("");
        wrapperConfirmar.classList.remove('tem-erro');
        if (msgErroConfirmar) msgErroConfirmar.textContent = 'Este campo é obrigatório';
      }
    } else {
       confirmarSenhaInput.setCustomValidity("");
    }
  }

  if (senhaInput && confirmarSenhaInput) {
    senhaInput.addEventListener('input', validarSenhas);
    confirmarSenhaInput.addEventListener('input', validarSenhas);
  }

  if (form) {
    form.addEventListener('submit', (evento) => {
      evento.preventDefault(); 
      
      // Redireciona para a home após o cadastro
      window.location.href = '../html/paginaHome.html';
    });
  }
});