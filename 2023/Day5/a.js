const file = require('../../loader');
const parts = file.split('\n\n');

const seeds = parts
  .find((p) => p.startsWith('seeds'))
  .match(/\d+/g)
  .map(Number);

const getMap = (name) =>
  parts
    .find((p) => p.startsWith(name))
    .split('\n')
    .slice(1)
    .map((l) => l.match(/\d+/g).map(Number));

const seedsToSoil = getMap('seed-to-soil');

const soilToFertilizer = getMap('soil-to-fertilizer');

const fertilizerToWater = getMap('fertilizer-to-water');

const waterToLight = getMap('water-to-light');

const lightToTemperature = getMap('light-to-temperature');

const temperatureToHumidity = getMap('temperature-to-humidity');

const humidityToLocation = getMap('humidity-to-location');

const order = [
  seedsToSoil,
  soilToFertilizer,
  fertilizerToWater,
  waterToLight,
  lightToTemperature,
  temperatureToHumidity,
  humidityToLocation,
];

const min = Math.min(
  ...seeds.map((seed) => {
    let current = seed;
    for (const map of order) {
      const range = map.find(
        (range) => current >= range[1] && current <= range[1] + range[2]
      );
      if (range) {
        const diff = range[0] - range[1];
        current += diff;
      }
    }
    return current;
  })
);

console.log(min);
