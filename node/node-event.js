/*
 * @Author: [JokerChen]
 * @Date: 2020-11-13 14:38:00
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-03-02 10:47:27
 * @Description: node js事件监听事件监听器(自定义)
 */
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
 
// 创建事件处理程序
var connectHandler = function connected() {
   console.log('连接成功。');
  
   // 触发 data_received 事件 
   eventEmitter.emit('data_received');
}
 
// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
 
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(data){
   console.log('数据接收成功。');
});
// 使用匿名函数绑定 bedUp 事件
eventEmitter.on('bedUp', function(data){
   console.log(data);
   console.log('数据接收成功。');
});
 
// 触发 connection 事件 
eventEmitter.emit('connection');
 
console.log("程序执行完毕。");
//事件发送
setTimeout(() => {
   eventEmitter.emit('bedUp','06:00');
}, 5000);