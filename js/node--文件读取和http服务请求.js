/*
 * @Author: [JokerChen]
 * @Date: 2020-04-03 20:10:28
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-04-05 09:48:19
 * @Description: 
 */
const http = require('http');
const fs=require('fs');

//创建服务
let server = http.createServer((req, res) =>{
    console.log(`已经有人访问我的地址为:${req.url}`);
    console.log(`已经有人访问我的方法为:${req.method}`);
    fs.readFile(`source${req.url}`,function (err,data) {
        if(err){
            console.log('显示的内容是404');
            res.writeHead(404);
        }
        else{
            res.write(data.toString());
            console.log('显示的内容是'+data.toString());
        }
        res.end();
    })

})

console.log("监听开始");
server.listen(8080);