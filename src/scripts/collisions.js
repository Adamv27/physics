import runEngine, { Engine } from "./engine.js";
import { createParticle } from "./particle.js";


class ParticleEngine extends Engine {
  constructor() {
    super("particle-collision")
    
    this.particles = []
    for (let i = 0; i < 50; i++) {
      this.particles.push(createParticle())
    }

    for (let j = 0; j < 5; j++) {
      this.particles[j].color = "#FF0000"
    }
  }

  update(seconds_passed) {
    this.particles.forEach(particle => particle.update(seconds_passed))
    this.checkCollisions();
  }

  checkCollisions() {
    let p1;
    let p2;
    for (let i = 0; i < this.particles.length; i++) {
      p1 = this.particles[i];    
      for (let j = i + 1; j < this.particles.length; j++) {
        p2 = this.particles[j]; 
        
        if (p1.overlaps(p2)) {
          p1.collide(p2);
        }
      }
    }
  }

  draw() {
    this.particles.forEach(particle => particle.draw(this.ctx))
  }
}

runEngine(new ParticleEngine());
