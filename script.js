function savePrompt() {
  const box = document.getElementById('promptBox');
  const list = document.getElementById('promptList');
  const li = document.createElement('li');
  if (box.value.trim()) {
    li.textContent = box.value;
    list.appendChild(li);
    box.value = '';
  }
}