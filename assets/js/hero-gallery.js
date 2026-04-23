// ============================================================
//  Crown Creatives — TRUE GitHub API Autoscan Hero Gallery
//  Admin drops images into /assets/images/gallery/
//  No naming rules. No HTML editing. No JSON. No maintenance.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const leftLane = document.querySelector(".gallery-left");
  const rightLane = document.querySelector(".gallery-right");

  if (!leftLane || !rightLane) {
    console.warn("Hero gallery lanes not found.");
    return;
  }

  // GitHub API endpoint for your repo folder
  const apiURL =
    "https://api.github.com/repos/PmR76/crowncreatives/contents/assets/images/gallery";

  fetch(apiURL)
    .then((res) => res.json())
    .then((files) => {
      // Filter for image files
      const images = files.filter((file) =>
        file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i)
      );

      if (!images.length) {
        console.warn("No gallery images found in GitHub folder.");
        return;
      }

      // Shuffle images
      const shuffled = images.sort(() => Math.random() - 0.5);

      // Split into two lanes
      const midpoint = Math.ceil(shuffled.length / 2);
      const leftImages = shuffled.slice(0, midpoint);
      const rightImages = shuffled.slice(midpoint);

      // Insert images into lanes
      leftImages.forEach((img) => {
        const el = document.createElement("img");
        el.src = img.download_url;
        el.className = "lane-img";
        leftLane.appendChild(el);
      });

      rightImages.forEach((img) => {
        const el = document.createElement("img");
        el.src = img.download_url;
        el.className = "lane-img";
        rightLane.appendChild(el);
      });

      // Start fade animation
      startLaneFade(leftLane.querySelectorAll(".lane-img"), 0);
      startLaneFade(rightLane.querySelectorAll(".lane-img"), 2000);
    })
    .catch((err) => console.error("Gallery API error:", err));
});

// Fade engine
function startLaneFade(images, delayOffset = 0) {
  if (!images.length) return;

  images.forEach((img, index) => {
    img.style.opacity = "0";
    img.style.transition = "opacity 4s ease-in-out";

    const startDelay = delayOffset + index * 4000;

    setTimeout(() => {
      let visible = false;

      setInterval(() => {
        visible = !visible;
        img.style.opacity = visible ? "1" : "0";
      }, images.length * 4000);
    }, startDelay);
  });
}
