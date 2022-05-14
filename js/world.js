/*
The map/world in which the critters live
*/
var size = 850;
var boxsize=40;
var critterList= [];
var c1= new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "N", "red", "Andy");
critterList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "S", "yellow", "Dave"));
critterList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "W", "green","Greg"));
critterList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "E", "pink","Jim"));
critterList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "S", "yellow", "Steve"));
critterList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "W", "green","Dwight"));
critterList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "E", "pink","Michael"));

//keybindings
document.addEventListener("keydown", readImput);

function readImput(e){
  if(e.code=="ArrowUp" || e.code=="KeyW")
  {
    walk(c1);
  }
  if(e.code=="ArrowLeft" || e.code=="KeyA")
  {
    turnL(c1);
  }
  if(e.code=="ArrowRight" || e.code=="KeyD")
  {
    turnR(c1);
  }
  if(e.code=="KeyR")
  {
    randomAction(c1);
  }
}

//buttons
function start()
{
  drawMap(size, boxsize, "map");
  document.getElementById("start").hidden=true;
  drawRect(document.getElementById("newCanvas"), boxsize,c1);// c1.posX, c1.posY, c1.orientation, "red");
  redrawRects(document.getElementById("newCanvas"), boxsize,critterList);
  document.getElementById("logtitle").style.visibility="visible";
  autoStart();
}

function walk(critter)
{
  critter.walk_forward(boxsize-1, boxsize-1);
  redraw(document.getElementById("newCanvas"), boxsize,critterList);
  drawRect(document.getElementById("newCanvas"), boxsize, critter);//c1.posX, c1.posY, c1.orientation, "red");
  //console.log(c1);
}

function turnR(critter)
{
  critter.turn_right();
  redraw(document.getElementById("newCanvas"), boxsize, critterList);
  drawRect(document.getElementById("newCanvas"), boxsize, critter);//c1.posX, c1.posY, c1.orientation, "red");
  //console.log(c1);
}
function turnL(critter)
{
  critter.turn_left();
  redraw(document.getElementById("newCanvas"), boxsize, critterList);
  drawRect(document.getElementById("newCanvas"), boxsize, critter);//c1.posX, c1.posY, c1.orientation, "red");
  //console.log(c1);
}

function randomAction(critter)
{
  function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
  }

var rndInt = randomIntFromInterval(1, 6)
//console.log(rndInt)
if(rndInt<=4)
{
	//console.log("decided to walk a bit")
  writeLog("decided to walk a bit",critter);
	walk(critter);
}
if(rndInt==5)
{turnR(critter);
//console.log("decided to turn right");
writeLog("decided to turn right",critter);}
if(rndInt==6)
{turnL(critter);
//console.log("decided to turn left");
writeLog("decided to turn left",critter);}
}

function randomActions(critterList)
{
  critterList.forEach((item, i) => {
    randomAction(item);
  });
  drawRect(document.getElementById("newCanvas"), boxsize,c1);

}

function randomInt(max)
{ // min and max included
  return Math.floor(Math.random() * (max - 0 + 1) + 0)
}

var interval;
function autoStart()
{
  interval= setInterval(function() { randomActions(critterList); }, 80);
  document.getElementById("autostart").style.display="none";
  document.getElementById("autostop").style.display="inline";

}
function autoStop()
{
  clearInterval(interval);
  writeLog("stopped",c1);
  document.getElementById("autostart").style.display="inline";
  document.getElementById("autostop").style.display="none";
}

function writeLog(message, critter)
{
  //critter=c1;
  let myelem= document.createElement("p");
  myelem.className="logmessage";
  myelem.innerText= critter.name +" "+ message;
  var logdiv= document.getElementById("log");
  if(logdiv.childElementCount>=14)
  {
    logdiv.removeChild(logdiv.children[1]);
  }
  logdiv.appendChild(myelem);
}
