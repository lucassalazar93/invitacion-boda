export function iniciarContador(fecha) {
  const contador = document.getElementById("contador");
  const fechaEvento = new Date(fecha).getTime();

  function actualizar() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {
      contador.innerHTML = "¡Es el gran día!";
      return;
    }

    const d = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const h = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diferencia / (1000 * 60)) % 60);
    const s = Math.floor((diferencia / 1000) % 60);

    contador.innerHTML = `
      <div><strong>${d}</strong><span>días</span></div>
      <div><strong>${h}</strong><span>h</span></div>
      <div><strong>${m}</strong><span>m</span></div>
      <div><strong>${s}</strong><span>s</span></div>
    `;
  }

  setInterval(actualizar, 1000);
  actualizar();
}
