// ============================================================
//  Crown Creatives — Theme Toggle Engine (DAY / NIGHT VERSION)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const icon = document.querySelector(".theme-icon");

  if (!toggle || !icon) {
    console.warn("Theme toggle not found.");
    return;
  }

  // ------------------------------------------------------------
  // Load saved theme (day / night)
  // ------------------------------------------------------------
  const saved = localStorage.getItem("cc-theme");

  if (saved === "day" || saved === "night") {
    root.setAttribute("data-theme", saved);
  } else {
    root.setAttribute("data-theme", "day");
  }

  // ------------------------------------------------------------
  // Smooth transition
  // ------------------------------------------------------------
  function applyTransition() {
    root.style.transition =
      "background 1s ease, color 1s ease, filter 1s ease";
  }

  setTimeout(applyTransition, 50);

  // ------------------------------------------------------------
  // Update icon
  // ------------------------------------------------------------
  function updateIcon(theme) {
    icon.src = theme === "night"
      ? "/assets/icons/moon.svg"
      : "/assets/icons/sun.svg";
  }

  updateIcon(root.getAttribute("data-theme"));

  // ------------------------------------------------------------
  // Toggle theme (day <-> night)
  // ------------------------------------------------------------
  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "day" ? "night" : "day";

    root.setAttribute("data-theme", next);
    localStorage.setItem("cc-theme", next);
    updateIcon(next);
    applyTransition();
  });
});
