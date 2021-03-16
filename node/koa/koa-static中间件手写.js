/*
 * @Author: [JokerChen]
 * @Date: 2021-02-26 16:13:29
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-03-02 09:02:34
 * @Description: 中间件的学习
//1、静态文件
//2、缓存
//3、压缩
//4、读取文件
 */
const Koa = require('koa');
const static = require('koa-static');
const router = require('koa-router');
const fs = require('fs');
const { rejects } = require('assert');

let server = new Koa();
server.listen(8080);
//静态文件如何自己手写
// 1、读取流的形式
// 2、读取文件的形式
// server.use(static('www'));
server.use(async (ctx) => {
  console.log(ctx.request.query);
  let rs = fs.createReadStream(`www${ctx.request.path}`);
  rs.pipe(ctx.res);
  ctx.response.body = "1111";
  rs.on('error', function () {
    ctx.res.writeHead('404');
    ctx.res.write('not found');
    ctx.res.end();
  });
})
//1、存在一个问题就是赋值操作是同步操作，但是readfile是异步操作，会存在readfile操作还没有完事
//就执行完ctx的返回操作如何写一个static的中间件
server.use(async (ctx) => {
  ctx.response.body = await new Promise((resolve, reject) => {
    fs.readFile(`www${ctx.request.path}`, (err, data) => {
      console.log(data);
      if (err) {
        console.log("aaa");
        reject(err)
      }
      else {
        console.log("bbb");
        resolve(data);
      }
    })
  })
})



