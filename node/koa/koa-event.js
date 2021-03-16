/*
 * @Author: [JokerChen]
 * @Date: 2021-03-02 10:48:07
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-03-02 10:51:22
 * @Description: koa中的event的应用
 */
const Koa = require('koa');
let server =new Koa();

server.on('koa',function () {
  console.log("在 Koa 中使用 EventEmitter");
})

server.listen(8080);