document.getElementById("y").textContent = new Date().getFullYear();

document.querySelectorAll("[data-slider]").forEach((slider) => {
  const slides = [...slider.querySelectorAll(".slide")];
  const dotsWrap = slider.querySelector(".dots");
  let index = slides.findIndex((s) => s.classList.contains("is-active"));
  if (index < 0) index = 0;

  const dots = slides.map((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-label", `Show slide ${i + 1}`);
    btn.addEventListener("click", () => go(i));
    dotsWrap.appendChild(btn);
    return btn;
  });

  function go(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
      dot.setAttribute("aria-selected", i === index ? "true" : "false");
    });
  }

  slider.querySelector("[data-prev]").addEventListener("click", () => go(index - 1));
  slider.querySelector("[data-next]").addEventListener("click", () => go(index + 1));

  let timer = setInterval(() => go(index + 1), 5500);
  slider.addEventListener("pointerenter", () => clearInterval(timer));
  slider.addEventListener("pointerleave", () => {
    timer = setInterval(() => go(index + 1), 5500);
  });

  go(index);
});
