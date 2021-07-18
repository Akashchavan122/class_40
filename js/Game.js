class Game {
  constructor(){

  }

  getState(){
    //construct the game state in database
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    //update the gamestate
    database.ref('/').update({
      gameState: state
    });
  }
//have to wait for decided the players
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      //create form 
      form = new Form()
      form.display();
    }
//create sprite for cars and added the images
    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    //hide the form,component 
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //give the background 
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill ("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          //position of x axis of camera
          camera.position.x = displayWidth/2;
          //position of y axis of camera
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
//controll the sprite with given arrow buttons
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
//when the sprite reaches the end position the game should end 
    if(player.distance > 3860){
      gameState = 2;
    }
   //display the given the code
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
