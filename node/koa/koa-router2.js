/*
 * @Author: [JokerChen]
 * @Date: 2021-02-23 19:16:39
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-02-23 19:28:04
 * @Description: 
 */
const Koa=require('koa');
const static=require('koa-static');
const router=require('koa-router');
let server=new Koa();
//主路由是选择其他路由的
let oMainRouter=router();
server.use(oMainRouter.routes());
oMainRouter.use('/user',require('./routes/user'))
// oRouter.get('/a',async(ctx,next)=>{
//   ctx.response.body='aaa';
// })

// oRouter.get('/b',async(ctx,next)=>{
//   ctx.response.body='bbbbb';
// })

server.listen(8081);
server.use(static('www'));