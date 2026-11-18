/* El mapa se dibuja una sola vez. Todo el arte usa rectángulos originales. */
"use strict";

window.TinyRacersTrack = (() => {
  const width = 480;
  const height = 300;
  const center = { x: 240, y: 150 };
  const outer = { x: 207, y: 122 };
  const inner = { x: 137, y: 65 };
  const start = { x: 240, y: 244, angle: 0 };

  // La ecuación de una elipse permite reutilizar el mismo circuito al conducir.
  function ellipseValue(x, y, radius) {
    return ((x - center.x) / radius.x) ** 2 + ((y - center.y) / radius.y) ** 2;
  }

  function isRoad(x, y) {
    return ellipseValue(x, y, outer) <= 1 && ellipseValue(x, y, inner) >= 1;
  }

  function canPlaceKart(x, y, halfSize) {
    // Una caja cuadrada cubre el kart en cualquier giro, sin cambiar su dibujo.
    const dx = Math.abs(x - center.x);
    const dy = Math.abs(y - center.y);
    // La esquina más alejada debe quedar dentro de la elipse exterior.
    const farthest = ellipseValue(
      center.x + dx + halfSize,
      center.y + dy + halfSize,
      outer,
    );
    // El punto de la caja más próximo al centro debe quedar fuera del jardín.
    const nearest = ellipseValue(
      center.x + Math.max(0, dx - halfSize),
      center.y + Math.max(0, dy - halfSize),
      inner,
    );
    return farthest <= 1 && nearest >= 1;
  }

  function rect(ctx, color, x, y, w, h) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }

  function candyTree(ctx, x, y, color) {
    rect(ctx, "#93bcaa", x - 9, y + 19, 25, 5);
    rect(ctx, "#b9877c", x + 1, y, 5, 22);
    rect(ctx, "#ffedda", x + 1, y, 2, 20);
    rect(ctx, "#775969", x - 10, y - 15, 26, 20);
    rect(ctx, "#775969", x - 6, y - 19, 18, 28);
    rect(ctx, color, x - 10, y - 12, 23, 15);
    rect(ctx, color, x - 6, y - 16, 15, 22);
    rect(ctx, "#fff3e5", x - 6, y - 12, 8, 4);
    rect(ctx, "#fff3e5", x - 6, y - 8, 4, 5);
    rect(ctx, "#ffffff66", x + 5, y, 4, 3);
  }

  function gumdrop(ctx, x, y, color) {
    rect(ctx, "#99c3aa", x - 3, y + 10, 19, 4);
    rect(ctx, color, x, y, 11, 13);
    rect(ctx, color, x + 3, y - 4, 5, 4);
    rect(ctx, color, x - 3, y + 6, 17, 7);
    rect(ctx, "#fff4dc", x + 2, y + 1, 3, 4);
  }

  function wafer(ctx, x, y) {
    rect(ctx, "#99c3aa", x + 3, y + 22, 30, 5);
    rect(ctx, "#a57264", x, y, 29, 24);
    rect(ctx, "#eab782", x, y, 26, 21);
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        rect(ctx, "#c88e6e", x + 3 + col * 6, y + 3 + row * 6, 4, 4);
        rect(ctx, "#f9d69b", x + 3 + col * 6, y + 3 + row * 6, 4, 1);
      }
    }
  }

  function draw(ctx) {
    // Un píxel lógico mide 2 × 2: bordes escalonados y textura de galleta.
    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x += 2) {
        const outside = ellipseValue(x, y, outer);
        const inside = ellipseValue(x, y, inner);
        const crumb = (x * 13 + y * 7) % 59;
        let color = crumb < 5 ? "#b7dbbd" : "#c7e5c7";
        if (outside <= 1.06 && inside >= 0.88) {
          color = (Math.floor(x / 9) + Math.floor(y / 9)) % 2 ? "#fff1db" : "#ed98af";
        }
        if (isRoad(x, y)) {
          color = crumb < 6 ? "#cc966e" : crumb > 53 ? "#edc294" : "#deb084";
        }
        rect(ctx, color, x, y, 2, 2);
      }
    }

    // Marcas centrales colocadas sobre una elipse intermedia.
    for (let i = 0; i < 44; i += 1) {
      const angle = (i / 44) * Math.PI * 2;
      ctx.save();
      ctx.translate(Math.round(center.x + Math.cos(angle) * 172), Math.round(center.y + Math.sin(angle) * 94));
      ctx.rotate(Math.atan2(94 * Math.cos(angle), -172 * Math.sin(angle)));
      rect(ctx, "#f7dbac", -4, -1, 8, 2);
      ctx.restore();
    }

    // Línea de salida sobre la recta inferior.
    for (let row = 0; row < 13; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        rect(ctx, (row + col) % 2 ? "#66515b" : "#fff4dc", 220 + col * 4, 217 + row * 4, 4, 4);
      }
    }

    // Decoración del jardín interior y de las esquinas. No son obstáculos físicos.
    candyTree(ctx, 26, 29, "#efa0ba");
    candyTree(ctx, 445, 35, "#b7a5d8");
    candyTree(ctx, 27, 253, "#b7a5d8");
    candyTree(ctx, 453, 258, "#efa0ba");
    candyTree(ctx, 166, 125, "#efa0ba");
    candyTree(ctx, 307, 146, "#b7a5d8");
    wafer(ctx, 211, 114);
    wafer(ctx, 250, 160);
    gumdrop(ctx, 125, 163, "#91c5c0");
    gumdrop(ctx, 338, 121, "#e7a2b4");
    gumdrop(ctx, 184, 169, "#d3b0d6");
    gumdrop(ctx, 273, 116, "#f1cc80");

    // Confeti de azúcar: posiciones fijas, sin azar entre fotogramas.
    const sprinkles = [[14, 102], [462, 175], [65, 17], [388, 280], [89, 282], [403, 15], [197, 146], [291, 179], [156, 155], [322, 163], [250, 99], [240, 187]];
    sprinkles.forEach(([x, y], index) => {
      rect(ctx, index % 2 ? "#f6fbde" : "#eaa9b9", x, y, 4, 2);
    });
  }

  return { width, height, start, draw, isRoad, canPlaceKart };
})();
