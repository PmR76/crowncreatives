document.addEventListener("DOMContentLoaded", () => {
  const root = document.body; // IMPORTANT FIX
  const toggle = document.querySelector(".theme-toggle");
  const icon = document.querySelector(".theme-icon");

  if (!toggle || !icon) {
    console.warn("Theme toggle not found.");
    return;
  }

  const saved = localStorage.getItem("cc-theme");
  root.setAttribute("data-theme", saved === "night" ? "night" : "day");

  function applyTransition() {
    root.style.transition =
      "background 1s ease, color 1s ease, filter 1s ease";
  }

  setTimeout(applyTransition, 50);

  function updateIcon(theme) {
    icon.src = theme === "night"
      ? "/assets/icons/moon.svg"
      : "/assets/icons/sun.svg";
  }

  updateIcon(root.getAttribute("data-theme"));

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "day" ? "night" : "day";

    root.setAttribute("data-theme", next);
    localStorage.setItem("cc-theme", next);
    updateIcon(next);
    applyTransition();
  });
});
