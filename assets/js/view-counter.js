document.addEventListener("DOMContentLoaded", () => {
  const counterEl = document.querySelector(".count-number");
  if (!counterEl) return;

  fetch("https://api.countapi.xyz/hit/crowncreatives/views")
    .then(res => res.json())
    .then(data => {
      counterEl.textContent = data.value.toLocaleString();
    })
    .catch(() => {
      counterEl.textContent = "—";
    });
});
