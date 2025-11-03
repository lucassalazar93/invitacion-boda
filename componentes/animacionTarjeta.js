// =========================================================
// COMPONENTE: animacionTarjeta.js
// Descripción: Controla la apertura de la tarjeta con Motion One
// =========================================================

import {
  animate,
  stagger,
} from "https://cdn.jsdelivr.net/npm/motion@10.16.4/+esm";

export function iniciarAnimacionTarjeta() {
  const sello = document.getElementById("sello");
  const tarjetaCerrada = document.getElementById("tarjetaCerrada");
  const tarjetaAbierta = document.getElementById("tarjetaAbierta");
  const musica = document.getElementById("musica");

  sello.addEventListener("click", () => {
    // Efecto de doblez tipo “tarjeta física”
    animate(
      tarjetaCerrada,
      { rotateX: [0, -180], opacity: [1, 0] },
      { duration: 1, easing: "ease-in-out" }
    );

    setTimeout(() => {
      tarjetaCerrada.style.display = "none";
      tarjetaAbierta.style.display = "flex";

      // Efecto de aparición suave en capas
      animate(
        tarjetaAbierta.querySelectorAll("section, footer"),
        { opacity: [0, 1], y: [30, 0] },
        { delay: stagger(0.1), duration: 0.6 }
      );

      musica
        ?.play()
        .catch(() => console.warn("El navegador bloqueó el audio automático."));
    }, 800);
  });
}
