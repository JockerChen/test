/*
 * @Author: [JokerChen]
 * @Date: 2020-10-21 08:23:48
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-10-21 08:33:38
 * @Description:"" 
 */
const http=require('http');
const PORT=3000;
const server= http.createServer((req,res)=>{
  if (req.url === '/error') {
    a.b;
    res.end('error');
  } else {
    setTimeout(() => res.end('ok!'), 1000 * 10);
  }
}) 

server.listen(PORT, () => console.log(`port is listening on ${PORT}.`));