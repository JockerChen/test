/*
 * @Author: [JokerChen]
 * @Date: 2021-06-08 20:11:49
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-06-08 20:27:34
 * @Description: 鸭式变形法
 * 如果对象具有于接口定义的方法名字的所有方法
 */
(function () {
  var interface = function (name, methods) {
    if (arguments.length != 2) {
      console.log("interface must have two paramers ");
    }
    this.name = name;
    this.methods = [];
    for (var index = 0; index < methods.length; index++) {
      if (typeof methods[i] != "string") {
        console.log("method name must be String type");
      }
      else {
        this.methods.push(methods[i]);
      }
    }
  }
  // 定义接口的一个静态方法来实现接口与实现类的直接检验
  // 静态方法不要写成Interface.prototype因为这个写到接口的原型链上的
  //我们要静态的函数直接写到类层次上
  interface.ensureImplementers = function (object) {
    if (arguments.length < 2) {


    }

  }

})()