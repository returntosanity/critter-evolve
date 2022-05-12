/*
The map/world in which the critters live
*/
let height=10;
let width=10;
var c1= new Critter();


function walk()
{
  c1.walk_forward(width-1, height-1);
  console.log(c1);
}

function turnR()
{
  c1.turn_right();
  console.log(c1);
}
function turnL()
{
  c1.turn_left();
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
