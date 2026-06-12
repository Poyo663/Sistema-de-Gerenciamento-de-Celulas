document.addEventListener("DOMContentLoaded", () => {
  const allInputs = document.querySelectorAll('input');
  const form = document.querySelector('form');
  const senhaInput = document.getElementById('senha');
  const confirmarSenhaInput = document.getElementById('confirmarSenha');

  allInputs.forEach(input => {
 
    input.addEventListener('blur', () => {
      const wrapper = input.closest('.input-wrapper');
      const errorMsg = wrapper.querySelector('.error-msg');
      
      if (input.value.trim() === '') {
        wrapper.classList.add('has-error');
        if(errorMsg) errorMsg.textContent = 'Este campo é obrigatório';
      } else {
        wrapper.classList.remove('has-error');
      }
    });

    input.addEventListener('input', () => {
      const wrapper = input.closest('.input-wrapper');
      if (input.value.trim() !== '') {
        wrapper.classList.remove('has-error');
      }
    });
  });

  function validarSenhas() {
    if (!senhaInput || !confirmarSenhaInput) return;

    const wrapperConfirmar = confirmarSenhaInput.closest('.input-wrapper');
    const msgErroConfirmar = wrapperConfirmar.querySelector('.error-msg');

    if (confirmarSenhaInput.value.length > 0) {
      if (senhaInput.value !== confirmarSenhaInput.value) {
        confirmarSenhaInput.setCustomValidity("As senhas não são iguais");
        wrapperConfirmar.classList.add('has-error');
        if (msgErroConfirmar) msgErroConfirmar.textContent = 'As senhas digitadas não são iguais';
        
      } else {
        confirmarSenhaInput.setCustomValidity("");
        wrapperConfirmar.classList.remove('has-error');
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
      
      window.location.href = '../html/paginaHome.html';
    });
  }
});