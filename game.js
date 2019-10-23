let preys = [];
let predators = [];
let up = false;
let down = false;
let turnLeft = false;
let turnRight = false;
let collisionDetect = function(obj1, obj2) {
  if (!(obj1.position.x > obj2.position.x + obj2.width || obj1.position.x + obj1.width < obj2.position.x || obj1.position.y > obj2.position.y + obj2.height || obj1.position.y + obj1.height < obj2.position.y)) {
    return true
  }
  return false
}
function setup() {
  createCanvas(400, 400);
  preys.push(new Prey(createVector(random(100, 400), random(100, 400))));
  preys.push(new Prey(createVector(random(100, 400), random(100, 400))));
  preys.push(new Prey(createVector(random(100, 400), random(100, 400))));
  predators.push(new Predator());
}

function draw() {
  background(100, 0, 0);
  for (let i = 0; i < preys.length; i++) {
    preys[i].display();
    preys[i].manualMove(up, down, turnLeft, turnRight);
  }
  for (let i = 0; i < predators.length; i++) {
    predators[i].update(preys);
    for (let j = 0; j < preys.length; j++) {
      let hit = collisionDetect(predators[i], preys[j]);
      if (hit) {
        preys[j].damage(predators[i].damage);
      }
      if (!(preys[j].isAlive)) {
        preys.splice(j, 1);
      }
    }
  }
}


function keyTyped() {
  if (key === 'w') {
    up = true;
  }  
  if (key === 'a') {
    turnLeft = true;
  }
    if (key === 's') {
    down = true;
  }
    if (key === 'd') {
    turnRight = true;
  }
}
function keyReleased() {
  if (key === 'w') {
    up = false;
  }  
  if (key === 'a') {
    turnLeft = false;
  }
    if (key === 's') {
    down = false;
  }
    if (key === 'd') {
    turnRight = false;
  }
}