var score =0;
var gun,duck, goose, bullet, eyeball, backBoard;

var gunImg, duckImg, gooseImg, bulletImg, eyeballImg, blastImg, backBoardImg;

var duckGroup, gooseGroup, eyeballGroup, bulletGroup;


var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("png-clipart-firearm-gun-weapon-uzi-pixel-art-weapon-angle-text cropped.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet.png")
  duckImg = loadImage("duck 1.png")
  gooseImg = loadImage("goose1.png")
  backBoardImg= loadImage("back.jpg") 
  backGroundImg= loadImage("sky.jpg")
  eyeballImg= loadImage("eyeball.png")
  QuackSnd= loadSound("single-quack-from-a-duck-14494.mp3")
  GameOverSnd= loadSound("game-over-arcade-6435.mp3")
  BulletSnd= loadSound("ak-47-firing-8760.mp3")
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  backBoard= createSprite(50, height/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  duckGroup = createGroup();   
  gooseGroup = createGroup();   
  eyeballGroup = createGroup();
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#4FADF5");
  image(backGroundImg, 0, 0, width, height )
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawduck();
    }

    if (frameCount % 90 === 0) {
      drawgoose();
    }
    
    if (frameCount % 100 == 0){
      draweyeball();
    }
    if(keyDown("space")){
      shootBullet();
    }

    if (duckGroup.collide(backBoard)){
      handleGameover(duckGroup);
    }
    
    if (gooseGroup.collide(backBoard)) {
      handleGameover(gooseGroup);
    }
  
    
    if(duckGroup.collide(bulletGroup)){
      handleduckCollision(duckGroup);
    }

    if(gooseGroup.collide(bulletGroup)){
      handlegooseCollision(gooseGroup);
    }

    
    drawSprites();
  
  }

  
  
}

function drawduck(){
  duck = createSprite(800,random(20,780),40,40);
  duck.addImage(duckImg);
  duck.scale = 0.3;
  duck.velocityX = -8;
  duck.lifetime = 400;
  duckGroup.add(duck);
}
function drawgoose(){
  goose = createSprite(800,random(20,780),40,40);
  goose.addImage(gooseImg);
  goose.scale = 0.3;
  goose.velocityX = -8;
  goose.lifetime = 400;
  gooseGroup.add(goose);
}

function draweyeball(){
  eyeball = createSprite(800,random(20,780),40,40);
  eyeball.addImage(eyeballImg);
  eyeball.scale = 0.3;
  eyeball.velocityX = -8;
  eyeball.lifetime = 400;
  eyeballGroup.add(eyeball);
}




function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  BulletSnd.play()
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleduckCollision(duckGroup){
    if (life > 0) {
       score=score+1;
      QuackSnd.play()
    }

    blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) 

    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
    

  }

  function handlegooseCollision(gooseGroup){
    if (life > 0) {
       score=score+1;
      QuackSnd.play()
      }

      blast.scale=0.3
      blast.life=20
      bulletGroup.destroyEach()
      bubbleGroup.destroyEach()

    }
function handleGameover(duckGroup){
  
    life=life-1;
    duckGroup.destroyEach();
  
    if (life === 0) {
      gameState=2
      GameOverSnd.play()
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}

function handleGameover(gooseGroup){
  
  life=life-1;
  gooseGroup.destroyEach();

  if (life === 0) {
    gameState=2
    GameOverSnd.play()
    swal({
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      text: "Your Score is " + score,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }

}