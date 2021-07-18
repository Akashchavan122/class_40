class Form {

  constructor() {
    //loaded the input button
   this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset=createButton("reset");
  }
  //hide the components 
  hide(){
    
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    //displayed the elements
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 50, 0);

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.reset.position(displayWidth-100,20);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
2
//display the mouse the button
    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      //update the player count in database
      player.update();
      player.updateCount(playerCount);
      //greet the player along with their name 
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });
    //reset the values in database
this.reset.mousePressed(()=>{
  player.updateCount(0);
  game.update(0);
})
  }
}
