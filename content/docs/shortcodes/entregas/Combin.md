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


{{- define "page-script" -}}
<canvas height="600" id="canvas" style="border: 1px grey solid" width="600">
<script>

// ======================================================================
//  Low-level canvas access.
// ======================================================================

var canvas = document.getElementById("canvas");
var canvas_context = canvas.getContext("2d");
var canvas_buffer = canvas_context.getImageData(0, 0, canvas.width, canvas.height);
var canvas_pitch = canvas_buffer.width * 4;


// The PutPixel() function.
var PutPixel = function(x, y, color) {
  x = canvas.width/2 + x;
  y = canvas.height/2 - y - 1;

  if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
    return;
  }

  var offset = 4*x + canvas_pitch*y;
  canvas_buffer.data[offset++] = color[0];
  canvas_buffer.data[offset++] = color[1];
  canvas_buffer.data[offset++] = color[2];
  canvas_buffer.data[offset++] = 255; // Alpha = 255 (full opacity)
}


// Displays the contents of the offscreen buffer into the canvas.
var UpdateCanvas = function() {
  canvas_context.putImageData(canvas_buffer, 0, 0);
}


// ======================================================================
//  Linear algebra and helpers.
// ======================================================================

// Dot product of two 3D vectors.
var DotProduct = function(v1, v2) {
  return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
}


// Length of a 3D vector.
var Length = function(vec) {
  return Math.sqrt(DotProduct(vec, vec));
}


// Computes k * vec.
var Multiply = function(k, vec) {
  return [k*vec[0], k*vec[1], k*vec[2]];
}


// Computes v1 + v2.
var Add = function(v1, v2) {
  return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
}


// Computes v1 - v2.
var Subtract = function(v1, v2) {
  return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
}


// Clamps a color to the canonical color range.
var Clamp = function(vec) {
  return [Math.min(255, Math.max(0, vec[0])),
      Math.min(255, Math.max(0, vec[1])),
      Math.min(255, Math.max(0, vec[2]))];
}


// ======================================================================
//  A raytracer with diffuse illumination.
// ======================================================================

// A Sphere.
var Sphere = function(center, radius, color) {
  this.center = center;
  this.radius = radius;
  this.color = color;
}

// A Light.
var Light = function(ltype, intensity, position) {
  this.ltype = ltype;
  this.intensity = intensity;
  this.position = position;
}

Light.AMBIENT = 0;
Light.POINT = 1;
Light.DIRECTIONAL = 2;


// Scene setup.
var viewport_size = 1;
var projection_plane_z = 1;
var camera_position = [0, 0, 0];
var background_color = [255, 255, 255];
var spheres = [new Sphere([0, -1, 3], 1, [255, 0, 0]),
           new Sphere([2, 0, 4], 1, [0, 0, 255]),
           new Sphere([-2, 0, 4], 1, [0, 255, 0]),
           new Sphere([0, -5001, 0], 5000, [255, 255, 0])];

var lights = [
  new Light(Light.AMBIENT, 0.2),
  new Light(Light.POINT, 0.6, [2, 1, 0]),
  new Light(Light.DIRECTIONAL, 0.2, [1, 4, 4])
];


// Converts 2D canvas coordinates to 3D viewport coordinates.
var CanvasToViewport = function(p2d) {
  return [p2d[0] * viewport_size / canvas.width,
      p2d[1] * viewport_size / canvas.height,
      projection_plane_z];
}


// Computes the intersection of a ray and a sphere. Returns the values
// of t for the intersections.
var IntersectRaySphere = function(origin, direction, sphere) {
  var oc = Subtract(origin, sphere.center);

  var k1 = DotProduct(direction, direction);
  var k2 = 2*DotProduct(oc, direction);
  var k3 = DotProduct(oc, oc) - sphere.radius*sphere.radius;

  var discriminant = k2*k2 - 4*k1*k3;
  if (discriminant < 0) {
    return [Infinity, Infinity];
  }

  var t1 = (-k2 + Math.sqrt(discriminant)) / (2*k1);
  var t2 = (-k2 - Math.sqrt(discriminant)) / (2*k1);
  return [t1, t2];
}


var ComputeLighting = function(point, normal) {
  var intensity = 0;
  var length_n = Length(normal);  // Should be 1.0, but just in case...

  for (var i = 0; i < lights.length; i++) {
    var light = lights[i];
    if (light.ltype == Light.AMBIENT) {
      intensity += light.intensity;
    } else {
      var vec_l;
      if (light.ltype == Light.POINT) {
    vec_l = Subtract(light.position, point);
      } else {  // Light.DIRECTIONAL
    vec_l = light.position;
      }

      var n_dot_l = DotProduct(normal, vec_l);
      if (n_dot_l > 0) {
    intensity += light.intensity * n_dot_l / (length_n * Length(vec_l));
      }
    }
  }

  return intensity;
}


// Traces a ray against the set of spheres in the scene.
var TraceRay = function(origin, direction, min_t, max_t) {
  var closest_t = Infinity;
  var closest_sphere = null;

  for (var i = 0; i < spheres.length; i++) {
    var ts = IntersectRaySphere(origin, direction, spheres[i]);
    if (ts[0] < closest_t && min_t < ts[0] && ts[0] < max_t) {
      closest_t = ts[0];
      closest_sphere = spheres[i];
    }
    if (ts[1] < closest_t && min_t < ts[1] && ts[1] < max_t) {
      closest_t = ts[1];
      closest_sphere = spheres[i];
    }
  }

  if (closest_sphere == null) {
    return background_color;
  }

  var point = Add(origin, Multiply(closest_t, direction));
  var normal = Subtract(point, closest_sphere.center);
  normal = Multiply(1.0 / Length(normal), normal);

  return Multiply(ComputeLighting(point, normal), closest_sphere.color);
}


//
// Main loop.
//
for (var x = -canvas.width/2; x < canvas.width/2; x++) {
  for (var y = -canvas.height/2; y < canvas.height/2; y++) {
    var direction = CanvasToViewport([x, y])
    var color = TraceRay(camera_position, direction, 1, Infinity);
    PutPixel(x, y, Clamp(color));
  }
}

UpdateCanvas();</script>
{{- end -}}
