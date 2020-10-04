/*
 * @Author: [JokerChen]
 * @Date: 2020-09-26 20:08:31
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-09-30 10:43:27
 * @Description: 
 */
var name="小明";
var age=12;
var flag=true;

console.log(name);
function sum(a,b) {
  return a+b;
}
function subtraction(a,b) {
  return a-b;
}
if(flag){
  console.log(sum(20,20));
}



export let _Info="测试的综合信息";
export{
  flag,sum,subtraction
}
