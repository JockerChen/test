/*
 * @Author: [JokerChen]
 * @Date: 2020-12-15 14:41:07
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-15 15:25:46
 * @Description: udp客户端
 */
var dgram = require('dgram');
var udp_client = dgram.createSocket('udp4'); 

udp_client.on('close',function(){
    console.log('udp client closed.')
})

//错误处理
udp_client.on('error', function () {
    console.log('some error on udp client.')
})

// 接收消息
udp_client.on('message', function (msg,rinfo) {
    console.log(`receive message from ${rinfo.address}:${rinfo.port}：${msg}`);
})

//定时向服务器发送消息
setInterval(function(){
    let SendBuff=`{
        "server": "COVID19", //服务名
        "cmd": "EditCOVID19Device", //命令字
        "mac": "00-16-EA-AE-3C-40", //MAC地址
        "longitude": "34.581243", //经度
        "latitude": "124.486895", //纬度
        "temperatureType": 0, //温度类型：0-摄氏度，1-华氏度
        "temperature": 36.5, //温度
        "address": "沈阳市浑南区" //安装地址
    }`;
    // var SendBuff = 'hello 123.';
    var SendLen = SendBuff.length;
    udp_client.send(SendBuff, 0, SendLen, 5678, '192.168.20.11'); 
},3000);