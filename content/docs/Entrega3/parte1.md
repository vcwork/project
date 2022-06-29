---
title: Parte I
---

# Entrega 3 - Parte I

## Introducción

En este reporte se podrán observar los resultados obtenidos al desarrollar los ejercicios propuestos, todos mediante la aplicación de los conceptos relacionados con los *shaders*. Se observarán los resultados de la implementación de múltiples herramientas de coloreado de luminosidad, para posteriormente ver los resultados de implementar teñido de textura (*texture tinting*).

Luego, se explorarán los resultados de implementar enmascarado de imágenes/video y otras herramientas de visualización, junto con las herramientas de coloreado de luminosidad.

De último entre los ejercicios propuestos, se pondrá en evidencia la implementación de otros patrones de texturas sobre objetos 3D.

Por otro lado, se hará un análisis del uso de software para el procesamiento gráfico comparado con el uso de hardware, teniendo en cuenta que la gran mayoría de los ejercicios desarrollados al inicio del semestre eran procesados mediante herramientas de software, mientras que ahora, por razones de rendimiento, se prefiere el uso del hardware.

## Resultados

### Coloring

¿Cómo se generan los colores dentro del triángulo? Cada vértice puede contener no solo un conjunto de datos, sino también datos adicionales llamados atributos. Esos atributos pueden ser el color del vértice, el vector normal, la coordenada de textura, etc.

