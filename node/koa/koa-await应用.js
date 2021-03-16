/*
 * @Author: [JokerChen]
 * @Date: 2021-02-24 18:54:24
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-03-02 09:04:06
 * @Description:  根据await进行404界面的呈现和性能分析
 */
const Koa = require('koa');
const static = require('koa-static');
let server = new Koa();

//404界面
server.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.response.body = '404';
  }
})

//性能分析
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
console.log(module);
server.listen(8080);
server.use(static('www'));