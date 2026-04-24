// ============================================================
// Crown Creatives — Gallery Autoscan + Masonry + Lightbox
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("masonry-gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  let images = [];
  let currentIndex = 0;

  const apiURL =
    "https://api.github.com/repos/PmR76/crowncreatives/contents/assets/images/gallery";

  fetch(apiURL)
    .then((res) => res.json())
    .then((files) => {
      images = files.filter((file) =>
        file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i)
      );

      images.forEach((img, index) => {
        const el = document.createElement("img");
        el.src = img.download_url;
        el.dataset.index = index;

        el.onload = () => el.classList.add("loaded");

        el.addEventListener("click", () => openLightbox(index));

        gallery.appendChild(el);
      });
    });

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[index].download_url;
    lightbox.classList.remove("hidden");
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].download_url;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].download_url;
  }

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  // Close on backdrop click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;

    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "Escape") closeLightbox();
  });
});
