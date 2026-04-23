// gallery.js — GitHub API autoscan + floating tiles + lightbox

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const galleryContainer = document.getElementById('magic-gallery');
  if (!galleryContainer) return;

  const API_URL =
    'https://api.github.com/repos/PmR76/crown-creatives-v2/contents/assets/images/gallery';
  const VALID_EXT = ['.jpg', '.jpeg', '.png', '.webp'];

  const lightbox = document.getElementById('magic-lightbox');
  const lightboxImg = lightbox?.querySelector('.magic-lightbox-image');
  const btnClose = lightbox?.querySelector('.magic-lightbox-close');
  const btnPrev = lightbox?.querySelector('.magic-lightbox-prev');
  const btnNext = lightbox?.querySelector('.magic-lightbox-next');

  let images = [];
  let currentIndex = 0;

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
        console.error('GitHub API error (gallery):', response.status);
        return [];
      }

      const files = await response.json();
      const imgs = files
        .filter(file => {
          if (!file.name) return false;
          const lower = file.name.toLowerCase();
          return VALID_EXT.some(ext => lower.endsWith(ext));
        })
        .map(file => file.download_url);

      return shuffle(imgs);
    } catch (err) {
      console.error('Error fetching gallery images:', err);
      return [];
    }
  }

  function createTile(src, index) {
    const tile = document.createElement('div');
    tile.className = 'magic-gallery-tile';

    // staggered float start
    const delay = (index * 0.25) + 's';
    tile.style.animationDelay = delay;

    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';

    tile.appendChild(img);

    tile.addEventListener('click', () => {
      openLightbox(index);
    });

    return tile;
  }

  function renderGallery() {
    galleryContainer.innerHTML = '';
    images.forEach((src, index) => {
      const tile = createTile(src, index);
      galleryContainer.appendChild(tile);
    });
  }

  function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }

  function showPrev() {
    if (!images.length) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    if (lightboxImg) {
      lightboxImg.src = images[currentIndex];
    }
  }

  function showNext() {
    if (!images.length) return;
    currentIndex = (currentIndex + 1) % images.length;
    if (lightboxImg) {
      lightboxImg.src = images[currentIndex];
    }
  }

  // Lightbox events
  if (btnClose) {
    btnClose.addEventListener('click', closeLightbox);
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', showPrev);
  }

  if (btnNext) {
    btnNext.addEventListener('click', showNext);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lightbox.querySelector('.magic-lightbox-backdrop')) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  async function initGallery() {
    images = await fetchGalleryImages();
    if (!images.length) return;
    renderGallery();
  }

  initGallery();
});
