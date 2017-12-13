"use strict"
let input = `0: 4
1: 2
2: 3
4: 4
6: 8
8: 5
10: 6
12: 6
14: 10
16: 8
18: 6
20: 9
22: 8
24: 6
26: 8
28: 8
30: 12
32: 12
34: 12
36: 12
38: 10
40: 12
42: 12
44: 14
46: 8
48: 14
50: 12
52: 14
54: 14
58: 14
60: 12
62: 14
64: 14
66: 12
68: 12
72: 14
74: 18
76: 17
86: 14
88: 20
92: 14
94: 14
96: 18
98: 18`;
let scanners = [];
let list = [];
let directions = [];
input = input.replace(/:/g, "");
input = input.split('\n');
for (let i = 0; i < input.length; i++) {
    let temp = input[i].split(' ');
    list[parseInt(temp[0])] = parseInt(temp[1]);
    scanners[parseInt(temp[0])] = 0;
    directions[parseInt(temp[0])] = 1;
}
let position = -1;
let severity = 0;
for (let i = 0; i < list.length; i++) {
    position ++;
    if (scanners[position] == 0) {
        severity += position * list[i];
    }
    for (let param in scanners) {
        scanners[param] += directions[param];
        if (scanners[param] >= list[param] - 1) {
            directions[param] = -1;
        } else if (scanners[param] == 0) {
            directions[param] = 1;
        }
    }
}
console.log(severity);