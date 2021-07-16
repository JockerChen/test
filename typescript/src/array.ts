/*
 * @Author: [JokerChen]
 * @Date: 2021-07-15 09:19:05
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-16 13:25:27
 * @Description: 
 */
//方式1
let aStudentId: number[] = [1, 2, 3, 4, 5];
let aStudentList: string[] = ["張三豐", "基礎"];
//數組泛型
//方式2
let aStudentIdListGeneric: Array<number> = [1, 2, 3];
let aStudentListGeneric: Array<string> = ["張三豐", "基礎"];


//元祖类型（固定长度的数组）
let height: [string, string];
height = ["1", "2"];
console.log(height);
//枚举类型
enum Gender {
  Male = 0,
  Female = 1
}


let personInfo: { name: string, gender: Gender };
//&表示与的关系
let person: { name: string } & { age: number };

//类型的别名
type myType = 1 | 2 | 3 | 4 | 5;
let key: myType;
let l: 1 | 2 | 3 | 4 | 5;
let m: myType

console.log("开始处理");