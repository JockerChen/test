/*
 * @Author: [JokerChen]
 * @Date: 2020-10-20 14:09:02
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-12-15 15:29:50
 * @Description: tcp服务端，UDP服务有的时候没办法做服务的关闭用如下的操作内容
 */



const net = require('net');
const HOST = '127.0.0.1';
const PORT = 3000;

// 创建一个 TCP 服务实例
const server = net.createServer();

// 监听端口
server.listen(PORT, HOST);

server.on('listening', () => {
    console.log(`服务已开启在 ${HOST}:${PORT}`);
});

server.on('connection', socket => {
    // data 事件就是读取数据
    socket.on('data', buffer => {
        const msg = buffer.toString();
        console.log(msg);

        // write 方法写入数据，发回给客户端
        socket.write(Buffer.from('你好 ' + msg));
    });
})

server.on('close', () => {
    console.log('Server Close!');
});

server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
        console.log('地址正被使用，重试中...');

        setTimeout(() => {
            server.close();
            server.listen(PORT, HOST);
        }, 1000);
    } else {
        console.error('服务器异常：', err);
    }
});