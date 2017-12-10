"use strict"
let fs = require('fs');
let lengths = [102,255,99,252,200,24,219,57,103,2,226,254,1,0,69,216];
let list = [];

for (let i = 0; i < 256; i++) {
    list.push(i);
}
let testTab = list.slice();
function reverse(array, begin, end) {
    end = end % array.length;
    let tempArray = [];
    let diff = end >= begin ? end - begin + 1 : array.length + end - begin + 1;
    for (let i = 0, index = begin; i < diff; tempArray.push(array[index]), i++, index = index < array.length - 1 ? index + 1 : 0);
    /*
    fs.appendFileSync("output.txt", ((array) => {
        let string = 'before';
        array.forEach((number) => {
            string += number + ', ';
        });
        string += '\n';
        return string;
    })(tempArray));
    */
    tempArray = tempArray.reverse();
    /*
    fs.appendFileSync("output.txt", ((array) => {
        let string = 'after';
        array.forEach((number) => {
            string += number + ', ';
        });
        string += '\n';
        return string;
    })(tempArray));
    */
    for (let i = 0, index = begin; i < diff; array[index] = tempArray[i], i++, index = index < array.length - 1 ? index + 1 : 0);
    return array;
}
let position = 0;
let skipSize = 0;
lengths.forEach((number) => {
    /*
    fs.appendFileSync("output.txt", ((array) => {
        let string = '';
        array.forEach((number) => {
            string += number + ', ';
        });
        string += '\n';
        return string;
    })(list));
    */
    if (number != 0) {
        list = reverse(list, position, position + number - 1);
    }
    position += number + skipSize;
    if (position >= list.length) {
        position = position % list.length;
    }
    skipSize ++;
});
console.log(list[0]);
console.log(list[0] * list[1]);