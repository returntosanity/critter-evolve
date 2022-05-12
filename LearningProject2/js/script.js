
//document.addEventListener("click",jump);
var gameArea= document.getElementById("mainCanvas");
var player= document.createElement('div');
player.id="character";
gameArea.appendChild(player);

document.addEventListener("keydown", readImput);

function readImput(e){
  console.log("key pressed"+ e.code);
  if(e.code=="ArrowDown" || e.code=="KeyS")
  {player.style.top = player.offsetTop + 10 + 'px';
  }
  if(e.code=="ArrowUp" || e.code=="KeyW")
  {player.style.top = player.offsetTop - 10 + 'px';
  }
  if(e.code=="ArrowLeft" || e.code=="KeyA")
  {player.style.left = player.offsetLeft - 10 + 'px';
  }
  if(e.code=="ArrowRight" || e.code=="KeyD")
  {player.style.left = player.offsetLeft + 10 + 'px';
  }
  if(e.code=="KeyX")
  {player.style.rotate= 90;
  }
}

/*

document.addEventListener("keydown", readImput);
document.addEventListener('keyup', stopMove);

function startGame() {
  myGameArea.start();
  playerObject = new component(20,40,"red",myGameArea.canvas.width/2,myGameArea.canvas.height - 40);
}

var myGameArea = {
canvas : document.getElementById("mainCanvas"),
start : function(){
  this.context = this.canvas.getContext("2d");
  this.interval = setInterval(updateGameArea, 20);
},
clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.centerX=x+width/2;
  this.centerY=y+height/2;


this.rotate= function(){
  ctx= myGameArea.context;
  ctx.translate(this.centerX, this.centerY);
  ctx.rotate(Math.PI /2);
  ctx.translate(-this.centerX,-this.centerY);
  //ctx.setTransform(1,0,0,1,0,0);
}

  this.update = function(){
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

  }
  this.newPos = function() {
  this.x += this.speedX;
  this.y += this.speedY;
  this.centerX=this.x+this.width/2;
  this.centerY=this.y+this.height/2;
}

}

function updateGameArea() {
  myGameArea.clear();
  playerObject.newPos();
  playerObject.update();

}

function readImput(e){
  console.log("key pressed"+ e.code);
  if(e.code=="ArrowDown" || e.code=="KeyS")
  {movedown();
  }
  if(e.code=="ArrowUp" || e.code=="KeyW")
  {moveup();
  }
  if(e.code=="ArrowLeft" || e.code=="KeyA")
  {moveleft();
  }
  if(e.code=="ArrowRight" || e.code=="KeyD")
  {moveright();
  }
  if(e.code=="KeyX")
  {playerObject.rotate();
  }
}

function moveup() {
  playerObject.speedY = -1;
}

function movedown() {
  playerObject.speedY = 1;
}

function moveleft() {
  playerObject.speedX = -1;
}

function moveright() {
  playerObject.speedX = 1;
}
function stopMove() {
  playerObject.speedX = 0;
  playerObject.speedY = 0;
}*/
