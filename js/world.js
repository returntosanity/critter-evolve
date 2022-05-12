/*
The map/world in which the critters live
*/
let height=1000;
let width=1000;
var c1= new Critter();


function walk()
{
  c1.walk_forward();
  console.log(c1);
}

function turnR()
{
  c1.turn_right();
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
{walk();
console.log("decided to walk a bit")}
else
{turnR();
console.log("decided to turn right");}
}
