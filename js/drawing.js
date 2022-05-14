/*
var world_size=670;
var boxsize= 10;
var posX=2;
var posY=0;
var boxes= document.getElementById("b_size").value;
createCanvas(world_size, document.getElementById("test"));
var c = document.getElementById("newCanvas");
drawGrid(c, boxsize);
drawRect(c, boxsize, posX, posY,"N", "red");
drawRect(c, boxsize, 3, 3,"E", "green");
drawRect(c, boxsize, randomInt(boxsize-1), randomInt(boxsize-1), "R", "yellow");
drawRect(c, boxsize, randomInt(boxsize-1), randomInt(boxsize-1), "R","yellow");
*/
function drawMap(size, boxsize, nodeId)
{

  createCanvas(size, nodeId);
  let canvas = document.getElementById("newCanvas");
  drawGrid(canvas, boxsize);

}

function createCanvas(w_size, nodeId)
{
var ca= document.createElement("canvas");
ca.id="newCanvas";
ca.width = w_size;
ca.height= w_size;
ca.style.border ="4px solid #000";//#d3d3d3
document.getElementById(nodeId).appendChild(ca);
}

function drawGrid(canvas, size)
{
function drawLine(xB, yB, xE,yE)
{
var ctx = canvas.getContext("2d");
ctx.lineWidth = "1";
ctx.beginPath();
ctx.moveTo(xB, yB);
ctx.lineTo(xE, yE);
ctx.stroke();
}

for (let i = 0; i < size+1; i++) {
drawLine(canvas.width/size*i,0,canvas.width/size*i,canvas.height);
}


for (let i = 0; i < size+1; i++) {
drawLine(0,canvas.height/size*i,canvas.width,canvas.height/size*i);
}
}

function drawRect(canvas, b_size, xB, yB, orientation, color)
{
var size= canvas.width/b_size;
var xCoord = canvas.width/b_size*xB;
var yCoord = canvas.height/b_size*yB;


//console.log("drawRect called. Params: \nxB= "+ xB + "\nyB= "+yB+"\nsize= "+size);
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.rect(xCoord, yCoord, size, size);
ctx.fillStyle = color;
ctx.fill();
ctx.fillStyle = "black";
ctx.font = "bold "+size/2+"px Arial";
ctx.textAlign = "center";
ctx.textBaseline = 'middle';
ctx.fillText(orientation, xCoord+ size/2,yCoord + size /2);
ctx.lineWidth = "4";
ctx.strokeStyle = "black";
ctx.stroke();
}

function refreshCanvas(canvas)
{
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//Buttons
function randomRect(canvas, boxsize, color)
{
  //console.log(boxsize);
  if(boxsize.length > 0)
{drawRect(canvas, boxsize, randomInt(boxsize-1), randomInt(boxsize-1), "A",color);}
else {
drawRect(canvas, boxsize, randomInt(boxsize-1), randomInt(boxsize-1), "B",color);
}
}
function redraw(canvas, boxsize)
{
  refreshCanvas(canvas);
  drawGrid(canvas, boxsize);
}

function randomInt(max)
{ // min and max included
  return Math.floor(Math.random() * (max - 0 + 1) + 0)
}
