import runEngine, { Engine } from "../engine.js";
import Body from "./body.js";

class GravitationEngine extends Engine {
  constructor() {
    super("orbits");
    this.canvasColor = "#000";

    this.sun = new Body(
      "#FFFF00", 
      this.canvas.width/2, 
      this.canvas.height/2,
      this.radius = 35 
    );

    this.planet = new Body(
      "#FF0000",
      this.canvas.width/2 - 100,
      this.canvas.height/2 - 100,
      this.radius = 10 
    );

    this.planet.setInitalVelocity(this.sun);
  }

  update(secondsPassed) {
    this.planet.update(secondsPassed, this.sun);
  }

  draw() {
    this.sun.draw(this.ctx);
    this.planet.draw(this.ctx);
  }

  adjustOrbitalRadius(newRadius) {
    const theta = Math.atan2(this.planet.y - this.sun.y, this.planet.x - this.sun.x);
    
    const newX = this.sun.x + newRadius * Math.cos(theta);
    const newY = this.sun.y + newRadius * Math.sin(theta);
    
    this.planet.x = newX;
    this.planet.y = newY;

    this.planet.setInitalVelocity(this.sun);
  }
}


const engine = new GravitationEngine();
runEngine(engine);


document.getElementById("orbital-radius").addEventListener("input", (event) => {
  const newRadius = event.target.value;
  engine.adjustOrbitalRadius(parseInt(newRadius))
});

