/*
 * @Author: [JokerChen]
 * @Date: 2021-07-05 19:49:02
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-06 08:04:12
 * @Description:
 */

class Animal {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}
let dog: Animal = new Animal("旺财");
console.log(dog);

class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }
  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}
//
let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());

//readonly修饰符
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName;
  }
}

let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.

//存取器getter setter
let passcode = "secret passcode";

let employor = new Person();
employor.fullName = "Bob Smith";
if (employor.fullName) {
  alert(employor.fullName);
}
