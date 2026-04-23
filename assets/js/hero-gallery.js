// ============================================================
//  Crown Creatives — Hero Gallery Lane Engine
//  Uses any .lane-img elements present in the DOM.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const leftLaneImages = Array.from(
    document.querySelectorAll(".gallery-left .lane-img")
  );
  const rightLaneImages = Array.from(
    document.querySelectorAll(".gallery-right .lane-img")
  );

  if (!leftLaneImages.length && !rightLaneImages.length) {
    console.warn("Hero gallery lanes not found.");
    return;
  }

  function cycleLane(images, baseDelay) {
    if (!images.length) return;

    images.forEach((img, index) => {
      img.style.opacity = "0";
      img.style.transition = "opacity 4s ease-in-out";

      const delay = baseDelay + index * 4000;

      setTimeout(() => {
        let visible = false;

        setInterval(() => {
          visible = !visible;
          img.style.opacity = visible ? "1" : "0";
        }, images.length * 4000);
      }, delay);
    });
  }

  cycleLane(leftLaneImages, 0);
  cycleLane(rightLaneImages, 2000);
});
