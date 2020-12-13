/*
 * @Author: [JokerChen]
 * @Date: 2020-12-03 09:24:11
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-03 15:10:29
 * @Description: 
 */
const fs=require('fs');
const jade=require('jade');
//插入标签<h2>,

let htmlStr= jade.renderFile('./module/1.jade',{
  pretty:true,
  name:'Joker',
  c:11,
  d:12,
  arr:['123','456','789','ceshi'],
  content:'<h2>留言功能</h2>'
})
fs.writeFile('./view/1.html',htmlStr,(err)=>{
  
});
