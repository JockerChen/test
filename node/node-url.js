/*
 * @Author: [JokerChen]
 * @Date: 2021-03-16 14:09:25
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-03-16 14:12:56
 * @Description: 
 */
const url = require('url');
let str = 'http://Chyingp:HelloWorld@ke.qq.com:8080/index.html?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1#part=1';
// var obj = url.parse(str);
// console.log(obj);
// console.log(obj.hostname);
var obj = url.parse(str, true);
console.log(obj);
//获取整理后的参数信息
console.log(obj.query.nick);