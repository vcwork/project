let lumaShader;
let img;
let grey_scale;
let colorBack;
let r , g, b ;

function preload() {
  lumaShader = readShader('/project/sketches/shaders/mixing.frag', { varyings: Tree.texcoords2});
  // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
  img = loadImage('/project/sketches/fire.jpg');
}

function setup() {
  r = 110;
  g = 0;
  b = 256;
  colorBack = [r,g,b];
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  grey_scale = createCheckbox('luma', false);
  grey_scale.position(10, 10);
  grey_scale.style('color', 'white');
  grey_scale.input(() => lumaShader.setUniform('background', colorBack));
  lumaShader.setUniform('texture', img);
}

function draw() {
  background(r,g,b);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
  r = (r + 1) % 256;
  g = (g + 1) % 256;
  b = (g + 1) % 256;
}