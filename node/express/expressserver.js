/*
 * @Author: [JokerChen]
 * @Date: 2020-12-01 19:39:16
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-01 20:06:32
 * @Description: express用法
 * 1、创建服务
 * 2、监听服务
 * 3、处理用户请求
 */

const express=require('express');

let server=express();
// server.get('/a',(req,res)=>{
//   console.log('有get');
//   res.send('{"code":1000,"message":"成功"}');
//   // res.write('{"code":1000,"message":"成功"}');
//   res.end();
// })
// server.post('/a',(req,res)=>{
//   console.log('有Post');
//   res.send('{"code":1000,"message":"成功"}');
//   // res.write('{"code":1000,"message":"成功"}');
//   res.end();
// })

//use解决了全部的问题
server.use('/a',(req,res)=>{
  console.log();
  res.send('{"code":1000,"message":"成功"}');
  // res.write('{"code":1000,"message":"成功"}');
  res.end();
})
server.use('/b',(req,res)=>{
  console.log();
  res.send('456');
  res.write('789');
  res.end();
})
server.listen(8000);
console.log('进行监听');