/*
What does it mean to be a critter?
*/

//properties ... determined by genes?
var vision = 1; //how far a critter can see
var sex= true; //true= male false= female
var riskyness = 1; //between and 100 determins what kind of fights are taken on
var strength= 1; //
var max_age;
var growth;

//states
var serotonin_level= 1; //between 1 and 100, determines social hirachy
var direction = 0 //in what direction is the critter facing. 0 North, 90 east, 180 south, 270 west
var health = 100;
var hunger;
var age;
var size;


//actions
walk_forward
walk_backward
turn_left
turn_right
asses_critter
eat
carry
drop
mate
fight
expel_pheromone
smell_pheromone

//genes
