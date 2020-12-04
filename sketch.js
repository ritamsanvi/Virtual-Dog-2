//Create variables here
var food, happydog
var database
var FoodS, FoodStock
var lastFed, Fedtime

function preload() {
  dogImage = loadImage("images/dogImg.png");
  dog2Image = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  dog = createSprite(250, 250, 10, 10);
  database = firebase.database();

  var foodStock = database.ref('Food')
  foodStock.on("value", readStock);

  dog.addImage(dogImage);
  dog.scale = 0.5

  FoodObj = new Food();
 

  feed = createButton("Feed The Dog");
  feed.position(700, 95)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95)
  addFood.mousePressed(addFoods);

}

function draw() {
  background("green");

  FoodObj.display();

  Fedtime=database.ref("Fedtime")
  Fedtime.on("value", function (data) {
    lastFed = data.val();
  })

  textSize(30)
  fill("yellow")
  text("Virtual Pet", 200, 20)

  if (lastFed >= 12) {
    text("LastFed:" + lastFed % 12 + "PM", 40, 50)
  } else if (lastFed == 0) {
    text("LastFed: 12AM", 40, 50)
  } else {
    text("LastFed:" + lastFed + "AM", 40, 50)
  }

  drawSprites();
  //add styles here

}

function readStock(data) {
  FoodS = data.val();
  FoodObj.updateFoodStock(FoodS);
  console.log("foodStock:"+ FoodS)
}
function writeStock(x) {
  database.ref('/').update({
    Food: x
  })
}

function feedDog() {
  dog.addImage(dogImage)
  FoodObj.updateFoodStock(FoodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: FoodObj.getFoodStock(),
    Fedtime: hour(),
  })
}

function addFoods() {
  FoodS++;
  database.ref('/').update({
    Food: FoodS
  })
}
