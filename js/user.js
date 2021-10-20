/*
 * @Author: [JokerChen]
 * @Date: 2020-06-11 09:48:17
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2020-06-16 09:31:22
 * @Description: 
 */

///用户基础信息
var User=function(id,accountNo,name,deptname,schoolId,typeId){
    this.id=id;
    this.AccountNo=accountNo;
    this.Name=name;
    this.Deptname=deptname;
    this.SchoolId=schoolId;
    this.TypeId=typeId;
}
//对应人员的信息情况
User.prototype.display=function(){
    console.log("Price:"+this.price);

}
//收藏次数
User.prototype.collection=function(){
    //console.log("ID:"+this.id+"收藏次数:100");

}
U