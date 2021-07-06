/*
 * @Author: [JokerChen]
 * @Date: 2021-07-06 08:04:28
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-06 08:08:09
 * @Description:
 */
class Person {
  constructor() {}
  private _name: string;
  public get name() {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }
}
let xiaoming = new Person();
xiaoming.name = "xiaoming";
console.log(xiaoming.name);