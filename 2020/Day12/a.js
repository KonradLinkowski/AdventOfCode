const instructionss = require("../../loader")
.split("\n")
.map((line) => {
  const dir = line[0]
  const len = +line.match(/\d+/)[0]
  return { dir, len }
})

const ship = { x: 0, y: 0, d: "E" }

for (const { dir, len } of instructionss) {
  run(ship, dir, len)
}

console.log(distance(ship.x, ship.y))

function distance(x, y) {
  return Math.abs(x) + Math.abs(y)
}

function run(ship, dir, len) {
  const map = dirMap(ship, dir, len)
  ship.x += map.x * len
  ship.y += map.y * len
  if (map.change) {
    ship.d = map.change
  }
}

function dirMap(ship, dir, len) {
  const world = {
    N: {
      x: 0,
      y: 1,
      l: {
        90: "W",
        180: "S",
        270: "E",
      },
      r: {
        90: "E",
        180: "S",
        270: "W",
      },
    },
    S: {
      x: 0,
      y: -1,
      l: {
        90: "E",
        180: "N",
        270: "W",
      },
      r: {
        90: "W",
        180: "N",
        270: "E",
      },
    },
    E: {
      x: 1,
      y: 0,
      l: {
        90: "N",
        180: "W",
        270: "S",
      },
      r: {
        90: "S",
        180: "W",
        270: "N",
      },
    },
    W: {
      x: -1,
      y: 0,
      l: {
        90: "S",
        180: "E",
        270: "N",
      },
      r: {
        90: "N",
        180: "E",
        270: "S",
      },
    },
  }

  const relative = {
    L: world[ship.d].l[len],
    R: world[ship.d].r[len],
  }

  if (dir in world) {
    const { x, y } = world[dir]
    return { x, y, change: null }
  } else if (dir in relative) {
    const d = relative[dir]
    return { x: 0, y: 0, change: d }
  } else {
    const { x, y, f } = world[ship.d]
    return { x, y, change: f }
  }
}
