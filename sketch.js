let awsmShader;

let video;

function preload(){
  awsmShader = loadShader('effect.vert', 'effect.frag');
  // video = createVideo('assets/gameplay.webm');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  shader(awsmShader);
  awsmShader.setUniform('time', frameCount * 0.01);
  awsmShader.setUniform('imageSize', [width, height]);
  
  rect(0, 0, width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
