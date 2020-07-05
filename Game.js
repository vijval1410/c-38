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
    
    for(var y=140;y<540;y=y+100){
      for (var i=1000;i<3900;i=i+250){
        hurdles.push( new Hurdle(i,y))}
       
       }
       for (var i=0;i<hurdles.length;i++){
         hurdles[i].display();
       }


    plr1 = createSprite(100,100,20,50);
    plr1.addImage(playerImg);
    plr1.scale=0.3;
    if (plr1.y<100){
      plr1.y=plr1.y+9.5;
    }
    

    plr2 = createSprite(100,250,20,50);
    plr2.scale=0.3;
    plr2.addImage(playerImg);
    if (plr2.y<200){
      plr2.y=plr2.y+9.5;
    }

    plr3 = createSprite(100,275,20,50);
    plr3.addImage(playerImg);
    plr3.scale=0.3;
    if (plr3.y<300){
      plr3.y=plr3.y+9.5;
    }

    plr4 = createSprite(100,400,20,50);
    plr4.addImage(playerImg);
    plr4.scale=0.3;
    if (plr4.y<400){
      plr4.y=plr4.y+9.5;
    }

    plrs = [plr1, plr2, plr3, plr4];

  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(trackImg)
     
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y= 50;
      
     


      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 100;
        //use data form the database to display the cars in y direction
        x = displayHeight + allPlayers[plr].distance;
        plrs[index-1].x = x;
        plrs[index-1].y = y;

        



        if (index === player.index){
          fill("red")
          ellipse(x,y,50);
          plrs[index - 1].shapeColor = "red";

          camera.position.x=displayHeight+allPlayers[plr].distance;
       camera.position.y=y;
   
       if (keyIsDown(32)&&y>=99.5){
        plrs[index - 1].y=plrs[index - 1].y-50;
       }
        }
      
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
      
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10;
      player.update();
    }
    
    if (player.distance>3900){
      gameState=2;
    }
    }

    

    drawSprites();
  }
  end(){
    console.log("game ended");
    game.update(2);
    
  }
}
