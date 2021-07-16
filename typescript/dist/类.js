"use strict";
class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let greeter = new Greeter("world");
console.log(greeter.greet());
class AnimalCls {
    constructor(name) {
        this.name = name;
    }
    move(distance = 0) {
        console.log(`Animal moved ${distance}m.`);
    }
}
class Dog extends AnimalCls {
    bark() {
        console.log("Woof! Woof!");
    }
}
class Snake extends AnimalCls {
    constructor(name) { super(name); }
    move(distance = 5) {
        console.log("Slithering...");
        super.move(distance);
    }
}
class Horse extends AnimalCls {
    constructor(name) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}
let horseInfo = new Horse("Jek");
console.log(horseInfo.move(20));
