/*
 * @Author: [JokerChen]
 * @Date: 2020-12-08 20:02:26
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-08 20:27:23
 * @Description: 路由功能
 */
const express = require('express');

let server=express();

//创建路由
let routerUser=express.Router();

//将路由加入到express对象中
server.use('/user',routerUser);

//获取相关的路由信息进行配置相应的功能及返回项目
routerUser.get('/1.html',(req,res)=>{
  res.send('user1');
})
routerUser.get('/2.html',(req,res)=>{
  res.send('user2');
})
server.listen(8083);

let routerActicle=express.Router();
server.use('/acticle',routerActicle);

routerActicle.get('/1.html',(req,res)=>{
  res.send('userActicle1');
})

//读取到2相关的信息
routerActicle.get('/2.html',(req,res)=>{
  res.send('userActicle1');
})