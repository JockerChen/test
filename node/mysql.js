/*
 * @Author: [JokerChen]
 * @Date: 2020-10-31 12:37:55
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-10-31 13:50:56
 * @Description: 
 */
const mysql=require('mysql');
//连接到服务器(数据库连接--->数据库连接池，进行数据资源共享)
//createConnection//创建一个连接
//createPool//创建一个数据库连接池 maxConnection为数据库连接的数量，默认是10个（优先使用）
//写入操作是数据操作的瓶颈（优先处理）
//带索引的性能不高

let db=mysql.createPool({
  host:'localhost',
  port:3306,
  user:'root',
  password:'123456',
  database:'imeasy',
  maxConnection:10
})
console.log(db);
let sql=`select * from user_table`;
db.query(sql,(err,data)=>{
  if(err){
    console.log("数据库读取错误");
    return false;
  }else{
    //数据库查询语句
    console.log(JSON.stringify(data));
  }
})