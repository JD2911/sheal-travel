document.addEventListener('DOMContentLoaded', () => {
  // =========================
  // MENÚ MÓVIL
  // =========================
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // =========================
  // FILTROS DE DESTINOS
  // =========================
  const cards = [...document.querySelectorAll('.card')];
  const buttons = [...document.querySelectorAll('.filters button')];
  const search = document.querySelector('#search');
  const empty = document.querySelector('#empty');

  let filter = 'todos';

  function apply() {
    const q = (search?.value || '').toLowerCase().trim();
    let count = 0;

    cards.forEach(card => {
      const category = card.dataset.cat || '';
      const searchText = card.dataset.search || '';

      const matchesCategory =
        filter === 'todos' || category.includes(filter);

      const matchesSearch =
        !q || searchText.includes(q);

      const show = matchesCategory && matchesSearch;

      card.classList.toggle('hide', !show);

      if (show) {
        count++;
      }
    });

    if (empty) {
      empty.hidden = count !== 0;
    }
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(item => item.classList.remove('active'));

      button.classList.add('active');
      filter = button.dataset.filter || 'todos';

      apply();
    });
  });

  search?.addEventListener('input', apply);

  // Aplicar estado inicial
  apply();
});
document.addEventListener('DOMContentLoaded', () => {

  // =========================
  // MENÚ MÓVIL
  // =========================
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });


  // =========================
  // FILTROS DE DESTINOS
  // =========================
  const cards = [...document.querySelectorAll('.card')];
  const buttons = [...document.querySelectorAll('.filters button')];
  const search = document.querySelector('#search');
  const empty = document.querySelector('#empty');

  let filter = 'todos';

  function apply() {
    const q = (search?.value || '').toLowerCase().trim();
    let count = 0;

    cards.forEach(card => {
      const category = card.dataset.cat || '';
      const searchText = card.dataset.search || '';

      const matchesCategory =
        filter === 'todos' || category.includes(filter);

      const matchesSearch =
        !q || searchText.includes(q);

      const show = matchesCategory && matchesSearch;

      card.classList.toggle('hide', !show);

      if (show) {
        count++;
      }
    });

    if (empty) {
      empty.hidden = count !== 0;
    }
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(item => item.classList.remove('active'));

      button.classList.add('active');
      filter = button.dataset.filter || 'todos';

      apply();
    });
  });

  search?.addEventListener('input', apply);

  apply();


  // =========================
  // DESTINOS
  // =========================
  const linkDestinos = document.getElementById('link-destinos');

  linkDestinos?.addEventListener('click', function (e) {
    e.preventDefault();

    const destino = document.getElementById('destinos');

    if (destino) {
      destino.scrollIntoView({
        behavior: 'smooth'
      });

      history.replaceState(null, '', 'destinos.html');
    }
  });


  // =========================
  // SOBRE NOSOTROS
  // =========================
  const linkNosotros = document.getElementById('link-nosotros');

  linkNosotros?.addEventListener('click', function (e) {
    e.preventDefault();

    const nosotros = document.getElementById('nosotros');

    if (nosotros) {
      nosotros.scrollIntoView({
        behavior: 'smooth'
      });

      history.replaceState(null, '', 'destinos.html');
    }
  });

});