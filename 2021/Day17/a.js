const [minX, maxX, minY, maxY] = require('../../loader').match(/-?\d+/g).map(Number)

let best = 0
for (let y = 0; y <= 1000; y += 1) {
  for (let x = 1; x <= 1000; x += 1) {
    const result = testProbe(x, y)
    if (result != null) {
      best = result
    }
  }
}

console.log(best)

function testProbe(startX, startY) {
  let currentX = 0
  let currentY = 0
  let velocityX = startX
  let velocityY = startY
  let maxHeight = 0
  while (currentX <= maxX && currentY >= minY) {
    currentX += velocityX
    currentY += velocityY
    velocityX += velocityX < 0 ? 1 : velocityX > 0 ? -1 : 0
    velocityY -= 1
    if (currentY > maxHeight) {
      maxHeight = currentY
    }
    if (currentX >= minX && currentX <= maxX && currentY >= minY && currentY <= maxY) {
      return maxHeight
    }
  }
  return null
}
