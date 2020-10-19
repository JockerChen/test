/*
 * @Author: [JokerChen]
 * @Date: 2020-10-16 07:41:17
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-10-16 07:56:43
 * @Description: 
 */
var fs=require('fs');
//读取文件
fs.readFile("../data/changjson.json",function (err,data) {
    if(!err){
      console.log("写入文件失败");
      return false;
    }
    console.log(data.toString());
})
//成功

//失败
fs.writeFile("../data/2020101.txt","122333",function (err) {
  if(err){
    console.log("写入文件失败");
    return false;
  }
  
})
