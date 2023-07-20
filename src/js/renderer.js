
// dark mode
window.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleButton = document.getElementById('toggle-dark-mode');
  
    // Aplica o tema escuro ao carregar a página, se previamente definido pelo usuário
    if (localStorage.getItem('darkMode') === 'true') {
      body.classList.add('bg-dark', 'text-white');
    }
  
    toggleButton.addEventListener('click', function() {
      if (body.classList.contains('bg-dark')) {
        body.classList.remove('bg-dark', 'text-white');
        localStorage.setItem('darkMode', 'false');
      } else {
        body.classList.add('bg-dark', 'text-white');
        localStorage.setItem('darkMode', 'true');
      }
    });
  });



window.addEventListener('DOMContentLoaded', (event) => {
  setTimeout(function(){
    document.body.classList.add('fade-in');
  }, 10); // Ajuste este valor conforme necessário
});
  
