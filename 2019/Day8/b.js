const pixels = require('../../loader')
const layers = pixels.match(/\d{150}/g)
const image = []
const n = layers[0].length
for (let i = 0; i < n; i += 1) {
  image[i] = 2
  for (const layer of layers) {
    if (layer[i] != 2) {
      image[i] = layer[i]
      break
    }
  }
}

const display = image.join('').match(/\d{25}/g).join('\n').replace(/1/g, '#').replace(/0/g, ' ')
console.log(display)
