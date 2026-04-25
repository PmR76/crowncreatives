document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const savedTheme = localStorage.getItem("theme");

  // Always default to DAY unless user has chosen otherwise
  const defaultTheme = "day";

  // Apply saved theme or default
  const theme = savedTheme || defaultTheme;
  body.setAttribute("data-theme", theme);

  // Toggle button
  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const current = body.getAttribute("data-theme");
    const next = current === "day" ? "night" : "day";

    body.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
});
