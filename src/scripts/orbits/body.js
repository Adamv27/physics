import { Vector2d } from "../vector.js";

const BIG_G = 1; 

export default class Body {
  constructor(color, x, y, radius) {
    this.radius = radius;
    this.x = x; 
    this.y = y;
    this.mass = 10000000;
  
    this.color = color;

    this.vx = 0;
    this.vy = 0;
  }
  
  setInitalVelocity(bodyOrbited) {
    const distance = this.distanceTo(bodyOrbited);
    const r = distance.magnitude();

    const tangential_velocity = Math.sqrt((BIG_G * bodyOrbited.mass) / r);

    this.vx = -tangential_velocity * (distance.y / r);
    this.vy = tangential_velocity * (distance.x / r);
  }
  

  distanceTo(otherBody) {
    const dx = (this.x - otherBody.x);
    const dy = (this.y - otherBody.y); 
    return new Vector2d(dx, dy);
  }

  gravitationalAcceleration(bodyOrbited) {
    const orbitalRadius = this.distanceTo(bodyOrbited);
    
    const acceleration = (BIG_G * bodyOrbited.mass) / (orbitalRadius.magnitude() ** 2);
    
    const acceleration_x = -acceleration * (orbitalRadius.x / orbitalRadius.magnitude());
    const acceleration_y = -acceleration * (orbitalRadius.y / orbitalRadius.magnitude());

    return new Vector2d(acceleration_x, acceleration_y);
  }

  update(secondsPassed, bodyOrbited) {
    const acceleration = this.gravitationalAcceleration(bodyOrbited);

    this.vx += acceleration.x * secondsPassed;
    this.vy += acceleration.y * secondsPassed;

    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;
  }

  draw(ctx) {
    ctx.fillStyle = this.color; 
    ctx.beginPath();
    ctx.arc(this.x , this.y , this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}
