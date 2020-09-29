/*
 * @Author: [JokerChen]
 * @Date: 2020-09-26 20:08:31
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-09-26 20:14:59
 * @Description: 
 */
var name="小红";
var age=12;
var flag=true;
console.log(name);
function sum(a,b) {
  return a+b+1;
}
if(flag){
  console.log(sum(20,20));
}

export{
  flag,sum
}