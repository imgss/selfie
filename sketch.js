import {isInRect} from './utils'
const $ = document.querySelector.bind(document)
const W = window.innerWidth
const H = window.innerHeight
const rectWidth = 0.25 * W
const rectPositions = [[30, 20], [10  + rectWidth * 2, 20], [20 + rectWidth, 80]]
let capPosition = rectPositions[0] // 在哪个相框显示视频
const pics = [] //照片数组
let capture

window.setup = function() {
  createCanvas(W * 0.8, H);
  capture = createCapture(VIDEO);
  capture.hide();
  $('.painter').appendChild($('canvas'))
  background(240);
  strokeWeight(10); 
  stroke(255, 204, 0);
  rectPositions.forEach(posi => {
    rect(posi[0], posi[1], rectWidth, rectWidth);
  })
  initEvent()
}

window.draw = function() {
  if (capture.loadedmetadata) {
    // mirror https://github.com/processing/p5.js/issues/525
    push();
    translate(capPosition[0] + rectWidth, 0);
    scale(-1.0,1.0);
    let c = capture.get(0, 0, capture.height, capture.height);
    image(c, 0, capPosition[1], rectWidth, rectWidth);
    pop();
  }
}

window.doubleClicked = function(event) {
  console.log(event);
  let point = [event.clientX, event.clientY]
  for (let rect of rectPositions) {
    if (isInRect(point, rect, rectWidth)) {
      capPosition = rect
      this.console.log(rect)
      break
    }
  }
}

function initEvent() {
  $('.camera-icon').addEventListener('click', function() {
    setTimeout(function() {
      saveCanvas('p1', 'jpg')
    }, 3000)
  })
}
