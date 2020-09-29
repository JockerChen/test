/*
 * @Author: [JokerChen]
 * @Date: 2020-09-26 20:08:31
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-09-26 20:44:37
 * @Description: 
 */
var name="小明";
var age=12;
var flag=true;

console.log(name);
function sum(a,b) {
  return a+b;
}
if(flag){
  console.log(sum(20,20));
}

export{
  flag,sum
}