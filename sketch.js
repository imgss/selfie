import {Rect} from './utils'
import Hammer from 'hammerjs'
const $ = document.querySelector.bind(document)

const painter = $('.painter')
const rectWidth = 0.33 * painter.clientWidth
const rectPositions = [[10, 20], [rectWidth * 2 - 20, 20], [rectWidth - 10, 80]]
const rects = rectPositions.map(posi => new Rect(posi, rectWidth))
window.setup = function() {
  createCanvas(painter.clientWidth, painter.clientHeight);
  window.capture = createCapture(VIDEO);
  capture.hide();
  strokeWeight(10); 
  stroke(255, 204, 0);

  rects[0].isCaptured = true
  $('.painter').appendChild($('canvas'))
  initEvent()
}

window.draw = function() {
  background(240);
  rects.forEach(rect => {
    rect.draw()
  })
}

function initEvent() {
  const hammer = new Hammer(document.body);
  let lock = false // 拍照锁定

  hammer.on('doubletap', function(e) {
    if (lock) return
    let point = e.center
    if (rects.every(rect => !rect.isInRect(point))) return
    for (let rect of rects) {
      if (rect.isInRect(point)) {
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

  // 支持移动相框
  hammer.on('panstart', function(e) {
    let point = e.center
    for (let l = rects.length - 1; l >= 0; l--) {
      let rect = rects[l]
      if (rect.isInRect(point)) {
        console.log(rect)
        hammer.on('panmove', function(e) {
          // console.log(e)
          let center = e.center
          rect.x += center.x - point.x 
          rect.y += center.y - point.y
          point = center
        })
        hammer.on('panend', function() {
          hammer.off('panmove')
        })
        break
      }
    }
  });

  $('.save-icon').addEventListener('click', function() {
    if (rects.some(r => r.image)) {
      saveCanvas('salfie', 'jpg')
    }
  })

  $('.camera-icon').addEventListener('click', function() {
    let capRect = rects.find((rect) => rect.isCaptured)
    if (lock || !capRect) return

    let count = 0
    let target = 3
    $('.camera-icon').classList.add('count-down')
    let countDown = function() {
      setTimeout(function() {
        if (count === target) {
          $('#camera-mp3').play()
          lock = false
          capRect.save()
          $('.camera-icon').classList.remove('count-down')
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

