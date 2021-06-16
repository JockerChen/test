/*
 * @Author: [JokerChen]
 * @Date: 2021-03-16 18:59:30
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-03-16 19:00:23
 * @Description: 从方法中解析出参数及参数声明的依赖注入。
 */
var injector = { // 依赖注入的抽象接口
    dependencies: {}, // 存储被依赖的模块
    isDeclare: false, // 是否为参数声明
    param: [], // 声明参数存储
    paramDeclare: function (param) { // 依赖注入参数声明
      if (Object.prototype.toString.call(param) !== '[object Array]') {
        try {
          throw new Error('接受的是一个数组,但是却得到一个' + typeof filterArray)
        } catch (e) {
          console.error(e)
        }
      }
      this.param = param.concat()
      console.log(this.param)
      this.isDeclare = true
    },
    register: function (key, value) { // 注册初始化被依赖的模块
      this.dependencies[key] = value
    },
    resolve: function (deps, func, scope) { // 注入到依赖的模块中，注入应该接受一个函数，并返回一个我们需要的函数
      console.log(deps)
      var paramNames = this.isDeclare ? this.param : this.getParamNames(func) // 取得参数名
      if (paramNames.length === 0 && this.isDeclare) {
        throw new Error('缺失的参数声明')
      }
      if (paramNames.length === 0 && !this.isDeclare) {
        throw new Error('该方法没有参数依赖')
      }
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
