/*
 * @Author: [JokerChen]
 * @Date: 2020-08-10 19:28:52
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-08-11 11:52:15
 * @Description: 
 */

//访客人员类
var FKClass=function(param){
  
}

//为原型对象属性进行赋值
FKClass.prototype.init=function(param){
  //访客证件类型
  this.FKCardType=param && param.FKCardType || "";
  //访客证件号码
  this.FKCardId=param && param.FKCardId || "";
  //访客姓名
  this.FKName=param && param.FKName || "";
  //访客性别
  this.FKSex=param && param.FKSex || "";
  //访客证件地址
  this.FKCardAddress=param && param.FKCardAddress || "";
  //访客电话
  this.FKPhone=param && param.FKPhone || "";
  //访客进出次数
  this.FKInOutCnt=param && param.FKInOutCnt || "";
  //来访人数
  this.FKPersonCnt=param && param.FKPersonCnt || "";
  //来访有效期
  this.FKValidity=param && param.FKValidity || "";
  //访客单位
  this.FKCompany=param && param.FKCompany || "";
  //来访事由
  this.FKReason=param && param.FKReason || "";
  //携带物品
  this.FKBelongings=param && param.FKBelongings || "";
  //备注
  this.FKRemarks=param && param.FKRemarks || "";
  //人脸识别程度（高、低相似度）
  this.FKSimilarity=param && param.FKSimilarity || "";
  //电梯
  this.FKElevator=param && param.FKElevator || "";
  //楼层
  this.FKFloor=param && param.FKFloor || "";
}
//收藏次数
FKClass.prototype.collection=function(){
  
}







//被访人员
var FKAccessedClass=function(param){
  //被访人工号
  this.FKAccessedAccountNo=param && param.FKAccessedAccountNo || "";
  //姓名
  this.FKAccesseName=param && param.FKAccesseName || "";
  //部门
  this.FKAccesseDeptname=param && param.FKAccesseDeptname || "";
  //被访电话
  this.FKAccessePhone=param && param.FKAccessePhone || "";
  //访客证件地址
  this.FKCardAddress=param && param.FKCardAddress || "";
}


//ajax异步请求
var ajaxPromise= function(param) {
  return new Promise(function(resolve, reject){
    $.ajax(param.url, {
      data: param&&param.data||{},
      dataType: param&&param.type||"json", //服务器返回数据格式
      type: 'post', //HTTP请求类型
      timeout: param&&param.timeout||5000,  //超时时间
      success: function(data) {
          resolve(data);
      },
      error: function(xhr, type, errorThrown) {	
          reject(errorThrown+type);
      }
    });
  })   
}
//系统相关信息
// sysVersion:相关的系统版本信息
// sysLogo:系统logo
// sysApp:具体的哪家的应用
// sysFunction:包含的功能

function systemInfo() {  
  this.sysVersion="";
  this.sysLogo="";
  this.sysApp="";
  this.sysFunction=[];
};
//系统初始化
systemInfo.prototype.init=function () {
  
}

// 相应接口配置项
var ajaxArray=[
  {
    "FunInfo":"",
    "FunName":"获取访客数量信息",
    "FunAjaxUrl":"ashx/ExtInterface/Kad/KadInterface.ashx",
    "data":{
        "action":"GetVisitorsNumber"
    },  
    "Remark":"富迪访客接口调用地址"
  },
  {
    "FunInfo":"",
    "FunName":"模糊查询被访人信息",
    "FunAjaxUrl":"ashx/ExtInterface/Kad/KadInterface.ashx",
    "data":{
      "action":"GetIntervieweeList",
      "AccountNo":"",
      "PersonName":"",
    },  
    "Remark":"富迪访客接口调用地址"
  },{
    "FunInfo":"",
    "FunName":"获取访客电梯信息",
    "FunAjaxUrl":"api/BaseInfo/GetAttributeContentList",
    "data":{
      "dictionaryCategory":"访客电梯",
    },  
    "Remark":"富迪访客接口调用地址"
  },{
    "FunInfo":"",
    "FunName":"提交访客信息",
    "FunAjaxUrl":"api/Visitor/visitorAddStandard",
    "data":{
      "action":"SubmitVisitor",
      "cardNo":"",
      "controllerNo":""
    },  
    "Remark":"富迪访客接口调用地址"
  },
  {
    "FunInfo":"",
    "FunName":"RecordLeave",
    "FunAjaxUrl":"ashx/ExtInterface/Kad/KadInterface.ashx",
    "data":{
      "action":"RecordLeave",
      "AccountNo":"",
      "ControllerNo":""
    },  
    "Remark":"退卡操作"
  },
];


//处理接口相应数据
var runArray=["ModelSel","HideIndexSetting","GetFunctionInfo","loadOption","saveOption","RunPage"];

