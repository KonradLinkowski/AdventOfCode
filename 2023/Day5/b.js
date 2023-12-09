const file = require('../../loader');
const parts = file.split('\n\n');

const seedRanges = parts
  .find((p) => p.startsWith('seeds'))
  .match(/\d+/g)
  .map(Number)
  .reduce((n, c, i) => {
    if (i % 2) {
      n.at(-1).push(c);
    } else {
      n.push([c]);
    }
    return n;
  }, []);

const getMap = (name) => {
  const map = parts
    .find((p) => p.startsWith(name))
    .split('\n')
    .slice(1)
    .map((l) => l.match(/\d+/g).map(Number));
  map.name = name;
  return map;
};

const seedsToSoil = getMap('seed-to-soil');

const soilToFertilizer = getMap('soil-to-fertilizer');

const fertilizerToWater = getMap('fertilizer-to-water');

const waterToLight = getMap('water-to-light');

const lightToTemperature = getMap('light-to-temperature');

const temperatureToHumidity = getMap('temperature-to-humidity');

const humidityToLocation = getMap('humidity-to-location');

const order = [
  temperatureToHumidity,
  lightToTemperature,
  waterToLight,
  fertilizerToWater,
  soilToFertilizer,
  seedsToSoil,
];

const getValue = (map, value) => {
  const mapRange = map.find(
    (range) => value >= range[0] && value < range[0] + range[2]
  );

  const final = mapRange ? value + mapRange[1] - mapRange[0] : value;

  return final;
};

const locationsSorted = humidityToLocation.toSorted((a, b) => a[0] - b[0]);
locationsSorted.unshift([0, 0, locationsSorted[0][0]]);

main: for (const locationRange of locationsSorted) {
  for (let i = 0; i < locationRange[2]; i += 1) {
    const finalSeed = locationRange[0] + i;
    let current = locationRange[1] + i;

    for (const map of order) {
      current = getValue(map, current);
    }
    if (seedRanges.some((r) => current >= r[0] && current < r[0] + r[1])) {
      console.log(finalSeed);
      break main;
    }
  }
}
