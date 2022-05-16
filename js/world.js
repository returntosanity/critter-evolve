/*
The map/world in which the critters live
*/
var size = 850;
var boxsize=40;
var canvas;
var interval;
var gameObjectList= [];
var c1= new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "N", "red", "Player");
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "S", "yellow", "Jim"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "W", "yellow","Pam"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "E", "yellow","Dwight"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "S", "lightblue", "Andy"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "W", "lightblue","Stanley"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "E", "lightblue","Phillys"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "E", "pink","Oscar"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "E", "pink","Kevin"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "E", "pink","Angela"));
gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),10));
gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),10));
gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),10));
gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),10));
gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),10));
gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),10));
gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),10));
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
  if(e.code=="KeyF")
  {
    addFood();
  }
}

//buttons
function start()
{
  drawMap(size, boxsize, "map");
  document.getElementById("btnstart").hidden=true;
  canvas=document.getElementById("newCanvas");
  drawRect(document.getElementById("newCanvas"), boxsize,c1);// c1.posX, c1.posY, c1.orientation, "red");
  redrawRects(document.getElementById("newCanvas"), boxsize,gameObjectList);
  document.getElementById("logtitle").style.visibility="visible";
  document.getElementById("foodcount").style.visibility="visible";
  document.getElementById("foodcount").innerText="Number of Foods: "+countFood(gameObjectList);
  document.getElementById("statscontainer").style.visibility="visible";
  document.getElementById("log").style.visibility="visible";
  document.querySelectorAll('.additionalButtons').forEach(e => e.style.visibility="visible");
  displayStats(gameObjectList);
  autoStart();
}

function walk(critter)
{
  critter.walk_forward(boxsize-1, boxsize-1);
  checkPosition(critter,gameObjectList);
  redraw(document.getElementById("newCanvas"), boxsize,gameObjectList);
  drawRect(document.getElementById("newCanvas"), boxsize, critter);//c1.posX, c1.posY, c1.orientation, "red");
  displayStats(gameObjectList);
  //console.log(c1);
}

function turnR(critter)
{
  critter.turn_right();
  redraw(document.getElementById("newCanvas"), boxsize, gameObjectList);
  drawRect(document.getElementById("newCanvas"), boxsize, critter);//c1.posX, c1.posY, c1.orientation, "red");
  //console.log(c1);
}

function turnL(critter)
{
  critter.turn_left();
  redraw(document.getElementById("newCanvas"), boxsize, gameObjectList);
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

function randomActions(gameObjectList)
{
  gameObjectList.forEach((item, i) => {
    if(item instanceof Critter)
    {
      randomAction(item);
    }
  });
  drawRect(document.getElementById("newCanvas"), boxsize,c1);
}

function autoStart()
{
  interval= setInterval(function() { randomActions(gameObjectList); }, 80);
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

function addFood()
{
  gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),10));
  document.getElementById("foodcount").innerText="Number of Foods: "+countFood(gameObjectList);
  redraw(document.getElementById("newCanvas"), boxsize, gameObjectList);
  drawRect(document.getElementById("newCanvas"), boxsize,c1);
}

function countFood(gameObjectList)
{
  let counter=0;
  gameObjectList.forEach((item, i) => {
    if(item instanceof Food)
    {
      counter++;
    }
  });
  return counter;
}

function randomInt(max)
{ // min and max included
  return Math.floor(Math.random() * (max - 0 + 1) + 0)
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
    logdiv.removeChild(logdiv.children[2]);
  }
  logdiv.appendChild(myelem);
}

function checkPosition(gameObject, gameObjectList)
{
  gameObjectList.forEach((item, i) => {
    if(item instanceof Food && item.posX== gameObject.posX && item.posY== gameObject.posY)
    {
      //eat food - increase energy, remove food item from gameobject list
      gameObject.eatFood(item, gameObjectList, i);
      document.getElementById("foodcount").innerText="Number of Foods: "+countFood(gameObjectList);
      writeLog("munched food", gameObject);
    }
  });
}

function displayStats(gameObjectList)
{
  //document.getElementById("statscontainer").children.forEach()
  //first, remove all statsitems so we're not fucking ourselves.
  document.querySelectorAll('.statsitem').forEach(e => e.remove());

  var statsItemDiv= document.createElement("div");
  statsItemDiv.className="statsitem";
  var statsNameP= document.createElement("p");
  statsNameP.className="statName";
  statsNameP.innerText=c1.name;
  statsNameP.style.backgroundColor=c1.color;
  var statEnergyP = document.createElement("p");
  statEnergyP.className="statOther";
  statEnergyP.innerText= "Energy: "+c1.energy;
  var statStepsP= document.createElement("p");
  statStepsP.className="statOther";
  statStepsP.innerText="Steps: "+c1.steps;
 statsItemDiv.appendChild(statsNameP);
 statsItemDiv.appendChild(statEnergyP);
 statsItemDiv.appendChild(statStepsP);
 document.getElementById("statscontainer").appendChild(statsItemDiv);

  gameObjectList.forEach((item, i) => {
    if(item instanceof Critter)
    {
      //create div fill with stats add to stats div
      var statsItemDiv= document.createElement("div");
      statsItemDiv.className="statsitem";
      var statsNameP= document.createElement("p");
      statsNameP.className="statName";
      statsNameP.innerText=item.name;
      statsNameP.style.backgroundColor=item.color;
      var statEnergyP = document.createElement("p");
      statEnergyP.className="statOther";
      statEnergyP.innerText= "Energy: "+item.energy;
      var statStepsP= document.createElement("p");
      statStepsP.className="statOther";
      statStepsP.innerText="Steps: "+item.steps;
      /* <div id="statscontainer" class="AAA">
            <div class="statsitem">
              <p class="statName">Dummy</p>
              <p class="statOther">Energy:</p>
              <p class="statOther">Steps:</p>
            </div>*/
     statsItemDiv.appendChild(statsNameP);
     statsItemDiv.appendChild(statEnergyP);
     statsItemDiv.appendChild(statStepsP);
     document.getElementById("statscontainer").appendChild(statsItemDiv);

    }
  });
}

function draw(e) {
    var pos = getMousePos(canvas, boxsize, e);
    var context= canvas.getContext("2d");
    posx = pos.x;
    console.log(posx);
    posy = pos.y;
    console.log(posy);

    var drawx=canvas.width/boxsize*posx;
    var drawy=canvas.height/boxsize*posy;
    
    context.fillStyle = "#000000";
    context.fillRect(drawx, drawy, canvas.width/boxsize, canvas.height/boxsize);
}
window.addEventListener('mousedown', draw, false);

function getMousePos(canvas,b_size, evt) {
    var rect = canvas.getBoundingClientRect();
    var intx=(evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    var inty=(evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    return {
        x: Math.trunc(intx/canvas.width*b_size),
        y: Math.trunc(inty/canvas.height*b_size)
    };
}
