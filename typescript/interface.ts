/*
 * @Author: [JokerChen]
 * @Date: 2021-07-06 08:25:11
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-06 08:50:33
 * @Description:接口相关
 */
export const numberRegexp = /^[0-9]+$/;
interface StringValidator {
  isAcceptable(s: string): void;
}

//实现
class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
/*****************************************************/
//接口的可选属性
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
