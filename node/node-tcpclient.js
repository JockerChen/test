/*
 * @Author: [JokerChen]
 * @Date: 2020-10-20 14:31:32
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-15 15:26:12
 * @Description: TCP客户端
 */
const net = require('net');
const client = net.createConnection({
    host: 't60.yunyibao.com.cn',
    port: 20010
});

client.on('connect', () => {
    var myDate = new Date();
    console.log("发送", myDate.toLocaleTimeString());
    console.time("发送");
    let jsonInfo = `
    {
        "b":
        {
            "img":"",
            "tw":"34.6",
            "idcard":"210104198805012030",
            "name":"陈宁",
            "term_id":"00011800202007001148",
            "type":"3",
            "healthCardid":""
        },
        "h":
        {
            "secretkey":"DCABCCBC4C1B7540737B6F5D2B8E7DC32FB65A10FCB3F470C50B95884416004A"
            ,"app_id":"89BC1361C429487494EA047CF85739BA"
        }
    }`;
    // 向服务器发送数据
    client.write(jsonInfo);
    console.timeEnd("发送");
})

client.on('data', buffer => {
    var myDate = new Date();
    console.log("接收", myDate.toLocaleTimeString());
    console.log(buffer.toString());
});

// 例如监听一个未开启的端口就会报 ECONNREFUSED 错误
client.on('error', err => {
    console.error('服务器异常：', err);
});

client.on('close', err => {
    console.log('客户端链接断开！', err);
});