/*
What does it mean to be a critter?
*/
class Critter {


    constructor() {
      this.posX=0;
      this.posY=0;
      this.orientation="E";
      this.walk_forward = function(){
        if(this.orientation == "N"){this.posY--;}
        if(this.orientation == "E"){this.posX++;}
        if(this.orientation == "S"){this.posY++;}
        if(this.orientation == "W"){this.posX--;}
      };
      this.turn_right = function(){
        if(this.orientation == "N"){this.orientation= "E";}
        else if(this.orientation == "E"){this.orientation= "S";}
        else if(this.orientation == "S"){this.orientation= "W";}
        else if(this.orientation == "W"){this.orientation= "N";}
      };

    }
    //actions
    //basic movement

  }
  function walk_forward_alt(orientation)
  {
    if(orientation == "N"){this.posY--;}
    if(orientation == "E"){this.posX++;}
    if(orientation == "S"){this.posY--;}
    if(orientation == "W"){this.posX++;}

  }

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
var steps;
var speed; //for running away, taxing on hunger
var remembered_locations;


/*

walk_backward
turn_left
turn_right


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
