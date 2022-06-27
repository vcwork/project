---
title: (3) Fernando Moreno Bautista
---

# Entrega Entrega 3 - Shaders
## Introducción

A lo largo de la siguiente página se podrá observar una serie de ejercicios en los cuales se aplican los shaders, esto en los siguientes aspectos: Coloring, Texturing, Image Processing y Procedural Texturing, ejercicios en los cuales se podrán ver los diferentes usos de estos shaders los cuales se hacen mediante hardware y al final veremos un pequeño análisis entre las diferencias que existen entre los ejercicios de la primera entrega, los cuales fueron mediante software y por ultimo una conclusión.

## Contexto y Ejemplos

### Coloring

¿Cómo se generan los colores dentro del triangulo? Cada vértice puede contener no solo un conjunto de datos, sino que también datos adicionales llamados atributos. Esos atributos pueden ser color del vértice, vector normal, coordenada de textura, etc.

Entonces, ¿cómo se generan esos colores del triangulo de abajo?, La respuesta es la interpolación. Como podemos leer en Wikipedia, la interpolación en matemáticas es un tipo de estimación, un método que puede usarse para generar nuevos puntos de datos entre un conjunto discreto de puntos de datos conocidos. En el problema descrito se trata de generar colores interpolados dentro del triángulo renderizado. La forma de lograr esto es mediante el uso de coordenadas baricéntricas.
En el ejemplo del triangulo de abajo podemos mover el mouse dentro del canva y veremos como se va interpolando los coleres a medida que el mose se va moviendo.

## Coloring example

