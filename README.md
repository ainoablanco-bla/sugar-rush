# Tiny Racers

Primera fase del proyecto de clase **DevChallenge3**: un prototipo local de karts en un mundo de caramelos, con gráficos originales de estilo pixel art de 16 bits.

Usa HTML, CSS, JavaScript y Canvas 2D. No requiere instalar paquetes. Todavía no incluye Node.js, Express, Socket.IO ni multijugador.

## Ejecutar

Abre `index.html` en un navegador moderno y pulsa **JUGAR**. Los scripts clásicos con `defer` permiten ejecutar esta fase directamente desde el archivo.

También puedes servir la carpeta con Python desde una terminal:

```powershell
cd C:\Users\ainoa\OneDrive\Escritorio\tiny-racers
python -m http.server 8000 --bind 127.0.0.1
```

Abre <http://127.0.0.1:8000>. Detén el servidor con `Ctrl+C`. Si usas VS Code, también puedes abrir `index.html` con la extensión Live Server.

## Controles

| Acción | WASD | Flechas |
| --- | --- | --- |
| Acelerar | W | ↑ |
| Frenar y después retroceder | S | ↓ |
| Girar a la izquierda | A | ← |
| Girar a la derecha | D | → |

El kart necesita moverse para girar. Al soltar el acelerador pierde velocidad; el césped también lo frena. Si sales del área de juego, el kart se detiene en el borde. Haz clic en el circuito para recuperar el control después de cambiar el foco. Hace falta un teclado: esta fase no tiene controles táctiles.

## Estructura

```text
tiny-racers/
├── index.html          # Pantalla inicial, botón, canvas e instrucciones
├── css/
│   └── styles.css      # Colores pastel, aspecto retro y adaptación de tamaño
├── js/
│   ├── track.js        # Geometría de la pista y dibujo del paisaje
│   └── game.js         # Estado del kart, teclado, física y bucle de juego
├── docs/
│   └── diario-ia.md    # Prompt, decisiones y registro de pruebas
├── .gitignore
└── README.md
```

## Entender el código

1. `index.html` carga primero `track.js` y después `game.js`. `defer` espera a que el HTML esté preparado y mantiene ese orden.
2. `track.js` expone `window.TinyRacersTrack`. La carretera es la zona entre dos elipses: `isRoad(x, y)` responde si una posición está en ella. `draw(ctx)` dibuja galleta, glaseado, caramelos y línea de salida con formas de Canvas.
3. `game.js` guarda `x`, `y`, `angle` y `speed` del kart. Un `Set` conserva las teclas pulsadas y permite acelerar y girar a la vez.
4. Al pulsar **JUGAR**, comienza `requestAnimationFrame`. En cada fotograma, `update(dt)` calcula el movimiento y `render()` dibuja el fondo y el kart. `dt` está en segundos, para que la velocidad no dependa de la frecuencia de pantalla.
5. El ángulo indica la dirección. `Math.cos(angle)` determina el desplazamiento horizontal y `Math.sin(angle)` el vertical. Las flechas izquierda/derecha giran el vehículo; no lo desplazan lateralmente.
6. El paisaje se pinta una vez en un canvas auxiliar y se reutiliza. La resolución lógica es **480 × 300**; CSS la amplía con `image-rendering: pixelated`.

Para ajustar la conducción, empieza por el objeto `physics` en `game.js`: `maxSpeed`, `acceleration`, `steering` y `grassSpeed`. Para cambiar la forma del circuito, modifica `outer` e `inner` en `track.js`; el dibujo y la detección de carretera comparten esos datos.

## Probar manualmente

1. Abre la página y comprueba el título, la pista y el botón. El kart debe permanecer quieto antes de jugar.
2. Pulsa **JUGAR** (o usa `Tab` y `Enter`). La tarjeta desaparece y el canvas recibe el foco.
3. Prueba ambos grupos de teclas. Acelera y gira simultáneamente; suelta todo y comprueba que pierde velocidad.
4. Mantén S/↓: debe frenar y después retroceder. Comprueba también los giros marcha atrás.
5. Sal de la carretera: el kart debe ir más despacio. Acércate a los cuatro bordes: debe seguir visible.
6. Cambia de pestaña con una tecla pulsada y vuelve. El kart debe quedar detenido hasta que vuelvas a pulsar una tecla.
7. Reduce la ventana y comprueba que el circuito mantiene sus proporciones. La interfaz se adapta, pero conducir requiere teclado.
8. Abre las herramientas del navegador (`F12`) y revisa que no haya errores en la consola ni recursos fallidos.

El registro distingue las comprobaciones realizadas de las pendientes en `docs/diario-ia.md`.

## Git y alcance

El repositorio local se ha inicializado en la rama `main`. No se ha creado un repositorio remoto ni un commit automáticamente. Para revisar y guardar esta fase:

```powershell
git status
git add index.html css js docs README.md .gitignore
git commit -m "Crea el prototipo inicial de Tiny Racers"
```

Revisa el contenido de los archivos desde tu editor antes de guardarlos en Git. Git puede pedirte configurar tu nombre y correo antes del primer commit.

Esta fase permite conducir libremente en un circuito. Los caramelos son decoración; no hay colisiones con ellos, vueltas, rivales, cronómetro ni multijugador. Esas decisiones quedan para fases posteriores.
