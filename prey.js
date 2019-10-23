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
}