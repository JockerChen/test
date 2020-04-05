/*
 * @Author: [JokerChen]
 * @Date: 2020-04-05 13:48:04
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-04-05 16:01:03
 * @Description: 
 */
const mysql = require('mysql');
// 一个数据库会造成数据库阻塞（连接池）如果太多的话会拖垮数据库连接池的大小和需要考虑的
// maxConnection最大连接数，默认是10个，该参数可给可不给
let db=mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database:'imeasy',
    maxConnection:10
})

//创建单个连接
// let db=mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '123456',
//     database:'imeasy'
// })
console.log(db);
//一些安全相关的操作
// db.getConnection(function(err, connection) {
//     if(err){
//         console.log("建立连接失败");
//     } else {
//         console.log("建立连接成功");
//         console.log(db._allConnections.length); //  1
//         connection.query('select * from user', function(err, rows) {
//             if(err) {
//                 console.log("查询失败");
//             } else {
//                 console.log(rows);
//             }
//             // connection.destory();
//             console.log(db._allConnections.length);  // 0
//         })
//     }
//     db.end();
// })

//数据库查询语句
db.query("select * from user_table",(err,data)=>{
    console.log(data);
    if(err){
        console.log(err);
    }else{
        console.log( JSON.stringify(data));
    }
});