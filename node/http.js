/*
 * @Author: [JokerChen]
 * @Date: 2020-10-16 07:56:53
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-10-19 10:16:32
 * @Description: http://127.0.0.1:9001/login
 */
const http= require("http");
//创建一个服务器http.createServer()
var server=http.createServer();
//服务器处理过程
// 1、提供服务
// 2、发送请求
// 3、接受请求
// 4、处理请求
// 5、反馈请求（发送相应）
//注册request请求事件
// req:请求事件处理函数
// res:响应对象有一个方法 write可以用来给客户端发送相应请求
//write可以使用多次但最后一次一定要用end来结束响应否则客户端一直等待

//常用接口定义
//  /login
// /index
// /register
// /other

server.on("request",function (req,res) {
  console.log(`收到请求事件函数:url`+req.url);
  console.log(`{resultCode:01,resultMsg:'OK'}`);
  res.write(`{resultCode:01,resultMsg:'OK'}`);
  var url=req.url;
  var func=changeWeek(url);
  res.write(`${JSON.stringify(func)}`);
  res.end();
})
//启动服务器绑定端口号
server.listen(9001,function() {
  console.log(`服务监听开启成功！`);
})

//获取接口
function funcWeek(name) {
  var names = {
      '/login': function () {
          return '登录功能';
      },
      '/regin': function () {
          return '注册';
      },
      '/buy': function () {
          return '购物功能';
      }
  }
  if (typeof names[name] !== 'function') {
      return false;
  }

  return names[name]();
}