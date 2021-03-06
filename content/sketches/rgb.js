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