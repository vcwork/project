---
title: Entrega 1
---

# Entrega 1 - Ilusiones ópticas

## Introducción

Se presentará el efecto estroboscópico en el cual se parte de imágenes que se presentan de forma continua generando lo que parece ser un movimiento fluido, esto debido al efecto Phi, dentro de los posibles consecuencias que este efecto puede llegar a tener se encuentra una que relaciona el movimiento y la percepción de los colores en las pantallas de los computadores. Al seguir los pasos del trabajo realizado por Michael Bach fue posible reproducir el fenómeno. Para mostrar el trabajo realizado primero se hará una breve contextualización desde la teoría del fenómeno, luego este será reproducido utilizando p5.js y por último se concluirá  acerca de lo hallado.

## Contexto

### Aliasing

Es un fenómeno que causa que diferentes señales se vuelven indistinguibles (o alias de otras) cuando son muestreadas. También se refiere a cuando una señal reconstruida a través de muestras es distinta a su original continua. Cuando este fenómeno se presenta con muestras en el tiempo, como el efecto estroboscópico, se denomina aliasing temporal; cuando se presenta con muestras en el espacio, como con los patrones moiré, se denomina aliasing espacial.

<img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Moire_pattern_of_bricks.jpg" width="300" />     |  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Moire_pattern_of_bricks_small.jpg" width="300" />
:-------------------------:|:-------------------------:
Con una resolución mayor no se produce aliasing  |  Con una resolución menor puede producirse aliasing

### Efecto estroboscópico

Es un efecto óptico causado por el aliasing. Se produce cuando el movimiento rotacional o cíclico es representado por muestras cortas o instantáneas a una tasa de muestreo cercana a la del periodo del movimiento. Este efecto fue crucial para el desarrollo de la animación y del cine.

<p align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Photo4Wiki_strobo_effect_screwdriver.jpg" width="300" />
</p>

### Fenómeno phi

Es una ilusión óptica en la que se aparenta movimiento cuando en realidad se presentan una serie de imágenes estáticas con una frecuencia relativamente alta.

<p align="center">
    <img src="https://www.psychologynoteshq.com/wp-content/uploads/2012/01/phiphenomenon.gif" width="300" />
</p>

## Resultados

{{< details title="Ver Código" open=false >}}

```js
// Adaptado del código de Lindsey Piscitell [this](https://editor.p5js.org/LindseyPiscitell/sketches/SJgoswgp)
// Variables
var deg = 0;
var sp;
let cnv,g;
var reset_button;

//Dibuja el canvas
function setup() { 
  cnv = createCanvas(400, 400);
  cnv.mouseClicked(changeGray);
  sp =2;
  g=100;
  
  reset_button = createButton("Reset");  

  // Posicion del boton
  reset_button.position(15, 50);
  reset_button.mouseClicked(reset);

}
function reset(){
  sp = 0;
}

function draw() { 
  background(g);
  
  textSize(38);
  fill('white');
  text(sp, 15, 35);
  
  
  translate (200,200);
  rotate (radians (deg));
  ellipse(0,0,200,200);
  
  // Crea y rellena los arcos de color
  fill('red');
  arc(0, 0, 200, 200, 0, 180);
  fill('blue');
  arc(0, 0, 200, 200, 180, 0);
  fill('green');
  arc(0, 0, 200, 200, 0, 360);
  deg+=sp;
  print(sp); 
}

// Esta funcion se activa cuando se da click en el canvas aumenta la velocidad
function mouseClicked() {
  sp = sp + 10;
}

// Esta funcion se activa cuando se da click en el canvas cambia el color en escala de grises
function changeGray() {
  g = random(0, 200);
}
```

{{< /details >}}

{{< p5-iframe sketch="/project/sketches/rgb.js" width="725" height="425" >}}


## Conclusiones y trabajo futuro

Como se observa la velocidad y tasa de actualización de píxeles de la pantalla juega en contra cuando se desea tener precisión en ciertos aspectos de los estímulos que se nos están presentando mediante este medio, como lo es la sensación de movimiento continuo y la mezcla de los colores causado por la velocidad a la cual se están presentando los segmentos del círculo. La velocidad a la cual aparentemente se encuentra girando el círculo define si se van a ver los colores que originalmente se definieron o la combinación de estos.

## Recursos

- Raster-scan cathode-ray tubes for vision research--limits of resolution in space, time and intensity, and some solutions. (1997). Spatial Vision, 10(4), 403-414.
- Wikipedia contributors. (2022, 21 marzo). Aliasing. Wikipedia. Recuperado 5 de abril de 2022, de https://en.wikipedia.org/wiki/Aliasing
- Wikipedia contributors. (2022a, febrero 27). Stroboscopic effect. Wikipedia. Recuperado 5 de abril de 2022, de https://en.wikipedia.org/wiki/Stroboscopic_effect
- Wikipedia contributors. (2022a, enero 31). Phi phenomenon. Wikipedia. Recuperado 5 de abril de 2022, de https://en.wikipedia.org/wiki/Phi_phenomenon
