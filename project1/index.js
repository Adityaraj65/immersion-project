const addBtn = document.getElementById('add-btn');
const container = document.getElementById('progressContainer');

addBtn.addEventListener('click', () => {
  const wrapper = document.createElement('div');
  wrapper.className = 'progress-wrapper';

  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  bar.textContent = '0%';

  wrapper.appendChild(bar);
  container.appendChild(wrapper);

  let progress = 0;
  const interval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(interval);
    } else {
      progress += 10;
      bar.style.width = progress + '%';
      bar.textContent = progress + '%';
    }
  }, 200);
});
