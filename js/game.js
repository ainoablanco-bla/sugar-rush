"use strict";

(() => {
  const canvas = document.querySelector("#game");
  const ctx = canvas.getContext("2d");
  const playButton = document.querySelector("#play-button");
  const startScreen = document.querySelector("#start-screen");
  const status = document.querySelector("#game-status");
  const track = window.TinyRacersTrack;

  if (!ctx) {
    status.textContent = "Canvas 2D no está disponible en este navegador.";
    playButton.disabled = true;
    return;
  }

  // Ajustes en píxeles por segundo y radianes por segundo.
  const physics = {
    acceleration: 100,
    braking: 150,
    friction: 45,
    maxSpeed: 115,
    maxReverse: 45,
    collisionHalfSize: 13,
    steering: 2.6,
  };
  const kart = { ...track.start, speed: 0 };
  const keys = new Set();
  const controlKeys = new Set(["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"]);
  let playing = false;
  let previousTime = null;
  let touchingBoundary = false;

  // El fondo no cambia: lo guardamos en un canvas auxiliar para no recalcularlo.
  const background = document.createElement("canvas");
  background.width = track.width;
  background.height = track.height;
  track.draw(background.getContext("2d"));
  ctx.imageSmoothingEnabled = false;

  function drawKart() {
    ctx.save();
    ctx.translate(Math.round(kart.x), Math.round(kart.y));
    ctx.rotate(kart.angle);

    const block = (color, x, y, width, height) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    };

    // El morro apunta a la derecha cuando angle = 0.
    block("#684d5e44", -8, -6, 20, 16);
    block("#493b50", -7, -8, 5, 4);
    block("#493b50", 4, -8, 5, 4);
    block("#493b50", -7, 4, 5, 4);
    block("#493b50", 4, 4, 5, 4);
    block("#a94b73", -10, -6, 4, 12);
    block("#e9769c", -7, -5, 17, 10);
    block("#ffaec0", -5, -5, 13, 2);
    block("#fff1d7", 4, -4, 4, 8);
    block("#71506b", -4, -4, 6, 8);
    block("#f4d683", -3, -3, 5, 6);
    block("#fff0c6", -2, -3, 3, 2);
    block("#a94b73", 9, -3, 2, 6);
    ctx.restore();
  }

  function render() {
    ctx.drawImage(background, 0, 0);
    drawKart();
  }

  function moveTowardsZero(value, amount) {
    return Math.sign(value) * Math.max(0, Math.abs(value) - amount);
  }

  function update(dt) {
    const forward = keys.has("KeyW") || keys.has("ArrowUp");
    const backward = keys.has("KeyS") || keys.has("ArrowDown");
    const left = keys.has("KeyA") || keys.has("ArrowLeft");
    const right = keys.has("KeyD") || keys.has("ArrowRight");

    if (forward !== backward) {
      if (forward) {
        kart.speed += physics.acceleration * dt;
      } else {
        // S primero frena; al mantenerla pulsada comienza la marcha atrás.
        kart.speed -= (kart.speed > 0 ? physics.braking : physics.acceleration) * dt;
      }
    } else {
      kart.speed = moveTowardsZero(kart.speed, physics.friction * dt);
    }

    kart.speed = Math.max(-physics.maxReverse, Math.min(physics.maxSpeed, kart.speed));

    // Contra un borde se permite girar incluso parado para poder salir.
    // Al retroceder se mantiene el sentido inverso del giro.
    const steering = Number(right) - Number(left);
    const grip = touchingBoundary ? 1 : Math.min(Math.abs(kart.speed) / 40, 1);
    const direction = Math.sign(kart.speed) || 1;
    kart.angle += steering * physics.steering * grip * direction * dt;

    if (kart.speed !== 0) {
      const nextX = kart.x + Math.cos(kart.angle) * kart.speed * dt;
      const nextY = kart.y + Math.sin(kart.angle) * kart.speed * dt;
      if (track.canPlaceKart(nextX, nextY, physics.collisionHalfSize)) {
        kart.x = nextX;
        kart.y = nextY;
        touchingBoundary = false;
      } else {
        // Rechazar solo el desplazamiento: la posición sigue siendo válida.
        kart.speed = 0;
        touchingBoundary = true;
      }
    }
  }

  function frame(time) {
    // dt es el tiempo transcurrido en segundos. El límite evita saltos al volver a la pestaña.
    const dt = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    update(dt);
    render();
    window.requestAnimationFrame(frame);
  }

  playButton.addEventListener("click", () => {
    if (playing) return;
    playing = true;
    startScreen.hidden = true;
    status.textContent = "¡A rodar! Usa WASD o las flechas";
    canvas.focus({ preventScroll: true });
    window.requestAnimationFrame(frame);
  });

  // Las teclas solo controlan el juego cuando el canvas tiene el foco.
  window.addEventListener("keydown", (event) => {
    if (!playing || document.activeElement !== canvas || !controlKeys.has(event.code)) return;
    event.preventDefault();
    keys.add(event.code);
  });
  window.addEventListener("keyup", (event) => {
    keys.delete(event.code);
    if (playing && document.activeElement === canvas && controlKeys.has(event.code)) event.preventDefault();
  });

  function releaseControls() {
    keys.clear();
    kart.speed = 0;
    previousTime = null;
  }

  canvas.addEventListener("blur", releaseControls);
  window.addEventListener("blur", releaseControls);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) releaseControls();
  });

  render();
})();
