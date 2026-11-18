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

## Revisión de colisiones tras las pruebas manuales · 18 de noviembre de 2026

### Resultados comunicados por el alumno

Las pruebas manuales de la fase 1 confirmaron el funcionamiento de la pantalla inicial, el botón JUGAR, el circuito de caramelos, la visualización del kart y los controles de aceleración, frenado y giro. Se solicita corregir el cruce de los límites exteriores e interiores del circuito, manteniendo la posibilidad de girar y retroceder tras chocar.

### Diagnóstico y cambios realizados

- Se leyó el contenido de `js/track.js`, `js/game.js` y este diario antes de modificarlos. Los archivos ya estaban preparados en el índice de Git; se conservó ese estado sin añadir los nuevos cambios al índice.
- Antes, `isRoad` únicamente activaba la ralentización en el césped. El único límite que detenía el kart era el rectángulo del canvas.
- En `js/track.js` se añadió `canPlaceKart(x, y, halfSize)`. Comprueba una caja de 26 × 26 píxeles que cubre el cuerpo y las ruedas del kart en cualquier orientación. Su esquina más alejada debe estar dentro de la elipse exterior y su punto más próximo al centro debe estar fuera de la elipse interior. Así se comprueba el espacio del vehículo, no solo su centro; la caja fija deja margen para girar sin penetrar los bordes.
- En `js/game.js` se calcula la siguiente posición antes de aplicarla. Si la caja cabe en la carretera, se acepta el movimiento; si cruza un límite, se conserva la última posición válida y se pone la velocidad a cero.
- Se añadió el estado `touchingBoundary` para permitir girar estando detenido contra un borde. La marcha atrás sigue disponible con S/↓; cuando vuelve a avanzar por una posición válida, recupera el comportamiento habitual de giro.
- Se sustituyeron la ralentización en césped y el límite del canvas por las colisiones con la carretera. Se mantienen el dibujo, las teclas y los demás ajustes de conducción. No se añadieron nuevas funcionalidades ni dependencias.

### Verificación de esta revisión

- `node --check` para ambos scripts: sin errores de sintaxis. `git diff --check`: sin errores de espacios.
- Nueve grupos de comprobaciones con los scripts reales y DOM/Canvas simulado: espacio completo del kart; 64 choques repartidos entre los dos bordes; giro estando parado tras chocar y salida hacia delante; colisiones marcha atrás y recuperación; 12.000 pasos combinando aceleración, reversa y giro con el intervalo máximo de 0,05 s; equivalencia entre WASD y flechas; rozamiento y giro normal; colisión y recuperación a 30/60/120 FPS; muestreo independiente de puntos de las cajas aceptadas.
- Todas las comprobaciones finales pasaron. La simulación no añade archivos ni dependencias al proyecto y no sustituye una partida real.
- La verificación de esta corrección en navegador queda pendiente, tal como se solicita.

### Pruebas pendientes en navegador

- Chocar contra los límites exterior e interior, tanto de frente como en diagonal, a lo largo del circuito.
- Mantener el acelerador contra un borde y confirmar que el kart no lo atraviesa ni queda visualmente fuera de la carretera.
- Soltar el acelerador después del choque y girar con A/D o ←/→ sin que el kart se desplace.
- Retroceder con S/↓ después de chocar y continuar conduciendo; comprobar también colisiones circulando marcha atrás.
- Completar una vuelta usando WASD y otra con las flechas, revisando curvas y ausencia de bloqueos.
