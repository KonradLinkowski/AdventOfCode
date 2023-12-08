const data = require('../../loader');

const games = data.split('\n').map((line) => {
  const [id] = line.match(/\d+/);
  const cubes = [...line.matchAll(/(\d+) (\w+)/g)].map(([, num, cube]) => ({
    num: +num,
    cube,
  }));

  const maxes = cubes.reduce((acc, c) => {
    if (!(c.cube in acc) || c.num > acc[c.cube]) {
      acc[c.cube] = c.num;
    }

    return acc;
  }, {});

  return maxes;
});

const gamesPowers = games.map((game) =>
  Object.values(game).reduce((s, c) => s * c)
);

const sum = gamesPowers.reduce((s, c) => s + c, 0);

console.log(sum);
