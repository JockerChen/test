"use strict";
let pets = new Set(["Cat", "Dog", "Horse"]);
for (let pet in pets) {
    console.log(pet);
}
for (let pet of pets) {
    console.log(pet);
}
