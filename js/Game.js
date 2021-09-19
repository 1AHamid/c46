class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,200);
    player1.addImage("player1",player1_img);
    player2 = createSprite(300,200);
    player2.addImage("player2",player2_img);
    player3 = createSprite(500,200);
    player3.addImage("player3",player3_img);
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y = height-50;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 200-allPlayers[plr].distance;
        //use data form the database to display the cars in y direction
        y = 200;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("yellow")
          ellipse(x,y,80)
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance += 10
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance -= 10
      player.update();
    }

    if (frameCount % 20 === 0) {
      obstacles = createSprite(random(100, 1000), 0, 100, 100);
      obstacles.velocityY = 6;
      var rand = Math.round(random(1,2));
      switch(rand){
          case 1: obstacles.addImage("obstacles1",cactus_img);
          break;
          case 2: obstacles.addImage("obstacles2", scorpion_img);
          break;
      }
      obstacleGroup.add(obstacle);
      
  }

    
   
    drawSprites();
  }

  end(){
    
  }
}
