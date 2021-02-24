/*
 * @Author: [JokerChen]
 * @Date: 2020-11-23 20:00:04
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-02-23 14:23:16
 * @Description: koa 强依赖route 服务没有get和post都是用use进行数据处理
 */
const Koa = require('koa');
const route = require('koa-route');
const static = require('koa-static');
const server = new Koa();
// server.env 默认是 NODE_ENV 或 "development"
// server.keys 签名的 cookie 密钥数组
// server.proxy 当真正的代理头字段将被信任时
// 忽略 .subdomains 的 server.subdomainOffset 偏移量，默认为 2
// server.proxyIpHeader 代理 ip 消息头, 默认为 X-Forwarded-For
// server.maxIpsCount 从代理 ip 消息头读取的最大 ips, 默认为 0 (代表无限)

//接口部分(可以直接进行接收)路由模式抓取
server.use(route.get('/reg/:user/:pass', async (ctx, user, pass, next) => {
  //获取用户名和密码
  console.log(user);
  console.log(pass);
  ctx.body = '访问的是注册请求';
  ctx.status = 200;
}))
//普通get形式抓取
server.use(route.get('/login', async (ctx, next) => {
  console.log(ctx.request.query);
  ctx.body = '访问的是登录请求';
  ctx.status = 200;
}))
//监听
server.listen(8080);

//静态文件(通过)
server.use(static('www'));

