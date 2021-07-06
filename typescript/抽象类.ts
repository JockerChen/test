/*
 * @Author: [JokerChen]
 * @Date: 2021-07-06 08:18:23
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-06 08:20:35
 * @Description: 抽象类
 */

abstract class Animal {
  constructor(parameters) {}
  abstract makeSound(): void {}
  /**
   * move
   */
  public move(): void {
    console.log(`move`);
  }
}
