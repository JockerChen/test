/*
 * @Author: [JokerChen]
 * @Date: 2020-09-14 07:27:29
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-09-16 11:41:32
 * @Description: 资产盘点类
 */
 //类OrderNo：盘点单号
 //属性:OrderNo:盘点单号
 //属性:Date:盘点日期
 //属性:AssetAddress:盘点地址
 //属性:Status:资产盘点地点 已盘点/未盘点
 //属性:Remarks:资产盘点单备注
 //属性:OrderDetailed:资产盘点计划表
//资产盘点类

//盘点单号

var AssetPlan=function(obj){
  this.OrderNo=obj.OrderNo;
  this.Date=obj.Date;
  this.AssetAddress=obj.AssetAddress;
  this.Status=obj.Status;
  this.Remarks=obj.Remarks;
  this.OrderDetailed=new AssetInventory(obj.OrderDetailed);
}
//数据更新
AssetPlan.prototype.update=function(){

}
//数据更新
AssetPlan.prototype.collection=function(){

}

//AssetInventory：资产编码
//属性:AssetFixedsNo:资产编码
//属性:AssetFixedsName:资产信息
//属性:AssetType:资产类别
//属性:Model:规格型号
//属性:EquipmentNo:设备编号
//属性:ConfigInfo:配置信息
//属性:DateOfProduction:出厂日期
//属性:BuyDate:购置日期
//属性:NCCode:NC编码
//属性:CardNo:卡片编号
//属性:CardNo2:二级卡片编号
//属性:IsInventory:已盘点/未盘点
//属性:Remarks:盘点说明
//资产盘点类
var AssetInventory=function(obj){
    this.AssetFixedsNo=obj.AssetFixedsNo;
    this.AssetFixedsName=obj.AssetFixedsName;
    this.AssetType=obj.AssetType;
    this.Model=obj.Model;
    this.EquipmentNo=obj.EquipmentNo;
    this.ConfigInfo=obj.ConfigInfo;
    this.DateOfProduction=obj.DateOfProduction;
    this.BuyDate=obj.BuyDate;
    this.NCCode=obj.NCCode;
    this.CardNo=obj.CardNo;
    this.CardNo2=obj.CardNo2;
    this.IsInventory=obj.IsInventory;
    this.Remarks=obj.Remarks;
};