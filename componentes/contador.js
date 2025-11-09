// ============================================================
// CONTADOR ANIMADO FLIP CLOCK — INVITACIÓN BODA
// ============================================================
// Fecha del evento (hora Colombia, GMT-5)
const FECHA_BODA = new Date("2025-12-27T14:00:00-05:00");

// Referencia al contenedor principal
const contenedor = document.getElementById("contador");

// Estructura: tres unidades (días, horas, minutos)
const unidades = [
  { key: "dias", label: "días" },
  { key: "horas", label: "horas" },
  { key: "minutos", label: "minutos" },
];

// Render inicial del HTML
contenedor.innerHTML = unidades
  .map(
    (u) => `
      <div class="flip-box" data-key="${u.key}">
        <div class="nums">
          <div class="num" data-num="00" data-num-next="00"></div>
        </div>
        <span class="flip-label">${u.label}</span>
      </div>`
  )
  .join("");

// ============================================================
// CÁLCULO DE DIFERENCIA DE TIEMPO
// ============================================================
function calcular() {
  const ahora = new Date();
  let diff = Math.max(0, FECHA_BODA.getTime() - ahora.getTime());

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= d * (1000 * 60 * 60 * 24);

  const h = Math.floor(diff / (1000 * 60 * 60));
  diff -= h * (1000 * 60 * 60);

  const m = Math.floor(diff / (1000 * 60));

  return { dias: d, horas: h, minutos: m };
}

// ============================================================
// ACTUALIZACIÓN VISUAL CON ANIMACIÓN FLIP
// ============================================================
function setValor(key, valor) {
  const box = contenedor.querySelector(`.flip-box[data-key="${key}"] .num`);
  const actual = box.getAttribute("data-num");
  const nuevo = String(valor).padStart(2, "0");

  if (actual === nuevo) return;

  box.classList.remove("animate");
  box.setAttribute("data-num-next", nuevo);

  // Reinicia animación
  void box.offsetWidth;
  box.classList.add("animate");

  box.addEventListener(
    "animationend",
    () => {
      box.classList.remove("animate");
      box.setAttribute("data-num", nuevo);
    },
    { once: true }
  );
}

// ============================================================
// BUCLE PRINCIPAL DEL CONTADOR
// ============================================================
function tick() {
  const t = calcular();
  setValor("dias", t.dias);
  setValor("horas", t.horas);
  setValor("minutos", t.minutos);
}

tick();
setInterval(tick, 60000); // actualiza cada minuto (no cada segundo)
