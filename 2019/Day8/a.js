const pixels = require('../../loader')
const layers = pixels.match(/\d{150}/g)
const data = layers.map(layer => {
  const zeros = layer.match(/0/g).length
  return {
    layer,
    zeros
  }
}).sort((a, b) => a.zeros - b.zeros)

const ones = data[0].layer.match(/1/g).length
const twos = data[0].layer.match(/2/g).length

console.log(ones * twos)
