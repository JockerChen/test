/*
 * @Author: [JokerChen]
 * @Date: 2020-11-17 19:12:13
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-11-30 19:38:00
 * @Description:node 相关的DNS学习 
 */

// const dns=require('dns');
// dns.lookup('www.55kad.com', (err, address, family) => {
//   console.log('地址: %j 地址族: IPv%s', address, family);
// });


var dns = require('dns');
var options = {all: true};

dns.lookup('www.55kad.com', options, function(err, address, family){
    if(err) throw err;
    console.log('例子B: ' + JSON.stringify(address));
});


dns.resolve('www.nodejs.red', (err, records) => {
    console.log(records);
});