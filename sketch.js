var mySong, myPhrase, myPart, myImage;
var analyzer;
var volume;
var freq;
var drum, bass, guitar, efx1, efx2;
var drum_pattern = [0,0,0,0,0,0,0,0];
var bass_pattern = [0,0,0,0,0,0,0,0];
var guitar_pattern = [0,0,0,0,0,0,0,0];
var efx1_pattern = [0,0,0,0,0,0,0,0];
var efx2_pattern = [0,0,0,0,0,0,0,0];
var selector1 = [];
var selector2 = [];
var selector3 = [];
var selector4 = [];
var selector5 = [];
var n=0;
var temp;
var ar;
var control=0;
var tempi = 8;
var slider;
var slider2;
var star_stop;
var recorder;
var file;
var light;
var mic;
var audioCtx;
var myImage2;
var myFont;






function preload(){

  drum = loadSound("./assets/Juno_Kick03.wav");
  bass = loadSound("./assets/CrackleBox_BassSynth_16.wav");
  guitar = loadSound("./assets/MBase01_MoogRingMod_04.wav");
  efx1 = loadSound("./assets/Vermona_Clap_01.wav");
  efx2 = loadSound("./assets/MBase01_Clean05.wav");
  myImage = loadImage("./assets/leather.jpg");
  myImage2 = loadImage("./assets/sfondo.jpg");
  myFont = loadFont('./assets/Avenir.otf');
}

function setup() {
  audioCtx = new AudioContext();
  audioCtx.suspend()
  var cnv = createCanvas(windowWidth,windowHeight);
  analyzer = new p5.FFT();
  volume = new p5.Amplitude();
  myPart = new p5.Part();
  recorder = new p5.SoundRecorder();
  file = new p5.SoundFile();
  light=myImage2;
  textFont(myFont);









  n=width/70/2;

  frameRate(10);

  var drumPhrase = new p5.Phrase('box', drumf, drum_pattern);
  var bassPhrase = new p5.Phrase('drum', bassf, bass_pattern);
  var guitarPhrase = new p5.Phrase('guitar', guitarf, guitar_pattern);
  var efx1Phrase = new p5.Phrase('efx1', efx1f, efx1_pattern);
  var efx2Phrase = new p5.Phrase('efx2', efx2f, efx2_pattern);




  myPart.addPhrase(drumPhrase);
  myPart.addPhrase(bassPhrase);
  myPart.addPhrase(guitarPhrase);
  myPart.addPhrase(efx1Phrase);
  myPart.addPhrase(efx2Phrase);


  myPart.setBPM(60);


  masterVolume(0.3);

  strokeWeight(0)


  for (var i = 0; i < tempi; i++) {
    selector1[i] = new Balls(0);
    selector1[i].coordinate();

  }
  n=width/70/2;

  for (var i = 0; i < tempi; i++) {
    selector2[i] = new Balls(50);
    selector2[i].coordinate();
  }
  n=width/70/2;
  for (var i = 0; i < tempi; i++) {
    selector3[i] = new Balls(100);
    selector3[i].coordinate();

  }
  n=width/70/2;
  for (var i = 0; i < tempi; i++) {
    selector4[i] = new Balls(150);
    selector4[i].coordinate();

  }
  n=width/70/2;
  for (var i = 0; i < tempi; i++) {
    selector5[i] = new Balls(200);
    selector5[i].coordinate();

  }



  slider = createSlider(0, 10, 0);
  slider.position(width/6-slider.width/2,height/4+100)
  slider2 = createSlider(0, 10, 3);
  slider2.position(width-width/6-slider.width/2,height/4+100)
  slider3 = createSlider(60, 120, 60);
  slider3.position(width/2-slider.width/2,height/4+100)



}

