document.addEventListener("DOMContentLoaded", () => {
  const allInputs = document.querySelectorAll('input');
  const form = document.querySelector('form');

  allInputs.forEach(input => {
    
    input.addEventListener('blur', () => {
      const wrapper = input.closest('.envoltorio-entrada');
      
      if (wrapper && input.value.trim() === '') {
        wrapper.classList.add('tem-erro');
      } else if (wrapper) {
        wrapper.classList.remove('tem-erro');
      }
    });

    input.addEventListener('input', () => {
      const wrapper = input.closest('.envoltorio-entrada');
      
      if (wrapper && input.value.trim() !== '') {
        wrapper.classList.remove('tem-erro');
      }
    });
  });

  // if (form) {
  //   form.addEventListener('submit', (evento) => {
  //     evento.preventDefault();
  //     
  //     window.location.href = '../html/paginaHome.html'; 
  //   });
  // }
});
