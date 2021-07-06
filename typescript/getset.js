/*
 * @Author: [JokerChen]
 * @Date: 2021-07-06 08:04:28
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-06 08:08:09
 * @Description:
 */
var Person = /** @class */ (function () {
    function Person() {
    }
    Object.defineProperty(Person.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    return Person;
}());
var xiaoming = new Person();
xiaoming.name = "xiaoming";
console.log(xiaoming.name);
