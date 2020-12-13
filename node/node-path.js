/*
 * @Author: [JokerChen]
 * @Date: 2020-10-16 15:17:55
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-08 13:37:47
 * @Description: 
 */
const path=require('path');
let pathTest='https://www.baidu.com/login.aspx';
let pathObj=path.parse(pathTest);
console.log(pathObj.dir);
console.log(pathObj.base);
console.log(pathObj.ext);
console.log(pathObj.name);
console.log(pathObj);
