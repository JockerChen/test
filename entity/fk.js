
//访客人员类
var FKClass=function(param){}
//为原型对象属性进行赋值
FKClass.prototype.init=function(param){
  //访客姓名
  this.ComePersonName=param && param.ComePersonName || "";
  //访客性别
  this.ComePersonSex=param && param.ComePersonSex || "";
  //访客证件号码
  this.ComePersonIDCard=param && param.ComePersonIDCard || "";
  //访客证件地址
  this.ComePersonIDCardAddr=param && param.ComePersonIDCardAddr || "";
  //访客证件有效期
  this.ComePersonIDCardValidDate=param && param.ComePersonIDCardValidDate || "";
  //访客电话
  this.ComePersonTel=param && param.ComePersonTel || "";
  //访客日期
  this.ResDate=param && param.ResDate || "";
  //访客时间
  this.ResTime=param && param.ResTime || "";
  //访客到访详细时间
  this.ComeTime=param && param.ComeTime || "";
  //访客进出次数
  this.InOutTimes=param && param.InOutTimes || "1";
  //来访人数
  this.PersonRetinue=param && param.PersonRetinue || "1";
  //来访人数
  this.PersonRetinue=param && param.PersonRetinue || "";
  //来访事由
  this.InCategories=param && param.InCategories || "";
  //离开时间
  this.OutDateTime=param && param.OutDateTime || "";
  //有效时间
  this.ValidDateTime=param && param.ValidDateTime || "";
  //备注
  this.Remark=param && param.Remark || "";
  //一体机类型
  this.SpecialVersion=param && param.SpecialVersion || "单机访客";
  //被访人电话
  this.ReceivePersonTel=param && param.ReceivePersonTel || "";
  //被访人姓名
  this.ReceivePersonName=param && param.ReceivePersonName || "";
  //被访人账号
  this.ReceiveAccountNo=param && param.ReceiveAccountNo || "";
}

//更新身份证信息
FKClass.prototype.UploadCardInfo=function (params) {
    
}