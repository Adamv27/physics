import runEngine, { Engine } from "./engine.js";

class GravitationEngine extends Engine {
  constructor() {
    super("orbits");
  }

  update() {

  }

  draw() {
  }
}

runEngine(new GravitationEngine())
