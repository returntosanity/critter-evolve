/*
The map/world in which the critters live
*/
var size = 600;
var boxsize=20;
var c1= new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "N");

//buttons
function start()
{
  drawMap(size, boxsize, "map");
  document.getElementById("start").hidden=true;
  drawRect(document.getElementById("newCanvas"), boxsize, c1.posX, c1.posY, c1.orientation, "red");
}

function walk()
{
  c1.walk_forward(boxsize-1, boxsize-1);
  redraw(document.getElementById("newCanvas"), boxsize);
  drawRect(document.getElementById("newCanvas"), boxsize, c1.posX, c1.posY, c1.orientation, "red");
  console.log(c1);
}

function turnR()
{
  c1.turn_right();
  redraw(document.getElementById("newCanvas"), boxsize);
  drawRect(document.getElementById("newCanvas"), boxsize, c1.posX, c1.posY, c1.orientation, "red");
  console.log(c1);
}
function turnL()
{
  c1.turn_left();
  redraw(document.getElementById("newCanvas"), boxsize);
  drawRect(document.getElementById("newCanvas"), boxsize, c1.posX, c1.posY, c1.orientation, "red");
  console.log(c1);
}

function randomAction()
{
  function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
  }

var rndInt = randomIntFromInterval(1, 6)
console.log(rndInt)
if(rndInt<=4)
{
	console.log("decided to walk a bit");
	walk();
}
if(rndInt==5)
{turnR();
console.log("decided to turn right");}
if(rndInt==6)
{turnL();
console.log("decided to turn left");}
}
function randomInt(max)
{ // min and max included
  return Math.floor(Math.random() * (max - 0 + 1) + 0)
}
