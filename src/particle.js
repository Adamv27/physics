const canvas = document.getElementById("particle-collision");

export class Particle {
  static radius = 10;
  static diameter = Particle.radius * 2;
  constructor(pos, vel, color) {
    [this.x, this.y] = pos;
    [this.dx, this.dy] = vel;
    this.mass = randInt(1,3);
    this.color = color;
  }
  
  move() {
    const new_x = this.x + this.dx;
    const new_y = this.y + this.dy;
    
    if (new_x > 0 && new_x < canvas.width) {
      this.x = new_x; 
    } else {
      this.dx = -this.dx;  
    } 

    if (new_y > 0 && new_y < canvas.height) {
     this.y = new_y;
    } else {
      this.dy = -this.dy;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, Particle.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  is_colliding(particle) {
    let x1 = this.x - Particle.radius;
    let y1 = this.y - Particle.radius;
    let x2 = particle.x - Particle.radius;
    let y2 = particle.y - Particle.radius;
    if (x1 + Particle.diameter >= x2 &&
        x1 <= x2 + Particle.diameter &&
        y1 + Particle.diameter >= y2 &&
        y1 <= y2 + Particle.diameter) {
      return true;
    }
    return false;
  }

  collide(particle) {
    const m1 = this.mass;
    const m2 = particle.mass;
    
    const v1i = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    const v2i = Math.sqrt(particle.dx ** 2 + particle.dy ** 2)
    

    const a = (2 * m1) / (m1 + m2);
    
    const velDiff = v1i - v2i
    
    const dotProd = (velDiff * (this.x - particle.x)) + (velDiff * (this.y - particle.y))
    const euclideanNorm = Math.sqrt(this.x ** 2 + this.y ** 2) ** 2;
    const v1f = v1i - a * (dotProd / euclideanNorm);
      

    this.dx = v1fx;
    this.dy = v1fy;

    particle.dx = v2fx;
    particle.dy = v2fy; 
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
  let dx = randInt(1, 1);
  dx = negate == 1 ? -dx : dx;

  negate = randInt(1, 3)
  let dy = randInt(1, 1);
  dy = negate == 1 ? -dy : dy;
  

  const color = '#' + genRanHex(6);

  return new Particle([x,y], [dx, dy], color);
}
