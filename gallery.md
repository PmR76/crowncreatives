---
layout: default
title: Gallery
permalink: /gallery/
---

<section class="gallery-page">
  <h1 class="page-title">Gallery</h1>

  <!-- Masonry container (JS will autoscan + populate) -->
  <div id="masonry-gallery" class="masonry-gallery"></div>

  <!-- Lightbox (JS controls visibility + navigation) -->
  <div id="lightbox" class="lightbox hidden">
    <button id="lightbox-close" class="lightbox-close" aria-label="Close">&times;</button>
    <button id="lightbox-prev" class="lightbox-prev" aria-label="Previous">&#10094;</button>
    <img id="lightbox-img" class="lightbox-img" alt="">
    <button id="lightbox-next" class="lightbox-next" aria-label="Next">&#10095;</button>
  </div>
</section>