function draw() {

  background(light);
  var spectrum = analyzer.analyze();
  rectMode(CORNER)

  fill(0,0,0,150)


  strokeWeight(1)


  //RETTANGOLI DI SFONDO
  rect(0,0,width/3,height/2);


  rect(0,height/2,width/3,height/2/3)
  push();
  fill(200,0,0)
  rect(0,height/2+height/2/3,width/3,height/2/3)
  pop();
  rect(0,height/2+height/3,width/3,height/2/3)




  rect(width/3,0,width/3,height/2);
  rect(width/3,height/2,width/3,height/2);

  rect(width-width/3,0,width/3,height/2);


  rect(width-width/3,height/2+height/2/3,width/3,height/2/3)
  push();
  fill(200,0,0)
  rect(width-width/3,height/2,width/3,height/2/3)
  rect(width-width/3,height/2+height/3,width/3,height/2/3)
  pop();

  // image(myImage, width/3,height/2,width/3,height/2);
  // myImage.filter(BLUR, 10)


  textSize(32);
  noStroke();
  textAlign(CENTER,CENTER)
  fill(200,0,0)
  text('R to record', 0, height/2, width/3, height/2/3);
  text('D to download', 0, height/2+height/3, width/3, height/2/3);
  text('NOTE PITCH', 0, height/64, width/3, height/2/3);
  text('VOLUME', width-width/3, height/64, width/3, height/2/3);
  text('BPM', width/2-width/3/2, height/64, width/3, height/2/3);
  push();
  textSize(20)
  text('click to add a note, and then play', width/2-width/3/2, height-height/7, width/3, height/2/3);
  pop();
  push();
  textSize(100);
  text(" "+slider3.value(), width/3, height/6, width/3, height/2/3);
  pop();

  //text('', width-width/3,height/2+height/2/3, width/3, height/2/3);
  fill(18)
  text('S to stop', 0, height/2+height/2/3, width/3, height/2/3);

  text('ENTER to play', width-width/3,height/2, width/3, height/2/3);
  text('DELETE to stop', width-width/3,height/2+height/3, width/3, height/2/3);


  rectMode(CENTER);




  //PALLINI
  for (var i = 0; i < tempi; i++) {
    ar = drum_pattern;
    selector1[i].display();
    temp=i;

    selector1[i].click(mouseX, mouseY);

  }
  for (var i = 0; i < tempi; i++) {

    selector2[i].display();
    temp=i;
    ar = bass_pattern;
    selector2[i].click(mouseX, mouseY);

  }
  for (var i = 0; i < tempi; i++) {

    selector3[i].display();
    temp=i;
    ar = guitar_pattern;
    selector3[i].click(mouseX, mouseY);

  }
  for (var i = 0; i < tempi; i++) {

    selector4[i].display();
    temp=i;
    ar = efx1_pattern;
    selector4[i].click(mouseX, mouseY);

  }
  for (var i = 0; i < tempi; i++) {

    selector5[i].display();
    temp=i;
    ar = efx2_pattern;
    selector5[i].click(mouseX, mouseY);

  }


  //SFERA IN ALTO A SINISTRA

  var volume_level = volume.getLevel();
  var waveform = analyzer.waveform();
  strokeWeight(1);
  beginShape();
  noFill()
  stroke("red")
  for (var i = 0; i < 360; i++) {
    var x = map(cos(i), 0, 1, 50+waveform[i], 50*waveform[i])
    var y = map(sin(i), 0, 1, 50+waveform[i], 50*waveform[i])
    vertex(x+width/6-50,y+height/4-50)

  }
  endShape();



  //SFERA IN ALTO A DESTRA
  beginShape();
  noFill()

  stroke("red")
  for (var i = 0; i < 360; i++) {
    var x = map(cos(i), 0, 1, 50, 100*-volume_level)
    var y = map(sin(i), 0, 1, 50, 100*-volume_level)
    vertex(width-x-width/6+50,y+height/4-50)
  }
  endShape();


  // beginShape();
  // noFill()
  //
  // stroke("red")
  // for (var i = 0; i < 360; i++) {
  //   var x = map(cos(i), 0, 1, 50, 100*-volume_level)
  //   var y = map(sin(i), 0, 1, 50, 100*-volume_level)
  //   vertex(x+width/2-50,y+height/4-50)
  // }
  // endShape();

  myPart.setBPM(slider3.value())
  masterVolume(slider2.value()/10)





}





function Balls(y){



  this.coordinate = function(){



  this.x = width/2-width/70*7.5+n;
  n+=width/70*2;
  this.y = height/2+height/10+y;
  this.col = color("red")




  }
  this.display = function(){
    rectMode(CENTER, CENTER)
    fill(this.col)
    strokeWeight(0)

    rect(this.x, this.y, width/70,height/45)
  }

  this.ledtime = function(){
    for (var i = 0; i < tempi; i++) {
      selector5[i]


    }
  }
  this.click = function(){
    if (mouseIsPressed) {
      var d = dist(mouseX, mouseY, this.x, this.y)
      if (d < 10) {
        if (ar[temp]>0 && control == 0) {
          this.col = color(255,0,0);
          ar[temp]=0;
          control = 1;
        }else if (ar[temp]==0 && control == 0) {
          this.col = color(255);
          ar[temp]=1+slider.value()
          control = 1;
        }
      }

    }



}
}

function keyPressed(){
  if (keyCode===13) {
    audioCtx.resume()
    myPart.loop();
    start_stop=0;
  }else if (keyCode===8) {
    myPart.stop();
    start_stop=1;
  }


  if (key==="r") {
    audioCtx.resume();
    //recorder.setInput(mic)
    recorder.record(file);
    // light="#381d1d"
    light = myImage;
  }
   if (key==="s") {
    recorder.stop();
    light = myImage2;
  }
   if (key==="d") {
    save(file, 'beat');
  }
}


function mouseReleased(){
  control = 0;
}

function drumf(time, playbackRate) {
  drum.rate(playbackRate);
  drum.play(time);
}
function bassf(time, playbackRate) {
  bass.rate(playbackRate);
  bass.play(time);
}
function guitarf(time, playbackRate) {
  guitar.rate(playbackRate);
  guitar.play(time);
}
function efx1f(time, playbackRate) {
  efx1.rate(playbackRate);
  efx1.play(time);
}
function efx2f(time, playbackRate) {
  efx2.rate(playbackRate);
  efx2.play(time);
}
