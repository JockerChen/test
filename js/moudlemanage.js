/*
 * @Author: [JokerChen]
 * @Date: 2020-06-11 09:48:17
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-06-18 19:25:44
 * @Description:
 */
"use strict";
//模块管理
//需要测试的数据

//账号信息
//姓名
//日期
//起始时间
//结束时间
//费率

//对应的预约用户信息包
// 'AA01-0101-2030004200-000';
// 信息包说明
// AA01对应硬件类名称
// 0101对应类及属性名称
// 2030004200对应属性的值,例如0101对应的是MODULAR_USER_COMMAND模块的AccountNo信息，也就是AccountNo='2030004200'
//000 结尾（预留，该命令后期扩展为可调用方法）
 //人员信息包
  //人员账号
//  var sSendMSGInfo1='AA01-01-0101-2030004200-000';
//  //人员姓名
//  var sSendMSGInfo2='AA01-0102-陈宁-000';
//  //人员所在班级
//  var sSendMSGInfo3='01-0103-一年一班-000';
//  //预定人账号
//  var sSendMSGOrder1='04-0401-2223693632-000';
//  //预定人姓名
//  var sSendMSG2='04-0402-陈宁-000';
//  //预定日期
//  var sSendMSG3='04-0403-20200616-000';
//  //预定开始时间
//  var sSendMSG4='04-0404-0841-000';
// //预定结束时间
//  var sSendMSG5='04-0405-0910-000';
// //预定费率
//  var sSendMSG6='04-0408-10/s-000';

//命令包模块化管理（总体的模块汇总）
//'AA01':'User' //普通卡上数模式
//'AA02':'Sensor' //传感器上数模式
//'AA03':'Bluetooth' //蓝牙串口模块上数模式
//'AA04':'Order' //实验室预约

//命令包模块化管理（总体的模块汇总）
//'01':'User' //普通卡上数模式
//'02':'Sensor' //传感器上数模式
//'03':'Bluetooth' //蓝牙串口模块上数模式
//'04':'Order' //实验室预约
var MODULAR_COMMAND = {
    '01': 'User',
    '02': 'Order',
    '03': 'Sensor',
    '04': 'Bluetooth'
};
//用户信息模块命令
var MODULAR_USER_COMMAND={
    '0101':'AccountNo',
    '0102':'Name',
    '0103':'Deptname',
    '0104':'Sex',
    '0105':'SchoolId'
};
//预约命令模块
var MODULAR_ORDER_COMMAND={
    '0401':'AccountNo',
    '0402':'UserName',
    '0403':'OrderDate',
    '0404':'StartTime',
    '0405':'EndTime',
    '0406':'OrderState',
    '0407':'Totalminutes',
    '0408':'Rates',
    '0409':'Spendmoney',
    '0410':'DeviceName',
    '0411':'RoomInfo'
 };

//设置属性信息
function setProperty(objInfo,sSendMSG) {
     console.log("串口处理：setProperty"+sSendMSG);
    var msgClass,msgObg,msgProperty;
    var bakCls=BcdToData(sSendMSG.split("2D")[0]);
    //当前类信息
    msgClass=MODULAR_COMMAND[bakCls];
    // console.log("串口步骤1："+msgClass);
    //这个是对应的传入的对象（进行区分是哪个对象）
    msgObg=objInfo[BcdToData(sSendMSG.split("2D")[0])];
    //  console.log("串口步骤2："+msgObg);
    //动态获取动态类的属性eval(`MODULAR_${msgClass.toUpperCase()}_COMMAND`)
    //实际上的含义是MODULAR_COMMAND[MODULAR_USER_COMMAND]
    //获取对应的属性
    msgProperty=eval("MODULAR_"+msgClass.toUpperCase()+"_COMMAND")[BcdToData(sSendMSG.split("2D")[1])];
    console.log("串口步骤3："+msgProperty);
    console.log(msgClass);
    console.log(msgProperty);
    var propertyValue= sSendMSG.split("2D")[2];
     console.log("串口属性值:"+propertyValue);
//     console.log("串口效验:"+checkChineseName(propertyValue));
    if(checkChineseName(propertyValue)){
        //是中文
        msgObg[msgProperty]=chineseChange(sSendMSG.split("2D")[2]);
    }
    else
    {
        //是英文
        msgObg[msgProperty]=BcdToData(sSendMSG.split("2D")[2]);
    }
    if(!msgProperty){
        console.log("当前属性未定义");
        return false;
    }
    return objInfo;
}

//中文转换
function chineseChange(str) {
    var reg = new RegExp("\\w{1,4}", "g");
    var ma = str.match(reg);
    str = "\\u" + ma.join("\\u");
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
//进行判断当前是否有中文
function checkChineseName(params) {
    var isTrue=null;
    var reg = new RegExp("\\w{1,4}", "g");
    var ma = params.match(reg);
    params = "\\u" + ma.join("\\u");
	params=UnicodeToChar(params);
    var pattern = /^[\u4e00-\u9fa5]{0,}$/;
    if(pattern.test(params)){　　
        isTrue=true;
    }else{
        isTrue=false;
    }
    console.log(isTrue);
    return isTrue;
}
//
//BCD转码
function BcdToData(strData) {
   var strReturnData = "";

   for (var i = 0; i < strData.length / 2; i++) {
       strReturnData += String.fromCharCode(HexToDec(strData.substr(2 * i, 2)));
   }
   return strReturnData;
}

var UnicodeToChar = function (str) {
   str = str.replace(/\\/g, "%");
   return unescape(str);
}
function HexToDec(str) {
   return parseInt(str, 16).toString();
}

function DecToHex(str) {
   return parseInt(str).toString(16);
}

function HexToBin(str) {
   return parseInt(str, 16).toString(2);
}

function BinToHex(str) {
   return parseInt(str, 2).toString(16);
}