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