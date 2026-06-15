document.addEventListener("DOMContentLoaded", () => {
  const inputEmail = document.getElementById('emailRecuperacao');
  const form = document.getElementById('formRecuperar');

  if (inputEmail) {
    inputEmail.addEventListener('blur', validarEmail);
    
    inputEmail.addEventListener('input', () => {
      const wrapper = inputEmail.closest('.envoltorio-entrada');
      
      if (inputEmail.value.trim() === '') {
        wrapper.classList.remove('tem-erro');
      } else {
        validarEmail();
      }
    });
  }

  function validarEmail() {
    const wrapper = inputEmail.closest('.envoltorio-entrada');
    const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.value);

    if (inputEmail.value.trim() !== '' && !formatoValido) {
      wrapper.classList.add('tem-erro');
    } else {
      wrapper.classList.remove('tem-erro');
    }
  }

  if (form) {
    form.addEventListener('submit', (evento) => {
      evento.preventDefault(); 
      
      const toast = document.createElement('div');
      toast.classList.add('toast-verde');
      toast.innerHTML = `
        <span>Pedido enviado com sucesso. Verifique seu email.</span>
        <button class="btn-fechar-toast">FECHAR</button>
      `;

      document.body.appendChild(toast);

      form.reset();
      inputEmail.blur();

      const btnFechar = toast.querySelector('.btn-fechar-toast');
      btnFechar.addEventListener('click', () => {
        removerToast(toast);
      });

      setTimeout(() => {
        if (document.body.contains(toast)) {
          removerToast(toast);
        }
      }, 5000);
    });
  }

  function removerToast(toastElemento) {
    toastElemento.classList.add('toast-saindo');
    setTimeout(() => {
      toastElemento.remove();
    }, 400); 
  }
});