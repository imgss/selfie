import {isInRect, Rect} from './utils'
const $ = document.querySelector.bind(document)
const W = window.innerWidth
const H = window.innerHeight
const rectWidth = 0.25 * W
const rectPositions = [[30, 20], [10 + rectWidth * 2, 20], [20 + rectWidth, 80]]
let capPosition = rectPositions[0] // 在哪个相框显示视频

const rects = rectPositions.map(posi => new Rect(posi, rectWidth))
window.setup = function() {
  createCanvas(W * 0.8, H);
  window.capture = createCapture(VIDEO);
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
  rects.forEach(rect => {
    rect.draw()
  })
}

window.doubleClicked = function(event) {
  console.log(event);
  let point = [event.clientX, event.clientY]
  for (let rect of rects) {
    if (isInRect(point, rect.posi, rectWidth)) {
      rect.isCaptured = true
    } else {
      rect.isCaptured = false
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

