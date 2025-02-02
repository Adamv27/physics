import { createParticle } from "./particle.js";

class Engine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 500
    this.canvas.height = 500
    this.ctx = this.canvas.getContext("2d")
    
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

  clearCanvas() {
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, 500, 500);
  }
}


function engine() {
  let last_render = performance.now(); 
  const particleEngine = new Engine("particle-collisons");

  function frame(timestamp) {
    const seconds_passed = (timestamp - last_render) / 1000;
    
    particleEngine.update(seconds_passed)
    particleEngine.checkCollisions()
    particleEngine.clearCanvas()
    particleEngine.draw()

    last_render = timestamp
    window.requestAnimationFrame(frame);
  }
  window.requestAnimationFrame(frame);
}

engine();
