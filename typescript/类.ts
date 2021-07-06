/*
 * @Author: [JokerChen]
 * @Date: 2021-07-05 18:57:20
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-05 19:48:25
 * @Description: OOP相关的
 */
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
console.log(greeter.greet());
//继承相关
class Animal {
  move(distance: number = 0) {
    console.log(`Animal moved ${distance}m.`);
  }
}
//
class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}

class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distance = 5) {
      console.log("Slithering...");
      super.move(distance);
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
      console.log("Galloping...");
      super.move(distanceInMeters);
  }
}
let horseInfo: Animal = new Horse("Jek");
console.log(horseInfo.move(20));