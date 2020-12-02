/*
 * @Author: [JokerChen]
 * @Date: 2020-11-17 19:32:06
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-11-17 19:32:52
 * @Description: node  进程
 */
const http=require('http');
http.createServer().listen(3000, () => {
  process.title = '测试进程 Node.js' // 进程进行命名
  console.log(`process.pid: `, process.pid); // process.pid: 20279
});