import {Rect} from './utils'
import Hammer from 'hammerjs'
const $ = document.querySelector.bind(document)
const W = window.innerWidth
const H = window.innerHeight
const rectWidth = 0.25 * W
const rectPositions = [[30, 20], [10 + rectWidth * 2, 20], [20 + rectWidth, 80]]
const rects = rectPositions.map(posi => new Rect(posi, rectWidth))
console.log(rects)

window.setup = function() {
  const painter = $('.painter')
  createCanvas(painter.clientWidth, painter.clientHeight);
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

function initEvent() {
  var hammer = new Hammer(document.body);
  hammer.on('doubletap', function(e) {
    console.log(e);
    let point = e.center
    for (let rect of rects) {
      if (rect.isInRect(point)) {
        console.log(rect)
        rect.isCaptured = true
      } else {
        rect.isCaptured = false
      }
    }
  });
  // 单击相框也可以拍照
  hammer.on('tap', function(e) {
    let point = e.center
    for (let rect of rects) {
      if (rect.isInRect(point) && rect.isCaptured) {
        $('.camera-icon').click()
      }
    }
  });

  let lock = false
  $('.camera-icon').addEventListener('click', function() {
    if (lock) return
    let capRect = rects.find((rect) => rect.isCaptured)
    let count = 0
    let target = 3
    let countDown = function() {
      setTimeout(function() {
        if (count === target) {
          $('#camera-mp3').play()
          lock = false
          capRect.save()
        } else {
          $('#mp3').currentTime = 0
          $('#mp3').play()
          count++
          countDown()
        }
      }, 1000)
    }
    lock = true
    countDown()
  })
}

