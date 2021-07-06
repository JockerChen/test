/*
 * @Author: [JokerChen]
 * @Date: 2021-07-05 17:06:25
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-05 18:11:20
 * @Description:
 */
var model = "bob";
var info = 11;
var checkInfo = "sfdasdfasdfasdfCN" + info;
console.log(model);
console.log(info);
console.log(checkInfo);
//元组 Tuple
var x;
console.log("\u5143\u7956" + (x = ["hello", 10]));
// console.log(x=[10,'hello']); 报错了
//枚举
// enum Color { Red, Yellow, Blue }
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 3] = "Green";
    Color[Color["Blue"] = 5] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log("\u679A\u4E3E\u6570\u636E\u7C7B\u578B" + c);
//模糊数据类型
var i = "adfasdfds";
i = 11111;
i = true;
console.log("\u6A21\u7CCA\u6570\u636E\u7C7B\u578B:" + i);
//list
var list = ["1", true, 87];
list[0] = 9;
console.log("list\u6570\u7EC4" + list[0]);
console.log(checkFace("大脸猫"));
//void 和any是相对的
function checkFace(face) {
    console.log("This is my warning message" + face);
}
//对象类型(声明文件)
// declare function create(o: Object): void;
// create({ prop: 0 }); // OK
// create(null); // OK
//断言
var someValue = "this is thing";
//写法1
var thingLength = someValue.length;
//写法2
var thingLength1 = someValue.length;
console.log("\u65AD\u8A002" + thingLength1);
