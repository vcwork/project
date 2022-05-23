# Entrega 02 - 3D Brush

## Introducción

Se presentará un demo que ilustra una aplicación de pintura en 3D que utiliza transformaciones de pantalla a mundo, similares a las empleadas en el Ray-casting, en la cual el usuario será capaz de mover con los dedos de su mano izquierda el mundo y con los dedos de su mano derecha será capaz de dibujar, todo esto a través de la cámara donde los rayos de luz virtuales se "emiten" o "trazan" en su camino desde el punto focal de una cámara a través de cada píxel en el sensor de la cámara para determinar qué es visible a lo largo del rayo en el escena 3D.

## Contexto

### Ray Casting

El Ray casting es el más básico de muchos algoritmos de renderización de gráficos por computadora que usan el algoritmo geométrico de ray tracing. Los algoritmos basados en ray tracing operan en orden de imagen para renderizar escenas tridimensionales a imágenes bidimensionales. Los rayos geométricos son trazados desde el ojo del observador (trazado hacia atrás) para calcular la radiancia que viaja hacia el observador en la dirección del rayo. La rapidez y simplicidad del trazado de los rayos provienen de computar el color de la luz sin trazar recursivamente rayos adicionales para obtener la radiancia incidente en el punto donde el rayo intercepta. Esto elimina la posibilidad de renderizar con exactitud las reflexiones, refracciones, y las sombras. Aun así todos estos elementos pueden ser simulados en un cierto grado, con el uso ingenioso de mapas de textura u otros métodos. La velocidad de cómputo del ray casting lo convirtió en un método práctico de renderizado para los primeros videojuegos de 3D con renderización de escenas en tiempo real.


<img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Anarch_short_gameplay.gif" width="300" />     |  <img src="https://www.computerhope.com/jargon/r/ray-casting-diagram.jpg" width="300" />

## Resultados

{{< p5-iframe sketch="/project/sketches/Combinado.js" src="https://unpkg.com/handsfree@8.4.2/build/lib/assets/handsfree.css" lib2="https://unpkg.com/handsfree@8.4.2/build/lib/handsfree.js" lib3="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" lib4="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

## Conclusiones y trabajo futuro
Como se observa se puede mover el mundo con ayuda de la mano izquierda, gracias a la librería Handsfree.js la cual es capaz de detectar la posición de los dedos y simular la profundidad con la cámara web. Al ejecutar la cámara en la página web esta consume muchos recursos de la CPU ya que hace software rendering en la pintura en 3D, y por otro lado, este tiene algunos problemas al reconocer los gestos, pero se ha podido dibujar y manipular el mundo.

Para trabajos futuros se espera que se puedan hacer dibujos más fácilmente y con diferentes texturas, además que se pueda optimizar el algoritmo o la manera de interpretar los gestos para un manejo más fácil del mundo y también una manera más dinámica para dibujar, este es un tema apasionante y también con un gran futuro por delante ya que pueden existir varios usos importantes en todas las ramas del conocimiento en las que se puedan aplicar este tipo de algoritmos.


## Recursos

- colaboradores de Wikipedia. (2022, 26 febrero). Ray casting. Wikipedia, la enciclopedia libre. https://es.wikipedia.org/wiki/Ray_castingnpm: handsfree. (2021, 28 agosto). 

- Npm. https://www.npmjs.com/package/handsfree

- Wikipedia contributors. (2022, 10 mayo). Ray casting. Wikipedia. https://en.wikipedia.org/wiki/Ray_casting#History_of_ray_casting
