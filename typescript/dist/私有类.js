"use strict";
class Animal {
    constructor(theName) {
        this.name = theName;
    }
}
let dog = new Animal("旺财");
console.log(dog);
class Person {
    constructor(name) {
        this.name = name;
    }
}
class Employee extends Person {
    constructor(name, department) {
        super(name);
        this.department = department;
    }
    getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}
let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
class Octopus {
    constructor(theName, numberOfLegs) {
        this.numberOfLegs = 8;
        this.name = theName;
        this.numberOfLegs = numberOfLegs;
    }
}
let dad = new Octopus("Man with the 8 strong legs", 8);
let passcode = "secret passcode";
