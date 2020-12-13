/*
 * @Author: [JokerChen]
 * @Date: 2020-12-04 10:20:46
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-04 11:47:33
 * @Description: 
 */
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
let server = express();
let dataJson={
  json: {
    arr: [
      { user: 'blue', pass: '123456' },
      { user: 'zhangsan', pass: '654321' },
      { user: 'xiaoming', pass: '999999' },
    ]
  }
};
ejs.renderFile('./module/1.ejs',dataJson , function (err, data) {
  console.log(data);
  fs.writeFile('./view/2.html',data,(err)=>{
    if(err) console.log("写入失败");
    else{console.log("写入成功");}
  })
});

server.listen(8080);
