/*
 * @Author: [JokerChen]
 * @Date: 2020-12-02 17:22:51
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-02 20:25:48
 * @Description: cookie 和 session不安全并且不可信
 * cookie：不安全 4K    客户端
 * session 安全 无限量  服务端 是基于cookie实现的会有sessionid的ID session劫持
 * 
 */
const express=require('express');
var cookieParser = require('cookie-parser');
let server=express();
// cookie 的读取及发送
// var cookies = cookie.parse('foo=bar; equation=E%3Dmc%5E2');
//获取相应的服务
server.use(cookieParser('JokerChen'));
server.use('/',(req,res)=>{
  //对cookie进行加密(秘钥)（相当于签名防止篡改）
  req.secret='JokerChen';
  res.cookie('user','JokerChen',{ path: '/www', maxAge: 30*24*3600*1000,signed:true });
  //进行获取当前信息页面（获取签名前）
  console.log('不带签名',req.cookies);
  console.log('带签名的',req.signedCookies);
  console.log('执行去除签名前');
  res.clearCookie('user');
  console.log('执行去除签名后');
  // console.log(`签名的cookie：${req.signedCookies}`);
  //设置cookie相关信息，其中第一个参数是关键字，第二个是对一个的值，第三个是相应的可访问路径和cookie的有效时间
  // 其中path是指定在哪个目录进行读取或生效（发送cookie）

  res.send('ok');
})

server.listen(8081);
console.log('监听8081端口成功');