/*
 * @Author: [JokerChen]
 * @Date: 2020-11-02 16:37:23
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-11-02 17:21:06
 * @Description: 
 */
const http = require('http');
let server=http.createServer((req,res)=>{
  console.log(JSON.stringify(req.headers['accept-language']));
})
server.listen(8083);
console.log(`服务监听完成`);
