import {Rect} from './utils'
const $ = document.querySelector.bind(document)
const W = window.innerWidth
const H = window.innerHeight
const rectWidth = 0.25 * W
const rectPositions = [[30, 20], [10 + rectWidth * 2, 20], [20 + rectWidth, 80]]
const rects = rectPositions.map(posi => new Rect(posi, rectWidth))

window.setup = function() {
  createCanvas(W * 0.8, H);
  window.capture = createCapture(VIDEO);
  capture.hide();
  background(240);
  strokeWeight(10); 
  stroke(255, 204, 0);

  rects[0].isCaptured = true
  $('.painter').appendChild($('canvas'))
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
    if (rect.isInRect(point)) {
      rect.isCaptured = true
    } else {
      rect.isCaptured = false
    }
  }
}

function initEvent() {
  $('.camera-icon').addEventListener('click', function() {
    let capRect = rects.find((rect) => rect.isCaptured)
    let count = 0
    let target = 3
    let countDown = function() {
      console.log(count)
      setTimeout(function() {
        if (count === target) {
          $('#camera-mp3').play()
          capRect.save()
        } else {
          $('#mp3').currentTime = 0
          $('#mp3').play()
          count++
          countDown()
        }
      }, 1000)
    }
    countDown()
  })
}

