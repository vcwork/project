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

