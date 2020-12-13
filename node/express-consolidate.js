/*
 * @Author: [JokerChen]
 * @Date: 2020-12-08 19:02:36
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-08 19:46:04
 * @Description: 适配器统一的接口
 */
const express=require('express');
//不需要再引入了jade和ejs了
const consolidate=require('consolidate');
let server =express();
//4.配置模板引擎
//输出什么东西
server.set('view engine', 'html');
// server.set('view engine', 'excel');
//模板文件放在哪儿
server.set('views', './module');
//哪种模板引擎
server.engine('html', consolidate.jade);
// server.engine('excel', consolidate.jade);
server.listen(8000);

server.get('/index',(req,res)=>{
  res.render('1.jade',{
    pretty:true,
    name:'Joker',
    c:11,
    d:12,
    arr:['123','456','789','ceshi'],
    content:'<h2>留言功能</h2>'
  })    
})