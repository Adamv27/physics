export class Vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    if (v instanceof Vector2d) return new Vector2d(this.x + v.x, this.y + v.y);
    return new Vector2d(this.x + v, this.y + v)
  }

  sub(v) {
    if (v instanceof Vector2d) return new Vector2d(this.x - v.x, this.y - v.y);
    return new Vector2d(this.x - v, this.y - v)
  }

  multiply(v) {
    if (v instanceof Vector2d) return new Vector2d(this.x * v.x, this.y * v.y);
    return new Vector2d(this.x * v, this.y * v)
  }

  dot(v) {
    if (v instanceof Vector2d) return this.x * v.x + this.y * v.y;
    return this.x * v + this.y * v;
  }

  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  norm() {
    const mag = this.magnitude();
    return new Vector2d(this.x / mag, this.y / mag)
  }
}
