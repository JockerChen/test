/*
 * @Author: [JokerChen]
 * @Date: 2021-03-16 18:58:12
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-03-16 19:00:34
 * @Description: 从方法中解析出参数的依赖注入
 */
var injector = { // 依赖注入的抽象接口
  dependencies: {}, // 存储被依赖的模块
  register: function (key, value) { // 注册初始化被依赖的模块
    this.dependencies[key] = value
  },
  resolve: function (deps, func, scope) { // 注入到依赖的模块中，注入应该接受一个函数，并返回一个我们需要的函数
    var paramNames = this.getParamNames(func) // 取得参数名
    var params = []
    for (var i = 0; i < paramNames.length; i++) { // 通过参数名在dependencies中取出相应的依赖
      let d = paramNames[i]
      let depen = this.dependencies[d] || deps[i]
      if (depen) {
        params.push(depen)
      } else {
        throw new Error('缺失的依赖：' + d)
      }
    }
    // 注入依赖,执行,并返回一个我们需要的函数
    return func.apply(scope || {}, params) // 将func作用域中的this关键字绑定到bind对象上，bind对象可以为空
  },
  getParamNames: function (func) { // 获取方法的参数名字
    var paramNames = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
    paramNames = paramNames.replace(/ /g, '')
    paramNames = paramNames.split(',')
    return paramNames // Array
  }
}

//调用部分
injector.register('notebook', new Notebook()) // 注册notebook
injector.register('pencil', new Pencil()) // 注册pencil
var school = new School()
var student = new Student()
// 以参数的形式传入school
var studentWrite = injector.resolve([, , school], student.write, student)
console.log(studentWrite) // "我拥有School、Pencil和Notebook"
