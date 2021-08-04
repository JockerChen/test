/*
 * @Author: [JokerChen]
 * @Date: 2021-07-30 10:33:25
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-30 10:36:31
 * @Description: 蓝牙相关的工具类
 */

const inArray = function (arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
}



//转中文
const chineseChange = function (str) {
  var character = str.split("\\u");
  var native1 = character[0];
  for (var i = 1; i < character.length; i++) {
    var code = character[i];
    native1 += String.fromCharCode(parseInt("0x" + code.substring(0, 4)));
    if (code.length > 4) {
      native1 += code.substring(4, code.length);
    }
  }
  return native1;
}

// ArrayBuffer转16进制字符串示例
const ab2hex=function(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  console.log(hexArr.join(''));
  return hexArr.join('');
}

module.exports = {
  inArray: inArray,
  chineseChange:chineseChange,
  ab2hex:ab2hex
}
