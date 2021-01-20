var bgImage
var stance
var running,Ninja
var jumping,falling
var o1,o2,o3,o4
var c1,c2,c3,c4,c5
var gameState = "start"
var playButton
var gameOverButton
var restartButton
var score = 0

function preload() {
  bgImage = loadImage("Cut Images/Backgrounds/Grasses.jpg");
  stance = loadAnimation("Cut Images/Stance/ST1.png","Cut Images/Stance/ST2.png","Cut Images/Stance/ST3.png","Cut Images/Stance/ST4.png","Cut Images/Stance/ST5.png");
  running = loadAnimation("Cut Images/Running/R1.png","Cut Images/Running/R2.png","Cut Images/Running/R3.png","Cut Images/Running/R4.png","Cut Images/Running/R5.png","Cut Images/Running/R6.png","Cut Images/Running/R7.png");
  jumping = loadAnimation("Cut Images/Jumping/J1.png","Cut Images/Jumping/J2.png","Cut Images/Jumping/J3.png","Cut Images/Jumping/J4.png","Cut Images/Jumping/J5.png","Cut Images/Jumping/J6.png","Cut Images/Jumping/J7.png","Cut Images/Jumping/J8.png","Cut Images/Jumping/J9.png");
  falling = loadAnimation("Cut Images/Falling/F4.png");
  o1 = loadImage("Cut Images/Obstacles/O1.png");
  o2 = loadImage("Cut Images/Obstacles/O2.png");
  o3 = loadImage("Cut Images/Obstacles/O3.png");
  o4 = loadImage("Cut Images/Obstacles/O4.png");
  c1 = loadImage("Cut Images/Clouds/C1.png")
  c2 = loadImage("Cut Images/Clouds/C2.png");
  c3 = loadImage("Cut Images/Clouds/C3.png");
  c4 = loadImage("Cut Images/Clouds/C4.png");
  c5 = loadImage("Cut Images/Clouds/C5.png");
  playButton = loadImage("Cut Images/Backgrounds/play-removebg-preview.png");
  gameOverButton = loadImage("Cut Images/Buttons/Game_over.png");
  restartButton = loadImage("Cut Images/Buttons/restart.png");
}  
function setup() {
  createCanvas(1366,400);
  bg = createSprite(0,0,1366,20);
  bg.addImage(bgImage);
  bg.x = bg.width/2
  bg.velocityX = -3
  bg.scale = 5;
  ground = createSprite(683,330,1366,20);
  ground.visible = false;
  cloudsGroup = new Group()
  obstaclesGroup = new Group()
  play = createSprite(width/2,height/2);
  play.addImage(playButton);
  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverButton);
  restart = createSprite(width/2,height/4);
  restart.addImage(restartButton);
  
  Ninja = createSprite(100, 276, 50, 50);
  Ninja.addAnimation("running",running);
  Ninja.addAnimation("stance",stance);
  Ninja.addAnimation("jumping",jumping);
  Ninja.addAnimation("falling",falling);
  //Ninja.debug = true;
  
}
function draw() {
  background(0);
  
 if (gameState === "start") {

  gameOver.visible = false;
  restart.visible = false;

   Ninja.changeAnimation("stance");

   bg.velocityX = 0;

   score = 0

   if(mousePressedOver(play)){

    gameState = "play";
   
    Ninja.changeAnimation("running");

  }

  }  
  else if(gameState === "play") {
    
    play.visible = false;
    gameOver.visible = false;
    restart.visible = false;
      
    score = score + Math.round(getFrameRate()/60)
    
    if(bg.x < 0 ){
      bg.x = bg.width/2
    }  
  
    if(keyWentDown ("SPACE")){
  
      Ninja.velocityY = -17;
      Ninja.changeAnimation("jumping");
    }
    if(keyWentUp ("SPACE")){
  
      Ninja.changeAnimation("running");
    }
    Ninja.velocityY = Ninja.velocityY + 0.8;
  
    if(obstaclesGroup.isTouching(Ninja)){

      Ninja.changeAnimation("falling");
      gameState = "end";
    }
    spawnClouds();
    spawnObstacles();

  }
  else if(gameState === "end") {

    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    Ninja.changeImage("falling");

    gameOver.addImage(gameOverButton);
    restart.addImage(restartButton);

    gameOver.visible = true;
    restart.visible = true;

    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);   
    
       if(mousePressedOver(restart)){

    gameState = "start";
   
    Ninja.changeAnimation("stance");
   
    play.visible = true;

    cloudsGroup.destroyEach();
    obstaclesGroup.destroyEach();
 }
}
  
  Ninja.collide(ground);
  drawSprites();

  textSize(20);
  fill("Red");
  text("Score :"+ score,1200,50);
}
function spawnClouds() {

  if (frameCount % 90 === 0) {
  var cloud = createSprite(1366,120,40,10);
  cloud.y = Math.round(random(50,120));
  var rand = Math.round(random(1,5));
  switch(rand) {
    case 1: cloud.addImage(c1);
            break;
    case 2: cloud.addImage(c2);
            break;
    case 3: cloud.addImage(c3);
            break;
    case 4: cloud.addImage(c4);
            break;
    case 5: cloud.addImage(c5);
            break;
    default: break;
  }

  cloud.scale = 0.5;
  cloud.velocityX = -7;
  
  cloud.lifetime = 460;
    
  cloudsGroup.add(cloud);

  cloud.depth = Ninja.depth;
  Ninja.depth = Ninja.depth + 1;
  cloud.depth = restart.depth;
  restart.depth = restart.depth + 1;
}
}

function spawnObstacles() {

  if (frameCount % 150 === 0) {
  var obstacle = createSprite(1366,300,40,10);
  var rand = Math.round(random(1,5));
  switch(rand) {
    case 1: obstacle.addImage(o1);
            break;
    case 2: obstacle.addImage(o2);
            break;
    case 3: obstacle.addImage(o3);
            break;
    case 4: obstacle.addImage(o4);
            break;
    default: break;
  }

  obstacle.scale = 0.4;
  obstacle.velocityX = -8;
  
  obstacle.lifetime = 460;
  
//  obstacle.debug = true;

  obstaclesGroup.add(obstacle);
}
}

