# Entrega 02 - 3D Brush

## Introducción

Se presentará un demo que ilustra una aplicación de pintura en 3D que utiliza transformaciones de pantalla a mundo, similares a las empleadas en el Ray-casting, en la cual el usuario será capaz de mover con los dedos de su mano izquierda el mundo y con los dedos de su mano derecha será capaz de dibujar, todo esto a través de la cámara donde los rayos de luz virtuales se "emiten" o "trazan" en su camino desde el punto focal de una cámara a través de cada píxel en el sensor de la cámara para determinar qué es visible a lo largo del rayo en el escena 3D.

## Contexto

### Ray Casting

El Ray casting es el más básico de muchos algoritmos de renderización de gráficos por computadora que usan el algoritmo geométrico de ray tracing. Los algoritmos basados en ray tracing operan en orden de imagen para renderizar escenas tridimensionales a imágenes bidimensionales. Los rayos geométricos son trazados desde el ojo del observador (trazado hacia atrás) para calcular la radiancia que viaja hacia el observador en la dirección del rayo. La rapidez y simplicidad del trazado de los rayos provienen de computar el color de la luz sin trazar recursivamente rayos adicionales para obtener la radiancia incidente en el punto donde el rayo intercepta. Esto elimina la posibilidad de renderizar con exactitud las reflexiones, refracciones, y las sombras. Aun así todos estos elementos pueden ser simulados en un cierto grado, con el uso ingenioso de mapas de textura u otros métodos. La velocidad de cómputo del ray casting lo convirtió en un método práctico de renderizado para los primeros videojuegos de 3D con renderización de escenas en tiempo real.


<img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Anarch_short_gameplay.gif" width="300" />     |  <img src="https://www.computerhope.com/jargon/r/ray-casting-diagram.jpg" width="300" />

## Resultados

