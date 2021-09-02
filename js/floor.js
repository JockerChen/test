/*
 * @Author: [JokerChen]
 * @Date: 2021-08-16 10:38:47
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-08-16 11:20:02
 * @Description: 解密相关的楼层信息
 */
var floorBak = [187, 0, 0, 0, 0, 0, 0, 255, 255, 255, 0, 0, 0, 0, 0, 3, 255, 255, 0, 0, 0, 0, 0, 3, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 4, 0, 0, 1, 13, 10];
console.log(floorBak);
//卡类型
var cardTypeEnum = DecToHex(floorBak[0]);
//呼叫类型
var callTypeEnum = DecToHex(floorBak[1]);
//社区号
var propertyList = DecToHex(floorBak[floorBak.length - 3]);


console.log("当前卡类型:" + cardTypeEnum, "当前呼叫类型:" + callTypeEnum, "社区号；" + propertyList);

//获取电梯层数信息
var arrFloorList = [];
for (var i = 2; i < 42; i++) {
  arrFloorList.push(floorBak[i]);
}
console.log("当前楼层数:" + arrFloorList.length, arrFloorList);

//10进制转16进制
function DecToHex (str) {
  return ('0x' + parseInt(str).toString(16)).toUpperCase();
}

function arrEightCut(arr){
  var arrNew = [];
  var spliceValue = '';
  for (var index = 0; index < arr.length; index++) {
    if (((index + 1) % 8 == 0) && (index != 0)) {
      spliceValue += arr[index];
      arrNew.push(spliceValue)
      spliceValue = '';
    }
    else {
      spliceValue += arr[index];
    }
  }
  return arrNew;
}