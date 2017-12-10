"use strict"
var fs = require('fs');
//let string = '0\t2\t7\t0';
let string = '10	3	15	10	5	15	5	15	9	2	5	8	5	2	3	6';
let array = [];
let knownArrays = [];
let words = string.split('\t');
for (let i = 0; i < words.length; i++) {
    array[i] = parseInt(words[i]);
}
knownArrays.push(array.slice());
let tempArray = [0];

function findMax(array) {
    let max = 0;
    let index;
    for (let i = 0; i < array.length; i++) {
        if (max < array[i]) {
            max = array[i];
            index = i;
        }
    }
    return index;
}

function compareArrays(first, second) {
    if (first.length != second.length) {
        process.exit(-100);
    }
    for (let i = 0; i < first.length; i++) {
        if (first[i] != second[i]) {
            return false;
        }
    }
    return true;
}

function contains (array, counter) {
    for (let i = 0; i < knownArrays.length; i++) {
        if (compareArrays(array, knownArrays[i])) {
            return true;
        }
    }
    knownArrays.push(array.slice());
    tempArray.push(counter);
    return false;
}


let counter = 0;
let temp;
let index;
do {
    //fs.appendFileSync('message.txt', array + '\n');
    counter++;
    index = findMax(array);
    temp = array[index];
    array[index] = 0;
    while (temp != 0) {
        index++;
        if (index >= array.length) {
            index = 0;
        }
        array[index]++;
        temp--;   
    }
} while (!contains(array, counter));
console.log(tempArray.length, knownArrays.length);
for (let i = 0; i < knownArrays.length; i++) {
    if (compareArrays(knownArrays[i], array)) {
        console.log(counter - tempArray[i]);
        break;
    }
}
//console.log(tempArray);
console.log(counter);