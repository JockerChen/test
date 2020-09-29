/*
 * @Author: [JokerChen]
 * @Date: 2020-09-09 13:27:06
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-09-15 09:00:37
 * @Description: 二维码解密函数
 */


/*-----------------------解密------------------------------*/

function getArr(str) {
  var arr = []
  for (var i = 0; i < str.length; i += 2) {
      arr.push('0x' + str[i] + str[i + 1])
  }
  return arr.map(function (x) {
      return parseInt(x)
  })
}
function toSeekId(bs) {
  var value =
    (bs[0] & 0xFF) << 24 |
    (bs[1] & 0xFF) << 16 |
    (bs[2] & 0xFF) << 8 |
    (bs[3] & 0xFF) << 0;
  return value;
}
//字符串转字节
function deStringToByte(str) {
  var bytes = new Array();
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
          bytes.push(((c >> 18) & 0x07) | 0xF0);
          bytes.push(((c >> 12) & 0x3F) | 0x80);
          bytes.push(((c >> 6) & 0x3F) | 0x80);
          bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
          bytes.push(((c >> 12) & 0x0F) | 0xE0);
          bytes.push(((c >> 6) & 0x3F) | 0x80);
          bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
          bytes.push(((c >> 6) & 0x1F) | 0xC0);
          bytes.push((c & 0x3F) | 0x80);
      } else {
          bytes.push(c & 0xFF);
      }
  }
  return bytes;
}
function deHloveyRC4(aInput, aKey) {
  var iS = new Array(256);
  var iK = new Array(256);

  for (var i = 0; i < 256; i++) {
      iS[i] = i;
  }

  var j = 1;
  for (var i = 0; i < 256; i++) {
      iK[i] = aKey[(i % aKey.length)];
  }
  j = 0;
  for (var i = 0; i < 256; i++) {
      j = (j + iS[i] + iK[i]) % 256;
      var temp = iS[i];
      iS[i] = iS[j];
      iS[j] = temp;
  }
  var i = 0;
  j = 0;
  var iInputBytes = aInput;
  var iOutputBytes = new Array(aInput.length);
  for (var x = 0; x < iInputBytes.length; x++) {
      i = (i + 1) % 256;
      j = (j + iS[i]) % 256;
      var temp = iS[i];
      iS[i] = iS[j];
      iS[j] = temp;
      //int t = (iS[i]+(iS[j] % 256)) % 256;     
      var t = (iS[i] + iS[j]) % 256;
      var iY = iS[t];
      var iCY = iY;
      iOutputBytes[x] = (iInputBytes[x] ^ iCY) & 0xFF;
  }
  return iOutputBytes;
}
// 调用解密的函数
function qrDeCodeProject(codeString) {
  var byte4 = [];
  var byte4Time = [];
  var byte1Cnt;
  var byteFlour = [];

  var arr = getArr(codeString);
  var keys = deStringToByte("RCQJVAGOSZXOYVXCVQYFORCTOTZKYESE");
  var seekByte20 = deHloveyRC4(arr, keys);
  console.log('seekByte20:length:'+seekByte20.length+'seekByte20:'+seekByte20);
  for (var i = 4; i < 8; i++) {
      byte4.push(seekByte20[i]);
  }
  for (var i = 12; i < 16; i++) {
      byte4Time.push(seekByte20[i]);
  }
  console.log(seekByte20);
  //相应的楼层信息返回
  for(var i=16;i<48;i++){
    byteFlour.push(DecToHex(seekByte20[i]));
  }
  console.log('byteFlour:'+byteFlour);

  //获取设置的毫秒数
  byte1Cnt=seekByte20[11];
  console.log(byte1Cnt);
  if (toSeekId(byte4) > 0) {
      var seekId = toSeekId(byte4).toString();
  } else {
      var seekId = (4294967296 + toSeekId(byte4)).toString();
  }
  //4294967296 - seekId
  if (seekId.length < 10) {
      var subStr = ""
      for (var j = 0; j < 10 - seekId.length; j++) {
          subStr += "0"
      }
      seekId = subStr + seekId
  }
  var currentTime = toSeekId(byte4Time) * 1000;
  return seekId + '|' + currentTime+'|'+byte1Cnt+'|'+byteFlour.join(',');
}
//num传入的数字，n需要的字符长度
function PrefixInteger(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}


function DecToHex(str) {
    return ('0x'+parseInt(str).toString(16)).toUpperCase();
  }
/*------------------------解密结束--------------------------------------*/