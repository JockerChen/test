/*
 * @Author: [JokerChen]
 * @Date: 2021-02-24 18:54:24
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-02-26 16:12:24
 * @Description:  
 */
const Koa = require('koa');
const static = require('koa-static');
let server = new Koa();

//404界面 报错例子
server.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.response.body = '404';
  }
})

//性能分析（页面分析处理时间）
server.use(async (ctx, next) => {
  let start = new Date().getTime();
  await next();
  console.log(`界面加载时间${new Date().getTime() - start}ms`);
})

//性能分析
server.use(async (ctx, next) => {
  let info = 0;
  for (let i = 0; i < 10000; i++) {
    info += i;
  }
})

server.listen(8080);
server.use(static('www'));