{{< details title="Ver Código" open=false >}}
```js
/**
 * 
https://editor.p5js.org/pixelfelt/sketches/oS5CwSbM1

 * Finger painting: A starter sketch demonstrating how to "finger paint" with Handsfree.js
 *
 * Step 1: Press the ▶ Play Button on the top left of the p5 editor (or load this sketch in a browser)
 * Step 2: Click "Start Webcam" underneath the black canvas
 * Step 3: Wait a few moments for everything to start (the computer vision models are large)
 * Step 4: Pinch your fingers to paint 👌 The left index pointer (big black circle) is an eraser and the left pinky clears the whole screen
 *
 * ----------
 *
 * How it works (CTRL+F for "#n" to jump to that bit of code):
 * -- Add Handsfree.js to index.html
 * #1 Configure Handsfree.js
 * #2 Detect when fingers are pinched and then paint there
 * #3 Draw your hands landmarks onto the sketch
 *
 * ----------
 *
 * Docs: https://handsfree.js.org (old)
 * Docs: https://handsfree.dev (newer but missing examples)
 * GitHub: https://github.com/midiblocks/handsfree
 * Twitter (me + handsfree.js): https://github.com/pixelfelt
 * Twitter (just handsfree.js): https://github.com/handsfreejs
 *
 * ----------
 *
 * Ideas:
 * - Experiment with different input methods (like pinching to cycle through colors). Gestures are coming soon: https://handsfree.js.org/gesture/
 * - If you need 3D (but with a limit of 1 hand), see here: https://handsfree.js.org/ref/model/handpose.html
 * - Try the "palm pointer" for a different approach to painting: https://handsfree.js.org/ref/plugin/palmPointers.html
 * - This can support up to 4 hands: https://handsfree.js.org/ref/model/hands.html#with-config
 */

// This will contain all of our lines
paint = []

// Controles de las brocha
let easycam;
let state;

let escorzo;
let points;
let record;

let dx;
let dy;

let colorPi;
let depth;
let brush;

// This is like pmouseX and pmouseY...but for every finger [pointer, middle, ring, pinky]
let prevPointer = [
  // Left hand
  [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
  // Right hand
  [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]
]

let posPointer = [
  // Left hand
  [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
  // Right hand
  [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]
]

let PrevpointerCopy = prevPointer;

// Landmark indexes for fingertips [pointer, middle, ring, pinky]...these are the same for both hands
let fingertips = [8, 12, 16, 20]

/**
 * Setup
 * - Configure handsfree (set which models, plugins, and gestures you want to use)
 * - Create start/stop buttons. It's nice to always ask user for permission to start webcam :)
 */
function setup () {
  depth = 0;
  record = true;
  sketch = createCanvas(640, 480, WEBGL);

  colorPi = createColorPicker('#ed225d');
  colorPi.position(width - 70, 40);
  
  dx = sketch.width/2;
  dy = sketch.height / 2;
  points = []  
  
  // Colors for each fingertip
  colorMap = [
    // Left fingertips
    [color(0, 0, 0), color(255, 0, 255), color(0, 0, 255), color(255, 255, 255)],
    // Right fingertips
    [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0)]
  ]
  
  // #1 Turn on some models (hand tracking) and the show debugger
  // @see https://handsfree.js.org/#quickstart-workflow
  handsfree = new Handsfree({
    showDebug: true, // Comment this out to hide the default webcam feed with landmarks
    hands: true
  })
  handsfree.enablePlugins('browser')
  handsfree.plugin.pinchScroll.disable()
  
  // Add webcam buttons under the canvas
  // Handsfree.js comes with a bunch of classes to simplify hiding/showing things when things are loading
  // @see https://handsfree.js.org/ref/util/classes.html#started-loading-and-stopped-states
  buttonStart = createButton('Start Webcam')
  buttonStart.class('handsfree-show-when-stopped')
  buttonStart.class('handsfree-hide-when-loading')
  buttonStart.mousePressed(() => handsfree.start())

  // Create a "loading..." button
  buttonLoading = createButton('...loading...')
  buttonLoading.class('handsfree-show-when-loading')

  // Create a stop button
  buttonStop = createButton('Stop Webcam')
  buttonStop.class('handsfree-show-when-started')
  buttonStop.mousePressed(() => handsfree.stop())

  // easycam stuff
  let state = {
    distance: 250,           // scalar
    center: [0, 0, 0],       // vector
    rotation: [0, 0, 0, 1],  // quaternion
  };
  easycam = createEasyCam();
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  escorzo = true;
  perspective();

  brush = sphereBrush;
}

/**
 * Main draw loop
 */
function draw () {
  background(0)
  fingerPaint()
  mousePaint()
  drawHands()

  update();
  background(120);
  push();
  strokeWeight(0.8);
  stroke('magenta');
  grid({ dotted: false });
  pop();
  axes();
  
  for (const point of points) {
    push();
    translate(point.worldPosition);
    brush(point);
    pop();
  }

  // Revisar la rotacion en x y y ,
  handsfree.on('finger-pinched-0-0', () => {
    // Display the x and y of the right pinky
    if(handsfree.data.hands.curPinch[0][0].x != posPointer[0][0].x || handsfree.data.hands.curPinch[0][0].y != posPointer[0][0].y){
      if(handsfree.data.hands.curPinch[0][0].x   > posPointer[0][0].x){
        easycam.rotateY(0.1);
        //console.log("derecha");
      }if(handsfree.data.hands.curPinch[0][0].x  < posPointer[0][0].x){
        easycam.rotateY(-0.1);
        //console.log("izquierda");
      }if(handsfree.data.hands.curPinch[0][0].y  >  posPointer[0][0].y){
        easycam.rotateX(0.1);
        //console.log("arriba");
      }if(handsfree.data.hands.curPinch[0][0].y   < posPointer[0][0].y){
        easycam.rotateX(-0.1);
        //console.log("abajo");
      } 
    }
    posPointer[0][0].x = handsfree.data.hands.curPinch[0][0].x;
    posPointer[0][0].y = handsfree.data.hands.curPinch[0][0].y;
  })

 // revisar la rotacion en z
  handsfree.on('finger-pinched-0-1', () => {
    // Display the x and y of the right pinky
    if(handsfree.data.hands.curPinch[0][1].y != posPointer[0][1].y){
      if(handsfree.data.hands.curPinch[0][1].y > posPointer[0][1].y){
        easycam.zoom(15);
        //console.log("arriba");
      }if(handsfree.data.hands.curPinch[0][1].y < posPointer[0][1].y){
        easycam.zoom(-15);
        //console.log("abajo");
      } 
    }
    posPointer[0][1].y = handsfree.data.hands.curPinch[0][1].y;
  })
}

function update() {

  speed = constrain((dx + dy) / (2 * (width - height)), 0, 1);

  // Dibujar con un color
  handsfree.on('finger-pinched-1-0', () => {
    // Display the x and y of the right pinky
    if(handsfree.data.hands.curPinch[1][0].x != posPointer[1][0].x || handsfree.data.hands.curPinch[1][0].y != posPointer[1][0].y){
      if(handsfree.data.hands.curPinch[1][0].x   > posPointer[1][0].x){
        dx -= 10 ; 
      }if(handsfree.data.hands.curPinch[1][0].x  < posPointer[1][0].x){
        dx += 10 ;
      }if(handsfree.data.hands.curPinch[1][0].y  >  posPointer[1][0].y){
        dy += 10 ;
      }if(handsfree.data.hands.curPinch[1][0].y   < posPointer[1][0].y){
        dy -= 10;
      } 
    }
    console.log(dx, "  ", dy, " ", depth);
    posPointer[1][0].x = handsfree.data.hands.curPinch[1][0].x;
    posPointer[1][0].y = handsfree.data.hands.curPinch[1][0].y;
  })

  if(handsfree.data.hands && handsfree.data.hands.pinchState){
    console.log("esta con estados");
    if (handsfree.data.hands.pinchState[0][2] == 'held') {
      console.log("esta grabando");
            points.push({
        worldPosition: treeLocation([dx, dy, 0.5], { from: 'SCREEN', to: 'WORLD' }),
        color: colorPi.color(),
        speed: speed
      });
    }
  }
}

/**
 * #2 Finger paint
 * Since p5.js already has it's own loop, we just check the data directly
 * @see https://handsfree.js.org/ref/plugin/pinchers.html
 */
// Whenever we pinch and move we'll store those points as a set of [x1, y1, handIndex, fingerIndex, size]
function fingerPaint () {
  let bounds = document.querySelector('canvas').getClientRects()[0]
  const hands = handsfree.data?.hands

  if (hands?.pinchState) {
    hands.pinchState.forEach((hand, handIndex) => {
      hand.forEach((state, finger) => {
        if (hands.landmarks?.[handIndex]?.[fingertips[finger]]) {
          let x = sketch.width - hands.landmarks[handIndex][fingertips[finger]].x * sketch.width
          let y = hands.landmarks[handIndex][fingertips[finger]].y * sketch.height

          // Start line on the spot that we pinched
          if (state === 'start') {
            prevPointer[handIndex][finger] = {x, y}

          // Add a line to the paint array
          } else if (state === 'held') {
            paint.push([
              prevPointer[handIndex][finger].x,
              prevPointer[handIndex][finger].y,
              x,
              y,
              colorMap[handIndex][finger]
            ])
          }

          // Set the last position
          prevPointer[handIndex][finger] = {x, y}          
        }
      })
    })  
  } 

  // Clear everything if the left [0] pinky [3] is pinched
  if (hands?.pinchState && hands.pinchState[0][3] === 'released') {
    paint = []
  }
  
  // Draw Paint
  paint.forEach(p => {
    push()
    fill(255)
    stroke(p[4])
    strokeWeight(10)
    line(p[0], p[1], p[2], p[3])
    pop();
  })
}

/**
 * Draw the mouse
 */
function mousePaint () {
  if (mouseIsPressed === true) {
    fill(colorMap[1][0])
    stroke(colorMap[1][0])
    strokeWeight(10)
    line(mouseX, mouseY, 0  , pmouseX, pmouseY, 0)
  }
}

/**
 * #3 Draw the hands into the P5 canvas
 * @see https://handsfree.js.org/ref/model/hands.html#data
 */
function drawHands () {
  const hands = handsfree.data?.hands
  
  // Bail if we don't have anything to draw
  if (!hands?.landmarks) return
  
  // Draw keypoints
  hands.landmarks.forEach((hand, handIndex) => {
    hand.forEach((landmark, landmarkIndex) => {
      // Set color
      // @see https://handsfree.js.org/ref/model/hands.html#data
      if (colorMap[handIndex]) {
        switch (landmarkIndex) {
          case 8: fill(colorMap[handIndex][0]); break
          case 12: fill(colorMap[handIndex][1]); break
          case 16: fill(colorMap[handIndex][2]); break
          case 20: fill(colorMap[handIndex][3]); break
          default:
            fill(color(255, 255, 255))
        }                
      }
      // Set stroke
      if (handIndex === 0 && landmarkIndex === 8) {
        stroke(color(255, 255, 255))
        strokeWeight(5)
        circleSize = 40
      } else {
        stroke(color(0, 0, 0))
        strokeWeight(0)
        circleSize = 10
      }
      
      circle(
        // Flip horizontally
        sketch.width - landmark.x * sketch.width,
        landmark.y * sketch.height,
        circleSize
      )
    })
  })
}

function sphereBrush(point) {
  push();
  noStroke();
  // TODO parameterize sphere radius and / or
  // alpha channel according to gesture speed
  fill(point.color);
  sphere(1);
  pop();
}
```
{{< /details >}}
{{< p5-iframe sketch="/project/sketches/Combinado.js" src="https://unpkg.com/handsfree@8.4.2/build/lib/assets/handsfree.css" lib2="https://unpkg.com/handsfree@8.4.2/build/lib/handsfree.js" lib3="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" lib4="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

## Conclusiones y trabajo futuro
Como se observa se puede mover el mundo con ayuda de la mano izquierda, gracias a la librería Handsfree.js la cual es capaz de detectar la posición de los dedos y simular la profundidad con la cámara web. Al ejecutar la cámara en la página web esta consume muchos recursos de la CPU ya que hace software rendering en la pintura en 3D, y por otro lado, este tiene algunos problemas al reconocer los gestos, pero se ha podido dibujar y manipular el mundo.

Para trabajos futuros se espera que se puedan hacer dibujos más fácilmente y con diferentes texturas, además que se pueda optimizar el algoritmo o la manera de interpretar los gestos para un manejo más fácil del mundo y también una manera más dinámica para dibujar, este es un tema apasionante y también con un gran futuro por delante ya que pueden existir varios usos importantes en todas las ramas del conocimiento en las que se puedan aplicar este tipo de algoritmos.


## Recursos

- colaboradores de Wikipedia. (2022, 26 febrero). Ray casting. Wikipedia, la enciclopedia libre. https://es.wikipedia.org/wiki/Ray_castingnpm: handsfree. (2021, 28 agosto). 

- Npm. https://www.npmjs.com/package/handsfree

- Wikipedia contributors. (2022, 10 mayo). Ray casting. Wikipedia. https://en.wikipedia.org/wiki/Ray_casting#History_of_ray_casting
