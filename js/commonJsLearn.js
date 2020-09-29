/*
 * @Author: [JokerChen]
 * @Date: 2020-09-26 15:58:18
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-09-26 16:41:42
 * @Description: 
 */
var flag=false;
function test(a,b) {
  return  a+b;
}
function demo(a,b) {
  return  a*b;
}


 
 //commonjs规范
 //导出

module.exprots= {
    flag:flag,
    test:test,
    demo:demo
}
 //导入

// var {flag,test,demo} =require("moduleA");

var {flag,test,demo} =require("moduleA.js");//require的内容是当前文件的js路径
// 或者
var _ma=require("moduleA");
var flag=_ma.flag;
var test=_ma.test;
