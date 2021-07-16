"use strict";
let model = "bob";
let info = 11;
let checkInfo = `sfdasdfasdfasdfCN${info}`;
console.log(model);
console.log(info);
console.log(checkInfo);
let x;
console.log(`元祖${(x = ["hello", 10])}`);
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 3] = "Green";
    Color[Color["Blue"] = 5] = "Blue";
})(Color || (Color = {}));
let colorInfo = Color.Green;
console.log(`枚举数据类型${colorInfo}`);
let i = "adfasdfds";
i = 11111;
i = true;
console.log(`模糊数据类型:${i}`);
let list = ["1", true, 87];
list[0] = 9;
console.log(`list数组${list[0]}`);
console.log(checkFace("大脸猫"));
function checkFace(face) {
    console.log(`This is my warning message${face}`);
}
let someValue = "this is thing";
let thingLength = someValue.length;
let thingLength1 = someValue.length;
console.log(`断言:长度${thingLength1}`);
function getLength(something) {
    return something.toString();
}
console.log(`当前输出的字符串为：${getLength("asdfasdfsadf")}`);
let funD;
