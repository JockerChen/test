//第一步
var strServerIp=localStorage.getItem("ServerPath");
var strControlNo=localStorage.getItem("ControlNo");
if(!strServerIp){
    console.log("本地存储服务器地址不存在");
    strServerIp= androidClient.getValue("ServerPath");
}
if(!strControlNo){
    console.log("本地存储设备号不存在");
    strControlNo=androidClient.getValue("ControllerNo");
}
//创建对象
var linkSystemClass=new LinkSystemClass(strServerIp,strControlNo);
//连接系统类与其他类没有关系
var LinkSystemClass=function(ServerPathInfo,ControlNoInfo){
	if(!!ServerPathInfo){
		this.ServerIp=ServerPathInfo && ServerPathInfo || "";
		localStorage.setItem("ServerPath",ServerPathInfo);
		localStorage.setItem("ServerIp", ServerPathInfo + "ashx/dzbp/");
	}
	if(!!ControlNoInfo){
		this.ControlNoInfo=ControlNoInfo && ControlNoInfo || "";
		localStorage.setItem("ControlerNo",ControlNoInfo);
		localStorage.setItem("ControlNo",ControlNoInfo);
	}
	this.Model="";
	this.HomePage="index.html";
}
//设置控制器号和服务器地址
LinkSystemClass.prototype.changeServerPath=function(ServerPathInfo){
	if(!!ServerPathInfo){
        ServerPathInfo=checkServerPath(ServerPathInfo);
		this.ServerIp=ServerPathInfo;
		localStorage.setItem("ServerIp", ServerPathInfo + "ashx/dzbp/");
        localStorage.setItem("ImageIp", ServerPathInfo);
        localStorage.setItem("ServerPath", ServerPathInfo);
        androidClient.setValue("ServerPath", ServerPathInfo);
        androidClient.setServerPath(ServerPathInfo);
	}
	return this;
}
LinkSystemClass.prototype.changeControlNo=function(ControlNoInfo){
	if(!!ControlNoInfo){
        this.ControlNoInfo=ControlNoInfo;
        androidClient.setControlNo(ControlNoInfo);
		androidClient.setValue("ControlNo", ControlNoInfo);
        androidClient.setValue("ControllerNo", ControlNoInfo);
        localStorage.setItem("ControllerNo",ControlNoInfo);
		localStorage.setItem("ControlerNo",ControlNoInfo);
		localStorage.setItem("ControlNo",ControlNoInfo);
	}
	return this;
}
LinkSystemClass.prototype.changeModel=function(ModelInfo){
     //更改模式
     ModelInfo=ModelInfo&& ModelInfo || "";
     this.Model=ModelInfo;
     androidClient.setValue("EnterModel",ModelInfo);
     localStorage.setItem("EnterModel",ModelInfo);
 	return this;
}
$(function(){
    console.log("启动！");
    var cDeviceBaseInfoClass=new DeviceBaseInfoClass();
    cDeviceBaseInfoClass.setBrowserCoreShow("isX5","CoreSwitch").setDeviceIP().setSDCardInfo();
    cDeviceBaseInfoClass.setDeviceVolume().setDeviceBright().setAppStartDate().setFaceActivatedState().setFaceInitState();
})
//设备基础信息设置
var  DeviceBaseInfoClass =function (){
    //设备IP
    this.DeviceIP=androidClient.getLocalIPAddress() && androidClient.getLocalIPAddress() || "";
    //设备音量(默认为0)
    this.DeviceVoice=androidClient.currentVolume() && androidClient.currentVolume() || "0";
    //设备亮度
    this.DeviceBright=androidClient.getSystemBrightness() && androidClient.getSystemBrightness() || "0";
    //设备总存储数
    this.DeviceAllSDCard=androidClient.getValue("sdall") && androidClient.getValue("sdall") || "4G";
    //设备可用存储数
    this.DeviceAvailableSDCard=androidClient.getValue("sdavailable") && androidClient.getValue("sdavailable") || "0";
    //设备使用存储数
    this.DeviceUseSDCard=androidClient.getValue("sdfree") && androidClient.getValue("sdfree") || "0";
    //设备浏览器内核
    this.DeviceBrowserCore=androidClient.getValue("isX5") && androidClient.getValue("isX5") || "";
    //设备启动时间
    this.DeviceStartTime=androidClient.getValue("appstartdate") && androidClient.getValue("appstartdate") ||"";
    //人脸初始化
    this.DeviceFaceInitState=androidClient.CheckFaceInit() && androidClient.CheckFaceInit() ||"";
    //人脸激活状态
    this.DeviceFaceActivated=androidClient.CheckFaceActivity() && androidClient.CheckFaceActivity() ||"";
    //人脸初始化失败错误码
    this.DeviceFaceFailState=androidClient.CheckFaceErrorCode() && androidClient.CheckFaceErrorCode() ||"";
    //当前软件版本
    this.DeviceSoftVersion=androidClient.getVersionName() && androidClient.getVersionName() ||"";
}
//设置浏览器内核（设置浏览器内核）
DeviceBaseInfoClass.prototype.setBrowserCoreShow=function(X5Id,CoreSwitchId){
    var sIsX5Core="原生内核";
    var sCoreSwitch="切换X5内核";
    if(this.DeviceBrowserCore=="true"){
        sIsX5Core="X5内核";
        sCoreSwitch="切换X5内核";
	}
    $('#'+X5Id).text(sIsX5Core);
    $('#'+CoreSwitchId).text(sCoreSwitch);
    return this;
}
//设置浏览器内核（设置浏览器内核）
DeviceBaseInfoClass.prototype.setDeviceIP=function(){
    $('#MechinenoIp').val(this.DeviceIP);
    return this;
}
//获取设备当前存储信息
DeviceBaseInfoClass.prototype.setSDCardInfo=function(){
    $('#SDCardFree').text(this.DeviceUseSDCard);
    $('#SDCardAvailable').text(this.DeviceAvailableSDCard);
    $('#SDCardAll').text(this.DeviceAllSDCard);
    return this;
}
//设置设备音量
DeviceBaseInfoClass.prototype.setDeviceVolume=function(){
    $('#VolumeBar').text(this.DeviceVoice+"%");
    $('#VolumeBar').parent().css("left",Math.ceil(315*parseInt(this.DeviceVoice)/100)+"px");
    return this;
}
//设置设备亮度
DeviceBaseInfoClass.prototype.setDeviceBright=function(){
    $('#BrightBar').text(Math.ceil(parseInt(sVolume)/255*100)+"%");
    $('#BrightBar').parent().css("left",Math.ceil(315*parseInt(sVolume)/255)+"px");
    return this;
}
//设置App启动时间
DeviceBaseInfoClass.prototype.setAppStartDate=function(){
    $('#AppStartDate').text(this.DeviceStartTime);
    return this;
}
//设置人脸激活状态
DeviceBaseInfoClass.prototype.setFaceActivatedState=function(){
    $('#FaceActivateState').text(getFaceActivate(this.DeviceFaceActivated));
    return this;
}
//设置人脸初始化状态
DeviceBaseInfoClass.prototype.setFaceInitState=function(){
    var sFaceInitState="人脸初始化失败";
    if(this.DeviceFaceInitState){
        sFaceInitState="人脸初始化成功";
        $('#FaceInitErrorBox').hide();
    }
    else{
        $('#FaceInitError').text(androidClient.CheckFaceErrorCode());
        $('#FaceInitErrorBox').show();
    }
    $('#FaceInitState').text(sFaceInitState);
    return this;
}


//根据人脸返回值返回激活状态
function getFaceActivate(State) {
    var names = {
        '0': function () {
            return '人脸识别激活成功';
        },
        '90114': function () {
            return '人脸识别激活成功';
        },
        '-1': function () {
            return '人脸识别激活未初始化';
        },
        '-2': function () {
            return '人脸识别激活jar加载异常';
        },
        '-3': function () {
            return '人脸识别引擎创建失败';
        },
        '-4': function () {
            return '人脸识别激活jar反射异常';
        },
        '90129': function () {
            return '90129:激活数据被破坏+';
        },
        '90113': function () {
            return '90113:SDK激活失败';
        },
        '90138': function () {
            return '90138:激活文件不存在';
        },
        '90132': function () {
            return '90132:激活文件与SDK版本不匹配';
        },
        '98308': function () {
            return '98308:激活码已使用';
        }
    }
    if (typeof names[State] !== 'function') {
        return false;
    }

    return names[State]();
}
