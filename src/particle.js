import { Vector2d } from "./vector.js";

const canvas = document.getElementById("particle-collision");

export class Particle {
  static radius = 10;
  static diameter = Particle.radius * 2;
  constructor(pos, vel, color, radius) {
    [this.x, this.y] = pos;
    this.vel = vel;
    this.mass = randInt(1,3);
    this.color = color;
    this.radius = radius
    this.diameter = this.radius * 2
  }
  
  update(secondsPassed) {
    this.x += this.vel.x * secondsPassed;
    this.y += this.vel.y * secondsPassed;

    if (this.x <= 0) {
      this.x = 0;
      this.vel.x = -this.vel.x;
    } else if (this.x >= canvas.width - this.diameter) {
      this.x = canvas.width - this.diameter;
      this.vel.x = -this.vel.x;
    }

    if (this.y < 0) {
      this.y = 0;
      this.vel.y = -this.vel.y
    } else if (this.y >= canvas.height - this.diameter) {
      this.y = canvas.height - this.diameter;
      this.vel.y = -this.vel.y
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color; 
    ctx.beginPath();
    ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  overlaps(particle) {
    const distX = this.x - particle.x;
    const distY = this.y - particle.y;
    const distance = Math.sqrt((distX * distX) + (distY * distY));
    
    return distance < this.radius + particle.radius;
  }

  collide(particle) {
    const vCollision = new Vector2d(particle.x - this.x, particle.y - this.y)
    const vCollisionNorm = vCollision.norm();
    const vRelativeVelocity = this.vel.sub(particle.vel)
    const speed = vRelativeVelocity.dot(vCollisionNorm);
    
    if (speed < 0) return;
    const changeSpeed = vCollisionNorm.multiply(speed)
    this.vel = this.vel.sub(changeSpeed)
    particle.vel = particle.vel.add(changeSpeed)
    return;
  }
}

const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');


export const createParticle = () => {
  const margin = Particle.radius * 2;
  const min_x = 0 + margin;
  const max_x = canvas.width - margin;
  const min_y = 0 + margin;
  const max_y = canvas.height - margin;
   
  const x = randInt(min_x, max_x);
  const y = randInt(min_y, max_y);

  let negate = randInt(1, 3);
  let dx = randInt(20, 50);
  dx = negate == 1 ? -dx : dx;

  negate = randInt(1, 3)
  let dy = randInt(20, 50);
  dy = negate == 1 ? -dy : dy;
  const vel = new Vector2d(dx, dy);

  const color = '#' + genRanHex(6);
  const radius = 10

  return new Particle([x,y], vel, '#4361EE', radius);
}
