/*
 * @Author: [JokerChen]
 * @Date: 2021-07-20 19:50:03
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-20 19:53:30
 * @Description: 
 */
//装饰器
function textDecorator(constructor:any) {
  constructor.prototype.getName = () => {
    console.log('tom');
  }
}
//使用装饰器 注：一个类也可以有多个装饰器
@textDecorator
class CheckClass { }
const test = new CheckClass();
(test as any).getName();