/*
 * @Author: [JokerChen]
 * @Date: 2020-07-18 13:41:43
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-07-18 13:42:39
 * @Description: 
 */ 
const ex1 = 'xxx';
const fun = function () { };
export { ex1, fun as demofun };
export let ex2 = 'demo';
export function multi(x, y) {
    return x * y;
}