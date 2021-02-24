/*
 * @Author: [JokerChen]
 * @Date: 2021-02-23 08:19:10
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-02-23 14:24:24
 * @Description: 
 */
const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const app = new Koa();
const router = new Router();
//实现 '/'、'/koa'两个路由层级
router
  .get('/', async (ctx, next) => {
    ctx.body = "Index page";
  })
  .post('/koa', async (ctx, next) => {
    ctx.body = "Koa page";
  });
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(8080);
app.use(static('www'));
