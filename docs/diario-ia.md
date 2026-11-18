# Diario de uso de IA · Tiny Racers

## Fase 01 · 18 de noviembre de 2026

### Primer prompt

Se transcribe el encargo inicial para conservar el contexto del proyecto:

> Quiero desarrollar un videojuego web llamado **Tiny Racers** para mi proyecto de clase DevChallenge3.
>
> Será un juego de carreras multijugador inspirado en el ambiente de Sugar Rush de ¡Rompe Ralph!, pero con circuitos, coches y gráficos originales.
>
> **Estética:** pixel art retro de 16 bits, mundo de caramelos, colores pastel, carreteras de galleta y pequeños karts.
>
> Utilizaremos HTML, CSS, JavaScript y Canvas 2D. Más adelante incorporaremos Node.js, Express y Socket.IO para el multijugador.
>
> **Primera tarea:**
>
> 1. Analiza la carpeta actual del proyecto.
> 2. Propón una estructura de archivos sencilla.
> 3. Inicializa Git si todavía no está configurado.
> 4. Crea una pantalla inicial con el título Tiny Racers y un botón de jugar.
> 5. Crea un circuito sencillo visto desde arriba.
> 6. Añade un kart que podamos controlar con WASD o las flechas.
> 7. Explica cómo ejecutar y probar el proyecto.
>
> No implementes todavía el multijugador ni funcionalidades adicionales.
>
> Crea también un archivo `docs/diario-ia.md` donde documentes este primer prompt, los archivos generados, las decisiones técnicas y las pruebas pendientes.
>
> Antes de modificar archivos existentes, comprueba su contenido para no sobrescribir trabajo anterior.
>
> Quiero avanzar por fases y entender el código que estamos desarrollando.

### Inspección inicial

- Se comprobó la carpeta de trabajo incluyendo archivos ocultos: estaba vacía.
- Se buscó `AGENTS.md` en el proyecto y sus directorios ascendentes: no se encontró.
- `git status` y `git rev-parse` confirmaron que no existía un repositorio.
- Se ejecutó `git init -b main`. No se creó un remoto ni un commit.
- No había archivos previos que sobrescribir. Antes de futuras modificaciones se deberá leer su contenido.

### Archivos generados

| Archivo | Responsabilidad |
| --- | --- |
| `index.html` | Estructura accesible, pantalla inicial, botón de jugar, canvas e instrucciones. |
| `css/styles.css` | Paleta pastel, tipografía del sistema, bordes retro y distribución adaptable. |
| `js/track.js` | Circuito entre dos elipses, detección de carretera y decoraciones originales. |
| `js/game.js` | Kart, teclado, aceleración, frenado, giro y renderizado. |
| `.gitignore` | Excluir dependencias futuras, secretos y archivos temporales. |
| `README.md` | Ejecución, controles, estructura, explicación del código y pruebas manuales. |
| `docs/diario-ia.md` | Este registro del trabajo asistido por IA. |

### Decisiones técnicas

- **Sin dependencias ni compilación:** HTML, CSS y JavaScript nativos; se puede abrir `index.html` directamente o usar un servidor estático.
- **Separar escenario y conducción:** dos scripts pequeños, cargados en orden con `defer`. Se usa un único objeto global, `TinyRacersTrack`, para compartir el escenario; el resto queda encerrado en funciones.
- **Canvas de 480 × 300:** paisaje dibujado en bloques y escalado sin suavizado. El kart usa rectángulos y rotación de Canvas. Es una estética inspirada en 16 bits, sin emular una consola real.
- **Arte original:** sin imágenes, fuentes externas, personajes o recursos de Sugar Rush. Circuito denominado Valle de Vainilla, con pista de galleta, bordes de glaseado, obleas y caramelos geométricos.
- **Geometría compartida:** la misma función `isRoad` sirve para dibujar la carretera y calcular la ralentización fuera de ella.
- **Conducción relativa al kart:** acelerar/frenar y girar; aceleración gradual, rozamiento y marcha atrás. Las constantes de `physics` permiten estudiar y ajustar el comportamiento.
- **Tiempo real:** `requestAnimationFrame` con delta de tiempo y límite de 0,05 s para evitar grandes saltos después de una interrupción.
- **Fondo precalculado:** un canvas auxiliar evita redibujar todos los píxeles del mapa en cada fotograma.
- **Foco y teclado:** botón nativo utilizable con teclado, foco al jugar y prevención del scroll solo mientras se conduce. Al perder el foco se vacían las teclas y se detiene el kart.
- **Alcance de esta fase:** un jugador local, un circuito, un kart. Sin red, rivales, vueltas, cronómetro, audio ni controles táctiles. Los elementos del jardín son decorativos.

### Pruebas realizadas

- `node --check js/track.js` y `node --check js/game.js`: sin errores de sintaxis. Node solo se utilizó como herramienta de verificación; no es una dependencia del juego.
- Servidor estático local con Python: HTTP 200 para `index.html`, los dos scripts y la hoja de estilos.
- 14 comprobaciones de comportamiento con Node y un DOM/Canvas simulado: reposo antes de jugar; geometría de la carretera; inicio y foco; aceleración con W y ↑; giro simultáneo con D/→ y A/←; ausencia de giro en parado; rozamiento al soltar; frenado y marcha atrás con S/↓; giro en reversa; ralentización en césped; límites del escenario; limpieza del teclado al perder foco/ocultar la pestaña; teclas ignoradas sin foco; desplazamiento comparable a 30, 60 y 120 FPS.
- La simulación ejecutó los scripts reales y comprobó sus posiciones de dibujo; no sustituye una partida en un navegador real. Se ejecutó desde la terminal, sin añadir dependencias o archivos de pruebas al proyecto.
- Se intentó revisar la interfaz en navegador. La vista integrada no estaba disponible y Computer Use se detuvo porque no pudo determinar con suficiente confianza la URL actual de Chrome. No se pudo completar la comprobación visual ni la consola del navegador.

### Pruebas pendientes

- Realizar una vuelta completa y valorar comodidad del giro y anchura de la pista.
- Verificar visualmente pantalla inicial, botón de jugar, renderizado y ausencia de errores en la consola de un navegador real.
- Revisar manualmente la marcha atrás y la recuperación de foco al cambiar de ventana.
- Probar con teclado en Chrome, Firefox y Edge.
- Comprobar el aspecto con distintas escalas de pantalla y resoluciones; en móvil solo se adapta la presentación.
- Revisar contraste, navegación con Tab y lectura de las instrucciones con un lector de pantalla. Canvas no ofrece una alternativa jugable no visual en esta fase.

### Próxima fase

Esperar a concretar el siguiente encargo con el alumno. Node.js, Express y Socket.IO quedan para más adelante.
