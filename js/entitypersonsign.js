/*
 * @Author: [JokerChen]
 * @Date: 2020-08-24 09:37:25
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-09-08 13:32:59
 * @Description:
 */
//创建一个签到人员实体类（用来进行数据映射）
var PersonSignInfo=function(accountNo,cardId,personName,personClass,personImage,sdate,stime,captureImage,smsgbox){
    this.AccountNo=accountNo||"";
    this.CardId=cardId||"";
    this.PersonName=personName||"";
    this.PersonClass=personClass||"";
    this.PersonImage=personImage;
    this.SignDate=sdate;
    this.SignTime=stime;
    this.CaptureBase64=captureImage||"";
    this.Msgbox=smsgbox||"";
}

//对象初始化
PersonSignInfo.prototype.init=function(){
  var that=this;
  localStorage.setItem("PersonSignInfo",JSON.stringify(that));
}

//设置属性并进行本地存储
PersonSignInfo.prototype.SetLocalStorage=function(key,value){
  var that=this;
  if(that.hasOwnProperty(key)&&!!value){
      that[key]=value;
  }
  else{
    console.log("该类不存在目标属性");
    return false;
  }
  localStorage.setItem("PersonSignInfo",JSON.stringify(that));
}
//一次设置多个属性
PersonSignInfo.prototype.SetMutityLocalStorage=function(obj){
  var that=this;
  var _obj=null;
  if (typeof obj =="object"){
    _obj=obj;
  }else{
    _obj=JSON.parse(obj);
  }
  for (var prop in _obj){
    that[prop]=_obj[prop] ;
  }
  localStorage.setItem("PersonSignInfo",JSON.stringify(that));
}

//设置属性并进行本地存储
PersonSignInfo.prototype.RemoveLocalStorage=function(key,value){
  localStorage.removeItem("PersonSignInfo");
}
