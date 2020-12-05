const edges = require('../../loader').split('\n').map(e => {
  const [_, from, to, distance] = e.match(/([A-Z][a-z]+).*?([A-Z][a-z]+).*?([0-9]+)/)
  return { from, to, distance: +distance }
})

const cities = [...new Set(edges.flatMap(e => [e.from, e.to]))]
console.log(cities)

calcBest(cities, edges)

function calcBest(cities, edges) {
  cities.forEach(e => req(e))
  function req(city, visited = [], distance = 0) {
    const available = edges.filter(e => e.from == city).filter(e => !visited.includes(e.to))
    if (available.length == 0) {
      console.log(visited, distance)
      return distance
    }
    return Math.min(...available.map(e => req(e, [...visited, city], distance + e.distance)))
  }
}
