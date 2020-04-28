let awsmShader;

let video;

function preload(){
  awsmShader = loadShader('effect.vert', 'effect.frag');
  video = createVideo('assets/gameplay.webm');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  
  video.elt.muted = true;
  video.autoplay(true);
  video.loop();
  video.get();
  video.hide();
}

function draw() {
  shader(awsmShader);
  awsmShader.setUniform('sampler0', video);
  awsmShader.setUniform('time', frameCount * 0.01);
  
  awsmShader.setUniform('amount', 0.2);

  rect(0, 0, width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
