/*
 * @Author: [JokerChen]
 * @Date: 2020-09-09 08:43:06
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-09-09 16:03:59
 * @Description: 用户时段卡(对应扇区逻辑)
 */

//创建实体类
//卡类型
// UserCard:用户卡
// AdminCard:管理卡
// SwitchCard:开关卡
var CardTypeEnum={
  "UserCard":"0XAA",
  "AdminCard":"0XBB",
  "SwitchCard":"0XCC"
}
//呼叫方式
var CallTypeEnum={
  "HandControl":"0X00",
  "AutoControl":"0X01",
}
// StackInfo:生成的栈列表
// StackNo:栈位置
// StackName:栈信息名称
// StackCommonWord:栈命令字 例如，用户卡0XAA
var StackInfo={
  'StackNo':0,
  'StackName':"",
  'StackCommonWord':""
}

//栈列表(默认的32位都需要进行传递)
var StackList=[];

//楼层相关信息
var FloorOption={ 
  "DeviceNo":"",
  "Floor1":"",
  "Floor2":"",
  "Floor3":"",
  "Floor4":"",
  "Floor5":""
};