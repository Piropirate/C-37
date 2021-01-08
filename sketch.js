var dog; 
var normalDog, happyDog; 
var database; 
var foodS, foodStock;
var lastFed, fedTime;
var food, foodIMG;
var gameState, gameS;
var bedroom, garden, washroom;
var feed, addFood;

function preload()
{
  normalDog = loadImage("images/virtual pet images/Dog.png");
  happyDog = loadImage("images/virtual pet images/Happy.png");
  foodIMG = loadImage("images/Milk.png");
  bedroom = loadImage("images/virtual pet images/Bed Room.png");
  garden = loadImage("images/virtual pet images/Garden.png");
  washroom = loadImage("images/virtual pet images/Wash Room.png");
}

function setup() {
	createCanvas(1530, 730);
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  gameState = database.ref('GameState');
  gameState.on("value",function(data){
    gameState = data.val();
  });

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  dog = createSprite(1250,365,50,50);
  dog.addImage(normalDog);
  dog.scale = 0.2;

  food = new Food();

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(850,95);
  addFood.mousePressed(addFoods);

  
}

function draw() {  
  background(rgb(46, 139, 87));

  currentTime = hour();
  if(currentTime === (lastFed + 1)){
    update("playing");
    food.garden();
  }else if(currentTime === (lastFed + 2)){
    update("sleeping");
    food.bedroom();
  }else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)){
    update("bathing");
    food.washroom();
  }else{
    update("hungry");
    food.display();
  }

  if(gameState !== "hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(normalDog);
  }
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog);

  food.updateFoodStock(food.getFoodStock() - 1);
  database.ref('/').update({
    Food : food.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}

function update(state){
  database.ref('/').update({
    GameState : state
  })
}

function dogDisplay(){
  dog = createSprite(1250,365,50,50);
  dog.addImage(normalDog);
  dog.scale = 0.2;
}