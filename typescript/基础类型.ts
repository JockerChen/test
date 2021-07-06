/*
 * @Author: [JokerChen]
 * @Date: 2021-07-05 17:06:25
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-05 18:11:45
 * @Description:
 */

let model: string = "bob";
let info: number = 11;
let checkInfo: string = `sfdasdfasdfasdfCN${info}`;
console.log(model);
console.log(info);
console.log(checkInfo);
//元组 Tuple
let x: [string, number];
console.log(`元祖${(x = ["hello", 10])}`);
// console.log(x=[10,'hello']); 报错了

//枚举
// enum Color { Red, Yellow, Blue }
enum Color {
  Red = 1,
  Green = 3,
  Blue = 5,
}
let c: Color = Color.Green;
console.log(`枚举数据类型${c}`);

//模糊数据类型
let i: any = "adfasdfds";
i = 11111;
i = true;
console.log(`模糊数据类型:${i}`);
//list

let list: any = ["1", true, 87];
list[0] = 9;
console.log(`list数组${list[0]}`);

console.log(checkFace("大脸猫"));

//void 和any是相对的
function checkFace(face: string): void {
  console.log(`This is my warning message${face}`);
}

//对象类型(声明文件)
// declare function create(o: Object): void;

// create({ prop: 0 }); // OK
// create(null); // OK


//断言
let someValue: any = "this is thing";
//写法1
let thingLength: number = (<String>someValue).length;
//写法2
let thingLength1: number = (someValue as string).length;
console.log(`断言:长度${thingLength1}`);