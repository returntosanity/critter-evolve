/*
What does it mean to be a critter?
*/
class Critter {


    constructor(x,y,direction, color, name) {
      this.posX=x;
      this.posY=y;
      this.orientation=direction;
      this.name=name;
      this.color=color;
      this.steps=0;
      this.vision=10;
      this.energy=1000;
      this.foodEaten=0;

      //basic movement
      this.walk_forward = function(w_width, w_height){
        if(this.orientation == "N"){
            if(this.posY == 0){
            //console.log("Ouch! Walked into a wall");
            writeLog("Ouch! Walked into a wall", this);}
            else{
            this.posY--;
            this.steps++;
            this.energy--;
            }
        }
        if(this.orientation == "E"){
			if(this.posX == w_width){
            //console.log("Ouch! Walked into a wall");
          writeLog("Ouch! Walked into a wall", this);}
            else{
            this.posX++;
            this.steps++;
            this.energy--;
            }
        }
        if(this.orientation == "S"){
            if(this.posY == w_height){
            //console.log("Ouch! Walked into a wall");
          writeLog("Ouch! Walked into a wall", this);}
            else{
            this.posY++;
            this.steps++;
            this.energy--;
            }
        }
        if(this.orientation == "W"){
			if(this.posX == 0){
            //console.log("Ouch! Walked into a wall");
          writeLog("Ouch! Walked into a wall", this);}
            else{
            this.posX--;
            this.steps++;
            this.energy--;
            }
        }


      };//walk_forward ends here

      this.turn_right = function(){
        if(this.orientation == "N"){this.orientation= "E";}
        else if(this.orientation == "E"){this.orientation= "S";}
        else if(this.orientation == "S"){this.orientation= "W";}
        else if(this.orientation == "W"){this.orientation= "N";}
      };
      this.turn_left = function(){
        if(this.orientation == "N"){this.orientation= "W";}
        else if(this.orientation == "E"){this.orientation= "N";}
        else if(this.orientation == "S"){this.orientation= "E";}
        else if(this.orientation == "W"){this.orientation= "S";}
      };

      //actions
      this.eatFood = function(food, gameObjectList, position){
        this.energy= this.energy + food.nutrition;
        gameObjectList.splice(position,1);
        this.foodEaten++;

      };

      this.seeFood = function(gameObjectList, map_size){
        let pointList= getCoordsForFieldOfView(this, map_size);
        let sawfood=false;

        pointList.forEach((point, i) => {
          gameObjectList.forEach((gameObject, i) => {
            if(point.x===gameObject.posX && point.y=== gameObject.posY && gameObject instanceof Food)
            {
              sawfood= true;
            }

          });

        });
        return sawfood;




      };//see
    }
}

function getCoordsForFieldOfView(critter, map_size)
{
  var posx= critter.posX;
  var posy= critter.posY;
  var orientation= critter.orientation;
  var viewField= [];

  if(orientation == "N"){
    if(posy === 0)
    {
      writeLog("Looking at a wall", critter);
    }
    else{
      for(let i=1; i < critter.vision; i++)
      {
        viewField.push({x: posx , y: posy-i});
      }
    }
  }
  if(orientation === "E"){
    if(posx === map_size)
    {
      writeLog("Looking at a wall", critter);
    }
    else
    {
      for(let i=1; i < critter.vision; i++)
      {
        viewField.push({x: posx+i , y: posy});
      }
    }
  }
  if(orientation === "S"){
      if(posy === map_size){
    writeLog("Looking at a wall", critter);}
      else{
      for(let i=1; i < critter.vision; i++)
      {
        viewField.push({x: posx , y: posy+i});
      }
      }
  }
  if(orientation === "W"){
    if(posx === 0){
    writeLog("Looking at a wall", this);}
      else{
      for(let i=1; i < critter.vision; i++)
      {
        viewField.push({x: posx-i , y: posy});
      }
      }
  }
  return viewField;


}
/*
see
get coords for field of view



//properties ... determined by genes?
var vision = 1; //how far a critter can see
var sex= true; //true= male false= female
var riskyness = 1; //between and 100 determins what kind of fights are taken on
var strength= 1; //
var max_age;
var max_speed;
var growth;
var location_memory;

//states
var posX=0;
var posY=0;
var orientation= "E";// N E S W
var serotonin_level= 1; //between 1 and 100, basically confidence, determines social hirachy
var direction = 0 //in what direction is the critter facing. 0 North, 90 east, 180 south, 270 west
var health = 100;
var hunger; //replenished by food, decreased by steps, higher speeds
var age;
var size;
var speed; //for running away, taxing on hunger
var remembered_locations;
*/

/*
//interactions with enviornment
eat
carry
drop
expel_pheromone
smell_pheromone
//interactions with other critters
asses_critter
mate
fight
intimidate
intimidated
//memory
remember_location
plot_route
//genes
*/
