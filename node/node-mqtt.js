/*
 * @Author: [JokerChen]
 * @Date: 2020-11-21 13:12:30
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-15 20:04:22
 * @Description: 
 */
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1'); //连接到服务端
//client.subscribe('presence');
var num = 0;
var qtt = {}; //定义消息（可以为字符串、对象等）
qtt = 'setr=xxxxxxx1xx';
setInterval(function() { //一秒钟发送一次 消息到主题 SN69143809293670state 消息为 setr=xxxxxxx1xx
    client.publish('SN69143809293670state', qtt, { qos: 0, retain: true });  
}, 1000);