/*
 * @Author: [JokerChen]
 * @Date: 2021-07-05 18:57:20
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-16 19:03:03
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
class AnimalCls {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  move(distance: number = 0) {
    console.log(`Animal moved ${distance}m.`);
  }
}
//
class Dog extends AnimalCls {
  bark() {
    console.log("Woof! Woof!");
  }
}

class Snake extends AnimalCls {
  constructor(name: string) { super(name); }
  move(distance = 5) {
      console.log("Slithering...");
      super.move(distance);
  }
}

class Horse extends AnimalCls {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
      console.log("Galloping...");
      super.move(distanceInMeters);
  }
}
let horseInfo: AnimalCls = new Horse("Jek");
console.log(horseInfo.move(20));