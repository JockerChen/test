/*
 * @Author: [JokerChen]
 * @Date: 2020-12-01 07:43:53
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-01 08:22:01
 * @Description: nodejs 接收http请求的形式get和post不太一样,post数据是分段到达的。
 */
const http=require('http');
const querystring=require('querystring');
const urlLib=require('url');

let server=http.createServer((req,res)=>{
  console.log(`收到数据`);
  let str='';
  let i=1;
  //接收get数据请求
  let obj=urlLib.parse(req.url,true);
  let url=obj.pathname;
  let getString=obj.query;
  /*http post数据的处理*/
  //请求大的数据(分段接收)有数据到达的话就执行一次
  req.on('data',function (data) {
    console.log(`第多少${i++}收到数据`);
    str+=data;
  })
  req.on('end',function () { 
    console.log(`数据全部接收完成`);
    //数据全部达到的时候
    let postData=querystring.parse(str);
    // console.log(str);
  })
  
}).listen(9900);
console.log(`服务监听成功`);

