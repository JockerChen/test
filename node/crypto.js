/*
 * @Author: [JokerChen]
 * @Date: 2020-12-16 14:41:58
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-16 14:46:53
 * @Description: 
 */
const crypto=require('crypto');
let obj=crypto.createHash('md5');
//进行签名
obj.update('123456');
let info=obj.digest('hex');
console.log(info);
