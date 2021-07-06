/*
 * @Author: [JokerChen]
 * @Date: 2021-07-06 09:03:27
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-06 09:13:50
 * @Description: 类型检查
 */
/** @type {number} */
var x;
x = 0; // OK
x = false; // Error: boolean is not assignable to number
console.log(x);
var C = /** @class */ (function () {
    function C() {
        /** @type {number | undefined} */
        this.prop = undefined;
        /** @type {number | undefined} */
        this.count;
    }
    return C;
}());
var c = new C();
c.prop = 0; // OK
c.count = "string";
