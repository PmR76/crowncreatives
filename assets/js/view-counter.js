document.addEventListener("DOMContentLoaded", () => {
  const counterEl = document.querySelector(".count-number");
  if (!counterEl) return;

  // ----------------------------------------------------
  // TEMPORARILY DISABLED — CountAPI is currently offline
  // This prevents fetch errors from breaking your layout.
  // ----------------------------------------------------
  /*
  fetch("https://api.countapi.xyz/hit/crowncreatives/views")
    .then(res => res.json())
    .then(data => {
      counterEl.textContent = data.value.toLocaleString();
    })
    .catch(() => {
      counterEl.textContent = "—";
    });
  */

  // Temporary fallback display
  counterEl.textContent = "✨";
});
