"use strict"
let tab = [];
for (let i = 0; i < 10000; i++) {
    tab[i] = [];
    for (let j = 0; j < 10000; j++) {
        tab[i][j] = 0;
    }
}
let direction = {
    up: {
        x: 0,
        y: -1,
    },
    down:{
        x: 0,
        y: 1,
    },
    left: {
        x: -1,
        y: 0,
    },
    right: {
        x: 1,
        y: 0,
    }
}

direction.up.go = direction.left;
direction.left.go = direction.down;
direction.down.go = direction.right;
direction.right.go = direction.up;

console.log(direction);
let kierunek = direction.right;
let position = {
    x: 5000,
    y: 5000
}
tab[position.x][position.y] = 1;
for (let i = 0; true; i++) {
    console.log(position);
    position.x += kierunek.x;
    position.y += kierunek.y;
    let temp = 0;
    for (let j = position.x - 1; j <= position.x + 1; j++) {
        for (let k = position.y - 1; k <= position.y + 1; k++) {
            temp += tab[j][k];
        }
    }
    tab[position.x][position.y] = temp;
    if (tab[position.x + kierunek.go.x][position.y + kierunek.go.y] == 0) {
        kierunek = kierunek.go;
    }
    console.log(i + 1, temp);
    if (temp > 368078) {

        break;
    }
   
}

