/*
 * @Author: [JokerChen]
 * @Date: 2020-12-01 08:34:37
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-01 14:10:18
 * @Description: 登录接口
 */
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');
let users={};
let httpServer = http.createServer((req, res) => {
  let getJsonObj = "";
  if (req.method == 'GET') {
    //get请求
    let obj = urlLib.parse(req.url, true);
    let url = obj.pathname;
    getJsonObj = obj.query;
    if (url == '/user') {
      switch (getJsonObj.act) {
        case 'reg':
          //1、用户名是否有了
          //2、进行插入
          if(users[getJsonObj.act]){

          }
          else{

          }
          break;
        case 'login':
          //1、用户名是否有了
          //2、进行查询
          break;
        default:
          break;
      }
    }
  }
  else if (req.method == 'POST') {
    let str = '';
    //post请求
    req.on('data', (data) => {
      str += data;
    })
    req.on('end', () => {
      getJsonObj = querystring.parse(str);
    })
  }
  else {
    //文件请求
    fs.readFile(`../html/${req.url}`, 'utf-8', (err, data) => {
      if (err) {
        console.log(`对不起，当前的请求的文件数据错误`);
        res.writeHead('400');
        res.write('{"code":"1","message":"当前文件不存在"}');
        res.end();
      }
    })
  }
  //此处进行判断当前的URL的状态
  if (url == '/login') {
    let { username, password } = getJsonObj;
    //此处进行数据库处理
  }
  else if (url == '/regin') {
    //此处进行数据库处理
  }
})        

httpServer.listen('9000');