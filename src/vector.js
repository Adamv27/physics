class Vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    this.x += other.x;
    this.y += other.y;
  }

  sub(other) {
    this.x -= other.x; 
    this.y -= other.y;
  }

  dot(other) {
    return this.x * other.x + this.y * other.y;
  }

  magnitude() {
    return Math.sqrt(this.reduce((sum, currentVal) => {
      return sum + currentVal ** 2
    }, 0))
  }
}
