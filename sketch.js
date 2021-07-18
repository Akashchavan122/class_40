var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;

function preload(){
  //load the images 
  track = loadImage("images/track.jpg");
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  car4_img = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
}

function setup(){
  //create the canvas 
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  //declare the variable 
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  //the game will start once the count reaches 4
  if(playerCount === 4){
    game.update(1);
  }
  //the game will start and the first page will disappear 
  if(gameState === 1){
    clear();
    game.play();
  }
  //the game will end once reaches the specified value 
  if(gameState === 2){
    game.end();
  }
}
