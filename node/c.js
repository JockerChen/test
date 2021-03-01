/*
 * @Author: [JokerChen]
 * @Date: 2021-02-24 16:37:44
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-02-24 17:06:55
 * @Description: 
 */
const CryptoJS=require('../js/core');
let appSecret = "5oAp5re6BUxKDvPOmlcRHSX4gbX5LxoRxAQvoxLcN8g=";
let SEP1 = '&';
let appKey = '';
let method = 'POST';
let stage = '3';
let time = new Date().getTime();
let auths = appKey + SEP1 + method + SEP1 + stage + SEP1 + time;
let hash = CryptoJS.HmacSHA256(auths, require('../js/enc-base64').parse(appSecret));

console.log('auths:', auths,appKey,SEP1,method,stage,time);
let hashInBase64 = require('../js/enc-base64').stringify(hash);
console.log('签名：', hashInBase64);