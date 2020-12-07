"use strict"
const fs = require('fs');
let input = fs.readFileSync("11.txt", 'utf8');
let words = input.split(',');

let directions = {
    'ne': { x: 1.5, y: Math.sqrt(3) / 2, contains: (angle) => { return angle >= 0 &&  angle < 60} },
    'nw': { x: -1.5, y: Math.sqrt(3) / 2, contains: (angle) => { return angle >= 120 &&  angle <= 180} },
    'se': { x: 1.5, y: -Math.sqrt(3) / 2, contains: (angle) => { return angle >= -60 &&  angle < 0} },
    'sw': { x: -1.5, y: -Math.sqrt(3) / 2, contains: (angle) => { return angle >= -180 &&  angle < -120} },
    'n': { x: 0, y: Math.sqrt(3), contains: (angle) => { return angle >= 60 &&  angle < 120} },
    's': { x: 0, y: -Math.sqrt(3), contains: (angle) => { return angle >= -120 &&  angle < -60} },
}

let position = { x: 0, y: 0};
const epsilon = 0.0001;
let maxDistance = 0;
words.forEach(element => {
    let myPos = { x: 0, y: 0}
    let counter = 0;
    let temporary = directions[element];
    position.x += temporary.x;
    position.y += temporary.y;
    while (Math.abs(myPos.x - position.x) > epsilon || Math.abs(myPos.y - position.y) > epsilon) {
        //console.log(myPos.x , position.x, myPos.y, position.y);
        let angle = Math.atan2(position.y - myPos.y, position.x - myPos.x);
        //console.log(angle);
        for (let dir in directions) {
            let temp = directions[dir];
            if (temp.contains (angle * 180 / Math.PI)) {
                myPos.x += temp.x;
                myPos.y += temp.y;
                //console.log(dir);
                //console.log(myPos);
                break;
            }
        }
        counter++;
    }
    if (counter > maxDistance) {
        maxDistance = counter;
    }
    console.log(counter);
});
console.log(maxDistance);