document.getElementById('saveBtn').addEventListener('click', function () {
  const prompt = document.querySelector('textarea').value;
  if (prompt) {
    const saved = JSON.parse(localStorage.getItem('prompts') || '[]');
    saved.push(prompt);
    localStorage.setItem('prompts', JSON.stringify(saved));
    loadPrompts();
  }
});

function loadPrompts() {
  const saved = JSON.parse(localStorage.getItem('prompts') || '[]');
  const container = document.getElementById('savedPrompts');
  container.innerHTML = '<h2>📝 Saved Prompts</h2>';
  saved.forEach((text, i) => {
    const p = document.createElement('p');
    p.textContent = `${i + 1}. ${text}`;
    container.appendChild(p);
  });
}

window.onload = loadPrompts;