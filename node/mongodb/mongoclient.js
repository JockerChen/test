/*
 * @Author: [JokerChen]
 * @Date: 2021-08-05 18:53:26
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-08-06 09:15:17
 * @Description: 
 */
var app=require("./app");

var whereStr = {"name" : "菜鸟教程"};  // 查询条件
let promise=app.find("site",whereStr);
promise.then(function (res) {
  console.log(JSON.stringify(res));
})