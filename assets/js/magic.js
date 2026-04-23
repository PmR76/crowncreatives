// magic.js — theme engine + GitHub API autoscan + slow magical fades

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  /* -------------------------------------------------- */
  /* THEME ENGINE — DAY / NIGHT                         */
  /* -------------------------------------------------- */

  const toggle =
    document.getElementById('theme-toggle') ||
    document.querySelector('.header-toggle, .toggle-icon, [data-role="theme-toggle"]');

  function applyTheme(theme) {
    const safeTheme = theme === 'night' ? 'night' : 'day';
    body.setAttribute('data-theme', safeTheme);
    localStorage.setItem('cc-theme', safeTheme);
  }

  function getInitialTheme() {
    const saved = localStorage.getItem('cc-theme');
    if (saved === 'day' || saved === 'night') return saved;

    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    return prefersDark ? 'night' : 'day';
  }

  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = body.getAttribute('data-theme') || 'day';
      const next = current === 'day' ? 'night' : 'day';
      applyTheme(next);
    });
  }

  /* -------------------------------------------------- */
  /* HERO GALLERY — TRUE AUTOSCAN (GitHub API)          */
  /* -------------------------------------------------- */

  if (!body.classList.contains('home')) return;

  const LEFT_LANE = document.querySelector('.gallery-left');
  const RIGHT_LANE = document.querySelector('.gallery-right');

  if (!LEFT_LANE || !RIGHT_LANE) return;

  // GitHub API endpoint for your gallery folder
  const API_URL =
    'https://api.github.com/repos/PmR76/crown-creatives-v2/contents/assets/images/gallery';

  // Allowed image extensions
  const VALID_EXT = ['.jpg', '.jpeg', '.png', '.webp'];

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function fetchGalleryImages() {
    try {
      const response = await fetch(API_URL, { cache: 'no-store' });

      if (!response.ok) {
        console.error('GitHub API error:', response.status);
        return [];
      }

      const files = await response.json();

      // Extract only valid image files
      const images = files
        .filter(file => {
          if (!file.name) return false;
          const lower = file.name.toLowerCase();
          return VALID_EXT.some(ext => lower.endsWith(ext));
        })
        .map(file => file.download_url);

      return shuffle(images);
    } catch (err) {
      console.error('Error fetching GitHub API:', err);
      return [];
    }
  }

  function createLaneImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.classList.add('lane-img');
    return img;
  }

  function startGalleryCycle(images) {
    if (!images.length) {
      console.warn('No gallery images found.');
      return;
    }

    let index = 0;
    let useLeft = true;

    const VISIBLE_TIME = 8000; // ms fully visible
    const FADE_TIME = 4000;    // ms fade in/out

    function showNext() {
      const lane = useLeft ? LEFT_LANE : RIGHT_LANE;
      lane.innerHTML = '';

      const src = images[index];
      const img = createLaneImage(src);
      lane.appendChild(img);

      // fade in
      requestAnimationFrame(() => {
        img.style.opacity = '1';
      });

      // schedule fade out
      setTimeout(() => {
        img.style.opacity = '0';

        // after fade, move to next image + lane
        setTimeout(() => {
          index = (index + 1) % images.length;
          useLeft = !useLeft;
          showNext();
        }, FADE_TIME);
      }, VISIBLE_TIME);
    }

    showNext();
  }

  async function initGallery() {
    const images = await fetchGalleryImages();
    startGalleryCycle(images);
  }

  initGallery();
});
