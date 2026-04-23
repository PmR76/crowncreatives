// ============================================================
//  Crown Creatives — Theme Toggle Engine (DAY / NIGHT VERSION)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const root = document.body;
  const toggle = document.querySelector(".theme-toggle");
  const icon = document.querySelector(".theme-icon");

  if (!toggle || !icon) {
    console.warn("Theme toggle not found.");
    return;
  }

  const saved = localStorage.getItem("cc-theme");
  const initial = saved === "night" ? "night" : "day";
  root.setAttribute("data-theme", initial);

  function applyTransition() {
    root.style.transition =
      "background 1s ease, color 1s ease, filter 1s ease";
  }

  setTimeout(applyTransition, 50);

  function updateIcon(theme) {
    icon.src = theme === "night"
      ? "/crowncreatives/assets/icons/moon.svg"
      : "/crowncreatives/assets/icons/sun.svg";
  }

  updateIcon(initial);

  function updateHeroCrown(theme) {
    const dayCrown = document.querySelector(".crown-day");
    const nightCrown = document.querySelector(".crown-night");

    if (!dayCrown || !nightCrown) return;

    if (theme === "night") {
      dayCrown.style.opacity = "0";
      nightCrown.style.opacity = "1";
    } else {
      dayCrown.style.opacity = "1";
      nightCrown.style.opacity = "0";
    }
  }

  updateHeroCrown(initial);

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "day" ? "night" : "day";

    root.setAttribute("data-theme", next);
    localStorage.setItem("cc-theme", next);

    updateIcon(next);
    updateHeroCrown(next);
    applyTransition();
  });
});
