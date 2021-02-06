/*
 * @Author: [JokerChen]
 * @Date: 2020-12-02 07:57:53
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-02 08:14:25
 * @Description: 
 */
const express = require('packageName');
const bodyParser = require('body-parser');
let server=express();
server.use(bodyParser.urlencoded({
  limit:2*1024*1024,
  extended:false
}))
//登录接口
server.use('/login',(req,res)=>{
  //body-parser 中间件将存储的数据序列化成req.body属性，根据js的原型链带到相应的使用数据中
  res.send('welcome, ' + req.body.username)
  let info=req.body;
})


server.listen(3000);