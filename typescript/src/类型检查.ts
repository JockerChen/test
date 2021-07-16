/*
 * @Author: [JokerChen]
 * @Date: 2021-07-06 09:03:27
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-16 19:16:22
 * @Description: 类型检查
 */


class BasicClass {
  public prop: number;
  public count: number;
  constructor(propInfo : number,cnt :number) {
    /** @type {number | undefined} */
    this.prop = propInfo;
    /** @type {number | undefined} */
    this.count=cnt;
  }
}

let c = new BasicClass(0, 1);
c.prop = 1111;
