//餐别类
var CustomDistListArr = [{
  "Id": 1,
  "DistName": "早餐",
  "StartTime": "10:00",
  "EndTime": "11:30",
  "LimitQuota": "50",
  "LimitTime": "5",
  "MealNo": "01",
  "MealPrice": 3,
}, {
  "Id": 2,
  "DistName": "午餐",
  "StartTime": "12:00",
  "EndTime": "13:30",
  "LimitQuota": "20",
  "LimitTime": "5",
  "MealNo": "01",
  "MealPrice": 3,
}, {
  "Id": 3,
  "DistName": "晚餐",
  "StartTime": "18:00",
  "EndTime": "19:30",
  "LimitQuota": "20",
  "LimitTime": "5",
  "MealNo": "01",
  "MealPrice": 3,
}, {
  "Id": 4,
  "DistName": "夜餐",
  "StartTime": "23:00",
  "EndTime": "23:29",
  "LimitQuota": "20",
  "LimitTime": "5",
  "MealNo": "01",
  "MealPrice": 3,
}];
//时段
var aDistTimeArr = ["10:00", "11:30", "12:00", "13:30", "18:00", "19:30"];

//当前餐别条目
var CustomDistItem = function (id, distName, startTime, endTime, quota, limitTime, mealNo, mealPrice) {
  this.Id = id; //餐号ID
  this.DistName = distName;   //餐别名称
  this.StartTime = startTime; //开餐时间
  this.EndTime = endTime;     //闭餐时间
  this.MealNo = mealNo;//餐号(份饭)多钱
  this.MealPrice = mealPrice;//餐号(份饭)多钱
}
//消费类（如果输入金额后，则自动将对应的消费类型切换成计算器，消费结束后默认为）先在线后脱机
var CustomCls = function (obj) {
  this.customDist = obj && obj.customDist || '空';//消费当前餐别（获取）
  this.customType = obj && obj.customType || '份饭';//当前消费类型 份饭/计算器/份饭/计算器混合
  this.customLimitTime = obj && obj.customLimitCount;//消费限次
  this.customQuota = obj && obj.customQuota;//消费限额
  this.customPrice = obj && obj.customPrice || 0;//份饭的单价是mealNo 计算器的单价是输入的金额
  this.customSure = obj && obj.customSure || true;//消费确认模式 确认/不确认
  this.customSpendType = obj && obj.customSpendType || '人脸';//刷卡或人脸
  this.customDate = '';//消费日期
  this.customTime = '';//消费时间 
  this.customState = '';//消费状态（成功/失败）
}
//在线消费
CustomCls.prototype.updateOnlineCustom = function () {
  console.log('执行在线消费:updateOnlineCustom');
  //在线（调用接口的模式）
  // var strServerPath = androidClient.getValue("ServerPath");
  // var param = {
  //   url: strServerPath + "ashx/BigData/SQuery.ashx",
  //   data: {
  //     action: "ConsumePersonInfoByCardNo",
  //     ControllerNo: androidClient.getValue("ControllerNo"),
  //     // TypeId: strTypeId,
  //     // CardNo: sCardNo
  //   }
  // };
  // var promise = ajaxPromise(param);
  // promise.then(function (json) {
  //   if (json.resultCode == 0) {

  //   }
  //   else {

  //   }
  // }, function (reason) {
  //   //消费失败结果
  // })
}
//脱机消费
CustomCls.prototype.updateOfflineCustom = function (accountNo, cardId) {
  //记账的模式
  console.log('执行脱机消费:updateOfflineCustom');
  // var strSql = "Insert into PersonDetail(AccountNo,PersonName,PersonShortName,SpendDate,SpendTime,SpendMoney,CardNo,MachineNo,WindowsNo,Flag,PayType,WorkMode,DishNo,DishName,DeviceType)values(";
  // strSql += "'" + androidClient.getValue("CustomAccountNo") + "','" + androidClient.getValue("CustomPersonName") + "','" + androidClient.getFirstSpell(androidClient.getValue("CustomPersonName")) + "',";
  // strSql += "'" + androidClient.getValue("CustomSpendDate") + "','" + androidClient.getValue("CustomSpendTime") + "','" + androidClient.getValue("CustomPrice") + "',";
  // strSql += "'" + androidClient.getValue("CustomCardNo") + "','" + androidClient.getValue("MachineNo") + "','" + androidClient.getValue("ControllerNo") + "',";
  // strSql += "'0','" + androidClient.getValue("CustomSpendType") + "','" + androidClient.getValue("CurrDictName") + "','','','" + androidClient.getValue("CustomDeviceType") + "')";
  // androidClient.execSQL(strSql);
  return this;
}
//设置身份限次数量
CustomCls.prototype.setCustomLimitTime = function (customLimitTime) {
  this.customLimitTime = customLimitTime;
  //记账的模式
  console.log('设置身份限次数量:setCustomLimitTime');
  return this;
}
//设置身份限额数量
CustomCls.prototype.setCustomQuota = function (customQuota) {
  this.customQuota = customQuota;//消费限额
  //记账的模式
  console.log('设置身份限额数量:setCustomQuota');
  return this;
}
//判断当前是否在消费时间内
CustomCls.prototype.checkCustomTime = function () {
  //此处进行判断当前是否在消费时间段内
  console.log("执行:checkCustomTime");
  return true;
}
//播放对应的语音
CustomCls.prototype.speechPlay = function (msg) {
  console.log("执行:speechPlay");
  //androidClient.SpeechPlay(msg);
  return this;
}
//显示相应结果
CustomCls.prototype.showText = function (msg) {
  console.log("执行:showText");
  //androidClient.showText(msg);
  return this;
}
//快速修改份饭价格功能
CustomCls.prototype.changeCustomPrice = function (price) {
  //早午晚夜四个时间段对应的餐别应该按照第一次现在数据为主，平时情况下都是以本地为主.
  //先更新本地数据库在更新本地表,然后以后台为准
  this.customPrice = price;
  return this;
}
//判断消费限次(按照身份)不为空且不为0进行判断   DayCs字段
CustomCls.prototype.checkCustomCount = function (customLimitTime) {
  var result = true;
  //传入次数
  if (customLimitTime > this.customLimitTime) result = false;
  return result;
}
//判断消费限额(按照身份) 整天限额 EveryDayLimit
CustomCls.prototype.checkCustomQuota = function (customQuota) {
  var result = true;
  //传入金额
  if (customQuota > this.customQuota) result = false;
  return result;
}
//消费结果呈现
CustomCls.prototype.showCustomResult = function () {
  return this;
}
//消费数据清除
CustomCls.prototype.clearCustomData = function () {
  return this;
}

//人员表相关信息表
var UserCls = function (obj) {
  this.UserAccountNo = obj && obj.AccountNo || '';//用户账号
  this.UserCardNo = obj && obj.CardNo || '';//用户账号
  this.UserTypeId = obj && obj.UserTypeId || 0;//用户身份
  this.UserPersonMoney = obj && obj.UserPersonMoney || 0;//用户余额
}
//一个工程是返回当前的工厂的相关信息


