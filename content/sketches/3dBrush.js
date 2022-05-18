// Goal in the 3d Brush is double, to implement:
// 1. a gesture parser to deal with depth, i.e.,
// replace the depth slider with somehing really
// meaningful. You may use a 3d sensor hardware
// such as: https://en.wikipedia.org/wiki/Leap_Motion
// or machine learning software to parse hand (or
// body) gestures from a (video) / image, such as:
// https://ml5js.org/
// 2. other brushes to stylize the 3d brush, taking
// into account its shape and alpha channler, gesture
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


// De la funcion de agregar la camara
var handposeModel = null; // this will be loaded with the handpose model
                          // WARNING: do NOT call it 'model', because p5 already has something called 'model'

var videoDataLoaded = false; // is webcam capture ready?

var statusText = "Loading handpose model...";

var myHands = []; // hands detected by mediapipe
                  // currently handpose only supports single hand, so this will be either empty or singleton

var capture; // webcam capture, managed by p5.js



// Load the MediaPipe handpose model assets.
handpose.load().then(function(_model){
  console.log("model initialized.")
  statusText = "Model loaded."
  handposeModel = _model;
})
/// / / / / / / / // 


function setup() {
  createCanvas(750, 750, WEBGL);

  // captura de video
  capture = createCapture(VIDEO);
  capture.elt.onloadeddata = function(){
    console.log("video initialized");
    videoDataLoaded = true;
  }


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

   capture.hide();

}


function hand(hands, noKeypoints){
  
  // Each hand object contains a `landmarks` property,
  // which is an array of 21 3-D landmarks.
  for (var i = 0; i < hands.length; i++){

    var landmarks = hands[i].landmarks;
    //console.log(landmarks[8]);

    var palms = [0,1,2,5,9,13,17] //landmark indices that represent the palm

    for (var j = 0; j < landmarks.length; j++){
      var [x,y,z] = landmarks[j]; // coordinate in 3D space
      

      // draw the keypoint and number
      if (!noKeypoints){
        rect(x-2,y-2,4,4);
        text(j,x,y);
      }
        
      // draw the skeleton
      var isPalm = palms.indexOf(j); // is it a palm landmark or finger landmark?
      var next; // who to connect with?
      if (isPalm == -1){ // connect with previous finger landmark if it's a finger landmark
        next = landmarks[j-1];
      }else{ // connect with next palm landmark if it's a palm landmark
        next = landmarks[palms[(isPalm+1)%palms.length]];
      }
      line(x,y, next[0], next[1]);
    }

  }
  return landmarks
}

function draw() {
  if (handposeModel && videoDataLoaded){ // model and video both loaded, 
    
    handposeModel.estimateHands(capture.elt).then(function(_hands){
      // we're handling an async promise
      // best to avoid drawing something here! it might produce weird results due to racing
      
      myHands = _hands; // update the global myHands object with the detected hands
      if (!myHands.length){
        // haven't found any hands
        statusText = "Show some hands!"
      }else{
        // display the confidence, to 3 decimal places
        statusText = "Confidence: "+ (Math.round(myHands[0].handInViewConfidence*1000)/1000);
        
      }
      
    })
  }

  lands = hand(myHands,true);

  update(lands);
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

function update(lands) {
  //console.log(mouseY);
  let dx = abs(mouseX - pmouseX);
  let dy = abs(mouseY - pmouseY);
  speed = constrain((dx + dy) / (2 * (width - height)), 0, 1);
  if(lands != null){
    console.log("Lee de las manos");
    if (record) {
      points.push({
        worldPosition: treeLocation([lands[0][0], lands[0][1], lands[0][2]], { from: 'SCREEN', to: 'WORLD' }),
        color: color.color(),
        speed: speed
      });
    }
  }
  else{
    if (record) {
      console.log("Lee del mouse")
      points.push({
        worldPosition: treeLocation([mouseX, mouseY,depth.value() ], { from: 'SCREEN', to: 'WORLD' }),
        color: color.color(),
        speed: speed
      });
    }
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