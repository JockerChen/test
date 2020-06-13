/*
 * @Author: [JokerChen]
 * @Date: 2020-06-13 13:52:21
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-06-13 14:02:40
 * @Description: 传感器控电数据上传接口
 * 
 */

//  'VoltageRange',//电压量程
//   'CurrentRange',//电流量程
//   'TotalHighActiveEnergy',//有功总电能(高位)
//   'TotalLowActiveEnergy',//有功总电能(高位)
//   'ClearingElectricity',//清电量
//   'VoltageThreshold',//电压阀值
//   'CurrentThreshold',//电流阀值
//   'Voltage',//电压   //0048H
//   'Current',//电流   //0049H
//   'ActivePower',//有功功率 //004AH
//   'ActivePowerTotalEnergy',//有功总电能 004BH 004CH
//   'PowerFactor',//功率因素    //004DH

//传感器类
var Sensor = function () { 
    //传感器上的数据
    this.SensorData="";
};
Sensor.prototype.init = function (sensorData) {
    //传感器数据初始化
    sensorData = sensorData.substring(6);
    sensorData = sensorData.substring(0, sensorData.length - 4);
    this.SensorData=sensorData;
};
// var strInfo = "01030C57E409D9022D0000034003D63F17";
// strInfo = strInfo.substring(6);
// strInfo = strInfo.substring(0, strInfo.length - 4);




//创建对应类
var MODULAR_SENSOR_CLASS = {
    // 'VoltageRange':'0',//电压量程
    // 'CurrentRange':'0',//电流量程
    // 'TotalHighActiveEnergy':'0',//有功总电能(高位)
    // 'TotalLowActiveEnergy':'0',//有功总电能(高位)
    // 'ClearingElectricity':'0',//清电量
    // 'VoltageThreshold':'0',//电压阀值
    // 'CurrentThreshold':'0',//电流阀值
    'Voltage': '0',//电压   //0048H
    'Current': '0',//电流   //0049H
    'ActivePower': '0',//有功功率 //004AH
    'ActivePowerTotalEnergyFirst': '0',//有功总电能 004BH 
    'ActivePowerTotalEnergySecnnd': '0',//有功总电能 004CH
    'PowerFactor': '0'//功率因素    //004DH
    // 'RelayStatus':'0',//继电器状态  //004EH
    // 'RelayStatus':'0',//二氧化碳排量高  //004FH
    // 'RelayStatus':'0',//二氧化碳排量低  //0050H
    // 'Frequency':'0'//频率 //0051H
};

//遍历赋值
for (var prop in MODULAR_SENSOR_CLASS) {
    console.log(prop);
    var result = window[prop](strInfo.substring(0, 4));
    console.log(result);
    MODULAR_SENSOR_CLASS[prop] = result;
    strInfo = strInfo.substring(4);
    //过滤对象中的原型函数，使得只有属性能够进行本地存储
}

function Voltage (info) {
    var result = hextoint(info) / 100;
    return result;
}

function Current (info) {
    var result = hextoint(info) / 1000;
    return result;
}

function ActivePower (info) {
    var result = hextoint(info);
    return result;
}
function ActivePowerTotalEnergyFirst (info) {
    var result = hextoint(info) / 3200;
    return result;
}
function ActivePowerTotalEnergySecnnd (info) {
    var result = hextoint(info) / 3200;
    return result;
}
function PowerFactor (info) {
    var result = hextoint(info) / 1000;
    return result;
}

// 16进制数转10进制
function hextoint (hex) {
    var len = hex.length, a = new Array(len), code;
    for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48 <= code && code < 58) {
            code -= 48;
        } else {
            code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
    }

    return a.reduce(function (acc, c) {
        acc = 16 * acc + c;
        return acc;
    }, 0);
}