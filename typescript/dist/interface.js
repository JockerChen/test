"use strict";
const numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
    isAcceptable(s) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
function createSquare(config) {
    let newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
