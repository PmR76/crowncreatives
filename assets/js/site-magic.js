// site-magic.js — theme, back-to-top, hero lanes, masonry gallery

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  /* ---------------------------------------------
   * THEME ENGINE — SUMMER DAY DEFAULT
   * ------------------------------------------- */
  const themeToggle =
    document.querySelector('.theme-toggle') ||
    document.getElementById('theme-toggle') ||
    document.querySelector('.header-toggle, .toggle-icon, [data-role="theme-toggle"]');

  function applyTheme(theme) {
    const safe = theme === 'night' ? 'night' : 'day';
    body.setAttribute('data-theme', safe);
    localStorage.setItem('cc-theme', safe);
  }

  function getInitialTheme() {
    const saved = localStorage.getItem('cc-theme');
    if (saved === 'day' || saved === 'night') return saved;
    // Force SUMMER DAY as default
    return 'day';
  }

  applyTheme(getInitialTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = body.getAttribute('data-theme') === 'night' ? 'night' : 'day';
      const next = current === 'day' ? 'night' : 'day';
      applyTheme(next);
    });
  }

  /* ---------------------------------------------
   * BACK TO TOP
   * ------------------------------------------- */
  const backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

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

  /* ---------------------------------------------
   * HERO LANES — HOME ONLY
   * ------------------------------------------- */
  if (body.classList.contains('home')) {
    const leftLane = document.querySelector('.gallery-left');
    const rightLane = document.querySelector('.gallery-right');

    if (leftLane && rightLane) {
      const heroApiURL =
        'https://api.github.com/repos/PmR76/crowncreatives/contents/assets/images/gallery';

      fetch(heroApiURL)
        .then((res) => res.json())
        .then((files) => {
          const images = files.filter((file) =>
            file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i)
          );

          if (!images.length) {
            console.warn('No hero gallery images found.');
            return;
          }

          const shuffled = images.sort(() => Math.random() - 0.5);
          const midpoint = Math.ceil(shuffled.length / 2);
          const leftImages = shuffled.slice(0, midpoint);
          const rightImages = shuffled.slice(midpoint);

          leftLane.innerHTML = '';
          rightLane.innerHTML = '';

          leftImages.forEach((img) => {
            const el = document.createElement('img');
            el.src = img.download_url;
            el.className = 'lane-img';
            leftLane.appendChild(el);
          });

          rightImages.forEach((img) => {
            const el = document.createElement('img');
            el.src = img.download_url;
            el.className = 'lane-img';
            rightLane.appendChild(el);
          });

          startLaneFade(leftLane.querySelectorAll('.lane-img'), 0);
          startLaneFade(rightLane.querySelectorAll('.lane-img'), 2000);
        })
        .catch((err) => console.error('Hero gallery API error:', err));
    }
  }

  /* ---------------------------------------------
   * MASONRY GALLERY — GALLERY PAGE ONLY
   * ------------------------------------------- */
  const masonry = document.getElementById('masonry-gallery');
  if (masonry) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let images = [];
    let currentIndex = 0;

    const apiURL =
      'https://api.github.com/repos/PmR76/crowncreatives/contents/assets/images/gallery';

    fetch(apiURL)
      .then((res) => res.json())
      .then((files) => {
        images = files.filter((file) =>
          file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i)
        );

        images.forEach((img, index) => {
          const el = document.createElement('img');
          el.src = img.download_url;
          el.dataset.index = index;
          el.loading = 'lazy';
          el.decoding = 'async';

          el.onload = () => el.classList.add('loaded');
          el.addEventListener('click', () => openLightbox(index));

          masonry.appendChild(el);
        });
      })
      .catch((err) => console.error('Masonry gallery API error:', err));

    function openLightbox(index) {
      if (!lightbox || !lightboxImg) return;
      currentIndex = index;
      lightboxImg.src = images[index].download_url;
      lightbox.classList.remove('hidden');
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.add('hidden');
    }

    function showPrev() {
      if (!images.length || !lightboxImg) return;
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex].download_url;
    }

    function showNext() {
      if (!images.length || !lightboxImg) return;
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex].download_url;
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!lightbox || lightbox.classList.contains('hidden')) return;
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Escape') closeLightbox();
    });
  }
});

/* ---------------------------------------------
 * FADE ENGINE FOR HERO LANES
 * ------------------------------------------- */
function startLaneFade(images, delayOffset = 0) {
  if (!images.length) return;

  images.forEach((img, index) => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 4s ease-in-out';

    const startDelay = delayOffset + index * 4000;

    setTimeout(() => {
      let visible = false;

      setInterval(() => {
        visible = !visible;
        img.style.opacity = visible ? '1' : '0';
      }, images.length * 4000);
    }, startDelay);
  });
}
