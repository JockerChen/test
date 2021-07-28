/*
 * @Author: [JokerChen]
 * @Date: 2021-07-20 19:39:28
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-20 19:41:24
 * @Description:
 */
interface Lengthwise {
  length: number;
}
//泛型约束
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  return arg;
}
