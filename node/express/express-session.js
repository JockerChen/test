/*
 * @Author: [JokerChen]
 * @Date: 2020-12-02 20:35:46
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-03 07:53:00
 * @Description: 
 */
const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
var app = express()

app.set('trust proxy', 1) // trust first proxy

let arr = [];
for (let i = 0; i < 100000; i++) {
  arr.push('sig_' + Math.random());
}

app.use(cookieSession({
  name: 'JokerChen',
  keys: ['key1', 'key2'],//秘钥

  maxAge: 24 * 3600 * 1000
}))

app.use(function (req, res, next) {
  // console.log(req.session);

  if (req.session['count'] == null) {
    req.session['count'] = 1;
  }
  else {
    req.session['count']++;
  }
  console.log(req.session['count']);
  // Update views
  req.session.views = (req.session.views || 0) + 1

  // Write response
  res.end(req.session.views + ' views')
  //delete 关键字一般都是操作服务器相关的属性
  // delete req.session;
})

app.listen(3000)