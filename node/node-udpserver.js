/*
 * @Author: [JokerChen]
 * @Date: 2020-12-15 14:41:07
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-15 15:34:05
 * @Description: UDP服务端
 */
// netstat -ano 	查询所有进程号
// netstat -aon|findstr "5678" --根据端口查对应的进程号
// taskkill /pid 18568 /f  --杀进程
// taskkill /pid 21264 /f

var dgram = require('dgram');
//创建 udp server
var udp_server = dgram.createSocket('udp4');
udp_server.bind(5678); // 绑定端口
// 监听端口
udp_server.on('listening', function () {
    console.log('udp server linstening 5678.');
})

//接收消息
udp_server.on('message', function (msg, rinfo) {
    strmsg = msg.toString();
    console.log(`udp server received data: ${strmsg} from ${rinfo.address}:${rinfo.port}`)
    //服务器发送返回值
    let sendClientBuff=`{
        "server": "192.168.20.11", //服务名
        "cmd": "EditCOVID19Device", //命令字
        "mac": "00-16-EA-AE-3C-40", //MAC地址
        "longitude": "34.581243", //经度
        "latitude": "124.486895", //纬度
    }`;
    udp_server.send(sendClientBuff, 0, sendClientBuff.length, rinfo.port, rinfo.address); 
})
//错误处理
udp_server.on('error', function (err) {
    console.log('some error on udp server.')
    udp_server.close();
})
