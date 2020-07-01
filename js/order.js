/*
 * @Author: [JokerChen]
 * @Date: 2020-06-11 09:48:17
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-06-15 15:10:31
 * @Description:
 */
  /**
   * @desc 预约类规划
   * @OrderInfo   {Class object}         //预约类
   *     @OrderId {property string}     //预约唯一ID号
   *     @AccountNo {property string}   //预约人账号
   *     @UserName {property string}    //用户信息
   *     @OrderDate {property string}   //预约日期
   *     @StartTime {property string}   //预约开始时间
   *     @EndTime {property string}     //预约结束时间
   *     @State {property string}       //预约状态
   *     @Totalminutes {property string}       //预约总时长
   *     @Rates {property string}       //费率
   *     @Spendmoney {property string}  //消费金额
   */
///预约信息记录(初始化)
var OrderInfo=function(orderId,accountNo,userName,orderDate,startTime,endTime,state,totalminutes,rates,spendmoney,deviceName,roomInfo){
    this.OrderId=orderId;
    this.AccountNo=accountNo;
    this.UserName=userName;
    this.OrderDate=orderDate;
    this.StartTime=startTime;
    this.EndTime=endTime;
    this.State=state;
    this.Totalminutes=totalminutes;
    this.Rates=rates;
    this.Spendmoney=spendmoney;
    this.DeviceName=deviceName;
    this.RoomInfo=roomInfo;
}
//预约开始
OrderInfo.prototype.OrderStart=function(){
    //console.log("Price:"+this.price);
}
//进行判断当前账号是否进行过预约（确定预约状态）传入对应的人员对象
OrderInfo.prototype.checkOrderState=function(oUser){
    //此处进行对象映射（将默认对象传输数据转为需要提供的数据结构类型）
}
//预约结束（调用对应的预约结束接口进行）//
OrderInfo.prototype.OrderEnd=function(){
    //console.log("Price:"+this.price);
}