/*
 * @Author: [JokerChen]
 * @Date: 2021-07-05 18:57:20
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-05 19:00:43
 * @Description: OOP相关的
 */
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("world");
console.log(greeter.greet());
