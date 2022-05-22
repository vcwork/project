// Goal in the 3d Brush is double, to implement:
// 1. a gesture parser to deal with depth, i.e.,
// replace the depth slider with something really
// meaningful. You may use a 3d sensor hardware
// such as: https://en.wikipedia.org/wiki/Leap_Motion
// or machine learning software to parse hand (or
// body) gestures from a (video) / image, such as:
// https://ml5js.org/
// 2. other brushes to stylize the 3d brush, taking
// into account its shape and alpha channel, gesture
// speed, etc.

// Brush controls
let color;
let depth;
let brush;

let easycam;
let state;

let escorzo;
let points;
let record;

// This will contain all of our lines
paint = []

// This is like pmouseX and pmouseY...but for every finger [pointer, middle, ring, pinky]
let prevPointer = [
  // Left hand
  [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
  // Right hand
  [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]
]

// Landmark indexes for fingertips [pointer, middle, ring, pinky]...these are the same for both hands
let fingertips = [8, 12, 16, 20]



function setup() {
  sketch = createCanvas(640, 480, WEBGL);

    // Colors for each fingertip
  colorMap = [
    // Left fingertips
    [color(0, 0, 0), color(255, 0, 255), color(0, 0, 255), color(255, 255, 255)],
    // Right fingertips
    [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0)]
  ]

  handsfree = new Handsfree({
    showDebug: true, // Comment this out to hide the default webcam feed with landmarks
    hands: true
  })
  handsfree.enablePlugins('browser')
  handsfree.plugin.pinchScroll.disable()

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

  // brush stuff
  points = [];
  depth = createSlider(0, 1, 0.05, 0.05);
  depth.position(10, 10);
  depth.style('width', '580px');
  color = createColorPicker('#ed225d');
  color.position(width - 70, 40);
  // select initial brush
  brush = sphereBrush;
}

function draw() {
  
  // Esto del otro codigo
  fingerPaint();
  drawHands();
  
  
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
}

 // Esto es del codigo de las manos


function fingerPaint(){
  let bounds = document.querySelector('canvas').getClientRects()[0]
  const hands = handsfree.data?.hands
  if (hands?.pinchState) {
    hands.pinchState.forEach((hand, handIndex) => {
      hand.forEach((state, finger) => {
        if (hands.landmarks?.[handIndex]?.[fingertips[finger]]) {
          let x = sketch.width - hands.landmarks[handIndex][fingertips[finger]].x * sketch.width
          let y = hands.landmarks[handIndex][fingertips[finger]].y * sketch.height

          if (state === 'start') {
            prevPointer[handIndex][finger] = {x, y}

          } else if (state === 'held') {
            paint.push([
              prevPointer[handIndex][finger].x,
              prevPointer[handIndex][finger].y,
              x,
              y,
              colorMap[handIndex][finger]
            ])
          }
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
    fill(p[4])
    stroke(p[4])
    strokeWeight(10)

    line(p[0], p[1], p[2], p[3])
  }) 
}



function drawHands () {
    const hands = handsfree.data?.hands
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



function update() {
  let dx = abs(mouseX - pmouseX);
  let dy = abs(mouseY - pmouseY);
  speed = constrain((dx + dy) / (2 * (width - height)), 0, 1);
  
  if (record) {
    points.push({
      worldPosition: treeLocation([mouseX, mouseY, depth.value()], { from: 'SCREEN', to: 'WORLD' }),
      color: color.color(),
      speed: speed
    });
  }
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

function keyPressed() {
    if(keyCode === LEFT_ARROW) {
        easycam.rotateY(0.1);
        console.log("Flechita");
    }

  if (key === 'r') {
    record = !record;
  }
  if (key === 'p') {
    escorzo = !escorzo;
    escorzo ? perspective() : ortho();
  }
  if (key == 'c') {
    points = [];
  }
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}