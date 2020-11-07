/*
 * @Author: [JokerChen]
 * @Date: 2020-10-31 15:01:09
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-11-02 16:25:43
 * @Description: host和hostname的区别
 */
const http = require('http');
const fs = require('fs');
const io = require('socket.io');
const mysql = require('mysql');
//处理url获取的URL
const url = require('url');
//自己的申请的
const regMod = require('./libs/regs');
let sockArr=[];
//进行mysql连接
let db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'imeasy',
  maxConnection: 10
})

let httpServer = http.createServer((req, res) => {
  console.log('接收到客户端请求' + req.url);
  console.log('接收到客户端的URL:' + JSON.stringify(url.parse(req.url)));
  //解构赋值，将pathname 和相应的数据部分进行分离
  let { pathname, query } = url.parse(req.url, true);
  console.log(pathname);
  console.log(JSON.stringify(query));
  //解构获取到对应的用户名和密码
  let { username, password } = query;
  console.log(`接收到客户端的URL:用户名${username}，密码：${password}`);
  //进行接口的判定
  if (pathname == "/reg") {
    //注册功能
    console.log('注册功能!');
    //数字字母下划线6~32位
    if (!regMod.username.test(username)) {
      res.write('{"code":1,"messsage":"对不起，您输入的用户名不规范"}');
      res.end();
    }
    if (!regMod.password.test(password)) {
      res.write('{"code":1,"messsage":"对不起，您输入的密码不规范"}');
      res.end();
    }
    //此处进行请求数据库操作
    let selSql = `select * from user_table where username='${username}'`;
    db.query(selSql, (err, data) => {
      if (data.length > 0) {
        res.write('{"code":1,"messsage":"对不起，当前用户已注册"}');
        res.end();
      }
      else {
        let insRegSql = `insert into user_table(ID,username,password,online) values ('2','${username}','${password}','0')`;
        console.log("插入操作：" + insRegSql);
        db.query(insRegSql, (err, data) => {
          if (err) { console.log(`插入失败！${err}`); }
          else {
            res.write('{"code":0,"messsage":"注册成功"}');
            res.end();
          }
        })
      }
    })
  }
  else if (pathname == "/login") {
    //登录功能
    if (/^\w{6,32}/.test(username)) {
      console.log('登录失败，输入的用户名有误!');
      res.write(`登录失败，输入的数据有误!`);
      res.end();
    }
    else if (/^*{6,32}/.test(password)) {
      console.log('登录失败，输入的密码有误!');
      res.write(`登录失败，输入的密码有误!`);
      res.end();
    }
    else {
      let selLoginSQL = `select count(*) as loginCnt from user_table where username='${username}' and password ='${password}'`;
      db.query(selLoginSQL, (err, data) => {
        if (err) {
          console.log(`对不起，您访问的数据库有问题，请联系服务厂家进行处理`);
          res.writeHead(500);
          res.write('{"code":1,"messsage":"对不起，您访问的数据库有问题，请联系服务厂家进行处理"}');
          res.end();
        }
        else if (data[0].loginCnt > 0) {
          res.write('{"code":0,"messsage":"注册成功"}');
          res.end();
        }
        else {
          res.write('{"code":1,"messsage":"对不起，登录失败，输入的用户名密码错误"}');
          res.end();
        }
      })
    }
  }
  else {
    //页面加载此处进行处理相当于中转路由
    fs.readFile(`html${req.url}`, (err, data) => {
      if (err) {
        res.writeHead(404);
        console.log("读取文件错误");
      } else {
        res.write(data);
        res.end();
      }
    })
  }
});

httpServer.listen(8082);
console.log('数据库连接成功');
let wsServer = io.listen(httpServer);
wsServer.on('connection', sock => {
  let current_user='';
  //数组保存当前的sock对象
  sockArr.push(sock);
  sock.on("Login", (userName, password) => {
    let sqlLogin = `select count(*) as userCnt from user_table where username ='${userName}' and password='${password}' `
    db.query(sqlLogin, (err, data) => {
      if (err) {
        console.log('数据库有误请重新连接');
        sock.emit("retLogin", "数据库有误请重新连接");
      }
      else if (data[0].userCnt > 0) {
        console.log("登录成功");
        current_user=userName;
        sock.emit("retLogin", "登录成功");
        var sqlUpdate = `update user_table set online='1' where username ='${userName}'`;
        db.query(sqlUpdate, (err, data) => {
          console.log("更新数据成功");
        })
      }
      else {
        console.log('请检查您输入的用户名和密码！');
        sock.emit("retLogin", "登录失败，请检查你输入的信息是否有误");
      }
    })
  })
  //注册逻辑
  sock.on("Regin", (username, password) => {
    let socSqlRegin = `select * from user_table where username ='${userName}'`
    db.query(socSqlRegin, (err, data) => {
      if (data.length > 0) {
        sock.emit("retLogin", '{"code":1,"messsage":"对不起，当前用户已注册"}');
      }
      else {
        let insRegSql = `insert into user_table(ID,username,password,online) values ('2','${username}','${password}','0')`;
        console.log("插入操作：" + insRegSql);
        db.query(insRegSql, (err, data) => {
          if (err) { console.log(`插入失败！${err}`); }
          else {
            sock.emit("retLogin", '{"code":0,"messsage":"注册成功"}');
          }
        })
      }
    })
  })
  sock.on('disconnect', (err) => {
    let disConnectSql = `select * from user_table where username='${current_user}'`;
    db.query(disConnectSql, (err, data) => {
      if (err) { 
        console.log('当前聊天室已关闭');
        return false;
      }
      else if (data.length > 0) {
        let disConnectUploadSql = `update user_table set online='0' where username='${current_user}'`
        db.query(disConnectUploadSql, (err) => {
          //离线后清除相应的sock队列
          //离线后将相应的sock连接进行过滤
          socketArr=socketArr.filter(item=>item!=sock);
          current_user='';
          console.log("当前用户离线");
        })
      }
    })
  })
})
