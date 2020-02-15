export function isInRect(point, rectPosi, width) {
  const left = rectPosi[0]
  const right = rectPosi[0] + width
  const top = rectPosi[1]
  const bottom = rectPosi[1] + width
  return point[0] < right && point[0] > left && point[1] < bottom && point[1] > top
}