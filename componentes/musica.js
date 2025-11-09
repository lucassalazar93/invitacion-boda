const musica = document.getElementById("musica");
const playPause = document.getElementById("playPause");
const progreso = document.getElementById("progreso");
const volumen = document.getElementById("volumen");
let intervalo;

// Reproducir automáticamente cuando se abre el sobre
window.addEventListener("load", () => {
  musica.volume = 0.5;
  musica.play().then(() => {
    playPause.textContent = "pause";
  });
});

// Control manual
playPause.addEventListener("click", () => {
  if (musica.paused) {
    musica.play();
    playPause.textContent = "pause";
  } else {
    musica.pause();
    playPause.textContent = "play_arrow";
  }
});

volumen.addEventListener("click", () => {
  musica.muted = !musica.muted;
  volumen.textContent = musica.muted ? "volume_off" : "volume_up";
});
