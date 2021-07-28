/*
 * @Author: [JokerChen]
 * @Date: 2021-07-16 19:52:23
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-16 20:08:33
 * @Description: 类的简介
 */
class Employer {
  //对象属性
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age; 
  }
  //类属性
  static work: string = "123123";
  sayHello() :void {
    console.log("Hello");
  }
}
