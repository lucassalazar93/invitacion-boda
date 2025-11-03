// ====================================================
// APERTURA MÁGICA DEL SOBRE — INVITACIÓN PREMIUM 3D
// ====================================================
window.addEventListener("DOMContentLoaded", () => {
  const sello = document.getElementById("selloElegante");
  const sobre = document.getElementById("sobreCuerpo");
  const pantallaSobre = document.getElementById("sobreElegante");
  const contenido = document.getElementById("contenido");
  const sonidoSello = document.getElementById("sonidoSello");
  const musica = document.getElementById("musica");

  if (!sello || !sobre || !pantallaSobre) return;

  sello.addEventListener("click", () => {
    sello.style.pointerEvents = "none"; // evita clics dobles

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
    });

    // ✨ 1. Pulso inicial y sonido del sello
    tl.to(sello, { scale: 0.88, duration: 0.2, ease: "back.out(3)" });
    try {
      sonidoSello.currentTime = 0;
      sonidoSello.play().catch(() => {});
    } catch {}

    // ✨ 2. Brillo y desaparición del sello
    tl.to(sello, {
      scale: 0,
      opacity: 0,
      filter: "brightness(1.8)",
      duration: 0.8,
      ease: "power2.inOut",
    });

    // ✨ 3. Apertura secuencial con profundidad 3D
    tl.to(".solapa-top", { rotateX: -160, duration: 1.3 }, "-=0.1");
    tl.to(".solapa-left", { rotateY: -130, duration: 1.3 }, "-=1.0");
    tl.to(".solapa-right", { rotateY: 130, duration: 1.3 }, "-=1.0");
    tl.to(".solapa-bottom", { rotateX: 150, duration: 1.1 }, "-=0.9");

    // ✨ 4. Efecto de partículas doradas al abrir
    tl.add(() => crearParticulasDorado(sello), "-=1.0");

    // ✨ 5. Transición al contenido
    tl.to(pantallaSobre, {
      opacity: 0,
      duration: 1.3,
      ease: "power2.inOut",
      onComplete: () => {
        pantallaSobre.style.display = "none";
        contenido.hidden = false;

        // Música ambiental con fade-in
        try {
          if (musica) {
            musica.volume = 0;
            musica.play();
            gsap.to(musica, { volume: 1, duration: 2 });
          }
        } catch {
          console.warn("El navegador bloqueó la reproducción automática.");
        }

        // Efecto de entrada al contenido
        gsap.fromTo(
          contenido,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
        );
      },
    });
  });
});

// ====================================================
// PARTÍCULAS DORADAS (EFECTO MÁGICO AL ABRIR)
// ====================================================
function crearParticulasDorado(elemento) {
  const cantidad = 25;
  const rect = elemento.getBoundingClientRect();

  for (let i = 0; i < cantidad; i++) {
    const p = document.createElement("span");
    p.classList.add("particula-dorada");
    document.body.appendChild(p);

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;

    const angulo = Math.random() * Math.PI * 2;
    const distancia = 80 + Math.random() * 80;
    const destinoX = x + Math.cos(angulo) * distancia;
    const destinoY = y + Math.sin(angulo) * distancia;
    const escala = 0.5 + Math.random() * 0.8;

    gsap.fromTo(
      p,
      { x, y, opacity: 1, scale: escala },
      {
        x: destinoX,
        y: destinoY,
        opacity: 0,
        scale: 0,
        duration: 1.5 + Math.random(),
        ease: "power2.out",
        onComplete: () => p.remove(),
      }
    );
  }
}

// ====================================================
// CONTADOR REGRESIVO — HASTA EL GRAN DÍA
// ====================================================
const contador = document.getElementById("contador");

if (contador) {
  const fechaEvento = new Date("2025-12-27T14:00:00").getTime();

  function actualizarContador() {
    const diff = fechaEvento - Date.now();
    if (diff <= 0) {
      contador.textContent = "¡Hoy es el gran día!";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    contador.innerHTML = `
      <div><span>${d}</span><br>Días</div>
      <div><span>${h}</span><br>Horas</div>
      <div><span>${m}</span><br>Min</div>
      <div><span>${s}</span><br>Seg</div>
    `;
  }

  actualizarContador();
  setInterval(actualizarContador, 1000);
}
