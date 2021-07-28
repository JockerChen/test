/*
 * @Author: [JokerChen]
 * @Date: 2021-07-20 19:29:04
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-20 19:34:11
 * @Description: 泛型
 */
/*定义函数或类时遇到类型不明确的时候使用泛型*/
function identity<T>(arg: T): T {
  return arg;
}
console.log(identity(`info`));
console.log(identity<string>(`info111111`));
