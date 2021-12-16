const hex = require('../../loader')
const binary = hexToBin(hex)
const padded = padZeros(binary)

let versionSum = 0

const result = parsePacket(padded)

console.log(versionSum)

function parsePackets(bin, expect = Infinity) {
  let subbin = bin
  const dat = []
  const stringParts = []
  for (let i = 0; i < expect && subbin.length && +subbin != 0; i += 1) {
    const { data, string } = parsePacket(subbin)
    dat.push(data)
    stringParts.push(string)
    subbin = subbin.slice(string.length)
  }
  return { data: dat, string: stringParts.join('') }
}

function parsePacket(bin) {
  if (!bin.length) return
  const version = parseInt(bin.slice(0, 3), 2)
  versionSum += version
  const typeId = parseInt(bin.slice(3, 6), 2)
  if (typeId == 4) {
    const packetsBin = bin.slice(6).match(/^(1\d{4})*0\d{4}/)[0]
    const packets = packetsBin.match(/\d{5}/g)
    const result = packets.map(packet => packet.slice(1)).join('')
    return { data: result, string: bin.slice(0, 6 + packetsBin.length) }
  }
  
  const lengthTypeId = +bin[6]
  if (lengthTypeId) {
    const numberOfPackets = parseInt(bin.slice(7, 18), 2)
    const { data, string } = parsePackets(bin.slice(18), numberOfPackets)
    return { data, string: bin.slice(0, 18) + string }
  } else {
    const totalLength = parseInt(bin.slice(7, 22), 2)
    const { data, string } = parsePackets(bin.slice(22, 22 + totalLength))
    return { data, string: bin.slice(0, 22) + string }
  }
}

function padZeros(binary) {
  const len = binary.length
  const lenBy4 = len / 4
  const lenBy4Floored = lenBy4 | 0
  if (lenBy4 == lenBy4Floored) return binary
  return binary.padStart((lenBy4Floored + 1) * 4, '0')
}

function hexToBin(hex) {
  return hex.replace(/./g, c => parseInt(c, 16).toString(2).padStart(4, '0'))
}
