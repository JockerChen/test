/*
 * @Author: [JokerChen]
 * @Date: 2021-03-02 10:57:41
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-03-02 11:04:57
 * @Description: 
 */
const EventEmitter  = require('events');
const oneDayPlanRun={
  "6:00":function () { 
    console.log(`现在是早上 6:00，起床，开始新的一天加油！`);
   },
  "7:00":function () {
    console.log(`现在是早上 7:00，吃早饭！`);
  }
}
function OneDayPlan() {
  EventEmitter.call(this);
}

Object.setPrototypeOf(OneDayPlan.prototype, EventEmitter.prototype);
Object.setPrototypeOf(OneDayPlan, EventEmitter);
modules.export={
  OneDayPlan:OneDayPlan
}