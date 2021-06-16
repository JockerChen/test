/*
 * @Author: [JokerChen]
 * @Date: 2021-03-16 18:04:47
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-03-16 19:32:21
 * @Description: 灯光的实体类
 */
//命令类
class Command {
    //属性
    constructor() {
      this.commands=[];
      this.code="";
      this.value = "";
    }
  //选择命令
  insertCommand (code,value) {
    let obj={};
    obj.code=code;
    obj.value=value;
    this.commands.push(JSON.stringify(obj));
  }
  //选择命令
  // deleteCommand (code) {
  //   this.commands.splice();
  // }
}
//灯光类
class LampCls {
  //属性
  constructor(workMode, switchLed, brightValue, tempValue,colourData) {
    this.switch_led = switchLed;
    this.work_mode = workMode;
    this.bright_value_v2 = brightValue;
    this.temp_value_v2 = tempValue;
    this.colour_data_v2=colourData;
  }

  showPwd () {
    alert(this.Pwd);
  }
}