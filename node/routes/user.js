/*
 * @Author: [JokerChen]
 * @Date: 2021-02-23 19:12:46
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-02-23 19:29:08
 * @Description: 
 */
const router = require('koa-router');
let r1 = router();
r1.get('/a', async (ctx) => {
  ctx.response.body = 'aaaa';
})
r1.get('/b', async (ctx) => {
  ctx.response.body = 'bbbb';
})
module.exports = r1.routes();