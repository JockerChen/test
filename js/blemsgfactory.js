/*
 * @Author: [JokerChen]
 * @Date: 2021-08-27 10:55:26
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-08-27 13:05:30
 * @Description: 蓝牙消息管理
 */
// 安全的工厂方法
class StateCls {
  constructor(arrList) {
    this._nowStatus = "";
    this._aStatusList = ["Begin", ...arrList, "End"];
  }
  changeStatus () {
    //状态管理
  }
}