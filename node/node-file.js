/*
 * @Author: [JokerChen]
 * @Date: 2020-10-16 07:41:17
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-03-16 14:05:17
 * @Description: 文件读取功能优化
 */
var fs=require('fs');
//读取文件
fs.readFile("../data/changjson.json",function (err,data) {
    if(!err){
      console.log("写入文件失败");
      return false;
    }
    console.log(`读取文件数据成功${data.toString()}`);
})
//同步
fs.readFileSync("../data/changjson.json",function (err,data) {
  
})

//追加写入
fs.writeFile("../data/2020101.txt","122333",function (err) {
  if(err){
    console.log("写入文件失败");
    return false;
  }
})
//追加写入信息
fs.appendFile("../data/20200101.txt","11111","utf-8",(err,data)=>{
  if(err){
    console.log("写入文件失败");
    return false;
  }
})
//文件删除
fs.unlink("../data/20200101.txt",(err)=>{
  if(err) throw err;
})
//创建文件夹
fs.mkdir("c",function(err){  //创建 c 文件
  if(err) throw err;
})
//文件夹重命名
fs.rename("c","d",function(err){  //将c 文件夹名字 改为  d
  if(err) throw err;
})