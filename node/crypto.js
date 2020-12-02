/*
 * @Author: [JokerChen]
 * @Date: 2020-11-14 17:08:41
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-11-18 09:21:16
 * @Description: 加密方法
 */


var crypto =require('crypto');

const cipher = crypto.createCipheriv('des-ecb', '12345678', ''); 
// 与其他语言加密采用这种写法
console.log(cipher);