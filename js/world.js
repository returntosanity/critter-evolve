/*
The map/world in which the critters live
*/
var size = 850;
var boxsize=40;
var canvas;
var interval;
var gameObjectList= [];
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "N", "red", "Player"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "S", "yellow", "Jim"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "W", "yellow","Pam"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "E", "yellow","Dwight"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "S", "lightblue", "Andy"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "W", "lightblue","Stanley"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "E", "lightblue","Phillys"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "E", "pink","Oscar"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "E", "pink","Kevin"));
gameObjectList.push(new Critter(randomInt(boxsize-1), randomInt(boxsize-1), "E", "pink","Angela"));
gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),50));
gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),60));
gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),20));
gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),100));
gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),150));
gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),20));
gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),15));
//keybindings
document.addEventListener("keydown", readImput);

function readImput(e){
  if(e.code=="ArrowUp" || e.code=="KeyW")
  {
    walk(gameObjectList[0]);
  }
  if(e.code=="ArrowLeft" || e.code=="KeyA")
  {
    turnL(gameObjectList[0]);
  }
  if(e.code=="ArrowRight" || e.code=="KeyD")
  {
    turnR(gameObjectList[0]);
  }
  if(e.code=="KeyR")
  {
    randomAction(gameObjectList[0]);
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
  redrawRects(document.getElementById("newCanvas"), boxsize,gameObjectList);
  document.getElementById("logtitle").style.visibility="visible";
  document.getElementById("foodcount").style.visibility="visible";
  document.getElementById("foodcount").innerText="Number of Foods: "+countFood(gameObjectList);
  document.getElementById("statscontainer").style.visibility="visible";
  document.getElementById("log").style.visibility="visible";
  document.querySelectorAll('.additionalButtons').forEach(e => e.style.visibility="visible");
  displayStats(gameObjectList);
//  autoStart();
  canvas.addEventListener('mousedown', mouseDropFood, false);
  canvas.addEventListener('mousemove', mouseDrawHighlight, false);
  canvas.addEventListener('mouseleave', function (){redraw(document.getElementById("newCanvas"), boxsize, gameObjectList);}, false);
}

function walk(critter)
{
  critter.walk_forward(boxsize-1, boxsize-1);
  checkPosition(critter,gameObjectList);
  redraw(document.getElementById("newCanvas"), boxsize,gameObjectList);
  displayStats(gameObjectList);
}

function turnR(critter)
{
  critter.turn_right();
  redraw(document.getElementById("newCanvas"), boxsize, gameObjectList);
}

function turnL(critter)
{
  critter.turn_left();
  redraw(document.getElementById("newCanvas"), boxsize, gameObjectList);
}

function randomAction(critter)
{
  function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
  }

  var rndInt = randomIntFromInterval(1, 6)
  if(rndInt<=4)
  {
    writeLog("decided to walk a bit",critter);
  	walk(critter);
  }
  if(rndInt==5)
  {
    turnR(critter);
    writeLog("decided to turn right",critter);
  }
  if(rndInt==6)
  {
    turnL(critter);
    writeLog("decided to turn left",critter);
  }
}

function randomActions(gameObjectList)
{
  gameObjectList.forEach((item, i) => {
    if(item instanceof Critter && i>0)
    {
      randomAction(item);
    }
  });
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
  writeLog("stopped");
  document.getElementById("autostart").style.display="inline";
  document.getElementById("autostop").style.display="none";
}

function addFood()
{
  gameObjectList.push(new Food(randomInt(boxsize-1), randomInt(boxsize-1),randomInt(300)));
  document.getElementById("foodcount").innerText="Number of Foods: "+countFood(gameObjectList);
  redraw(document.getElementById("newCanvas"), boxsize, gameObjectList);
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
  let myelem= document.createElement("p");
  myelem.className="logmessage";
  if(critter instanceof Critter){
    myelem.innerHTML= "<b>"+ critter.name +"</b> "+ message;
    myelem.style.backgroundColor= critter.color;
  }
  else
  {
    myelem.innerText= message;
  }
  var logdiv= document.getElementById("logcontainer");
  if(logdiv.childElementCount>=140)
  {
    logdiv.removeChild(logdiv.lastChild);
  }
  logdiv.insertBefore(myelem,logdiv.childNodes[0]);
}

function checkPosition(gameObject, gameObjectList)
{
  gameObjectList.forEach((item, i) => {
    if(item instanceof Food && item.posX== gameObject.posX && item.posY== gameObject.posY)
    {
      gameObject.eatFood(item, gameObjectList, i);
      document.getElementById("foodcount").innerText="Number of Foods: "+countFood(gameObjectList);
      writeLog("munched food with "+item.nutrition+" nutrition", gameObject);
    }
  });
}

function displayStats(gameObjectList)
{
  //first, remove all statsitems so we're not fucking ourselves.
  document.querySelectorAll('.statsitem').forEach(e => e.remove());

  gameObjectList.forEach((item, i) => {
    if(item instanceof Critter && item.energy>0)
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

     statsItemDiv.appendChild(statsNameP);
     statsItemDiv.appendChild(statEnergyP);
     statsItemDiv.appendChild(statStepsP);
     document.getElementById("statscontainer").appendChild(statsItemDiv);

    }
  });
}

function mouseDropFood(e) {
    var pos = getMousePos(canvas, boxsize, e);
    posx = pos.x;
    posy = pos.y;
    var newFood= new Food(posx, posy,randomInt(300))
    gameObjectList.push(newFood);
    writeLog("dropped food with "+newFood.nutrition+" nutrition");
    document.getElementById("foodcount").innerText="Number of Foods: "+countFood(gameObjectList);
    redraw(document.getElementById("newCanvas"), boxsize, gameObjectList);

}
function mouseDrawHighlight(e) {
  redraw(document.getElementById("newCanvas"), boxsize, gameObjectList);
  var ctx = canvas.getContext("2d");
  var pos = getMousePos(canvas, boxsize, e);
  posx = pos.x;
  posy = pos.y;

  var drawx = canvas.width / boxsize * posx;
  var drawy = canvas.height / boxsize * posy;
  ctx.fillStyle = "green";
  ctx.lineWidth = "3";
  ctx.strokeStyle = "grey";
  ctx.strokeRect(drawx, drawy, canvas.width / boxsize, canvas.height / boxsize);
}

function getMousePos(canvas,b_size, evt) {
    var rect = canvas.getBoundingClientRect();
    var intx=(evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    var inty=(evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    return {
        x: Math.trunc(intx/canvas.width*b_size),
        y: Math.trunc(inty/canvas.height*b_size)
    };
}