Entonces, ¿cómo se generan esos colores del triángulo? La respuesta es interpolación. Como lo explica [Wikipedia](https://en.wikipedia.org/wiki/Interpolation), la interpolación es un tipo de estimación, un método que puede usarse para generar nuevos puntos de datos entre un conjunto discreto de puntos de datos conocidos. En el problema descrito se trata de generar colores interpolados dentro del triángulo renderizado. La forma de lograr esto es mediante el uso de coordenadas baricéntricas.

En el ejemplo a continuación es posible observar la interpolación de los colores a medida que el ratón se desplaza dentro del lienzo.

{{< details title="Ver código" open=false >}}
```js
// Código adaptado de la página https://visualcomputing.github.io/docs/shaders/texturing/

let colorShader;
let cmy;
let v1, v2, v3;
let colorr = 255;
function preload() {
  colorShader = readShader('/project/sketches/shaders/color.frag', { matrices: Tree.NONE, varyings: Tree.color4 });
}

function setup() {
  createCanvas(600, 450, WEBGL);
  shader(colorShader);
  randomizeTriangle();
}

function draw() {
  background(0);
  beginShape(TRIANGLES);
  fill(colorr);
  vertex(v1.x, v1.y);
  fill('blue');
  vertex(v2.x, v2.y);
  fill('green');
  vertex(v3.x, v3.y);
  endShape();
}

function randomizeTriangle() {
  v1 = p5.Vector.random2D();
  v2 = p5.Vector.random2D();
  v3 = p5.Vector.random2D();
}

function keyPressed() {
  if (key == 'c') {
    cmy = !cmy;
    colorShader.setUniform('cmy', cmy);
  }
  if (key == 'r') {
    randomizeTriangle();
  }
}
function mouseMoved () {
  colorr = colorr + 2;
  if (colorr > 280) {
    colorr = 0;
  }
}
```
{{< /details >}}

{{< p5-iframe sketch="/project/sketches/colorsSha.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

### Texturing

#### UV Visualization

El mapeo de texturas es un método para definir detalles de alta frecuencia, texturas superficiales o información de color en un gráfico generado por computadora o en un modelo 3D. La técnica original fue establecida por Edwin Catmull en 1974.

El mapeo de texturas originalmente se refería al mapeo difuso, un método que mapeaba píxeles de una textura a una superficie 3D ("envolviendo" la imagen alrededor del objeto). En las últimas décadas, el advenimiento del renderizado multipaso, multitexturización, mipmaps y mapeos más complejos como el mapeo de altura, el mapeo de relieve, el mapeo normal, el mapeo de desplazamiento, el mapeo de reflexión, el mapeo especular, el mapeo de oclusión y muchas otras variaciones de la técnica. (controlados por un sistema de materiales) han hecho posible simular casi fotorrealismo en tiempo real al reducir enormemente la cantidad de polígonos y cálculos de iluminación necesarios para construir una escena 3D realista y funcional. [2]

La textura se define en "uv space", que a su vez se puede mostrar de varias formas como la que se muestra a continuación utilizando los colores azul y rojo. En el segundo ejemplo se usa una *shape* diferente, en este caso es una elipse:

{{< details title="Ver código" open=false >}}
```js
// Código adaptado de la página https://visualcomputing.github.io/docs/shaders/texturing/

let uvShader;

function preload() {
  uvShader = readShader('/project/sketches/shaders/uv.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(600, 450, WEBGL);
  noStroke();
  shader(uvShader);
  textureMode(NORMAL);
}

function draw() {
  background(0);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
```
{{< /details >}}

{{< p5-iframe sketch="/project/sketches/uv.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

{{< details title="Ver código" open=false >}}
```js
let uvShader;

function preload() {
  uvShader = readShader('/project/sketches/shaders/uv.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(600, 450, WEBGL);
  noStroke();
  shader(uvShader);
  textureMode(NORMAL);
}

function draw() {
  background(0);
  ellipse( -1,1,-1,1);
}
```
{{< /details >}}

{{< p5-iframe sketch="/project/sketches/uv_triangle.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

#### 3D World

También es posible usar la navegación en la computadora y esta deberá proporcionar al usuario información sobre la ubicación y el movimiento. La navegación es la más utilizada por el usuario en grandes entornos 3D y presenta diferentes desafíos como apoyar la conciencia espacial, brindar movimientos eficientes entre lugares distantes y hacer que la navegación sea llevadera para que el usuario pueda concentrarse en tareas más importantes. Estas técnicas, tareas de navegación, se pueden dividir en dos componentes: viaje y orientación. Viajar implica moverse desde la ubicación actual hasta el punto deseado. Wayfinding se refiere a encontrar y establecer rutas para llegar a un objetivo de viaje dentro del entorno virtual.

{{< details title="Ver código" open=false >}}
```js
// Código adaptado de la página https://visualcomputing.github.io/docs/shaders/texturing/

let easycam;
let uvShader;

function preload() {
  // Define geometry in world space (i.e., matrices: Tree.pmvMatrix).
  // The projection and modelview matrices may be emitted separately
  // (i.e., matrices: Tree.pMatrix | Tree.mvMatrix), which actually
  // leads to the same gl_Position result.
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/project/sketches/shaders/uv.frag', { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(600, 450, WEBGL);
  textureMode(NORMAL);
  // use custom shader
  shader(uvShader);
  console.log(Tree.pmvMatrix);
}

function draw() {
  background(200);
  orbitControl();
  axes();
  push();
  noStroke();
  // world-space quad (i.e., p5 world space definition: https://shorturl.at/dhCK2)
  beginShape(TRIANGLES);
  vertex(30, 75);
  vertex(40, 20);
  vertex(50, 75);
  endShape();
  pop();
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}
```
{{< /details >}}

{{< p5-iframe sketch="/project/sketches/uv_world.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

#### 3D Screen

{{< details title="Ver código" open=false >}}
```js
// Código adaptado de la página https://visualcomputing.github.io/docs/shaders/texturing/

let easycam;
let uvShader;
let opacity;

function preload() {
  uvShader = readShader('/project/sketches/shaders/uv_alpha.frag', { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(600, 450, WEBGL);
  let state = {
    distance: 250,
    center: [0, 0, 0],
    rotation: [0, 0, 0, 1],
  };
  easycam = createEasyCam();
  easycam.state_reset = state;
  easycam.setState(state, 2000);
  textureMode(NORMAL);
  opacity = createSlider(0, 1, 0.5, 0.01);
  opacity.position(10, 25);
  opacity.style('width', '280px');
}

function draw() {
  background(200);
  resetShader();
  axes();
  grid();

  translate(0, 30);
  fill(color(0, 50, 50, 200));
  rotateX(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  cone(40, 70);
  // use custom shader
  shader(uvShader);
  uvShader.setUniform('opacity', opacity.value());
  beginHUD();
  noStroke();
  quad(0, 0, width, 0, width, height, 0, height);
  endHUD();
}

function mouseWheel(event) {
  return false;
}
```
{{< /details >}}

{{< p5-iframe sketch="/project/sketches/uv_screenfm.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="625" height="475">}}

#### Texture sampling

En el modelo de "cono hexagonal" de HSV, el valor se define como el valor del componente más grande de un color. Esto coloca los tres colores primarios y también todos los "colores secundarios" (cian, amarillo y magenta) en un plano con el blanco, formando una pirámide hexagonal fuera del cubo RGB. [3]

![Cono HSV](/project/sketches/hsv.jpg)

Con {{< katex >}}V=max(R, G, B){{< /katex >}}:

{{< details title="Ver código" open=false >}}
```js
// Código adaptado de la página https://visualcomputing.github.io/docs/shaders/texturing/

let lumaShader;
let img;
let grey_scale;

function preload() {
  lumaShader = readShader('/project/sketches/shaders/luma.frag', { varyings: Tree.texcoords2 });
  // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
  img = loadImage('/project/sketches/color.jpg');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  grey_scale = createCheckbox('HSV', false);
  grey_scale.position(10, 10);
  grey_scale.style('color', 'white');
  grey_scale.input(() => lumaShader.setUniform('grey_scale', grey_scale.checked()));
  lumaShader.setUniform('texture', img);
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}
```
{{< /details >}}

{{< p5-iframe sketch="/project/sketches/lumaf.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

En el modelo HSL "bi-hexcone", la luminosidad se define como el promedio de los componentes de color más grandes y más pequeños, es decir, el rango medio de los componentes RGB. Esta definición también pone los colores primarios y secundarios en un plano, pero uno que pasa a medio camino entre el blanco y el negro. [3]

![HSL](/project/sketches/hsl.jpg)

Para el caso de HSL, {{< katex >}}L=0.5max(R, G, B)+0.5min(R, G, B){{< /katex >}}:

{{< details title="Ver código" open=false >}}
```js
// Código adaptado de la página https://visualcomputing.github.io/docs/shaders/texturing/

let lumaShader;
let img;
let grey_scale;

function preload() {
  lumaShader = readShader('/project/sketches/shaders/luma1.frag', { varyings: Tree.texcoords2 });
  // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
  img = loadImage('/project/sketches/color.jpg');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  grey_scale = createCheckbox('HSL', false);
  grey_scale.position(10, 10);
  grey_scale.style('color', 'white');
  grey_scale.input(() => lumaShader.setUniform('grey_scale', grey_scale.checked()));
  lumaShader.setUniform('texture', img);
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}
```
{{< /details >}}

{{< p5-iframe sketch="/project/sketches/lumaf2.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

Por último, se implementó otra técnica de coloreado por iluminación mediante el promedio aritmético.

{{< details title="Ver Código" open=false >}}
```js
precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec3 texel) {
  return (texel.r + texel.g + texel.b)/3.0;
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = grey_scale ? vec4((vec3(luma(texel.rgb))), 1.0) : texel;
}
```
{{< /details >}}

{{< p5-iframe sketch="/project/sketches/luma3.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js"  width="720" height="550">}}
