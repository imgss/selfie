export function isInRect(point, rectPosi, width) {
  const left = rectPosi[0]
  const right = rectPosi[0] + width
  const top = rectPosi[1]
  const bottom = rectPosi[1] + width
  return point[0] < right && point[0] > left && point[1] < bottom && point[1] > top
}

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
    if (this.image) {
      image(this.image, this.x, this.y, this.width, this.width)
      return
    }
    if (this.isCaptured && capture.loadedmetadata) {
      // mirror https://github.com/processing/p5.js/issues/525
      push();
      translate(this.x + this.width, 0);
      scale(-1.0, 1.0);
      let c = capture.get(0, 0, capture.height, capture.height);
      image(c, 0, this.y, this.width, this.width);
      pop();
    }
  }

  save() {
    this.image = capture.get(0, 0, capture.height, capture.height);
  }
}