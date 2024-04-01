import { createParticle } from "./particle.js";

const canvas = document.getElementById("particle-collision");
canvas.width = 500
canvas.height = 500
const ctx = canvas.getContext("2d");


ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, 500, 500);

const particles = [];
for (let i = 0; i < 30; i++) {
  particles.push(createParticle());
}


const gameLoop = () => {
  window.requestAnimationFrame(() => gameLoop()) 
  
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(0, 0, 500, 500);
  
  particles.forEach(particle => particle.move());
  particles.forEach(p1 => {
    particles.forEach(p2 => {
      if (p1 != p2 && p1.is_colliding(p2)) {
        p1.collide(p2); 
      }
    })
  })
  
  particles.forEach(particle => particle.draw(ctx))
}


gameLoop();
