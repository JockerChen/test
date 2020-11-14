/*
 * @Author: [JokerChen]
 * @Date: 2020-11-13 14:38:00
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-11-13 14:42:11
 * @Description: node js事件监听
 */
const EventEmitter =require('events').EventEmitter;
const emitter=new EventEmitter();

emitter.on('起床',function (time) {
  console.log(`早上 ${time} 开始起床，新的一天加油！`);
})

setTimeout(() => {
  emitter.emit('起床','06:00');
}, 5000);


