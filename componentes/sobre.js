// =============================================================
// SOBRE MÁGICO — Animación y redirección a contenido.html
// =============================================================
import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";

document.addEventListener("DOMContentLoaded", () => {
  const sello = document.getElementById("selloElegante");
  const sobre = document.getElementById("sobreElegante");
  const sonido = document.getElementById("sonidoSello");

  if (!sello || !sobre) return;

  sello.addEventListener("click", () => {
    sello.style.pointerEvents = "none";

    if (sonido) {
      sonido.currentTime = 0;
      sonido.play().catch(() => {});
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    // Animación del sello
    tl.to(sello, { scale: 0.9, duration: 0.2 });
    tl.to(sello, { opacity: 0, scale: 0, duration: 0.4 });

    // Solapas
    tl.to(".solapa-top", { y: -120, opacity: 0, duration: 0.8 }, "-=0.2");
    tl.to(".solapa-left", { x: -80, opacity: 0, duration: 0.7 }, "-=0.6");
    tl.to(".solapa-right", { x: 80, opacity: 0, duration: 0.7 }, "-=0.6");
    tl.to(".solapa-bottom", { y: 120, opacity: 0, duration: 0.7 }, "-=0.6");

    // Desvanecer el sobre y redirigir
    tl.to(sobre, {
      opacity: 0,
      filter: "blur(8px)",
      duration: 1.2,
      onComplete: () => {
        window.location.href = "contenido.html";
      },
    });
  });
});
