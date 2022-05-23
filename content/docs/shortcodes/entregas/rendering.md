# Entrega 02 - Renderización en software

## Renderizado por software

Se refiere a cuando el proceso de renderizado es realizado sin involucrar unidades de procesamiento gráfico –*GPUs*–, es decir, usando únicamente *CPUs*. Este tipo de renderizado tiene la ventaja de no depender del rendimiento y memoria de la GPU, además de no tener que pagar por otro dispositivo. Sin embargo, estas ventajas frecuentemente suelen verse opacadas por las ventajas que ofrece el renderizado en *GPU*, como que este último es significativamente más rápido debido a que las *GPUs* están optimizadas para el procesamiento gráfico y la computación paralela. [1]

## Renderizado

Es el último paso en el proceso de animación. Es el proceso de generar imágenes a partir de un modelo 2D o 3D, generalmente un modelo de estructura alámbrica, al cual se le añaden una serie de características por medio de un programa de computador [2]. Algunas de estas características son:

- Sombreado plano: cómo el color y el brillo varían con la iluminación.
- Mapeado de texturas: método para aplicar detalle a superficies.
- Mapeado topológico: método para simular rugosidad a pequeña escala.
- Participación de medio: cómo la luz se atenúa cuando pasa a través de atmósferas no claras en aire.
- Sombras: el efecto de obstruir la luz.
- Reflexión: apariencias de espejos.
- Transparencia u opacidad: transmisión de la luz a través de objetos sólidos.
- Transparencia: transmisión dispersa de la luz a través de objetos sólidos.
- Refracción: doblado de la luz asociado con la transparencia.
- Difracción: doblado, dispersión e interferencia de la luz que pasa a través de un objeto o apertura que interrumpe el haz.
- Iluminación indirecta: superficies iluminadas por la reflexión de otros objetos.
- Cáustica: focalización de la luz al atravesar objetos transparentes que produce reflejos brillantes en otro objeto.
- Profundidad de campo: los objetos se ven borrosos cuando están lejos del objeto en el foco.
- Desenfoque de movimiento: los objetos se ven borrosos debido al movimiento a altas velocidades o por el movimiento de la cámara.

Cuando se realizan animaciones, una serie de imágenes debe ser renderizadas para posteriormente ser puestas en secuencia mediante un programa.

### Técnicas de renderizado

#### Rasterización

Es el método de renderización usado por todas las tarjetas gráficas. Usa triángulos y polígonos como primitivas cuando el renderizado píxel por píxel no se puede realizar por algún motivo. Se itera sobre cada primitiva y decide qué píxeles se verán afectados para modificarlos posteriormente.

#### Ray casting

Contrario a la rasterización, la geometría se modela píxel por píxel desde el punto de vista, como si se emitieran rayos desde allí. En el lugar en el que un objeto es intersecado se evalúa el color con alguna de las múltiples técnicas. Esta técnica es sensible a los artefactos, por lo que generalmente se promedian los valores de rayos en diferentes direcciones. Esta técnica se diferencia del trazado de rayos en que este último sí tiene en cuenta el rebote de los haces de luz.

#### Trazado de rayos

Busca simular el comportamiento de la luz como partícula, incluso llegando a simular el efecto de los espacio-tiempos relativistas. Generalmente se emiten varios haces de luz desde cada píxel, siguiendo cada uno de sus rebotes mediante el uso de las leyes de la óptica. Una vez cada haz encuentra otra fuente de iluminación o alcanza cierto número de rebotes, se evalúa el color del píxel y de todos los rebotes.

#### Renderizado neural

Usa redes neurales artificiales que usan métodos de renderizado basados en imágenes que reconstruyen modelos 3D de modelos 2D.

#### Radiosidad

Trata de simular la manera en que las superficies directamente iluminadas actúan como fuentes de iluminación indirecta que iluminan otras superficies, lo que produce un sombreado más realista y captura mejor los ambientes interiores. Su filosofía se basa en que la iluminación debe ser simulada como en realidad ocurre: disparando haces de luz en todas las direcciones y calculando todas sus trayectorias. [3]

## Repositorios

En este [enlace](https://github.com/topics/software-rasterizer) es posible encontrar una lista de 14 repositorios acerca de rasterizadores en software. En ella se pueden encontrar renderizadores y rasterizadores, la mayoría de estos implementados en lenguajes altamente eficientes como C, C++, Zig o Go.

## Mesa

Es un programa open-source que implementa *OpenGL*, *Vulkan* y otras especificaciones de API gráficas, y las traduce a controladores de componentes gráficos de vendedores específicos. En la actualidad, AMD e Intel desarrollan sus controladores basados en Mesa. [4]

## Referencias y bibliografía

[1] Glawion, A. (2022, 12 abril). CPU vs. GPU Rendering – What’s the difference and which should you choose? CG Director. Recuperado 22 de mayo de 2022, de [CPU vs. GPU Rendering – What’s the difference and which should you choose?](https://www.cgdirector.com/cpu-vs-gpu-rendering/#:%7E:text=CPU%20rendering%20is%20a%20technique,benefits%20to%20using%20CPU%20rendering).

[2] Wikipedia contributors. (2022, 18 abril). Rendering (computer graphics). Wikipedia. Recuperado 22 de mayo de 2022, de [Rendering (computer graphics)](https://en.wikipedia.org/wiki/Rendering_(computer_graphics)).

[3] Wikipedia contributors. (2022b, mayo 4). Radiosity (computer graphics). Wikipedia. Recuperado 22 de mayo de 2022, de [Radiosity (computer graphics)](https://en.wikipedia.org/wiki/Radiosity_(computer_graphics)).

[4] Wikipedia contributors. (2022c, mayo 18). Mesa (computer graphics). Wikipedia. Recuperado 22 de mayo de 2022, de [Mesa (computer graphics)](https://en.wikipedia.org/wiki/Mesa_%28computer_graphics%29#Software_renderer).
