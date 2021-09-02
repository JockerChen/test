/*
 * @Author: [JokerChen]
 * @Date: 2021-08-27 08:48:52
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-08-27 08:48:53
 * @Description: 
 */
/**
 * 蓝牙AT指令相关命令
 * 
 *  */
 const openATCommand = function () {
  let str = "+++a";
  let arrAtOpen = [];
  for (let i = 0; i < str.length; i++) {
    arrAtOpen.push(decToHex(str[i].charCodeAt()))
  }
  arrAtOpen.push('0D');
  arrAtOpen.push('0A');
  console.log(`当前生成数组：${arrAtOpen}`);
  // let infoab = hex2ab(...arrAtOpen);
  // console.log(`当前生成的---->AB：${infoab}`);
  return arrAtOpen;
}
/**
 * 修改蓝牙名称
 * 
 *  */
const changeBleCommand = function (bleDeviceName) {
  //修改蓝牙名称变量（输入）
  var strChangeBleName = "AT+NAME=" + bleDeviceName;
  let arrAtChange = [];
  for (let i = 0; i < strChangeBleName.length; i++) {
    arrAtChange.push(decToHex(strChangeBleName[i].charCodeAt()));
  }
  arrAtChange.push('0D');
  arrAtChange.push('0A');
  console.log(`修改蓝牙名称生成数组：${arrAtChange}`);
  // let infoabChange = hex2ab(...arrAtChange);
  // console.log(`修改蓝牙名称---->AB：${infoabChange}`);
  return arrAtChange;
}
/*
  退出AT指令
*/
const exitBleCommand = function () {
  var strExitAT = "AT+ENTM";
  let arrExitAT = [];
  for (let i = 0; i < strExitAT.length; i++) {
    arrExitAT.push(decToHex(strExitAT[i].charCodeAt()));
  }
  arrExitAT.push('0D');
  arrExitAT.push('0A');
  console.log(`修改蓝牙名称生成数组：${arrExitAT}`);
  // let infoabExitAT = hex2ab(...arrExitAT);
  // console.log(`修改蓝牙名称---->AB：${infoabExitAT}`);
  return arrExitAT;
}
