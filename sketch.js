//creating variables
var monkey , monkeyRun , monkey_collided;
var banana , bananaImg , foodGroup;
var obstacle , obstacleImg , obstacleGroup;
var jungle , backImage , ground;
var score = 1;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
//Giving animation and setting images
  backImg = loadImage("jungle.jpg");
  monkeyRun =       loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 400);
  
  ground = createSprite(300,360,600,10);
  ground.visible = false;
  jungle = createSprite(300,200);
  jungle.addImage(backImg);
  jungle.scale = 1.3;
  jungle.x = jungle.width/2;
  jungle.velocityX = -2;
  
  monkey = createSprite(100,250);
  monkey.addAnimation("monkey_running",monkeyRun); 
  monkey.scale = 0.1;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(220);
  
  //reseting the ground
  if (jungle.x < 0){
    jungle.x = jungle.width/2;
  }
  
  monkey.collide(ground);
  
  //sorting code by Game States
    if(gameState === PLAY){
      
      if(keyDown("space") && monkey.y >= 100 ){
      monkey.velocityY = -12 ;
      }
      
      monkey.velocityY += 0.8;

      //increasing the score if monkey touches a banana
    if(monkey.isTouching(foodGroup)){
      score += 2;
      foodGroup.destroyEach();
    }

      //increasing sizeof the monkey after 10,20,30 and 40 points
      switch(score){
      case 10 : monkey.scale = 0.12;
        break;
      case 20 : monkey.scale = 0.14;
        break;
      case 30 : monkey.scale = 0.16;
        break;
      case 40 : monkey.scale = 0.18;
        break;
      default : break;
    }

      //reducing monkey's size
    if(monkey.isTouching(obstacleGroup)){
      monkey.scale = 0.09;
    }

      //setting the gameState to End
    if(monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
  
 else if(gameState === END){
    textSize(25);
    text.depth = foodGroup.depth + 1;
    text("Game Over",225,200);
    textSize(23);
    text("Press 'R' to Restart",150,225);
    
    jungle.velocityX = 0;
    monkey.velocityY = 0;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  if(keyDown("r")){
    reset();
  }
  
  food();
  spawnObstacle();
  
  drawSprites();
  
  //displaying score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score :" + score,500,50);
}

function reset(){
  gameState = PLAY;
  
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
 
  score = 0;
}

function food(){
    if(frameCount % 80 === 0){
    var banana = createSprite(650,Math.round(random(120,200)));
    banana.addImage(bananaImg);
    banana.scale = 0.07;
    banana.velocityX = -8;
    banana.lifetime = 70;
    banana.depth = monkey.depth;
    monkey.depth += 1;
    
    foodGroup.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(650,330);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.3;
    //obstacle.debug = true;
    //obstacle.setCollider("rectangle",0,0,obstacle.width ,obstacle.height);
    obstacle.velocityX = -7;
    obstacle.lifetime = 70;
    
    obstacleGroup.add(obstacle);
  }
}