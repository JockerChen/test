/*
 * @Author: [JokerChen]
 * @Date: 2020-08-11 14:49:39
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-08-11 14:49:56
 * @Description: 
 */


//系统基本信息封装
var SystemBaseInfo=function(systemName,dateTime,systemVersion,onlineState){
  this.systemName=systemName ||"";
  this.dateTime=dateTime||"";
  this.systemVersion=systemVersion||"";
  this.onlineState=onlineState||"";
}
//系统初始化
SystemBaseInfo.prototype.init=function(){
  //系统信息初始化
}
//系统更改时间
SystemBaseInfo.prototype.changeDate=function(timeId,weekId,dateId){
var showTimeId= timeId || "ShowIndexTime";
var showWeekId= weekId || "ShowIndexWeek";
var showDateId= dateId || "ShowIndexDate";
var objD= new Date();
var yy = objD.getYear();
if(yy < 1900) yy = yy + 1900;
var MM = objD.getMonth() + 1;
if(MM < 10) MM = '0' + MM;
var dd = objD.getDate();
if(dd < 10) dd = '0' + dd;
var hh = objD.getHours();
if(hh < 10) hh = '0' + hh;
var mm = objD.getMinutes();
if(mm < 10) mm = '0' + mm;
var ss = objD.getSeconds();
if(ss < 10) ss = '0' + ss;
var ww = objD.getDay();
if(ww == 0) ww = "星期日";
if(ww == 1) ww = "星期一";
if(ww == 2) ww = "星期二";
if(ww == 3) ww = "星期三";
if(ww == 4) ww = "星期四";
if(ww == 5) ww = "星期五";
if(ww == 6) ww = "星期六";
$("#"+showTimeId).text(hh+":"+mm+":"+ss);
$("#"+showWeekId).text(ww);
$("#"+showDateId).text(yy+"年"+MM+"月"+dd+"日");
return this;
}
//更改系统版本
SystemBaseInfo.prototype.changeVersion=function(id){
  var showId= id || "startupTime";
  $("#"+showId).text("V3.17.3");
  return this;
}
//更改系统在线状态
SystemBaseInfo.prototype.onlineState=function(id){
  var showId= id || "content";
  var info=true;
  if(info ==true){
      $("#"+showId).text("在线");
  }else{
      $("#"+showId).text("离线");
  }
  return this;
}
