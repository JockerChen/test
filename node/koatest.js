/*
 * @Author: [JokerChen]
 * @Date: 2020-11-23 20:00:04
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-11-23 20:12:05
 * @Description: 
 */
const Koa=require('koa');
const app= new Koa();
app.on('info',msg=>{
  console.log(`输出的信息是，${msg}`);
})

setTimeout(() => {
  app.emit('info','你快乐么？');
}, 3000);