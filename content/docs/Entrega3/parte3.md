---
title: Parte III
---

# Entrega 3 - Parte III

### Comparación del framerate entre renderización por software y por hardware

#### Procesamiento por software

{{< details title="Ver código" open=false >}}
```js
let canvas;
let canvas_context;
let canvas_pitch;
let canvas_buffer;

let viewport_size ;
let projection_plane_z;
let camera_position;
let background_color;
let spheres;
let lights;
let dy;
let incre ; 
let dx;
let increx ; 

let liSliderPInt;
let liSliderPX;
let liSliderPY;

function setup(){
    canvas = createCanvas(600,600);
    //console.log(drawingContext);
    canvas_buffer = drawingContext.getImageData(0,0,canvas.width, canvas.height);
    canvas_pitch = canvas.width*4;
    viewport_size = 1;
    projection_plane_z = 1;
    camera_position = [0, 0, 0];
    background_color = [255, 255, 255];
    dy = 0.2;
    incre = true;
    dx = -0.6;
    increx = true;

    liSliderPInt = createSlider(0, 1, 0.2, 0.05);
    liSliderPInt.position(10, 10);
    liSliderPInt.style('width', '580px');

    liSliderPX = createSlider(-5, 5, 0, 0.5);
    liSliderPX.position(10, 30);
    liSliderPX.style('width', '580px');

    liSliderPY = createSlider(-5, 5, 0, 0.5);
    liSliderPY.position(10, 50);
    liSliderPY.style('width', '580px');

    spheres = [new Sphere([0, dy, 3], 0.2, [255, 0, 0]),
              new Sphere([dx, -0.2 , 5], 0.8, [0, 255, 0]),
              new Sphere([0, 0, 7], 2, [0, 0, 255])];

    lights = [
        new Light(Light.AMBIENT,0.2),
        new Light(Light.POINT, liSliderPInt.value(), [liSliderPX.value(), 1, 0]),
        new Light(Light.DIRECTIONAL, 1, [3, 4 , 4])
        ];
}

function PutPixel(x, y, color) {
    var x = canvas.width/2 + x;
    var y = canvas.height/2 - y - 1;
  
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
      return;
    }
    var offset = 4*x + canvas_pitch*y;
    canvas_buffer.data[offset++] = color[0];
    canvas_buffer.data[offset++] = color[1];
    canvas_buffer.data[offset++] = color[2];
    canvas_buffer.data[offset++] = 255; 
}

function UpdateCanvas() {
    drawingContext.putImageData(canvas_buffer, 0, 0);
}

function DotProduct(v1, v2) {
    return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
}

function Length(vec) {
    return Math.sqrt(DotProduct(vec, vec));
}

function Multiply(k, vec) {
    return [k*vec[0], k*vec[1], k*vec[2]];
}

function Add(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
}

function Subtract(v1, v2) {
    return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
}

function Clamp(vec) {
    return [Math.min(255, Math.max(0, vec[0])),
        Math.min(255, Math.max(0, vec[1])),
        Math.min(255, Math.max(0, vec[2]))];
}

function Sphere(center, radius, color) {
    this.center = center;
    this.radius = radius;
    this.color = color;
}

function Light(ltype, intensity, position) {
    this.ltype = ltype;
    this.intensity = intensity;
    this.position = position;
}

Light.AMBIENT = 0;
Light.POINT = 1;
Light.DIRECTIONAL = 2;

function CanvasToViewport(p2d) {
    return [p2d[0] * viewport_size / canvas.width,
        p2d[1] * viewport_size / canvas.height,
        projection_plane_z];
}

function IntersectRaySphere(origin, direction, sphere) {
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

  function ComputeLighting(point, normal) {
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

  function TraceRay(origin, direction, min_t, max_t) {
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

function draw(){
    for (var x = -canvas.width/2; x < canvas.width/2; x++) {
        for (var y = -canvas.height/2; y < canvas.height/2; y++) {
          var direction = CanvasToViewport([x, y])
          var color = TraceRay(camera_position, direction, 1, Infinity);
          PutPixel(x, y, Clamp(color));
        }
      }

      if(incre){
          dy+=0.01;
          if(dy>=1){
              incre=false;
          }
      }else{
            dy-=0.01;
            if(dy<=-1){
                incre=true;
            }
      }

      if(increx){
        dx+=0.01;
        if(dx>=1){
            increx=false;
        }
    }else{
          dx-=0.01;
          if(dx<=-1){
              increx=true;
          }
    }       

      spheres[0].center[1] = dy;
      lights[1].intensity = liSliderPInt.value();
      lights[1].position[0]= liSliderPX.value();
      lights[1].position[1]= liSliderPY.value();
      spheres[1].center[0] = dx;
      UpdateCanvas();
      fill(0);
      text("Frames:  ", 10, 500);
      text(getFrameRate(), 80, 500);
};
```
{{< /details >}}

{{< p5-iframe sketch="/project/sketches/rayTracingtestMultipleFrame.js"  width="620" height="625" >}}

#### Procesamiento por hardware

No fue posible colocar texto dentro de la animación debido al uso de WebGL, por lo que debe ser consultado en la consola (mediante la tecla F12 en navegadores basados en Chromium).

{{< details title="Ver código" open=false >}}
```js
function setup() {
    textSize(80);
    textAlign(CENTER, CENTER);
    createCanvas(600, 500, WEBGL);    
  }
  
  function draw() {
    background(0);
    ambientLight(200); 
    ambientMaterial(255, 102, 94);
    
    directionalLight(250, 250, 250, 35, 184, -1);
    directionalLight(135, 64, 134, frameCount%100, frameCount%100, -1);
    fill(0,0,255);
    noStroke();
    translate(frameCount%200* 2, 0, 0);
    sphere(60);

    fill(0,255,0);
    noStroke();
    translate(frameCount%150, 0, -1);
    sphere(80);

    fill(255,0,0);
    noStroke();
    translate(frameCount%300 * 9, 0, -100);
    sphere(40);
 
    console.log(getFrameRate());
  }
```
{{< /details >}}

{{< p5-iframe sketch="/project/sketches/esferas.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

**Se evidencia que, en general, el procesamiento por hardware produce un framerate más alto.**

## Conclusiones y trabajo futuro

La realización de los ejercicios permitió evidenciar la necesidad de aprender y entender muy bien las matemáticas de la interpolación para la generación de colores en cualquier *shape*. Sin esto, por ejemplo, no sería posible “hipotetizar” acerca del color que un píxel debería tomar y el procesamiento de la imagen sería muy costoso.

Por otra parte, se evidenció que el mapeo de texturas puede ser realizado en la superficie de cualquier *shape* mediante el uso de *shaders* y los colores en formato vec3 y vec4. Para el caso de vec3 sus 3 parámetros pueden ser las componentes RGB del color, mientras que para el caso de vec4 se deben usar 4 parámetros. De esta manera también es posible brindar consciencia espacial, abriendo las puertas para el estudio de la realidad aumentada o la realidad virtual.

Por último, la investigación sobre las funcionalidades *lighting*  y *material* de WebGL resultan ser clave para dar realismo a las imágenes generadas por el computador, teniendo un sinfín de aplicaciones desde el modelado de objetos, hasta la creación de juegos.