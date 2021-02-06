/*
 * @Author: [JokerChen]
 * @Date: 2020-12-04 18:58:34
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-08 15:28:22
 * @Description: multer 文件上传的中间件
 */
const express=require('express');
const multer=require('multer');
const pathLib=require('path');
const fs=require('fs');

let server=express();

let oMulter=multer({
  dest:"./www/upload/"
});
//这个是对应的name相关的
server.use(oMulter.any()); 
server.post('/',(req,res)=> {
  //获取上传的文件信息
  console.log(req.files[0]);
  //获取替换后的文件信息
  let renamePath=req.files[0].path+pathLib.parse(req.files[0].originalname).ext;
  //进行重命名
  fs.rename(req.files[0].path,renamePath,function(err){  //将c 文件夹名字 改为  d
    if(err) throw err;
    console.log('文件上传成功');
    res.write('文件上传成功');
    res.end();
  })
  
})
server.listen(8080);

// server.use(expressStatic('./view'));
  