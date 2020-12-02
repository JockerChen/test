/*
 * @Author: [JokerChen]
 * @Date: 2020-12-01 10:43:28
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-01 10:47:34
 * @Description: 文件操作--流操作
 */
var fs = require("fs");
var rs = fs.createReadStream("a.txt");
rs.setEncoding("utf-8");
var ws = fs.createWriteStream("b.txt"); //写入流

//监听当有数据流入的时候
rs.on("data", function (dataStream) {
  console.log("..."); //读的过程中，我们打印三个点。
  ws.write(dataStream, "utf-8"); //向文件写入东西
});

rs.on("end", function () {
  console.log("没有数据了");
  ws.end();                
});
