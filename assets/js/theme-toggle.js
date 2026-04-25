document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggle = document.querySelector('.theme-toggle');
  const backToTop = document.querySelector('.back-to-top');

  // -----------------------------
  // THEME: default to SUMMER DAY
  // -----------------------------
  const stored = localStorage.getItem('cc-theme');
  const initialTheme =
    stored === 'day' || stored === 'night'
      ? stored
      : 'day'; // default: day

  body.setAttribute('data-theme', initialTheme);

  // -----------------------------
  // THEME TOGGLE CLICK
  // -----------------------------
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = body.getAttribute('data-theme') === 'night' ? 'night' : 'day';
      const next = current === 'day' ? 'night' : 'day';

      body.setAttribute('data-theme', next);
      localStorage.setItem('cc-theme', next);
    });
  }

  // -----------------------------
  // BACK TO TOP BUTTON
  // -----------------------------
  if (backToTop) {
    // Click scroll
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show / hide on scroll
    const updateBackToTop = () => {
      if (window.scrollY > 200) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.pointerEvents = 'none';
      }
    };

    updateBackToTop();
    window.addEventListener('scroll', updateBackToTop);
  }
});
