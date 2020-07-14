/*
* @Author: [JokerChen]
* @Date: 2020-06-13 13:52:21
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-07-02 17:06:08
* @Description: 传感器控电数据上传接口
*
*/

//传感器类
//SensorData:传感器接收的数据
var Sensor = function () {
    //传感器类型二项还是三项（直流:Direct、交流:Alternating）
    this.SensorType= "";
    //传感器对应串口
    this.SensorOtherPort= "";
    //传感器请求数据
    this.SensorRequestData = "";
    //传感器相应数据
    this.SensorResponseData = "";
    //指令集（双项直流电）
    this.SensorInstruction={
        "基础信息":"01030048000645DE",
        "继电器状态":"010100000001FDCA",
        "继电器合闸":"01050000FF008C3A",
        "继电器拉闸":"010500000000CDCA"
    }
    //指令集（三项交流电）
    this.SensorAlternatInstruction={
        "基础信息":"01030048001E45D4",
        "继电器状态":"01030026000165C1",
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
//双项返回的数据格式
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
//三项返回的数据格式
Sensor.prototype.changeAlternatingHandle=function (sensorData) {
    var strInfo =sensorData;
    var result;
    for (var prop in SENSOR_OTHER_PROPERTY) {
        console.log(prop);
        console.log(`属性包含下划线的个数：${prop.split("_").length}`);
        if(prop.split("_").length!=1){
            result = window[prop.split("_")[0]](strInfo.substring(0, 4));
        }
        else{
            result = window[prop](strInfo.substring(0, 4));
        }
        console.log(result);
        SENSOR_OTHER_PROPERTY[prop] = result;
        strInfo = strInfo.substring(4);
        //过滤对象中的原型函数，使得只有属性能够进行本地存储
    }
    console.log(JSON.stringify(SENSOR_OTHER_PROPERTY));
    return JSON.stringify(SENSOR_OTHER_PROPERTY);
}


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
        console.log("getSensorData处理后的数据:"+sensorData);
        if(this.SensorType=="Direct"){
            //直流电数据处理
            return this.changeUpdateHandle(sensorData);
        }
        else if(this.SensorType=="Alternating"){
            //交流电数据处理
            return this.changeAlternatingHandle(sensorData);
        }
    }
};


//双向传感器数据信息
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

//三项交流电传感器上数通知
var SENSOR_OTHER_PROPERTY = {
    'Voltage_A': '0',   //0048H A相电压 单位:V
    'Current_A': '0',   //0049H A相电流 单位:A
    'ActivePower_A': '0', //004AH A相有功功率 单位:W
    'ActivePowerTotalEnergyHigh_A': '0',//A相有功总电能 004BH kWh DATA/800
    'ActivePowerTotalEnergyLow_A': '0',//A相有功总电能 004CH kWh DATA/800
    'PowerFactor_A': '0',//A相功率因素    //004DH
    'CarbonDioxideHigh_A':'0',//A相二氧化碳排量高  //004EH
    'CarbonDioxideLow_A':'0',//A相二氧化碳排量低  //004FH
    'RelayState_A':'0',//A 相报警及继电器状态 //0050H
    'Voltage_B': '0',   //0051H B相电压 单位:V
    'Current_B': '0',   //0052H B相电流 单位:A
    'ActivePower_B': '0', //0053H B相有功功率 单位:W
    'ActivePowerTotalEnergyHigh_B': '0',//B相有功总电能 0054H kWh DATA/800
    'ActivePowerTotalEnergyLow_B': '0',//B相有功总电能 0055H kWh DATA/800
    'PowerFactor_B': '0',//B相功率因素    //0056H
    'CarbonDioxideHigh_B':'0',//B相二氧化碳排量高  //0057H
    'CarbonDioxideLow_B':'0',//B相二氧化碳排量低  //0058H
    'RelayState_B':'0',//B 相报警及继电器状态 //0059H
    'Voltage_C': '0',   //005AH B相电压 单位:V
    'Current_C': '0',   //005BH B相电流 单位:A
    'ActivePower_C': '0', //005CH B相有功功率 单位:W
    'ActivePowerTotalEnergyHigh_C': '0',//B相有功总电能 005DH kWh DATA/800
    'ActivePowerTotalEnergyLow_C': '0',//B相有功总电能 005EH kWh DATA/800
    'PowerFactor_C': '0',//B相功率因素    //005FH
    'CarbonDioxideHigh_B':'0',//B相二氧化碳排量高  //0060H
    'CarbonDioxideLow_B':'0',//B相二氧化碳排量低  //0061H
    'RelayState_B':'0',//B 相报警及继电器状态 //0062H
    'ActivePowerHighAll':'0',//三相有功总电能 //0063H
    'ActivePowerLowAll':'0', //三相有功总电能 //0064H
    'ActivePowerFrequency':'0' //频率HZ
};

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
//双项低电平有用总电能
function ActivePowerTotalEnergyFirst(info) {
    var result = hextoint(info) / 3200;
    return result;
}
//双项高电平有用总电能
function ActivePowerTotalEnergySecnnd(info) {
    var result = hextoint(info) / 3200;
    return result;
}

//三项高电平有用总电能
function ActivePowerTotalEnergyHigh(info) {
    var result = hextoint(info) / 800;
    return result;
}
//三项低电平有用总电能
function ActivePowerTotalEnergyLow(info) {
    var result = hextoint(info) / 800;
    return result;
}

function PowerFactor(info) {
    var result = hextoint(info) / 1000;
    return result;
}
function CarbonDioxideHigh(info) {
    var result = hextoint(info) / 1000;
    return result;
}
function CarbonDioxideLow(info) {
    var result = hextoint(info) / 1000;
    return result;
}
function RelayState(info) {
    var result = hextoint(info);
    return result;
}

function ActivePowerHighAll(info) {
    var result = hextoint(info)/800;
    return result;
}

function ActivePowerLowAll(info) {
    var result = hextoint(info)/800;
    return result;
}

function ActivePowerFrequency(info) {
    var result = hextoint(info)/100;
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




