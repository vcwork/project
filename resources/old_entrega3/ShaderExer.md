---
title: (1) Óscar Alejandro Gómez
---

# Entrega Entrega 3 - Shaders

## Coloring
### Agregar el color azul a la textura 

{{< p5-iframe sketch="/project/sketches/colorsSha.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}
{{< details title="Ver Código" open=false >}}
```js
let colorShader;
let cmy;
let v1, v2, v3;
let colorr = 255;
function preload() {
  // The vertex shader defines how vertices are projected onto clip space.
  // Most of the times a projection and modelview matrix are needed for this
  // (see: https://visualcomputing.github.io/docs/shaders/programming_paradigm/).
  // Here, however, we are going to:
  // 1. Define the triangle vertices directly in clip space, thus bypassing
  // both of these matrices (matrices: Tree.NONE). The p5 mandelbrot vertex
  // shader does just the same: https://p5js.org/reference/#/p5/loadShader
  // 2. Interpolate vertex color data (varyings: Tree.color4). Note that
  // color data is defined in a per vertex basis with the fill command below.
  // Have a look at the generated vertex shader in the console!
  // readShader: https://github.com/VisualComputing/p5.treegl#handling
  colorShader = readShader('/project/sketches/shaders/color.frag', { matrices: Tree.NONE, varyings: Tree.color4 });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(600, 450, WEBGL);
  // https://p5js.org/reference/#/p5/shader
  shader(colorShader);
  randomizeTriangle();
}

function draw() {
  background(0);
  // the fill command is used to define the colors
  // (to be interpolated) in a per-vertex basis
  beginShape(TRIANGLES);
  fill(colorr);
  vertex(v1.x, v1.y);
  fill('blue');
  vertex(v2.x, v2.y);
  fill('green');
  vertex(v3.x, v3.y);
  endShape();
}

// vertices are given directly in clip-space,
// i.e., both x and y vertex coordinates ∈ [-1..1]
function randomizeTriangle() {
  v1 = p5.Vector.random2D();
  v2 = p5.Vector.random2D();
  v3 = p5.Vector.random2D();
}

function keyPressed() {
  if (key == 'c') {
    cmy = !cmy;
    // https://p5js.org/reference/#/p5.Shader/setUniform
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

### Redefinir los colores usando HSV
{{< p5-iframe sketch="/project/sketches/luma.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="720" height="550">}}
{{< details title="Ver Código" open=false >}}
```js
precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

float modI(float a,float b) {
    float m=a-floor((a+0.5)/b)*b;
    return floor(m+0.5);
}

vec3 hsv(vec3 c)
{           
    float rValor = c.r;
    float gValor = c.g;
    float bValor = c.b;

    float maximo = max(max(rValor, gValor), bValor);
    float minimo = min(max(rValor, gValor), bValor);

    float h = 0.0;
    if(maximo == rValor){
        h = 60.0 * modI((gValor - bValor)/(maximo - minimo), 6.0);
    }else if (maximo == gValor){
        h = 60.0 * (((bValor - rValor) / (maximo - minimo)) + 2.0);
    }else{
        h = 60.0 * (((rValor - gValor) / (maximo - minimo)) + 4.0);
    }

    float s = 0.0;
    if(maximo != 0.0){
        s = (maximo - minimo) / maximo;
    }else{
        s = 0.0;
    }

    float v = maximo;

    return vec3(h, s, v);

}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = grey_scale ? vec4((vec3(hsv(texel.rgb))), 1.0) : texel;
}
```
{{< /details >}}

## Texturing - World

### Cambiar la forma de la textura que se dibuja en el mundo

{{< p5-iframe sketch="/project/sketches/uv_world.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}
{{< details title="Ver Código" open=false >}}
```js
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

## Iluminación 
{{< p5-iframe sketch="/project/sketches/luma2.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="720" height="550">}}
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
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = grey_scale ? vec4((vec3(luma(texel.rgb))), 1.0) : texel;
}
```
{{< /details >}}

{{< p5-iframe sketch="/project/sketches/lumaValueV.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="720" height="550">}}

{{< details title="Ver Código" open=false >}}
```js
precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

vec3 hsv(vec3 c)
{           
    return vec3(max(max(c.g, c.b),c.r));
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = grey_scale ? vec4((vec3(hsv(texel.rgb))), 1.0) : texel;
}
```
{{< /details >}}


{{< p5-iframe sketch="/project/sketches/luma1.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js"  width="720" height="550">}}
{{< details title="Ver Código" open=false >}}
```js
precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
vec3 luma(vec3 texel) {
    float max = texel.r;
    float min = texel.r;
    if(texel.g > max){
        max = texel.g;
    }else if(texel.g < min){
        min = texel.g;
    }
    
    if(texel.b > max){
        max = texel.b;
    }else if(texel.b < min){
        min = texel.b;
    }
    float r = (max+min)*0.5;
    return vec3(r,r,r);
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

