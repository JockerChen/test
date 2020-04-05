/*
 * @Author: [JokerChen]
 * @Date: 2020-04-05 09:53:55
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-04-05 12:02:38
 * @Description: 
 */

// io.on('connection', socket => {
//     socket.emit('request', /* … */); // emit an event to the socket
//     io.emit('broadcast', /* … */); // emit an event to all connected sockets
//     socket.on('reply', () => { /* … */ }); // listen to the event
//   });

const http = require('http');
const io = require('socket.io');
let time=0;
//创建一个http的服务
let httpServer= http.createServer();
console.log('Http服务监听');
httpServer.listen(8080);
//ws的服务
const wsServer=io.listen(httpServer);
wsServer.on('connection',sock=>{
    console.log('websocket连接');
    //接受客户端发过来的请求数据
    sock.on('a',function(valueInfo){
        console.log(`接受到的请求的信息为：${valueInfo}`);
        clearTimeout(time);
        time=setTimeout(() => {
            returnValue(sock,valueInfo);
        }, 30);
    });

    // //断开事件
    // sock.on('disconnect', function(data) {
    //     console.log('断开',data)
    //     sock.emit('c_leave','离开');
    //     //socket.broadcast用于向整个网络广播(除自己之外)
    //     //socket.broadcast.emit('c_leave','某某人离开了')
    // })
    
});

//进行信息回复
function returnValue(sock,msg) {
    sock.emit('returnValue',`感谢您的访问,针对问题为${msg}的回复`);
}
