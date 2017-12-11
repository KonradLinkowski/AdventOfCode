"use strict"
let input = '102,255,99,252,200,24,219,57,103,2,226,254,1,0,69,216';
let lengths = [];
for (let i = 0; i <input.length; i++) {
    lengths.push(input[i].charCodeAt(0));
}

[17, 31, 73, 47, 23].forEach(element => {
    lengths.push(element);
});
let list = [];
for (let i = 0; i < 256; i++) {
    list.push(i);
}
function reverse(array, begin, end) {
    end = end % array.length;
    let tempArray = [];
    let diff = end >= begin ? end - begin + 1 : array.length + end - begin + 1;
    for (let i = 0, index = begin; i < diff; tempArray.push(array[index]), i++, index = index < array.length - 1 ? index + 1 : 0);
    tempArray = tempArray.reverse();
    for (let i = 0, index = begin; i < diff; array[index] = tempArray[i], i++, index = index < array.length - 1 ? index + 1 : 0);
    return array;
}
let position = 0;
let skipSize = 0;
for (let i = 0; i < 64; i++) {
    lengths.forEach((number) => {
        if (number != 0) {
            list = reverse(list, position, position + number - 1);
        }
        position += number + skipSize;
        if (position >= list.length) {
            position = position % list.length;
        }
        skipSize ++;
    });
}
let denseHash = "";
let tempNum = 0;
for (let i = 0; i < list.length; i++) {
    tempNum ^= list [i];
    if (i % 16 == 15) {
        console.log(tempNum);
        denseHash += ('000' + tempNum.toString(16)).substr(-2);
        tempNum = 0;
    }
}
console.log(denseHash);