document.addEventListener('DOMContentLoaded', () => {

  // =========================
  // MENÚ MÓVIL
  // =========================
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Cerrar menú al seleccionar una opción
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // =========================
  // FILTROS DE DESTINOS
  // =========================
  const cards = [...document.querySelectorAll('.card')];
  const buttons = [...document.querySelectorAll('.filters button')];
  const search = document.querySelector('#search');

  // Mensaje cuando no hay resultados
  let empty = document.querySelector('#empty');

  if (!empty) {
    empty = document.createElement('div');
    empty.id = 'empty';
    empty.hidden = true;
    empty.innerHTML = `
      <strong>No encontramos destinos en esta categoría.</strong>
      <p>Estamos preparando nuevas opciones para vos.</p>
    `;

    const grid = document.querySelector('.grid');

    if (grid) {
      grid.insertAdjacentElement('afterend', empty);
    }
  }

  let filter = 'todos';


  // =========================
  // APLICAR FILTROS
  // =========================
  function apply() {

    const q = (search?.value || '').toLowerCase().trim();

    let count = 0;

    cards.forEach(card => {

      const category = (card.dataset.cat || '').toLowerCase();
      const searchText = (card.dataset.search || '').toLowerCase();

      const matchesCategory =
        filter === 'todos' || category.includes(filter);

      const matchesSearch =
        !q || searchText.includes(q);

      const show =
        matchesCategory && matchesSearch;

      card.classList.toggle('hide', !show);

      if (show) {
        count++;
      }
    });


    // Mostrar u ocultar mensaje
    if (empty) {
      empty.hidden = count !== 0;
    }
  }


  // =========================
  // BOTONES DE FILTRO
  // =========================
  buttons.forEach(button => {

    button.addEventListener('click', () => {

      buttons.forEach(item => {
        item.classList.remove('active');
      });

      button.classList.add('active');

      filter = (
        button.dataset.filter || 'todos'
      ).toLowerCase();

      apply();
    });

  });


  // =========================
  // BUSCADOR
  // =========================
  search?.addEventListener('input', apply);


  // =========================
  // ESTADO INICIAL
  // =========================
  apply();


  // =========================
  // DESTINOS
  // =========================
  const linkDestinos =
    document.getElementById('link-destinos');

  linkDestinos?.addEventListener('click', function (e) {

    const destino =
      document.getElementById('destinos');

    if (destino) {

      e.preventDefault();

      destino.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      history.replaceState(
        null,
        '',
        window.location.pathname
      );
    }
  });


  // =========================
  // SOBRE NOSOTROS
  // =========================
  const linkNosotros =
    document.getElementById('link-nosotros');

  linkNosotros?.addEventListener('click', function (e) {

    const nosotros =
      document.getElementById('nosotros');

    if (nosotros) {

      e.preventDefault();

      nosotros.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      history.replaceState(
        null,
        '',
        window.location.pathname
      );
    }
  });

});