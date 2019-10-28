class Prey {

  constructor(spawnPos) {
    this.health = 100;
    this.isAlive = true;
    this.position = spawnPos;
    this.rotation = 0;
    this.velocity = createVector(0, 0);
    this.rotationSpeed = 0.08;
    this.moveSpeed = 5.0;
    this.width = 30;
    this.height = 30;
    this.deathTimer = 0;
    this.textsize = 1;
    this.numSensors = 8;
    this.sensorSize = 200;
    //add other stuff later
  }
    die() {
    if (this.deathTimer < 180) {
      fill(this.deathTimer);
      strokeWeight(0);
      text('OOF', this.position.x, this.position.y)
      this.textsize += 1.5;
      textSize(this.textsize);
      this.deathTimer++;
    }
    else {
      this.isAlive = false;
    }
  }
  damage(damageTaken) {
    this.health -= damageTaken;
    if (this.health <= 0) {
      this.die();
    }
  }
  spinLeft() {
    this.rotation -= this.rotationSpeed;
  }
  spinRight() {
    this.rotation += this.rotationSpeed;
  }
  moveForwards() {
    this.velocity.x = this.moveSpeed * cos(this.rotation);
    this.velocity.y = this.moveSpeed * sin(this.rotation);
  }
  moveBackwards() {
    this.velocity.x = -this.moveSpeed * cos(this.rotation);
    this.velocity.y = -this.moveSpeed * sin(this.rotation);
  }
  display() {
    if (this.health > 0) {
    fill(0, 0, 255);
    strokeWeight(3);
    line(this.position.x, this.position.y, this.position.x + (20 * cos(this.rotation)), this.position.y + (20 * sin(this.rotation)));
    ellipse(this.position.x, this.position.y, this.width, this.height);
    fill (0, 150, 250);
    strokeWeight(0);
    ellipse(this.position.x - 3, this.position.y - 3, this.width / 2, this.height / 2);
  }
  }
  manualMove(forwards, backwards, spinLeft, spinRight) {
    if (this.health > 0) {
    if (spinLeft) {
      this.spinLeft();
    }
    if (spinRight) {
      this.spinRight();
    }
    if (forwards) {
      this.moveForwards();
    }
    if (backwards) {
      this.moveBackwards();//movement is manually controlled by keyboard 4 nowz.
    }
    this.position.add(this.velocity);
    this.velocity.x = 0;
    this.velocity.y = 0;
  } 
  }
  showSensors() {
    let sense = [];
    for (let i = 0; i < this.numSensors; i++) {
      sense.push(1);
    }
    for (let j = 0; j < sense.length; j++) {
      let x1 = this.position.x + this.width / 2;
      let y1 = this.position.y + this.height / 2;
      let x2 = x1 + Math.cos(Math.PI * 2 / this.numSensors * j) * this.sensorSize;
      let y2 = y1 + Math.sin(Math.PI * 2/ this.numSensors * j) * this.sensorSize;
      stroke(0, 200, 100);
      line(x1, y1, x2, y2);
      //print("(" + x1 + ", " + y1 + ")" + " to (" + x2 + ", " + y2 + ")");
    }
  }
  getSensorDistances(predators) {
    var sensors = [];
    for (let i = 0; i < this.numSensors; i++) {
      sensors.push(1);
    }
    for (let i in predators) {
      var distance = Math.sqrt( Math.pow(predators[i].position.x + predators[i].width/2 - this.position.x + this.width/2, 2) + Math.pow(predators[i].position.x + predators[i].height/2 - this.position.y + this.height/2, 2));
      if (distance <= this.sensorSize) {
        for (let j = 0; j < this.numSensors; j++) {
          var x1 = this.x + this.width/2;
          var y1 = this.y + this.height/2;
    	  var x2 = x1 + Math.cos(Math.PI * 2 / this.numSensors * j + this.direction) * this.sensorSize;
    	  var y2 = y1 + Math.sin(Math.PI * 2/ this.numSensors * j + this.direction) * this.sensorSize;
            
            // Get boundaries of the current asteroid
    	  var objx = predators[i].x + predators[i].width/2;
    	  var objy = predators[i].y + predators[i].height/2;
          
          if(Math.abs(Math.atan2(objy - y1, objx - x1) - Math.atan2(y2 - y1, x2 - x1)) <= Math.PI * 2 / this.numSensors){
    	    var d = collisionSegmentAABB(x1, y1, x2, y2, predators[i].x, predators[i].y, predators[i].width, predators[i].height);
            if(d/this.sensorSize < sensors[j]){ // If distance is less than sensor distance
    		  sensors[j] = d/this.sensorSize; // Update sensor size
    		}
          }
        }
      }
    }
//     for (let i = 0; i < this.numSensors; i++) {
//       var X1 = this.x + this.width/2;
//       var Y1 = this.y + this.height/2;
//       var X2 = X1 + Math.cos(Math.PI / this.numSensors * j + this.direction) * this.sensorSize;
//       var Y2 = Y1 + Math.sin(Math.PI / this.numSensors * j + this.direction) * this.sensorSize;
      
//       var D = collisionSegmentAABB(X1, Y1, X2, Y2, 0, 0, width, height);
//     		if(D/this.sensorSize < sensors[j]){
//     			sensors[j] = D/this.sensorSize;
//     		}
//     }
  }
}