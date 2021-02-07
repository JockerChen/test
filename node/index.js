/*
 * @Author: JokerChen 
 * @Date: 2021-02-Sa 08:16:56 
 * @Last Modified by:   JokerChen 
 * @Last Modified time: 2021-02-Sa 08:16:56 
 */
const express=require('express');
//处理静态数据
const expressStatic=require('express-static');
const queryString=require('querystring')
//处理post请求
// 1、解析body数据
// 2、获取body数据 （post请求）
const bodyParser=require('body-parser');

var server=express();
server.get('./login',(req,res)=>{
    //此处是处理数据的
    console.log(req.query);
})
//处理post请求
//
server.use(bodyParser.urlencoded({
    extend:true,//扩展模式
    limit:2*1024*1024    //限制最大接收的数据的大小2m默认100K
}));
//
server.use('/',(req,res)=>{
    console.log(req.body);
})
//链式操作
server.use('/',(res,req,next)=>{
    console.log('a.html');
    next();

})
server.use('/',(res,req)=>{
    console.log('b.html');
})
server.listen(3000);
//什么都不带只带一个函数
//针对全路径有反应
server.use((req,res,next)=>{
    let str='';
    req.on('data',(data)=>{
        str+=data;
    })
    req.on('end',()=>{
        console.log(str);
        req.body=queryString.parse(str);
        next();
    })
})
server.use('/',(req,res,next)=>{
    //此处进行处理
    console.log(req.body);
})
