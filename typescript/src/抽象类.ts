/*
 * @Author: [JokerChen]
 * @Date: 2021-07-06 08:18:23
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-17 16:40:34
 * @Description: 抽象类
 */

abstract class AnimalBasic {  
  constructor() { }
  //抽象方法没有方法体
  abstract makeSound(): void;
  public move(): void {
    console.log(`move`);
  }
}
