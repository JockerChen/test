/*
 * @Author: [JokerChen]
 * @Date: 2021-06-08 19:10:49
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-06-09 08:05:08
 * @Description: 
 */
/**
 * 1、注释的形式定义接口
 */
(function () {
  // 用注释定义接口
  // interface PersonDao()
  // {
  //   function add(obj);
  //   function remove(obj);
  //   function find(id);
  // }
  // PersonDaoImp1 implement ObjectDao
  var PersonDaoImp1 = function () {
    //通过属性标记法实现相应接口（进行数组模拟）
    this.implementInterface = ['PersonDao'];
  }
  PersonDaoImp1.prototype.add = function (obj) {
    console.log(obj);
  }
  PersonDaoImp1.prototype.remove = function (obj) {
    console.log(obj);
  }
  PersonDaoImp1.prototype.find = function (obj) {
    console.log(obj);
  }
})()
/**
 * 接口检测
 */
//接口检验方法（核心）
function impl (objcet) {
  //遍历传入参数的属性
  for (var i = 1; i < arguments.length; i++) {
    var interfaceName = arguments[i];
    var interfaceFound = false;
    for (var j = 0; j < objcet.implementInterface.length; j++) {
      if (objcet.implementInterface[j] == interfaceName) {
        interfaceFound = true;
        break;
      }
    }
    if (!interfaceFound) {
      return false;
    }
  }
  return true;
}

function addObj (obj) {
  var PersonDao = new PersonDaoImp1();
  //开始进行检查
  if (impl(PersonDao, "PersonDao")) {
    throw new Error("类没有实现接口")
  }
  else {
    PersonDao.add(obj);
  }
}
