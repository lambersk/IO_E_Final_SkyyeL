/* Code Final Design 
Inspired by:
https://experiments.withgoogle.com/ai/bird-sounds/view/

Ambience Music Source:
https://youtu.be/eLGGUDNf52g

Code references:
- https://editor.p5js.org/son/sketches/rJcVOAI0Q (Posenet by son)
- https://editor.p5js.org/loulli/sketches/sPhbO5_Bf (Body Tracking Color Changing by loulli )

Animated Gif:
- https://static.tumblr.com/cb1bef90995f8c70ff21e8db0f27f6cb/fmc6rxh/Mlgo18amh/tumblr_static_s8ehh1kso2ok0w8g4w088oco.gif
*/


let video;
let poseNet;
let poses = [];
let skeletons = [];
let song;
let song2;
let leafyell;
let leafred;
let leaf2gree;
let leaf2yell;
let leaf3red;
let leaf3gree;
let ambience;
let bg;


var _imgSize = 700;
var _img;
var _ffCount = 100;
var _ff = [];

function preload() {
  createCanvas(displayWidth, displayHeight);
    background(128);
    noStroke();
 
    imgSet();
 
    for (var i=0; i<_ffCount; i++) {
        _ff[i] = new FfObj();
    }
  //Ambience music

  ambience = loadSound("Ambience.mp3");
 // parotia = loadSound("parotia.mp3");
 // nightingale = loadSound("nightingale.mp3");
 // raven = loadSound("raven.mp3");

}

function setup() {
  frameRate(30);
  bg = loadImage('background.png');
  
  createCanvas(650, 742);

  ambience.loop();

  video = createCapture(VIDEO);
  video.size(width, height);

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  //video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  background(bg);
  
      for (var i=0; i<_ffCount; i++) {
        if (!mouseIsPressed) { _ff[i].drawMe();}
        else {_ff[i].drawMe2();}
        _ff[i].updateMe();
    }
  


  leavesFall();
}

//the glowing circles code 

function imgSet() {
    _img = createImage(_imgSize, _imgSize);
    _img.loadPixels();
    for (var i = 0; i < _img.width; i++) {
        for (var j = 0; j < _img.height; j++) {
            var pixAlpha = 255/(dist(_img.width/2, _img.height/2, i, j)-1)*1.47;
            if (pixAlpha < 0.94) { pixAlpha=0; }
            _img.set(i, j, color(255, 255, 250, pixAlpha));
        }
    }
    _img.updatePixels();
}
 
function FfObj() {
    this.pX = random(0-_img.width/2, width-_img.width/2);
    this.pY = random(0-_img.height/2, height-_img.height/2);
    this.noiseX = random()*1000;
    this.noiseY = random()*1000;
    this.noiseScale = random(0.001, 0.02);
}
 
FfObj.prototype.updateMe = function() {
    this.pX += noise(this.noiseX)*4-1.86;
    this.pY += noise(this.noiseY)*4-1.86;
    if (this.pX < 0-_img.width/2) { this.pX = 0-_img.width/2;}
    if (this.pX > width-_img.width/2) { this.pX = width-_img.width/2;}
    if (this.pY < 0-_img.height/2) { this.pY = 0-_img.height/2;}
    if (this.pY > height-_img.height/2) { this.pY = height-_img.height/2;}
    this.noiseX += this.noiseScale;
    this.noiseY += this.noiseScale;
}
 
FfObj.prototype.drawMe = function() {
    image(_img, this.pX, this.pY);
    fill(255, 255, 250, 255);
    ellipse(this.pX+_img.width/2, this.pY+_img.height/2, 2);   
}
 
FfObj.prototype.drawMe2 = function() {
    fill(255, 255, 250, 255);
    ellipse(this.pX+_img.width/2, this.pY+_img.height/2, 6);
}

//the falling leaves code

function leavesFall() {
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {

      //Left Wrist
      let leftWrist = poses[i].pose.keypoints[9];
      if (leftWrist.score > 0.2) {
        push();
        fill(0, 0, 255);
        noStroke();
        bopl.size(50, 50);
        bopl.position(leftWrist.position.x, leftWrist.position.y, 10, 10, 10, 10);
        pop();

        riflebird.rate(map(constrain(leftWrist.position.y, 0, height), height, 0, 0.25, 2));
      }

      //Right Wrist
      let rightWrist = poses[i].pose.keypoints[10];
      if (rightWrist.score > 0.2) {
        push();
        fill(0, 0, 255);
        noStroke();
        bopr.size(50, 50);
        bopr.position(rightWrist.position.x, rightWrist.position.y, 10, 10, 10, 10);
        pop();

        parotia.rate(map(constrain(rightWrist.position.y, 0, height), height, 0, 0.25, 2));

      }


      //Left Shoulder
      let leftShoulder = poses[i].pose.keypoints[5];
      if (leftShoulder.score > 0.2) {
        push();
        fill(0, 0, 255);
        noStroke();
        bl.size(50, 50);
        bl.position(leftShoulder.position.x, leftShoulder.position.y, 10, 10, 10, 10);
        pop();
        
                nightingale.rate(map(constrain(leftShoulder.position.y, 0, height), height, 0, 0.25, 2));
        
      }

      //Right Shoulder
      let rightShoulder = poses[i].pose.keypoints[6];
      if (rightShoulder.score > 0.2) {
        push();
        fill(0, 0, 255);
        noStroke();
        br.size(50, 50);
        br.position(rightShoulder.position.x, rightShoulder.position.y, 10, 10, 10, 10);
        pop();
        
                raven.rate(map(constrain(rightShoulder.position.y, 0, height), height, 0, 0.25, 2));
      }

      //L/R shoulder line
      push();
      stroke(255,255,255,5);
      strokeWeight(5);
      line(leftShoulder.position.x, leftShoulder.position.y, rightShoulder.position.x, rightShoulder.position.y);
      pop();


   

      }
    }
}