/*
 * @Author: [JokerChen]
 * @Date: 2021-07-20 19:35:06
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-20 19:39:19
 * @Description:
 */
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let genericNumber = new GenericNumber<number>();
genericNumber.zeroValue = 0;
genericNumber.add = function (x, y) {
  return x + y;
}
