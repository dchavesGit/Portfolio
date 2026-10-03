
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeToggle.setAttribute(
    'aria-label',
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );
}

let savedTheme = null;
try { savedTheme = localStorage.getItem('theme'); } catch (err) {  }

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (err) {  }
});

// Los proyectos se pierden ya que no hay servidor backend que reciba
const formProyecto = document.getElementById('form-proyecto');
const listaProyectos = document.getElementById('lista-proyectos');

function crearCarta({ titulo, descripcion, link }) {
  const li = document.createElement('li');
  const article = document.createElement('article');
  article.className = 'card';

  const h3 = document.createElement('h3');
  h3.textContent = titulo;

  const p = document.createElement('p');
  p.textContent = descripcion;

  article.append(h3, p);

  if (link) {
    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'View project';
    article.append(a);
  }

  li.append(article);
  return li;
}

formProyecto.addEventListener('submit', (e) => {
  e.preventDefault();
  const datos = new FormData(formProyecto);
  listaProyectos.append(crearCarta({
    titulo: datos.get('titulo').trim(),
    descripcion: datos.get('descripcion').trim(),
    link: datos.get('link').trim(),
  }));
  formProyecto.reset();
});

const MI_EMAIL = 'chaves.darionehuen@gmail.com';
const formContacto = document.getElementById('form-contacto');
const estadoContacto = document.getElementById('estado-contacto');

formContacto.addEventListener('submit', (e) => {
  e.preventDefault();
  const datos = new FormData(formContacto);
  const asunto = encodeURIComponent('Contact from your portfolio');
  const cuerpo = encodeURIComponent(`${datos.get('mensaje')}\n\nMy email: ${datos.get('email')}`);
  const url = `https://mail.google.com/mail/?view=cm&to=${MI_EMAIL}&su=${asunto}&body=${cuerpo}`;
  window.open(url, '_blank', 'noopener');
  estadoContacto.textContent = 'Gmail opened in a new tab so you can send the message.';
  formContacto.reset();
});