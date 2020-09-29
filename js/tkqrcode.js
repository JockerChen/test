/*
 * @Author: [JokerChen]
 * @Date: 2020-09-09 13:26:34
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-09-09 16:08:46
 * @Description:二维码加密函数 
 */
//

//二维码加密函数
/*_______________________________________________________*/

//获取二维码头
function long_byte4(value) {
  var result = new Array(4);
  result[0] = (value >> 24 & 0xFF);
  result[1] = (value >> 16 & 0xFF);
  result[2] = (value >> 8 & 0xFF);
  result[3] = (value >> 0 & 0xFF);
  return result;
}

function byte4_long(bs) {
  var value =
    (bs[3] & 0xFF) << 24 |
    (bs[2] & 0xFF) << 16 |
    (bs[1] & 0xFF) << 8 |
    (bs[0] & 0xFF) << 0;
  return value;
}

//CRC校验
function CrcGen_STM32(data, size) {
  var j;
  var i;
  var temp;
  var crc = 0x16E008EC; //请联系厂家获取crc初值
  for (i = 0; i < size; i++) {
      var t = new Array(4);

      var index = i * 4;
      for (var k = 0; k < 4; k++) {
          t[k] = data[index++];
      }

      temp = byte4_long(t);

      for (j = 0; j < 32; j++) {
          if (((crc ^ temp) & 0x80000000) != 0) {
              crc = 0x04C11DB7 ^ (crc << 1);
          } else {
              crc <<= 1;
          }
          temp <<= 1;
      }
  }
  return crc;
}
//字符串转字节
function stringToByte(str) {
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


//cardid：需要加密的卡号,time:截止日期，count：次数 0次为无限次
function getQrcodeBytes(cardid, time, count,flourArray) {

  var index = 0;
  //根据不同的楼层信息进行处理
  var flourLength=flourArray.length;
  var qrcodebyte = new Array(52);
  console.log("数组长度："+qrcodebyte.length);
  qrcodebyte[index++] = 0x26;// 头
  qrcodebyte[index++] = 0x18;// 头
  qrcodebyte[index++] = 0x01;// CMD
  qrcodebyte[index++] = 0x0C;// 长

  // ID 4
  var b_cardid = long_byte4(cardid);
  for (var i = 0; i < 4; i++) {
      qrcodebyte[index++] = b_cardid[i]
  }
  console.log("b_cardid:"+qrcodebyte);
  // 厂商 3 + count 1
  var b_company = new Array(0XFF, 0XFF, 0XFF, count);
  for (var i = 0; i < 4; i++) {
      qrcodebyte[index++] = b_company[i]
  }
  console.log("b_company:"+qrcodebyte);
      
  // TIME 4
  var b_time = long_byte4(time / 1000);
  for (var i = 0; i < 4; i++) {
      qrcodebyte[index++] = b_time[i]
  }
  console.log("b_time:"+qrcodebyte);
  //楼层
  console.log('flour:'+flourArray);
  for(var j=0;j<flourArray.length;j++){
      qrcodebyte[index++] = flourArray[j];
  }

  console.log("b_flour:"+qrcodebyte);
  // crc32 4
  var crcCheck = new Array(48);
  for (var i = 0; i < crcCheck.length; i++) {
      crcCheck[i] = qrcodebyte[i];
  }
  var crcValue = CrcGen_STM32(crcCheck, 4);

  var b_crc = long_byte4(crcValue);
  for (var i = 0; i < 4; i++) {
      qrcodebyte[index++] = b_crc[i]
  }
  console.log('处理后的qrcodebyte：'+qrcodebyte);
  var qrcode = HloveyRC4(qrcodebyte);
  return qrcode;
}

function HloveyRC4(aInput) {
  //暂时为死的key
  var aKey = stringToByte("RCQJVAGOSZXOYVXCVQYFORCTOTZKYESE");
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
  var sgetHexString = getHexString(iOutputBytes);
  return sgetHexString;
}


//获取hex字符串
function getHexString(seekByte20) {
  if (seekByte20 == null || seekByte20.length == 0) {
      return "";
  }
  var chars = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
  var bit;
  var sb = "";
  for (var i = 0; i < seekByte20.length; i++) {
      bit = (seekByte20[i] & 0x0f0) >> 4;
      sb += (chars[bit]);
      bit = seekByte20[i] & 0x0f;
      sb += (chars[bit]);
  }
  return sb;
}
// /*_______________________________________________________*/