/*
 * @Author: [JokerChen]
 * @Date: 2020-12-01 20:06:58
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-01 20:34:52
 * @Description: 
 * 1、对接口进行相应
 * 2、对文件进行相应====>相应文件
 * 3、中间件（）  npm search
 */
const express=require('express');
const expressStatic=require('express-static');
let server=express();
server.use('/favicon.ico',(req,res)=>{})
server.use('/a',(req,res)=>{})
server.use('/b',(req,res)=>{})
//获取登录服务信息
server.get('/login',(req,res)=>{
  //express提供的方法去处理相应的数据信息。
  //此处取出相应的
  let username=req.query['username'];
  let password=req.query['password'];
  res.send({"code":200,"message":"用户信息错误"});
  res.end();
  //获取请求数据的信息
})
//静态文件的读取方法expressStatic()函数的参数是需要去哪读取的数据信息
//获取中间件的静态信息
server.use(expressStatic('./www'))
server.listen(6000);