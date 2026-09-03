document.addEventListener("DOMContentLoaded", () => {
  // MENÚ MÓVIL
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  menuToggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // SLIDER HERO
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = [...document.querySelectorAll(".dot")];
  let currentSlide = 0;
  let sliderTimer;

  function showSlide(index) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
  }

  function startSlider() {
    if (!slides.length) return;
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => showSlide(currentSlide + 1), 5500);
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slide));
      startSlider();
    });
  });

  showSlide(0);
  startSlider();

  // CARRUSELES HORIZONTALES
  function setupCarousel(container, previousButton, nextButton) {
    if (!container) return;

    const getScrollAmount = () => {
      const card = container.querySelector(".travel-card");
      if (!card) return Math.max(container.clientWidth * 0.8, 260);
      const gap = parseFloat(getComputedStyle(container).gap) || 0;
      return card.getBoundingClientRect().width + gap;
    };

    const updateButtons = () => {
      const maxScroll = container.scrollWidth - container.clientWidth - 2;
      if (previousButton) previousButton.disabled = container.scrollLeft <= 2;
      if (nextButton) nextButton.disabled = container.scrollLeft >= maxScroll;
    };

    previousButton?.addEventListener("click", () => {
      container.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });

    nextButton?.addEventListener("click", () => {
      container.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });

    container.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    updateButtons();
  }

  setupCarousel(
    document.querySelector("#destinos-grid"),
    document.querySelector(".destinations-prev"),
    document.querySelector(".destinations-next")
  );

  setupCarousel(
    document.querySelector("#paquetes-grid"),
    document.querySelector(".packages-prev"),
    document.querySelector(".packages-next")
  );

  // NAVEGACIÓN INTERNA SIN # EN LA URL
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") {
        if (targetId === "#") e.preventDefault();
        return;
      }
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", window.location.pathname);
    });
  });

  // SCROLL REVEAL
  const revealElements = document.querySelectorAll(
    ".travel-card, .benefit, .section-intro, .center-heading"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
  }
});
