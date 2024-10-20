export class Engine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 500
    this.canvas.height = 500
    this.ctx = this.canvas.getContext("2d");
  }

  update(seconds_passed) {
  }
 
  draw() {
  }

  clearCanvas() {
    this.ctx.fillStyle = "#FFFFFF"
    this.ctx.fillRect(0, 0, 500, 500);
  }
}


export default function runEngine(engine) {
  let last_render = performance.now(); 

  function frame(timestamp) {
    const seconds_passed = (timestamp - last_render) / 1000;
    
    engine.update(seconds_passed)
    engine.clearCanvas()
    engine.draw()

    last_render = timestamp
    window.requestAnimationFrame(frame);
  }
  window.requestAnimationFrame(frame);
}

