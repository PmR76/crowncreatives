---
layout: default
title: Gallery
---

<section class="full-gallery">

  <h1 class="gallery-title">Gallery</h1>
  <p class="gallery-subtitle">A living collection of Crown Creatives imagery</p>

  <!-- Masonry Grid -->
  <div id="masonry-gallery" class="masonry-grid"></div>

  <!-- Lightbox -->
  <div id="lightbox" class="lightbox hidden">
    <span id="lightbox-close" class="lightbox-close">&times;</span>
    <img id="lightbox-img" class="lightbox-img" src="" alt="">
    <div id="lightbox-prev" class="lightbox-nav prev">&#10094;</div>
    <div id="lightbox-next" class="lightbox-nav next">&#10095;</div>
  </div>

</section>

<script src="{{ '/assets/js/gallery-autoscan.js' | relative_url }}"></script>
<link rel="stylesheet" href="{{ '/assets/css/gallery.css' | relative_url }}">
