/*
* @Author: [JokerChen]
* @Date: 2020-06-13 13:52:21
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-06-19 11:05:27
* @Description: 传感器控电数据上传接口
*
*/

//传感器类
//SensorData:传感器接收的数据
var Sensor = function () {
    //传感器对应串口
    this.SensorOtherPort= "";
    //传感器请求数据
    this.SensorRequestData = "";
    //传感器相应数据
    this.SensorResponseData = "";
    //指令集
    this.SensorInstruction={
        "基础信息":"01030048000645DE",
        "继电器状态":"010100000001FDCA",
        "继电器合闸":"01050000FF008C3A",
        "继电器拉闸":"010500000000CDCA"
    }
    // 传感器当前状态
    this.SensorState = "";
};
Sensor.prototype.init = function (sensorOtherPort) {
    //传感器对应串口
    this.SensorOtherPort= sensorOtherPort;
    return this;
};
Sensor.prototype.changeUpdateHandle = function (sensorData) {
    //传感器数据初始化（将前6位过滤掉和后四位过滤掉）
    //传感器类型数据处理及转换(获取传感器对应的数据指令集)
    var strInfo =sensorData;
    //遍历赋值
    for (var prop in SENSOR_PROPERTY) {
        console.log(prop);
        var result = window[prop](strInfo.substring(0, 4));
        console.log(result);
        SENSOR_PROPERTY[prop] = result;
        strInfo = strInfo.substring(4);
        //过滤对象中的原型函数，使得只有属性能够进行本地存储
    }
    console.log(JSON.stringify(SENSOR_PROPERTY));
    return JSON.stringify(SENSOR_PROPERTY);
};
//传感器相关（发送传感器信号）(串口、命令集)
Sensor.prototype.sendSensorData = function (sInstruction) {
    //传感器对应的指令集
    this.SensorRequestData=this.SensorInstruction[sInstruction];
    //androidClient.sendSerialMsg(this.SensorOtherPort,this.SensorRequestData);
    console.log("串口发送数据：" + this.SensorRequestData);
    return this;
};

//传感器相关（接收传感器信号）
Sensor.prototype.getSensorData = function (sensorData) {
    this.SensorResponseData=sensorData;
    console.log("串口接收数据函数：" + this.SensorResponseData);
    if(this.SensorResponseData.length==12){
        //读取继电器状态指令
        sensorData = sensorData.substring(6);
        sensorData = sensorData.substring(0, 2);
        if(sensorData==="00"){
            this.SensorState = "合闸";
        }
        else{
            this.SensorState = "拉闸";
        }
        return this;
    }
    else{
        //此处进行处理（返回的是基础的base数据）
        sensorData = sensorData.substring(6);
        sensorData = sensorData.substring(0, sensorData.length - 4);
        return this.changeUpdateHandle(sensorData);
    }
};


//传感器数据信息
var SENSOR_PROPERTY = {
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
    'PowerFactor': '0',//功率因素    //004DH
    // 'RelayStatus':'0',//继电器状态  //004EH
    // 'RelayStatus':'0',//二氧化碳排量高  //004FH
    // 'RelayStatus':'0',//二氧化碳排量低  //0050H
    // 'Frequency':'0'//频率 //0051H
};

// {
//     "DeviceNo":"0101",
//     "ActivePower":"100",
//     "Time":"2020-06-19 10:51"
// },
// {
//     "DeviceNo":"0101",
//     "ActivePower":"100",
//     "Time":"2020-06-19 10:51"
// }


//返回数据控制
function Voltage(info) {
    var result = hextoint(info) / 100;
    return result;
}
function Current(info) {
    var result = hextoint(info) / 1000;
    return result;
}
function ActivePower(info) {
    var result = hextoint(info);
    return result;
}
function ActivePowerTotalEnergyFirst(info) {
    var result = hextoint(info) / 3200;
    return result;
}
function ActivePowerTotalEnergySecnnd(info) {
    var result = hextoint(info) / 3200;
    return result;
}
function PowerFactor(info) {
    var result = hextoint(info) / 1000;
    return result;
}
// 16进制数转10进制
function hextoint(hex) {
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

