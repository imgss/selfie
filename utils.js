

export class Rect {
  constructor(posi, width) {
    this.posi = posi
    this.x = posi[0]
    this.y = posi[1]
    this.width = width
    this.isCaptured = false
    this.image = null
  }

  draw() {
    rect(this.x, this.y, this.width, this.width);
    push();
    translate(this.x + this.width, 0);
    scale(-1.0, 1.0);

    if (this.isCaptured && capture.loadedmetadata) {
      // mirror https://github.com/processing/p5.js/issues/525
      const capWidth = Math.min(capture.width, capture.height)
      let c = capture.get(0, 0, capWidth, capWidth);
      image(c, 0, this.y, this.width, this.width);
    } else if (this.image) {
      image(this.image, 0, this.y, this.width, this.width)
    }
    pop();
  }

  save() {
    const capWidth = Math.min(capture.width, capture.height)
    this.isCaptured = false
    this.image = capture.get(0, 0, capWidth, capWidth);
  }

  isInRect(point) {
    const left = this.x
    const right = this.x + this.width
    const top = this.y
    const bottom = this.y + this.width
    return point.x < right && point.x > left && point.y < bottom && point.y > top
  }
}