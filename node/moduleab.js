/*
 * @Author: [JokerChen]
 * @Date: 2020-10-23 19:50:17
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-08 19:56:19
 * @Description: 模块引用的时候当想引用自己的模块则进行./路径操作
 * 模块化的好处可以进行私有变量的一些控制，更安全，node没有全局变量
 */
var a=require("./modulea");
console.log(a.add(1,2));
console.log(a.NoticeClass);
console.log(a.info);

// console.log(`请求缓存${require.cache}`);
// let a1=1;
// let a2=3;
// console.log(a.add(a1,a2));  