export function generarParticulas(cantidad) {
  const contenedor = document.getElementById("particulas");
  for (let i = 0; i < cantidad; i++) {
    const p = document.createElement("div");
    p.classList.add("particula");
    p.style.left = Math.random() * 100 + "vw";
    p.style.top = Math.random() * 100 + "vh";
    p.style.animationDelay = Math.random() * 10 + "s";
    contenedor.appendChild(p);
  }
}
