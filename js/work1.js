/*
 * @Author: [JokerChen]
 * @Date: 2020-11-06 18:48:45
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-11-06 19:11:40
 * @Description: webworker
 */
//接受数据
this.onmessage=function (ev) {
  console.log(ev);
  var info=ev.data.firstValue+ev.data.secondValue;
  this.postMessage(info);
} 