{{< p5-iframe sketch="/project/sketches/colorsSha.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

## Texturing - UV Visualization

El mapeo de texturas es un método para definir detalles de alta frecuencia, textura superficial o información de color en un gráfico generado por computadora o en un modelo 3D. La técnica original fue iniciada por Edwin Catmull en 1974
El mapeo de texturas originalmente se refería al mapeo difuso, un método que simplemente mapeaba píxeles de una textura a una superficie 3D ("envolviendo" la imagen alrededor del objeto). En las últimas décadas, el advenimiento del renderizado multipaso, multitexturización, mipmaps y mapeos más complejos como el mapeo de altura, el mapeo de relieve, el mapeo normal, el mapeo de desplazamiento, el mapeo de reflexión, el mapeo especular, el mapeo de oclusión y muchas otras variaciones de la técnica. (controlados por un sistema de materiales) han hecho posible simular casi fotorrealismo en tiempo real al reducir enormemente la cantidad de polígonos y cálculos de iluminación necesarios para construir una escena 3D realista y funcional.

La textura se define en algo llamado "uv space", que a su vez se puede mostrar de varias formas, como la que se muestra a continuación utilizando los colores azul y rojo y en el segundo ejemplo se usa un shape diferente, en este caso es una elipse:
## Texturing - UV Visualization example

{{< p5-iframe sketch="/project/sketches/uv.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

{{< p5-iframe sketch="/project/sketches/uv_triangle.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

## Texturing - 3D World

También se puede usar la Navegación en la computadora y esta debera proporcionar al usuario información sobre la ubicación y el movimiento. La navegación es la más utilizada por el usuario en grandes entornos 3D y presenta diferentes desafíos como apoyar la conciencia espacial, brindar movimientos eficientes entre lugares distantes y hacer que la navegación sea llevadera para que el usuario pueda concentrarse en tareas más importantes. Estas técnicas, tareas de navegación, se pueden dividir en dos componentes: viaje y orientación. Viajar implica moverse desde la ubicación actual hasta el punto deseado. Wayfinding se refiere a encontrar y establecer rutas para llegar a un objetivo de viaje dentro del entorno virtual.

{{< p5-iframe sketch="/project/sketches/uv_world.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

## Texturing - 3D Screen

{{< p5-iframe sketch="/project/sketches/uv_screenfm.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="625" height="475">}}

## Texturing - Texture sampling

En el modelo de "cono hexagonal" de HSV, el valor se define como el componente más grande de un color, M. Esto coloca los tres colores primarios y también todos los "colores secundarios" (cian, amarillo y magenta) en un plano con el blanco, formando una pirámide hexagonal fuera del cubo RGB.

<img src="/project/sketches/hsv.jpg" width="300" />  

En este caso es: 
## V= max(R,G,B) = M 
{{< p5-iframe sketch="/project/sketches/lumaf.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

En el modelo HSL "bi-hexcone", la luminosidad se define como el promedio de los componentes de color más grandes y más pequeños, es decir, el rango medio de los componentes RGB. Esta definición también pone los colores primarios y secundarios en un plano, pero un plano que pasa a medio camino entre el blanco y el negro.

<img src="/project/sketches/hsl.jpg" width="300" />  

En este caso es: 
## L = mid(R,G,B) = 1/2 (M + m)

{{< p5-iframe sketch="/project/sketches/lumaf2.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

## Conclusiones y trabajo futuro

Luego de realizar los ejercicios propuestos me he podido dar cuenta que en la parte de generación de color en un shape las matemáticas son esenciales para la interpolación de estos ya que estos generan que se sepan nuevos datos desconocidos entre un conjunto de datos discretos.

También el mapeo de texturas en un espacio definido se puede mostrar de muchas maneras ya que este se mapeará dentro de la superficie del shape, en este caso usando shaders, pero de una manera inusual, en este caso con números, algo que podría ser confuso y esto se hace con los colores en formato vec3 o vec4, en el caso de vec3 con 3 parámetros que podrían ser los RGB o con vec4 con 4 parámetros. Y mejor aún, esto se podría combinar con el mundo 3D y brindar una conciencia espacial, algo muy interesante para estudiar mas afondo en el futuro ya que se podría trabajar con diferentes formas en el espacio y jugar con ellas.

Es interesante la gran variedad de aplicaciones que tendrían los shaders en cualquier campo de lo visual, y es emocionante poder seguir investigando sobre esto, ya que invita a practicar y aprender con las matemáticas y la computación.


## Bibliografia

[1] Glawion, A. (2022, 12 abril). CPU vs. GPU Rendering – What’s the difference and which should you choose? CG Director. Recuperado 22 de mayo de 2022, de [CPU vs. GPU Rendering – What’s the difference and which should you choose?](https://www.cgdirector.com/cpu-vs-gpu-rendering/#:%7E:text=CPU%20rendering%20is%20a%20technique,benefits%20to%20using%20CPU%20rendering).

[2] Wikipedia contributors. (2022, 18 abril). Rendering (computer graphics). Wikipedia. Recuperado 22 de mayo de 2022, de [Rendering (computer graphics)](https://en.wikipedia.org/wiki/Rendering_(computer_graphics)).

[3] Wikipedia contributors. (2022b, mayo 4). Radiosity (computer graphics). Wikipedia. Recuperado 22 de mayo de 2022, de [Radiosity (computer graphics)](https://en.wikipedia.org/wiki/Radiosity_(computer_graphics)).

[4] Wikipedia contributors. (2022c, mayo 18). Mesa (computer graphics). Wikipedia. Recuperado 22 de mayo de 2022, de [Mesa (computer graphics)](https://en.wikipedia.org/wiki/Mesa_%28computer_graphics%29#Software_renderer).

[5] colaboradores de Wikipedia. (2022, 2 abril). Renderización. Wikipedia, la enciclopedia libre. https://es.wikipedia.org/wiki/Renderizaci%C3%B3n

[6] How to Correctly Interpolate Vertex Attributes on a Parallelogram Using Modern GPUs? (2020). Adam Sawicki. https://asawicki.info news_1721_how_to_correctly_interpolate_vertex_attributes_on_a_parallelogram_using_modern_gpus

[7] Wikipedia contributors. (2022a, mayo 31). 3D user interaction. Wikipedia. https://en.wikipedia.org/wiki/3D_user_interaction#3D_Interaction_Techniques

[8] Wikipedia contributors. (2022b, junio 2). HSL and HSV. Wikipedia. https://en.wikipedia.org/wiki/HSL_and_HSV
