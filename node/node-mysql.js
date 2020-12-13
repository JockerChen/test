/*
 * @Author: [JokerChen]
 * @Date: 2020-11-30 15:28:36
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-10 15:16:32
 * @Description: 测试之前的服务端的相关内容，尝试进行编写相应的接口
 */
const fs = require('fs');
const mysql = require('mysql');
//进行注册MYSQL(数据库连接层)
let db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'test',
  maxConnection: 10
})
const http = require('http');
const url = require('url');
let httpServer = http.createServer((req, res) => {
  let { pathname, query } = url.parse(req.url, true);
  let { username, password } = query;
  if (pathname == '/reg') {
    //注册接口
    let querySql = `select * from user_table where username='${username}'`;
    db.query(querySql, (err, json) => {
      if (err) {
        console.log('查询错误');
        res.writeHead('500');
        res.write('{"code":200,"message":"数据查询信息错误"}');
        res.end();
      }
      else {
        //此处处理功能
      }
    });
    console.log('注册功能');
    res.writeHead('200', '注册成功');
    res.end();
  }
  else if (pathname == '/login') {
    //登录功能
    console.log('登录功能');
    res.writeHead('200', '登录功能');
    res.end();
  }
  else {
    fs.readFile(`html${req.url}`, (err, data) => {
      if (err) {
        res.writeHead(404);
        console.log("读取文件错误");
      }
    })
  }
})
//服务监听80端口
http.listen('8080');
//对应的相应的后台接口相应的回复

