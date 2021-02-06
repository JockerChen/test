/*
 * @Author: [JokerChen]
 * @Date: 2020-12-02 07:43:51
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-03 07:47:49
 * @Description: 
 */
const express=require('express');
const expressStatic=require('express-static');
const queryString=require('querystring');
let server =express();
//根据express手动实现body-parser
server.post('/',(req,res,next)=>{
  let str='';
  req.on('data',(data)=>{
    str+=data;
  })
  req.on('end',()=>{
    req.body=queryString.parse(str);
    next();
  })
})
server.use('/login',(req,res)=>{
  let info=req.body;
})

//进行存放静态变量
server.use(expressStatic('./www'));

server.listen(3000)