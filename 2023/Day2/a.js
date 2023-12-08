const data = require('../../loader');

const constraints = { red: 12, green: 13, blue: 14 };

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

  maxes.id = +id;

  return maxes;
});

const possibleGames = games.filter(
  (game) =>
    game.red <= constraints.red &&
    game.green <= constraints.green &&
    game.blue <= constraints.blue
);

const sum = possibleGames.reduce((s, c) => s + c.id, 0);

console.log(sum);
